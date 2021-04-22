import { Observable, Subject } from 'rxjs'
import { Readable } from 'stream'

import { TaskWrapper } from './task-wrapper'
import { ListrEventType } from '@constants/event.constants'
import { ListrTaskState } from '@constants/state.constants'
import { ListrError, PromptError } from '@interfaces/listr-error.interface'
import { ListrEvent, ListrOptions, ListrTask, ListrTaskResult } from '@interfaces/listr.interface'
import { ListrGetRendererOptions, ListrGetRendererTaskOptions, ListrRendererFactory } from '@interfaces/renderer.interface'
import { Listr } from '@root/listr'
import { assertFunctionOrSelf } from '@utils/assert'
import { PromptInstance } from '@utils/prompt.interface'
import { getRenderer } from '@utils/renderer'
import { generateUUID } from '@utils/uuid'

/**
 * Create a task from the given set of variables and make it runnable.
 */
export class Task<Ctx, Renderer extends ListrRendererFactory> extends Subject<ListrEvent> {
  /** Unique id per task, randomly generated in the uuid v4 format */
  public id: string
  /** The current state of the task. */
  public state?: string
  /** The task object itself, to further utilize it. */
  public task: (ctx: Ctx, task: TaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
  /** Extend current task with multiple subtasks. */
  public subtasks?: Task<Ctx, any>[]
  /** Title of the task */
  public title?: string
  /** Untouched unchanged title of the task */
  public initialTitle?: string
  /** Output data from the task. */
  public output?: string
  /** Skip current task. */
  public skip: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean> | Promise<string>)
  /** Current retry number of the task if retrying */
  public retry?: { count: number, withError?: any }

  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  public message: {
    /** Run time of the task, if it has been successfully resolved. */
    duration?: number
    /** Error message of the task, if it has been failed. */
    error?: string
    /** Skip message of the task, if it has been skipped. */
    skip?: string
    /** Rollback message of the task, if the rollback finishes */
    rollback?: string
    /** Retry messages */
    retry?: { count: number, withError?: any }
  } = {}
  /** Per task options for the current renderer of the task. */
  public rendererTaskOptions: ListrGetRendererTaskOptions<Renderer>
  /** This will be triggered each time a new render should happen. */
  public renderHook$: Subject<void>

  public prompt: undefined | PromptInstance | PromptError
  public exitOnError!: boolean

  private enabled!: boolean
  private enabledFn: Exclude<ListrTask<Ctx, Renderer>['enabled'], undefined>

  constructor (public listr: Listr<Ctx, any, any>, public tasks: ListrTask<Ctx, any>, public options: ListrOptions, public rendererOptions: ListrGetRendererOptions<Renderer>) {
    super()

    // this kind of randomness is enough for task ids
    this.id = generateUUID()

    this.title = this.tasks?.title
    this.initialTitle = this.tasks?.title

    this.task = this.tasks.task

    // parse functions
    this.skip = this.tasks?.skip || ((): boolean => false)
    this.enabledFn = this.tasks.enabled || ((): boolean => true)

    // task options
    this.rendererTaskOptions = this.tasks.options

    this.renderHook$ = this.listr.renderHook$
    this.subscribe(() => {
      this.renderHook$.next()
    })
  }

