import { randomUUID } from 'crypto'

import { ListrTaskEventManager } from './listr-task-event-manager'
import type { TaskWrapper } from './task-wrapper'
import { ListrErrorTypes, ListrEventType, ListrTaskEventType, ListrTaskState } from '@constants'
import type {
  ListrGetRendererOptions,
  ListrGetRendererTaskOptions,
  ListrOptions,
  ListrRendererFactory,
  ListrTask,
  ListrTaskFn,
  ListrTaskMessage,
  ListrTaskPrompt,
  ListrTaskRetry
} from '@interfaces'
import { PromptError } from '@interfaces'
import { Listr } from '@root'
import { assertFunctionOrSelf, cleanseAnsi, delay, getRendererClass, isObservable, isReadable, splat } from '@utils'

/**
 * Creates and handles a runnable instance of the Task.
 */
export class Task<
  Ctx,
  Renderer extends ListrRendererFactory = ListrRendererFactory,
  FallbackRenderer extends ListrRendererFactory = ListrRendererFactory
> extends ListrTaskEventManager {
  /** Unique id per task, can be used for identifying a Task. */
  public id: string = randomUUID()
  /** The current state of the task. */
  public state: ListrTaskState = ListrTaskState.WAITING
  /** Subtasks of the current task. */
  public subtasks: Task<Ctx, Renderer, FallbackRenderer>[]
  /** Title of the task. */
  public title?: string
  /** Initial/Untouched version of the title for using whenever task has a reset. */
  public readonly initialTitle?: string
  /** Output channel for the task. */
  public output?: string
  /** Current state of the retry process whenever the task is retrying. */
  public retry?: ListrTaskRetry
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  public message: ListrTaskMessage = {}
  /** Current prompt instance or prompt error whenever the task is prompting. */
  public prompt: ListrTaskPrompt
  /** Parent task of the current task. */
  public parent?: Task<Ctx, any, any>

  /** Enable flag of this task. */
  private enabled: boolean
  /** User provided Task callback function to run. */
  private taskFn: ListrTaskFn<Ctx, Renderer, FallbackRenderer>
  /** Marks the task as closed. This is different from finalized since this is not really related to task itself. */
  private closed: boolean

  constructor (
    public listr: Listr<Ctx, Renderer, FallbackRenderer>,
    public task: ListrTask<Ctx, Renderer, FallbackRenderer>,
    public options: ListrOptions,
    public rendererOptions: ListrGetRendererOptions<Renderer> | ListrGetRendererOptions<FallbackRenderer>,
    /** Per-task options for the current renderer of the task. */
    public rendererTaskOptions: ListrGetRendererTaskOptions<Renderer> | ListrGetRendererTaskOptions<FallbackRenderer>
  ) {
    super()

    if (task.title) {
      const title = Array.isArray(task?.title) ? task.title : [ task.title ]

      this.title = splat(title.shift(), ...title)
      this.initialTitle = this.title
    }

    this.taskFn = task.task
    this.parent = listr.parentTask
  }

  /**
   * Update the current state of the Task and emit the neccassary events.
   */
  set state$ (state: ListrTaskState) {
    this.state = state

    this.emit(ListrTaskEventType.STATE, state)

    // cancel the subtasks if this has already failed
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks as Task<any, any, any>[]) {
        if (subtask.state === ListrTaskState.STARTED) {
          subtask.state$ = ListrTaskState.FAILED
        }
      }
    }

    this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
  }

  /**
   * Update the current output of the Task and emit the neccassary events.
   */
  set output$ (data: string) {
    this.output = data

    this.emit(ListrTaskEventType.OUTPUT, data)
    this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
  }

  /**
   * Update the current prompt output of the Task and emit the neccassary events.
   */
  set promptOutput$ (data: string) {
    this.emit(ListrTaskEventType.PROMPT, data)

    // this acts weird without cleansing the output!, have no idea why
    // it produces double output when a prompt is canceled
    if (cleanseAnsi(data)) {
      this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
    }
  }

  /**
   * Update or extend the current message of the Task and emit the neccassary events.
   */
  set message$ (data: Task<Ctx, Renderer, FallbackRenderer>['message']) {
    this.message = { ...this.message, ...data }

    this.emit(ListrTaskEventType.MESSAGE, data)
    this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
  }

  /**
   * Update the current title of the Task and emit the neccassary events.
   */
  set title$ (title: string) {
    this.title = title

    this.emit(ListrTaskEventType.TITLE, title)
    this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
  }

  /**
   * Current task path in the hierarchy.
   */
  get path (): string[] {
    return [ ...this.listr.path, this.initialTitle ]
  }

  /**
   * Checks whether the current task with the given context should be set as enabled.
   */
  public async check (ctx: Ctx): Promise<boolean> {
    // Check if a task is enabled or disabled
    if (this.state === ListrTaskState.WAITING) {
      this.enabled = await assertFunctionOrSelf(this.task?.enabled ?? true, ctx)

      this.emit(ListrTaskEventType.ENABLED, this.enabled)
      this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
    }

    return this.enabled
  }

  /** Returns whether this task has subtasks. */
  public hasSubtasks (): boolean {
    return this.subtasks?.length > 0
  }

  /** Returns whether this task is finalized in someform. */
  public hasFinalized (): boolean {
    return this.isCompleted() || this.hasFailed() || this.isSkipped() || this.hasRolledBack()
  }

  /** Returns whether this task is in progress. */
  public isPending (): boolean {
    return this.isStarted() || this.isPrompt() || this.hasReset()
  }

  /** Returns whether this task has started. */
  public isStarted (): boolean {
    return this.state === ListrTaskState.STARTED
  }

  /** Returns whether this task is skipped. */
  public isSkipped (): boolean {
    return this.state === ListrTaskState.SKIPPED
  }

  /** Returns whether this task has been completed. */
  public isCompleted (): boolean {
    return this.state === ListrTaskState.COMPLETED
  }

  /** Returns whether this task has been failed. */
  public hasFailed (): boolean {
    return this.state === ListrTaskState.FAILED
  }

  /** Returns whether this task has an active rollback task going on. */
  public isRollingBack (): boolean {
    return this.state === ListrTaskState.ROLLING_BACK
  }

  /** Returns whether the rollback action was successful. */
  public hasRolledBack (): boolean {
    return this.state === ListrTaskState.ROLLED_BACK
  }

  /** Returns whether this task has an actively retrying task going on. */
  public isRetrying (): boolean {
    return this.state === ListrTaskState.RETRY
  }

  /** Returns whether this task has some kind of reset like retry and rollback going on. */
  public hasReset (): boolean {
    return this.state === ListrTaskState.RETRY || this.state === ListrTaskState.ROLLING_BACK
  }

  /** Returns whether enabled function resolves to true. */
  public isEnabled (): boolean {
    return this.enabled
  }

  /** Returns whether this task actually has a title. */
  public hasTitle (): boolean {
    return typeof this?.title === 'string'
  }

  /** Returns whether this task has a prompt inside. */
  public isPrompt (): boolean {
    return this.state === ListrTaskState.PROMPT || this.state === ListrTaskState.PROMPT_COMPLETED
  }

  /** Returns whether this task is currently paused. */
  public isPaused (): boolean {
    return this.state === ListrTaskState.PAUSED
  }

  /** Returns whether this task is closed. */
  public isClosed (): boolean {
    return this.closed
  }

  /** Pause the given task for certain time. */
  public async pause (time: number): Promise<void> {
    const state = this.state

    this.state$ = ListrTaskState.PAUSED
    this.message$ = {
      paused: Date.now() + time
    }
    await delay(time)
    this.state$ = state
    this.message$ = {
      paused: null
    }
  }

  /** Run the current task. */
  public async run (context: Ctx, wrapper: TaskWrapper<Ctx, Renderer, FallbackRenderer>): Promise<void> {
    const handleResult = (result: any): Promise<any> => {
      if (result instanceof Listr) {
        // Detect the subtask
        // assign options
        result.options = { ...this.options, ...result.options }

        // switch to silent renderer since already rendering
        result.rendererClass = getRendererClass('silent')

        // assign subtasks
        this.subtasks = result.tasks

        result.errors = this.listr.errors

        this.emit(ListrTaskEventType.SUBTASK, this.subtasks)

        result = result.run(context)
      } else if (result instanceof Promise) {
        // Detect promise
        result = result.then(handleResult)
      } else if (isReadable(result)) {
        // Detect stream
        result = new Promise((resolve, reject) => {
          result.on('data', (data: Buffer) => {
            this.output$ = data.toString()
          })
          result.on('error', (error: Error) => reject(error))
          result.on('end', () => resolve(null))
        })
      } else if (isObservable(result)) {
        // Detect Observable
        result = new Promise((resolve, reject) => {
          result.subscribe({
            next: (data: string) => {
              this.output$ = data
            },
            error: reject,
            complete: resolve
          })
        })
      }

      return result
    }

    const startTime = Date.now()

    // finish the task first
    this.state$ = ListrTaskState.STARTED

    // check if this function wants to be skipped
    const skipped = await assertFunctionOrSelf(this.task?.skip ?? false, context)

    if (skipped) {
      if (typeof skipped === 'string') {
        this.message$ = { skip: skipped }
      } else if (this.hasTitle()) {
        this.message$ = { skip: this.title }
      } else {
        this.message$ = { skip: 'Skipped task without a title.' }
      }

      this.state$ = ListrTaskState.SKIPPED

      return
    }

    try {
      // add retry functionality
      const retryCount =
        typeof this.task?.retry === 'number' && this.task.retry > 0
          ? this.task.retry + 1
          : typeof this.task?.retry === 'object' && this.task.retry.tries > 0
            ? this.task.retry.tries + 1
            : 1
      const retryDelay = typeof this.task.retry === 'object' && this.task.retry.delay

      for (let retries = 1; retries <= retryCount; retries++) {
        try {
          // handle the results
          await handleResult(this.taskFn(context, wrapper))

          break
        } catch (err: any) {
          if (retries !== retryCount) {
            this.retry = { count: retries, error: err }
            this.message$ = { retry: this.retry }
            this.title$ = this.initialTitle
            this.output = undefined

            wrapper.report(err, ListrErrorTypes.WILL_RETRY)

            this.state$ = ListrTaskState.RETRY

            if (retryDelay) {
              await this.pause(retryDelay)
            }
          } else {
            throw err
          }
        }
      }

      if (this.isStarted() || this.isRetrying()) {
        this.message$ = { duration: Date.now() - startTime }
        this.state$ = ListrTaskState.COMPLETED
      }
    } catch (error: any) {
      // catch prompt error, this was the best i could do without going crazy
      if (this.prompt instanceof PromptError) {
        // eslint-disable-next-line no-ex-assign
        error = this.prompt
      }

      // execute the task on error function
      if (this.task?.rollback) {
        wrapper.report(error, ListrErrorTypes.WILL_ROLLBACK)

        try {
          this.state$ = ListrTaskState.ROLLING_BACK

          await this.task.rollback(context, wrapper)

          this.message$ = { rollback: this.title }

          this.state$ = ListrTaskState.ROLLED_BACK
        } catch (err: any) {
          this.state$ = ListrTaskState.FAILED

          wrapper.report(err, ListrErrorTypes.HAS_FAILED_TO_ROLLBACK)

          this.close()
          throw err
        }

        if (this.listr.options?.exitAfterRollback !== false) {
          // Do not exit when explicitly set to `false`
          this.close()
          throw error
        }
      } else {
        // mark task as failed
        this.state$ = ListrTaskState.FAILED

        if (this.listr.options.exitOnError !== false && await assertFunctionOrSelf(this.task?.exitOnError, context) !== false) {
          // Do not exit when explicitly set to `false`
          // report error
          wrapper.report(error, ListrErrorTypes.HAS_FAILED)

          this.close()
          throw error
        } else if (!this.hasSubtasks()) {
          // subtasks will handle and report their own errors
          wrapper.report(error, ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR)
        }
      }
    } finally {
      this.close()
    }
  }

  private close (): void {
    this.emit(ListrTaskEventType.CLOSED)
    this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
    this.complete()
  }
}
