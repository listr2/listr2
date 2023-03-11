import type { TaskWrapper } from './task-wrapper'
import type { ListrRendererFactory, ListrTaskResult, PromptError } from '@interfaces'
import type { PromptInstance } from '@utils/prompt.interface'

export type TaskPrompt = undefined | PromptInstance | PromptError

export interface TaskRetry {
  count: number
  withError?: Error
}

export interface TaskMessage {
  /** Run time of the task, if it has been successfully resolved. */
  duration?: number
  /** Error message of the task, if it has been failed. */
  error?: string
  /** Skip message of the task, if it has been skipped. */
  skip?: string
  /** Rollback message of the task, if the rollback finishes */
  rollback?: string
  /** Retry messages */
  retry?: TaskRetry
}

export type TaskFn<Ctx, Renderer extends ListrRendererFactory> = (ctx: Ctx, task: TaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