  set state$ (state: ListrTaskState) {
    this.state = state

    this.next({
      type: ListrEventType.STATE,
      data: state
    })

    // cancel the subtasks if this has already failed
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks as Task<any, any>[]) {
        if (subtask.state === ListrTaskState.PENDING) {
          subtask.state$ = ListrTaskState.FAILED
        }
      }
    }
  }

  set output$ (data: string | undefined) {
    this.output = data

    this.next({
      type: ListrEventType.DATA,
      data
    })
  }

  set message$ (data: Task<Ctx, Renderer>['message']) {
    this.message = { ...this.message, ...data }

    this.next({
      type: ListrEventType.MESSAGE,
      data
    })
  }

  set title$ (title: string | undefined) {
    this.title = title

    this.next({
      type: ListrEventType.TITLE,
      data: title
    })
  }

  /**
   * A function to check whether this task should run at all via enable.
   */
  async check (ctx: Ctx): Promise<void> {
    // Check if a task is enabled or disabled
    if (this.state === undefined) {
      this.enabled = await assertFunctionOrSelf(this.enabledFn, ctx)

      this.next({
        type: ListrEventType.ENABLED,
        data: this.enabled
      })
    }
  }

  /** Returns whether this task has subtasks. */
  public hasSubtasks (): boolean {
    return this.subtasks ? this.subtasks?.length > 0 : false
  }

  /** Returns whether this task is in progress. */
  public isPending (): boolean {
    return this.state === ListrTaskState.PENDING
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
    if (this.prompt) {
      return true
    } else {
      return false
    }
  }

  /** Run the current task. */
  async run (context: Ctx, wrapper: TaskWrapper<Ctx, Renderer>): Promise<void> {
    const handleResult = (result: any): Promise<any> => {
      if (result instanceof Listr) {
        // Detect the subtask
        // assign options
        result.options = { ...this.options, ...result.options }

        // switch to silent renderer since already rendering
        const rendererClass = getRenderer('silent')
        result.rendererClass = rendererClass.renderer
        result.renderHook$.subscribe((): void => {
          this.renderHook$.next()
        })

        // assign subtasks
        this.subtasks = result.tasks

        this.next({ type: ListrEventType.SUBTASK })

        result = result.run(context)
      } else if (this.isPrompt()) {
        // do nothing, it is already being handled
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
      } else if (result instanceof Observable) {
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
    this.state$ = ListrTaskState.PENDING

    // check if this function wants to be skipped
    const skipped = await assertFunctionOrSelf(this.skip, context)

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
      const retryCount = this.tasks?.retry && this.tasks?.retry > 0 ? this.tasks.retry + 1 : 1
      for (let retries = 1; retries <= retryCount; retries++) {
        try {
          // handle the results
          await handleResult(this.task(context, wrapper))

          break
        } catch (e) {
          if (retries !== retryCount) {
            this.retry = { count: retries, withError: e }
            this.message$ = { retry: this.retry }
            this.title$ = this.initialTitle
            this.output$ = undefined

            wrapper.report(e)

            this.state$ = ListrTaskState.RETRY
          } else {
            throw e
          }
        }
      }

      if (this.isPending() || this.isRetrying()) {
        this.message$ = { duration: Date.now() - startTime }
        this.state$ = ListrTaskState.COMPLETED
      }
    } catch (error) {
      // catch prompt error, this was the best i could do without going crazy
      if (this.prompt instanceof PromptError) {
        // eslint-disable-next-line no-ex-assign
        error = new Error(this.prompt.message)
      }

      // execute the task on error function
      if (this.tasks?.rollback) {
        wrapper.report(error)

        try {
          this.state$ = ListrTaskState.ROLLING_BACK

          await this.tasks.rollback(context, wrapper)

          this.state$ = ListrTaskState.ROLLED_BACK

          this.message$ = { rollback: this.title }
        } catch (err) {
          this.state$ = ListrTaskState.FAILED

          wrapper.report(err)

          throw error
        }

        if (this.listr.options?.exitAfterRollback !== false) {
          // Do not exit when explicitly set to `false`
          throw new Error(this.title ?? 'task with no title')
        }
      } else {
        /* istanbul ignore if */
        if (error instanceof ListrError) {
          return
        }

        // mark task as failed
        this.state$ = ListrTaskState.FAILED

        // report error
        wrapper.report(error)

        if (this.listr.options.exitOnError !== false && await assertFunctionOrSelf(this.tasks?.exitOnError, context) !== false) {
          // Do not exit when explicitly set to `false`
          throw error
        }
      }
    } finally {
      // Mark the observable as completed
      this.complete()
    }
  }
}
