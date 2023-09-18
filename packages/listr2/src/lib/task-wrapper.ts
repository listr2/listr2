import type { ListrErrorTypes } from '@constants'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrRendererFactory, ListrSubClassOptions, ListrTask } from '@interfaces'
import { ListrError } from '@interfaces'
import type { Task } from '@lib'
import { Listr } from '@root'
import type { ListrPromptAdapter } from '@utils'
import { createWritable, splat } from '@utils'

/**
 * The original Task that is defined by the user is wrapped with the TaskWrapper to provide additional functionality.
 *
 * @see {@link https://listr2.kilic.dev/task/task.html}
 */
export class TaskWrapper<Ctx, Renderer extends ListrRendererFactory, FallbackRenderer extends ListrRendererFactory> {
  constructor (public task: Task<Ctx, Renderer, FallbackRenderer>) {}

  get title (): string {
    return this.task.title
  }

  /**
   * Title of the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/title.html}
   */
  set title (title: string | any[]) {
    title = Array.isArray(title) ? title : [ title ]

    this.task.title$ = splat(title.shift(), ...title)
  }

  get output (): string {
    return this.task.output
  }

  /**
   * Send output from the current task to the renderer.
   *
   * @see {@link https://listr2.kilic.dev/task/output.html}
   */
  set output (output: string | any[]) {
    output = Array.isArray(output) ? output : [ output ]

    this.task.output$ = splat(output.shift(), ...output)
  }

  /** Send an output to the output channel as prompt. */
  private set promptOutput (output: string) {
    this.task.promptOutput$ = output
  }

  /**
   * Creates a new set of Listr subtasks.
   *
   * @see {@link https://listr2.kilic.dev/task/subtasks.html}
   */
  public newListr<NewCtx = Ctx>(
    task:
    | ListrTask<NewCtx, Renderer, FallbackRenderer>
    | ListrTask<NewCtx, Renderer, FallbackRenderer>[]
    | ((parent: Omit<this, 'skip' | 'enabled'>) => ListrTask<NewCtx, Renderer, FallbackRenderer> | ListrTask<NewCtx, Renderer, FallbackRenderer>[]),
    options?: ListrSubClassOptions<NewCtx, Renderer, FallbackRenderer>
  ): Listr<NewCtx, any, any> {
    let tasks: ListrTask<NewCtx, Renderer, FallbackRenderer> | ListrTask<NewCtx, Renderer, FallbackRenderer>[]

    if (typeof task === 'function') {
      tasks = task(this)
    } else {
      tasks = task
    }

    return new Listr<NewCtx, any, any>(tasks, options, this.task)
  }

  /**
   * Report an error that has to be collected and handled.
   *
   * @see {@link https://listr2.kilic.dev/task/error-handling.html}
   */
  public report (error: Error, type: ListrErrorTypes): void {
    if (this.task.options.collectErrors !== false) {
      this.task.listr.errors.push(new ListrError<Ctx>(error, type, this.task))
    }

    this.task.message$ = { error: error.message ?? this.task?.title }
  }

  /**
   * Skip the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/skip.html}
   */
  public skip (message?: string, ...metadata: any[]): void {
    this.task.state$ = ListrTaskState.SKIPPED

    if (message) {
      this.task.message$ = { skip: message ? splat(message, ...metadata) : this.task?.title }
    }
  }

  /**
   * Check whether this task is currently in a retry state.
   *
   * @see {@link https://listr2.kilic.dev/task/retry.html}
   */
  public isRetrying (): Task<Ctx, Renderer, FallbackRenderer>['retry'] {
    return this.task.isRetrying() ? this.task.retry : { count: 0 }
  }

  /**
   * Create a new prompt for getting user input through the prompt adapter.
   * This will create a new prompt through the adapter if the task is not currently rendering a prompt or will return the active instance.
   *
   * This part of the application requires optional peer dependencies, please refer to documentation.
   *
   * @see {@link https://listr2.kilic.dev/task/prompt.html}
   */
  public prompt<T extends ListrPromptAdapter = ListrPromptAdapter>(
    adapter: new (task: Task<Ctx, Renderer, FallbackRenderer>, wrapper: TaskWrapper<Ctx, Renderer, FallbackRenderer>) => T
  ): T {
    if (this.task.prompt) {
      return this.task.prompt as T
    }

    const instance = new adapter(this.task, this)

    this.task.prompt = instance

    this.task.on(ListrTaskEventType.STATE, (state) => {
      if (state === ListrTaskState.PROMPT_COMPLETED || state === ListrTaskState.PROMPT_FAILED) {
        this.task.prompt = undefined
      }
    })

    return this.task.prompt as T
  }

  /**
   * Generates a fake stdout for your use case, where it will be tunnelled through Listr to handle the rendering process.
   *
   * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
   */
  public stdout (type?: ListrTaskEventType.OUTPUT | ListrTaskEventType.PROMPT): NodeJS.WritableStream {
    return createWritable((chunk: string): void => {
      switch (type) {
      case ListrTaskEventType.PROMPT:
        this.promptOutput = chunk

        break

      default:
        this.output = chunk
      }
    })
  }

  /** Run this task. */
  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
