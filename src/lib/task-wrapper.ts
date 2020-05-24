import { cursorTo } from 'readline'
import through from 'through'

import { stateConstants } from '@constants/state.constants'
import { ListrError, ListrRendererFactory, ListrSubClassOptions, ListrTask, ListrTaskWrapper, StateConstants } from '@interfaces/listr.interface'
import { Task } from '@lib/task'
import { Listr } from '@root/index'
import { createPrompt } from '@utils/prompt'
import { PromptOptionsType, PromptTypes } from '@utils/prompt.interface'

export class TaskWrapper<Ctx, Renderer extends ListrRendererFactory> implements ListrTaskWrapper<Ctx, Renderer> {

  constructor (public task: Task<Ctx, ListrRendererFactory>, public errors: ListrError[]) {}

  set title (title) {
    this.task.title = title

    this.task.next({
      type: 'TITLE',
      data: title
    })
  }

  get title (): string {
    return this.task.title
  }

  set output (data: string) {
    this.task.output = data

    this.task.next({
      type: 'DATA',
      data
    })
  }

  get output (): string {
    return this.task.output
  }

  set state (data: StateConstants) {
    this.task.state = data

    this.task.next({
      type: 'STATE',
      data
    })
  }

  public newListr (task: ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[], options?: ListrSubClassOptions<Ctx, Renderer>): Listr<Ctx, any, any> {
    return new Listr<Ctx, any, any>(task, options)
  }

  public report (error: Error | ListrError): void {
    if (error instanceof ListrError) {
      for (const err of error.errors) {
        this.errors.push(err)
        this.output = err.message || this.task?.title || 'Task with no title.'
      }
    } else {
      this.errors.push(error)
      this.output = error.message || this.task?.title || 'Task with no title.'
    }

  }

  public skip (message: string): void {
    this.state = stateConstants.SKIPPED

    if (message) {
      this.output = message || this.task?.title || 'Task with no title.'
    }
  }

  public async prompt <T = any, P extends PromptTypes = PromptTypes> (type: P, options: PromptOptionsType<P>): Promise<T> {
    this.task.prompt = true

    Object.assign(options, { stdout: this.stdout() })

    return createPrompt.bind(this)(type, options)
  }

  public stdout (): NodeJS.WriteStream & NodeJS.WritableStream {
    let buffer: string[] = []

    return through((chunk: string) => {
      // delete bell icon since it causes some problems
      // eslint-disable-next-line no-control-regex
      const bellIconRegexp = new RegExp(/\u0007/mg)

      chunk.replace(bellIconRegexp, '')

      // eslint-disable-next-line no-control-regex
      const deleteMultiLineRegexp = new RegExp(/\u001b\[([0-9]*)G/mg)

      const regexpIterator = chunk.matchAll(deleteMultiLineRegexp)
      const matchedDeleteMultiLine = [ ...regexpIterator ]
      matchedDeleteMultiLine.forEach((match) => {
        if (match?.[1]) {
          buffer = buffer.slice(-match?.[1])
        }
      })

      chunk.replace(deleteMultiLineRegexp, '')

      buffer = [ ...buffer, chunk ]

      this.output = buffer.join('')

    })
  }

  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
