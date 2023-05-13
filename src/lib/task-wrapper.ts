import type { ListrErrorTypes } from '@constants'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrBaseClassOptions, ListrRendererFactory, ListrSubClassOptions, ListrTask } from '@interfaces'
import { ListrError, PromptError } from '@interfaces'
import type { Task } from '@lib'
import { Listr } from '@root'
import type { PromptCancelOptions, PromptOptions } from '@utils'
import { createPrompt, createWritable, splat } from '@utils'

/**
 * The original Task that is defined by the user is wrapped with the TaskWrapper to provide additional functionality.
 *
 * @see {@link https://listr2.kilic.dev/task/task.html}
 */
export class TaskWrapper<Ctx, Renderer extends ListrRendererFactory> {
  constructor (public task: Task<Ctx, ListrRendererFactory>, private options: ListrBaseClassOptions<Ctx, any, any>) {}

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
    task: ListrTask<NewCtx, Renderer> | ListrTask<NewCtx, Renderer>[] | ((parent: Omit<this, 'skip' | 'enabled'>) => ListrTask<NewCtx, Renderer> | ListrTask<NewCtx, Renderer>[]),
    options?: ListrSubClassOptions<NewCtx, Renderer>
  ): Listr<NewCtx, any, any> {
    let tasks: ListrTask<NewCtx, Renderer> | ListrTask<NewCtx, Renderer>[]

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
  public isRetrying (): Task<Ctx, Renderer>['retry'] {
    return this.task.isRetrying() ? this.task.retry : { count: 0 }
  }

  /**
   * Create a new prompt for getting user input through `enquirer`.
   *
   * - `enquirer` is a optional peer dependency and has to be already installed separately.
   *
   * @see {@link https://listr2.kilic.dev/task/prompt.html}
   */
  public async prompt<T = any>(options: PromptOptions | PromptOptions<true>[]): Promise<T> {
    return createPrompt.bind(this)(options, { ...this.options?.injectWrapper })
  }

  /* istanbul ignore next */
  /**
   * Cancel the current active prompt, if there is any.
   *
   * @see {@link https://listr2.kilic.dev/task/prompt.html}
   */
  public cancelPrompt (options?: PromptCancelOptions): void {
    if (!this.task.prompt || this.task.prompt instanceof PromptError) {
      // If there's no prompt, can't cancel
      return
    }

    if (options?.throw) {
      this.task.prompt.cancel()
    } else {
      this.task.prompt.submit()
    }
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
        this.promptOutput = chunk.toString()

        break

      default:
        this.output = chunk.toString()
      }
    })
  }

  /** Run this task. */
  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
