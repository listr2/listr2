import through from 'through'

import { stateConstants } from '../constants/state.constants'
import { ListrError, ListrOptions, ListrTask, ListrTaskWrapper, StateConstants } from '../interfaces/listr.interface'
import { Listr } from '../listr'
import { createPrompt } from '../utils/prompt'
import { PromptOptionsType, PromptTypes } from '../utils/prompt.interface'
import { Task } from './task'

export class TaskWrapper<Ctx> implements ListrTaskWrapper {

  constructor (public task: Task<Ctx>, public errors: ListrError[]) {}

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

  public newListr<Ctx> (task: ListrTask<Ctx>[], options?: ListrOptions): Listr<Ctx> {
    return new Listr<Ctx>(task, options)
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

  public prompt <T = any, P extends PromptTypes = PromptTypes> (type: P, options: PromptOptionsType<P>): Promise<T> {
    this.task.prompt = true

    let buffer = Buffer.alloc(64)

    const outputStream = through((data) => {
      buffer += data

      // eslint-disable-next-line no-control-regex
      const deleteMultiLineRegexp = new RegExp(/.*(\u001b\[[0-9]*G|\u0007).*/m)

      if (deleteMultiLineRegexp.test(buffer.toString())) {
        buffer = Buffer.alloc(64)
      } else {
        this.output = buffer.toString()
      }
    })

    Object.assign(options, { stdout: outputStream })

    return createPrompt<P>(type, options)
  }

  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
