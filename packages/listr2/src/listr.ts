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
  public errors: ListrError<Ctx>[] = []
  public ctx: Ctx
  public events: ListrEventManager
  public path: string[] = []
  public rendererClass: ListrRendererFactory
  public rendererClassOptions: ListrGetRendererOptions<ListrGetRendererClassFromValue<Renderer> | ListrGetRendererClassFromValue<FallbackRenderer>>
  public rendererSelection: ListrRendererSelection
  public boundSignalHandler: () => void

  private concurrency: Concurrency
  private renderer: ListrRenderer

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
    }

    if (this.parentTask?.listr.events instanceof ListrEventManager) {
      this.events = this.parentTask.listr.events
    } else {
      this.events = new ListrEventManager()
    }

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

    // Graceful interrupt for render cleanup
    /* istanbul ignore if */
    if (this.options.registerSignalListeners) {
      this.boundSignalHandler = this.signalHandler.bind(this)
      process.once('SIGINT', this.boundSignalHandler).setMaxListeners(0)
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

    // check if the items are enabled
    await Promise.all(this.tasks.map((task) => task.check(this.ctx)))

    // run tasks
    try {
      await Promise.all(this.tasks.map((task) => this.concurrency.add(() => this.runTask(task))))

      this.renderer.end()

      this.removeSignalHandler()
    } catch(err: any) {
      if (this.options.exitOnError !== false) {
        this.renderer.end(err)

        this.removeSignalHandler()

        // Do not exit when explicitly set to `false`
        throw err
      }
    }

    return this.ctx
  }

  private generate(
    tasks: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]
  ): Task<Ctx, ListrGetRendererClassFromValue<Renderer>, ListrGetRendererClassFromValue<FallbackRenderer>>[] {
    tasks = Array.isArray(tasks) ? tasks : [tasks]

    return tasks.map((task) => {
      let rendererTaskOptions:
        | ListrGetRendererTaskOptions<ListrGetRendererClassFromValue<Renderer>>
        | ListrGetRendererTaskOptions<ListrGetRendererClassFromValue<FallbackRenderer>>

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

    return new TaskWrapper(task).run(this.ctx)
  }

  private signalHandler(): void {
    this.tasks?.forEach(async(task) => {
      if (task.isPending()) {
        task.state$ = ListrTaskState.FAILED
      }
    })

    // only the parent task shall exit
    if (this.isRoot()) {
      this.renderer?.end(new Error('Interrupted.'))

      process.exit(127)
    }
  }

  private removeSignalHandler(): void {
    if (this.boundSignalHandler) {
      process.removeListener('SIGINT', this.boundSignalHandler)
    }
  }
}
