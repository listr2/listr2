import { stateConstants } from '../constants/state.constants'
import { ListrError } from '../interfaces/listr-error'
import { ListrTaskWrapper, StateConstants } from './../interfaces/listr-task.interface'
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

  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
