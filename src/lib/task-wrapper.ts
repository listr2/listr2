import { ListrError } from '../interfaces/listr-error'
import { ListrTaskWrapper } from './../interfaces/listr-task.interface'
import { stateConstants } from '../constants/state.constants';
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

  public report (error): void {
    if (error instanceof ListrError) {
      this.errors.push(error)
    }
  }

  public skip (message): void {
    if (message && typeof message !== 'string') {
      throw new TypeError(`Expected \`message\` to be of type \`string\`, got \`${typeof message}\``)
    }

    if (message) {
      this.task.output = message
    }

    this.task.state = stateConstants.SKIPPED
  }

  public run (ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}
