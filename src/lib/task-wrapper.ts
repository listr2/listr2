import { Writable } from 'stream'

import { ListrTaskEventType } from '@constants'
import { ListrTaskState } from '@constants/state.constants'
import type { ListrErrorTypes } from '@interfaces/listr-error.interface'
import { ListrError } from '@interfaces/listr-error.interface'
import type { ListrBaseClassOptions, ListrSubClassOptions } from '@interfaces/listr.interface'
import type { ListrRendererFactory } from '@interfaces/renderer.interface'
import type { ListrTask } from '@interfaces/task.interface'
import type { Task } from '@lib/task'
import { Listr } from '@root/listr'
import type { PromptCancelOptions, PromptOptions } from '@utils'
import { createPrompt, destroyPrompt, splat } from '@utils'

/**
 * Extend the task to have more functionality while accessing from the outside.
 */
export class TaskWrapper<Ctx, Renderer extends ListrRendererFactory> {
  private errors: ListrError<Ctx>[]

  constructor (public task: Task<Ctx, ListrRendererFactory>, private options: ListrBaseClassOptions<Ctx, any, any>) {
    this.errors = task.listr.errors
  }

  /** Get the title of the current task. */
  get title (): string {
    return this.task.title
  }

  /** Change the title of the current task. */
  set title (title: string | string[]) {
    title = Array.isArray(title) ? title : [ title ]

    this.task.title$ = splat(title.shift(), ...title)
  }

  /** Get the output from the output channel. */
  get output (): string {
    return this.task.output
  }

  /** Send a output to the output channel. */
  set output (output: string | string[]) {
    output = Array.isArray(output) ? output : [ output ]

    this.task.output$ = splat(output.shift(), ...output)
  }

  /** Send a output to the output channel. */
  private set promptOutput (output: string) {
    this.task.promptOutput$ = output
  }

  /** Create a new subtask with given renderer selection from the parent task. */
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

  /** Report a error in process for error collection. */
  public report (error: Error, type: ListrErrorTypes): void {
    if (this.task.options.collectErrors !== false) {
      this.errors.push(new ListrError<Ctx>(error, type, this.task))
    }

    this.task.message$ = { error: error.message ?? this.task?.title }
  }

  /** Skip current task. */
  public skip (message?: string, ...metadata: any[]): void {
    this.task.state$ = ListrTaskState.SKIPPED

    if (message) {
      this.task.message$ = { skip: message ? splat(message, ...metadata) : this.task?.title }
    }
  }

  /** Get the number of retrying, else returns false */
  public isRetrying (): Task<Ctx, Renderer>['retry'] {
    return this.task.isRetrying() ? this.task.retry : { count: 0 }
  }

  /**
   * Create a new Enquirer prompt using prompt options.
   *
   * Since process.stdout is controlled by Listr, this will passthrough all Enquirer data through internal stdout.
   */
  public async prompt<T = any>(options: PromptOptions | PromptOptions<true>[]): Promise<T> {
    return createPrompt.bind(this)(options, { ...this.options?.injectWrapper })
  }

  /** Cancels the current prompt attach to this task. */
  public cancelPrompt (options?: PromptCancelOptions): void {
    return destroyPrompt.bind(this)(options)
  }

  /**
   * Pass stream of data to internal stdout.
   *
   * Since Listr2 takes control of process.stdout utilizing the default renderer, any data outputted to process.stdout
   * will corrupt its looks.
   *
   * This returns a fake stream to pass any stream inside Listr as task data.
   */
  public stdout (type?: ListrTaskEventType.OUTPUT | ListrTaskEventType.PROMPT): NodeJS.WritableStream {
    const writable = new Writable()

    writable.write = (chunk: Buffer | string): boolean => {
      switch (type) {
      case ListrTaskEventType.PROMPT:
        this.promptOutput = chunk.toString()

        break

      default:
        this.output = chunk.toString()
      }

      return true
    }

    return writable
  }

  /** Run this task. */
  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
