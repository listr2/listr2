import { ListrTaskState } from '@constants'
import type { Task, TaskWrapper } from '@lib'

export abstract class ListrPromptAdapter {
  private state: ListrTaskState

  constructor (
    protected task: Task<any, any>,
    protected wrapper: TaskWrapper<any, any>
  ) {}

  protected reportStarted (): void {
    this.state = this.task.state
    this.task.state$ = ListrTaskState.PROMPT
  }

  protected reportFailed (): void {
    this.task.state$ = ListrTaskState.PROMPT_FAILED
    this.restoreState()
  }

  protected reportCompleted (): void {
    this.task.state$ = ListrTaskState.PROMPT_COMPLETED
    this.restoreState()
  }

  protected restoreState (): void {
    if (this.state) {
      // without pushing it through the subscriptions again, just set the state back to original
      this.task.state = this.state
    }
  }

  public abstract run<T = any>(...args: any[]): T | Promise<T>
}
