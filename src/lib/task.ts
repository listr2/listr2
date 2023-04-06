import { randomUUID } from 'crypto'
import { Readable } from 'stream'

import { ListrTaskEventManager } from './listr-task-event-manager'
import type { TaskWrapper } from './task-wrapper'
import { ListrEventType, ListrTaskEventType, ListrTaskState } from '@constants'
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
import { PromptError, ListrErrorTypes } from '@interfaces'
import { Listr } from '@root'
import { assertFunctionOrSelf, cleanseAnsi, delay, getRendererClass, isObservable } from '@utils'

/**
 * Create a task from the given set of variables and make it runnable.
 */
export class Task<Ctx, Renderer extends ListrRendererFactory> extends ListrTaskEventManager {
  /** Unique id per task, randomly generated in the uuid v4 format */
  public id: string = randomUUID()
  /** The current state of the task. */
  public state: ListrTaskState = ListrTaskState.WAITING
  /** Extend current task with multiple subtasks. */
  public subtasks: Task<Ctx, Renderer>[]
  /** Title of the task */
  public title?: string
  /** Untouched unchanged title of the task */
  public readonly initialTitle?: string
  /** Output data from the task. */
  public output?: string
  /** Current retry number of the task if retrying */
  public retry?: ListrTaskRetry
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  public message: ListrTaskMessage = {}
  /** Per task options for the current renderer of the task. */
  public rendererTaskOptions: ListrGetRendererTaskOptions<Renderer>
  /** This will be triggered each time a new render should happen. */
  public prompt: ListrTaskPrompt
  public parent?: Task<Ctx, Renderer>

  private enabled: boolean
  /** The task object itself, to further utilize it. */
  private taskFn: ListrTaskFn<Ctx, Renderer>

  constructor (public listr: Listr<Ctx, any, any>, public task: ListrTask<Ctx, any>, public options: ListrOptions, public rendererOptions: ListrGetRendererOptions<Renderer>) {
    super()

    this.title = this.task?.title
    this.initialTitle = this.task?.title

    this.taskFn = this.task.task
    this.parent = this.listr.parentTask

    // task options
    this.rendererTaskOptions = this.task.options
  }

  set state$ (state: ListrTaskState) {
    this.state = state

    this.emit(ListrTaskEventType.STATE, state)

    // cancel the subtasks if this has already failed
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks as Task<any, any>[]) {
        if (subtask.state === ListrTaskState.STARTED) {
          subtask.state$ = ListrTaskState.FAILED
        }
      }
    }

    this.emitShouldRefreshRender()
  }

  set output$ (data: string) {
    this.output = data

    this.emit(ListrTaskEventType.OUTPUT, data)
    this.emitShouldRefreshRender()
  }

  set promptOutput$ (data: string) {
    this.emit(ListrTaskEventType.PROMPT, data)

    // this acts wierd without cleansing the output!, have no idea why
    // it produces double output when a prompt is canceled
    if (cleanseAnsi(data)) {
      this.emitShouldRefreshRender()
    }
  }

  set message$ (data: Task<Ctx, Renderer>['message']) {
    this.message = { ...this.message, ...data }

    this.emit(ListrTaskEventType.MESSAGE, data)
    this.emitShouldRefreshRender()
  }

  set title$ (title: string) {
    this.title = title

    this.emit(ListrTaskEventType.TITLE, title)
    this.emitShouldRefreshRender()
  }

  get path (): string[] {
    return [ ...this.listr.path, this.task.title ]
  }

  /**
   * A function to check whether this task should run at all via enable.
   */
  public async check (ctx: Ctx): Promise<boolean> {
    // Check if a task is enabled or disabled
    if (this.state === ListrTaskState.WAITING) {
      this.enabled = await assertFunctionOrSelf(this.task?.enabled ?? true, ctx)

      this.emit(ListrTaskEventType.ENABLED, this.enabled)
      this.emitShouldRefreshRender()
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

  public isPending (): boolean {
    return this.isStarted() || this.isPrompt() || this.hasReset()
  }

  /** Returns whether this task is in progress. */
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
  public async run (context: Ctx, wrapper: TaskWrapper<Ctx, Renderer>): Promise<void> {
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
      } else if (result instanceof Readable) {
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

          throw err
        }

        if (this.listr.options?.exitAfterRollback !== false) {
          // Do not exit when explicitly set to `false`
          throw new Error(this.title)
        }
      } else {
        // mark task as failed
        this.state$ = ListrTaskState.FAILED

        if (this.listr.options.exitOnError !== false && await assertFunctionOrSelf(this.task?.exitOnError, context) !== false) {
          // Do not exit when explicitly set to `false`
          // report error
          wrapper.report(error, ListrErrorTypes.HAS_FAILED)

          throw error
        } else if (!this.hasSubtasks()) {
          // subtasks will handle and report their own errors
          wrapper.report(error, ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR)
        }
      }
    } finally {
      this.complete()
    }
  }

  public emitShouldRefreshRender (): void {
    this.listr.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)
  }
}
