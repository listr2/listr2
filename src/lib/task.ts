import {
  ListrContext,
  ListrError,
  ListrEvent,
  ListrGetRendererOptions,
  ListrGetRendererTaskOptions,
  ListrOptions,
  ListrRendererFactory,
  ListrTask,
  ListrTaskObject,
  ListrTaskWrapper,
  PromptError,
  StateConstants
} from '@interfaces/listr.interface'
import { stateConstants } from '@interfaces/state.constants'
import { Listr } from '@root/index'
import { PromptInstance } from '@utils/prompt.interface'
import { getRenderer } from '@utils/renderer'
import { generateUUID } from '@utils/uuid'
import { Observable, Subject } from 'rxjs'
import { Readable } from 'stream'

export class Task<Ctx, Renderer extends ListrRendererFactory> extends Subject<ListrEvent> implements ListrTaskObject<ListrContext, Renderer> {
  public id: ListrTaskObject<Ctx, Renderer>['id']
  public task: ListrTaskObject<Ctx, Renderer>['task']
  public skip: ListrTaskObject<Ctx, Renderer>['skip']
  public subtasks: ListrTaskObject<Ctx, any>['subtasks']
  public state: ListrTaskObject<Ctx, Renderer>['state']
  public output: ListrTaskObject<Ctx, Renderer>['output']
  public title: ListrTaskObject<Ctx, Renderer>['title']
  public message: ListrTaskObject<Ctx, Renderer>['message'] = {}
  public prompt: undefined | PromptInstance | PromptError
  public exitOnError: boolean
  public rendererTaskOptions: ListrGetRendererTaskOptions<Renderer>
  public renderHook$: Subject<void>
  private enabled: boolean
  private enabledFn: ListrTask<Ctx, Renderer>['enabled']

  constructor(public listr: Listr<Ctx, any, any>, public tasks: ListrTask<Ctx, any>, public options: ListrOptions, public rendererOptions: ListrGetRendererOptions<Renderer>) {
    super()

    // this kind of randomness is enough for task ids
    this.id = generateUUID()

    this.title = this.tasks?.title

    this.task = this.tasks.task
    // parse functions
    this.skip = this.tasks?.skip || ((): boolean => false)
    this.enabledFn = this.tasks?.enabled || ((): boolean => true)
    // task options
    this.rendererTaskOptions = this.tasks.options

    this.renderHook$ = this.listr.renderHook$
    this.subscribe(() => {
      this.renderHook$.next()
    })
  }

  set state$(state: StateConstants) {
    this.state = state

    this.next({
      type: 'STATE',
      data: state
    })

    // cancel the subtasks if this has already failed
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks as Task<any, any>[]) {
        if (subtask.state === stateConstants.PENDING) {
          subtask.state$ = stateConstants.FAILED
        }
      }
    }
  }

  set output$(data: string) {
    this.output = data

    this.next({
      type: 'DATA',
      data
    })
  }

  set message$(data: ListrTaskObject<Ctx, Renderer>['message']) {
    this.message = { ...this.message, ...data }

    this.next({
      type: 'MESSAGE',
      data
    })
  }

  set title$(title: string) {
    this.title = title

    this.next({
      type: 'TITLE',
      data: title
    })
  }

  async check(ctx: Ctx): Promise<void> {
    // Check if a task is enabled or disabled
    if (this.state === undefined) {
      if (typeof this.enabledFn === 'function') {
        this.enabled = await this.enabledFn(ctx)
      } else {
        this.enabled = this.enabledFn
      }

      this.next({
        type: 'ENABLED',
        data: this.enabled
      })
    }
  }

  hasSubtasks(): boolean {
    return this.subtasks?.length > 0
  }

  isPending(): boolean {
    return this.state === stateConstants.PENDING
  }

  isSkipped(): boolean {
    return this.state === stateConstants.SKIPPED
  }

  isCompleted(): boolean {
    return this.state === stateConstants.COMPLETED
  }

  hasFailed(): boolean {
    return this.state === stateConstants.FAILED
  }

  isEnabled(): boolean {
    return this.enabled
  }

  hasTitle(): boolean {
    return typeof this?.title === 'string'
  }

  isPrompt(): boolean {
    if (this.prompt) {
      return true
    } else {
      return false
    }
  }

  async run(context: Ctx, wrapper: ListrTaskWrapper<Ctx, Renderer>): Promise<void> {
    const handleResult = (result): Promise<any> => {
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

        this.next({ type: 'SUBTASK' })

        result = result.run(context)

        // eslint-disable-next-line no-empty
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
          result.on('end', () => resolve())
        })
      } else if (result instanceof Observable) {
        // Detect Observable
        result = new Promise((resolve, reject) => {
          result.subscribe({
            next: (data) => {
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
    // Promise.resolve()
    this.state$ = stateConstants.PENDING

    // check if this function wants to be skipped
    let skipped: boolean | string
    if (typeof this.skip === 'function') {
      skipped = await this.skip(context)
    }

    if (skipped) {
      if (typeof skipped === 'string') {
        this.message$ = { skip: skipped }
      } else if (this.hasTitle()) {
        this.message$ = { skip: this.title }
      } else {
        this.message$ = { skip: 'Skipped task without a title.' }
      }

      this.state$ = stateConstants.SKIPPED
      return
    }

    try {
      // handle the results
      await handleResult(this.task(context, wrapper))

      if (this.isPending()) {
        this.message$ = { duration: Date.now() - startTime }
        this.state$ = stateConstants.COMPLETED
      }
    } catch (error) {
      // mark task as failed
      this.state$ = stateConstants.FAILED

      // catch prompt error, this was the best i could do without going crazy
      if (this.prompt instanceof PromptError) {
        // eslint-disable-next-line no-ex-assign
        error = new Error(this.prompt.message)
      }

      // report error
      if (error instanceof ListrError) {
        wrapper.report(error)
        return
      }

      wrapper.report(error)

      // Do not exit when explicitely set to `false`
      if (this.listr.options.exitOnError !== false) {
        throw error
      }
    } finally {
      // Mark the observable as completed
      this.complete()
    }
  }
}
