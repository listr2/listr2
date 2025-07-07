import { ListrTaskState } from '@constants'
import { PromptError } from '@interfaces'
import type { Task, TaskWrapper } from '@lib'

/* istanbul ignore next */
export abstract class ListrPromptAdapter {
  private state: ListrTaskState

  constructor(
    protected task: Task<any, any, any>,
    protected wrapper: TaskWrapper<any, any, any>
  ) {}

  protected reportStarted(): void {
    this.state = this.task.state

    if (this.task.prompt) {
      throw new PromptError('There is already an active prompt attached to this task which may not be cleaned up properly.')
    }
    this.task.prompt = this

    this.task.state$ = ListrTaskState.PROMPT
  }

  protected reportFailed(): void {
    this.task.state$ = ListrTaskState.PROMPT_FAILED
    this.restoreState()
  }

  protected reportCompleted(): void {
    this.task.state$ = ListrTaskState.PROMPT_COMPLETED
    this.restoreState()
  }

  protected restoreState(): void {
    this.task.prompt = undefined

    if (this.state) {
      // without pushing it through the subscriptions again, just set the state back to original
      this.task.state = this.state
    }
  }

  public abstract run<T = any>(...args: any[]): T | Promise<T>
}
