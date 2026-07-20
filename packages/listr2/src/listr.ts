import { setMaxListeners } from 'node:events'

import { ListrRendererSelection, ListrEnvironmentVariables, ListrTaskState } from '@constants'
import type {
  ListrBaseClassOptions,
  ListrContext,
  ListrError,
  ListrGetRendererClassFromValue,
  ListrGetRendererOptions,
  ListrGetRendererTaskOptions,
  ListrPrimaryRendererValue,
  ListrRenderer,
  ListrRendererFactory,
  ListrRendererValue,
  ListrSecondaryRendererValue,
  ListrTask
} from '@interfaces'
import { ListrEventManager, Task, TaskWrapper } from '@lib'
import { Concurrency, getRenderer } from '@utils'

/**
 * Create a new task list with Listr.
 *
 * @see {@link https://listr2.kilic.dev/listr/listr.html}
 */
export class Listr<
  Ctx = ListrContext,
  Renderer extends ListrRendererValue = ListrPrimaryRendererValue,
  FallbackRenderer extends ListrRendererValue = ListrSecondaryRendererValue
> {
  public tasks: Task<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>[] = []
  public errors: ListrError<Ctx>[] | null
  public ctx: Ctx
  public events: ListrEventManager
  public path: string[] = []
  public rendererClass: ListrRendererFactory
  public rendererClassOptions: ListrGetRendererOptions<ListrGetRendererClassFromValue<Renderer> | ListrGetRendererClassFromValue<FallbackRenderer>>
  public rendererSelection: ListrRendererSelection
  public boundSignalHandler: () => void
  public signal: AbortSignal

  private concurrency: Concurrency
  private renderer: ListrRenderer
  private abortController: AbortController
  // promises of the tasks that actually started (never the queued ones, whose `Concurrency` promises never settle
  // after a `queue.clear()`); awaited on interrupt so every in-flight rollback settles — and, via the sub-Listr
  // promise chain, children before their parent — before the root exits
  private startedTasks: Promise<void>[] = []

  constructor(
    public task:
      | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>
      | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>[],
    public options?: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>,
    public parentTask?: Task<any, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>
  ) {
    // assign over default options
    this.options = {
      concurrent: false,
      renderer: 'default',
      fallbackRenderer: 'simple',
      exitOnError: true,
      exitAfterRollback: true,
      collectErrors: false,
      registerSignalListeners: true,
      ...(this.parentTask?.options ?? {}),
      ...options
    } as ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>

    // define parallel options
    if (this.options.concurrent === true) {
      this.options.concurrent = Infinity
    } else if (typeof this.options.concurrent !== 'number') {
      this.options.concurrent = 1
    }

    this.concurrency = new Concurrency({ concurrency: this.options.concurrent as number })

    // Update currentPath
    if (parentTask) {
      this.path = [...parentTask.listr.path, parentTask.title]
      this.errors = parentTask.listr.errors
    } else {
      // null when disabled keeps "collected, none failed" ([]) distinct from "not collected"
      this.errors = this.options.collectErrors ? [] : null
    }

    if (this.parentTask?.listr.events instanceof ListrEventManager) {
      this.events = this.parentTask.listr.events
    } else {
      this.events = new ListrEventManager()
    }

    // share a single AbortController down the run tree, the same way events are shared
    if (this.parentTask?.listr.abortController instanceof AbortController) {
      this.abortController = this.parentTask.listr.abortController
    } else {
      this.abortController = new AbortController()
      setMaxListeners(0, this.abortController.signal)
    }

    this.signal = this.abortController.signal

    /* istanbul ignore if */
    if (this.options?.forceTTY || process.env[ListrEnvironmentVariables.FORCE_TTY]) {
      process.stdout.isTTY = true
      process.stderr.isTTY = true
    }

    /* istanbul ignore if */
    if (this.options?.forceUnicode) {
      process.env[ListrEnvironmentVariables.FORCE_UNICODE] = '1'
    }

    // get renderer class
    const renderer = getRenderer({
      renderer: this.options.renderer,
      rendererOptions: this.options.rendererOptions,
      fallbackRenderer: this.options.fallbackRenderer,
      fallbackRendererOptions: this.options.fallbackRendererOptions,
      fallbackRendererCondition: this.options?.fallbackRendererCondition,
      silentRendererCondition: this.options?.silentRendererCondition
    })

    this.rendererClass = renderer.renderer
    this.rendererClassOptions = renderer.options as ListrGetRendererOptions<ListrGetRendererClassFromValue<Renderer> | ListrGetRendererClassFromValue<FallbackRenderer>>
    this.rendererSelection = renderer.selection

    // parse and add tasks
    /* istanbul ignore next */
    this.add(task ?? [])

    // Register a persistent SIGINT listener on the root only. It stays until removeSignalHandler(), so it survives the
    // SIGINT re-raise that signal-exit (pulled in by log-update's cursor handling) fires, giving the async rollbacks
    // time to settle before run() exits — a `once` listener would be gone by the re-raise and the process would die.
    /* istanbul ignore if */
    if (this.options.registerSignalListeners && this.isRoot()) {
      this.boundSignalHandler = this.signalHandler.bind(this)
      process.on('SIGINT', this.boundSignalHandler).setMaxListeners(0)
    }
  }

  /**
   * Whether this is the root task.
   */
  public isRoot(): boolean {
    return !this.parentTask
  }

  /**
   * Whether this is a subtask of another task list.
   */
  public isSubtask(): boolean {
    return !!this.parentTask
  }

  /**
   * Add tasks to current task list.
   *
   * @see {@link https://listr2.kilic.dev/task/task.html}
   */
  public add(tasks: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]): void {
    this.tasks.push(...this.generate(tasks))
  }

  /**
   * Run the task list.
   *
   * @see {@link https://listr2.kilic.dev/listr/listr.html#run-the-generated-task-list}
   */
  public async run(context?: Ctx): Promise<Ctx> {
    // start the renderer
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions, this.events)
    }

    await this.renderer.render()

    // create a new context
    this.ctx = this.options?.ctx ?? context ?? ({} as Ctx)

    let error: any
    let failed = false

    try {
      // check if the items are enabled
      await Promise.all(this.tasks.map((task) => task.check(this.ctx)))
      // run tasks
      await Promise.all(this.tasks.map((task) => this.concurrency.add(() => this.runTask(task))))
    } catch(err: any) {
      failed = true
      error = err
    }

    // interrupted: let every task this list started settle its rollback before exiting or propagating, regardless of
    // exitOnError/exitAfterRollback — a swallowed failure must still exit, and children must settle before their parent
    if (this.signal.aborted) {
      await Promise.allSettled(this.startedTasks)

      if (this.isRoot()) {
        // cancel anything left unstarted or in progress so the renderer marks the whole tree as interrupted
        this.cancelUnfinishedTasks()

        this.renderer.end()

        this.removeSignalHandler()

        process.exit(127)

        // only reached when process.exit is stubbed, e.g. under test
        return this.ctx
      }

      // sub-Listr: propagate so the parent task only rolls back after all of its children have settled
      throw error ?? new Error('Interrupted.')
    }

    // Do not exit when explicitly set to `false`
    if (failed && this.options.exitOnError !== false) {
      this.renderer.end(error)

      this.removeSignalHandler()

      throw error
    }

    if (!failed) {
      this.renderer.end()

      this.removeSignalHandler()
    }

    return this.ctx
  }

  /**
   * Interrupt the running task list programmatically, as if it received a `SIGINT`.
   *
   * In-flight tasks roll back or are marked as cancelled and the process exits with `127`.
   */
  public cancel(): void {
    this.abortController.abort()
  }

  private generate(
    tasks: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]
  ): Task<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>[] {
    tasks = Array.isArray(tasks) ? tasks : [tasks]

    return tasks.map((task) => {
      let rendererTaskOptions:
        ListrGetRendererTaskOptions<ListrGetRendererClassFromValue<Renderer>> | ListrGetRendererTaskOptions<ListrGetRendererClassFromValue<FallbackRenderer>>

      if (this.rendererSelection === ListrRendererSelection.PRIMARY) {
        rendererTaskOptions = task.rendererOptions
      } else if (this.rendererSelection === ListrRendererSelection.SECONDARY) {
        rendererTaskOptions = task.fallbackRendererOptions
      }

      return new Task<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>(
        this as Listr<Ctx, any, any>,
        task,
        this.options,
        this.rendererClassOptions,
        rendererTaskOptions
      )
    })
  }

  private async runTask(task: Task<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>): Promise<void> {
    if (!(await task.check(this.ctx))) {
      return
    }

    const promise = new TaskWrapper(task).run(this.ctx)

    this.startedTasks.push(promise)

    return promise
  }

  private signalHandler(): void {
    // interrupt the run tree: in-flight leaf tasks reject into their rollback path, then run() exits once settled
    this.abortController.abort()
  }

  private removeSignalHandler(): void {
    if (this.boundSignalHandler) {
      process.removeListener('SIGINT', this.boundSignalHandler)
    }
  }

  private cancelUnfinishedTasks(tasks: Task<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>[] = this.tasks): void {
    for (const task of tasks) {
      if (task.hasSubtasks()) {
        this.cancelUnfinishedTasks(task.subtasks)
      }

      // `!== false` is deliberate: a task interrupted before its check() ran has `enabled === undefined` and should still cancel
      if (task.isEnabled() !== false && !task.hasFinalized()) {
        task.state$ = ListrTaskState.CANCELLED
      }
    }
  }
}
