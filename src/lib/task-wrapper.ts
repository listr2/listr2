/* eslint-disable no-control-regex */
import through from 'through'

import {
  ListrError,
  ListrRendererFactory,
  ListrSubClassOptions,
  ListrTask,
  ListrTaskWrapper,
  StateConstants,
  ListrBaseClassOptions,
  ListrTaskObject
} from '@interfaces/listr.interface'
import { stateConstants } from '@interfaces/state.constants'
import { Task } from '@lib/task'
import { Listr } from '@root/index'
import { createPrompt } from '@utils/prompt'
import { PromptOptions } from '@utils/prompt.interface'

export class TaskWrapper<Ctx, Renderer extends ListrRendererFactory> implements ListrTaskWrapper<Ctx, Renderer> {
  constructor (public task: Task<Ctx, ListrRendererFactory>, public errors: ListrError[], private options: ListrBaseClassOptions<Ctx, any, any>) {}

  set title (data: string) {
    this.task.title$ = data
  }

  /* istanbul ignore next */
  get title (): string {
    return this.task.title
  }

  set output (data: string) {
    this.task.output$ = data
  }

  /* istanbul ignore next */
  get output (): string {
    return this.task.output
  }

  set state (data: StateConstants) {
    this.task.state$ = data
  }

  set message (data: ListrTaskObject<Ctx, Renderer>['message']) {
    this.task.message$ = data
  }

  public newListr (
    task: ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[] | ((parent: this) => ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[]),
    options?: ListrSubClassOptions<Ctx, Renderer>
  ): Listr<Ctx, any, any> {
    let tasks: ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[]

    if (typeof task === 'function') {
      tasks = task(this)
    } else {
      tasks = task
    }

    return new Listr<Ctx, any, any>(tasks, options)
  }

  public report (error: Error | ListrError): void {
    /* istanbul ignore if */
    if (error instanceof ListrError) {
      for (const err of error.errors) {
        this.errors.push(err)
        this.message = { error: err.message || this.task?.title || 'Task with no title.' }
      }
    } else {
      this.errors.push(error)
      this.message = { error: error.message || this.task?.title || 'Task with no title.' }
    }
  }

  public skip (message?: string): void {
    this.state = stateConstants.SKIPPED

    if (message) {
      this.message = { skip: message || this.task?.title || 'Task with no title.' }
    }
  }

  public async prompt<T = any>(options: PromptOptions | PromptOptions<true>[]): Promise<T> {
    return createPrompt.bind(this)(options, { ...this.options?.injectWrapper })
  }

  public stdout (): NodeJS.WriteStream & NodeJS.WritableStream {
    return through((chunk: string) => {
      const pattern = new RegExp('(?:\\u001b|\\u009b)\\[[\\=><~/#&.:=?%@~_-]*[0-9]*[\\a-ln-tqyz=><~/#&.:=?%@~_-]+', 'gmi')

      chunk = chunk.toString()

      chunk = chunk.replace(pattern, '')
      chunk = chunk.replace(new RegExp(/\u0007/, 'gmi'), '')
      if (chunk !== '') {
        this.output = chunk
      }
    })
  }

  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
