import through from 'through'

import { stateConstants } from '../constants/state.constants'
import { ListrTaskWrapper, StateConstants, ListrTask, ListrOptions, ListrError } from '../interfaces/listr.interface'
import { Listr } from '../listr'
import { createPrompt } from '../utils/prompt'
import { PromptOptions } from '../utils/prompt.interface'
import { PromptTypes } from './../utils/prompt.interface'
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

  set output (data) {
    this.task.output = data

    this.task.next({
      type: 'DATA',
      data
    })
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

  public prompt (type: PromptTypes, prompt: PromptOptions): Promise<any> {
    this.task.prompt = true

    let buffer = Buffer.alloc(64)

    const outputStream = through((data) => {
      buffer += data

      // eslint-disable-next-line no-control-regex
      const deleteMultiLineRegexp = new RegExp(/.*\u001b\[.*G.*/)

      if (deleteMultiLineRegexp.test(buffer.toString())) {
        buffer = Buffer.alloc(64)
      } else {
        this.output = buffer
      }
    })

    Object.assign(prompt, { stdout: outputStream })

    return createPrompt(type, prompt)
  }

  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
