import type { Observable } from 'rxjs'
import type { Readable } from 'stream'

import type { PromptError } from './listr-error.interface'
import type { ListrContext } from './listr.interface'
import type { ListrGetRendererTaskOptions, ListrRendererFactory, ListrRendererValue } from './renderer.interface'
import type { Task, TaskWrapper } from '@lib'
import type { Listr } from '@root'
import type { PromptInstance } from '@utils'

/**
 * ListrTask.
 *
 * Defines the task, conditions and options to run a specific task in the listr.
 */
export interface ListrTask<Ctx = ListrContext, Renderer extends ListrRendererFactory = any> {
  /**
   * Title of the task.
   *
   * Give this task a title if you want to track it by name in the current renderer.
   *
   * Tasks without a title will hide in the default renderer and are useful for running a background instance.
   * On verbose renderer, state changes from these tasks will log as 'Task without a title.'
   */
  title?: string
  /**
   * The task itself.
   *
   * Task can be a sync or async function, an Observable, or a Stream.
   * Task will be executed, if the certain criteria of the state are met and whenever the time for that specific task has come.
   */
  task: ListrTaskFn<Ctx, Renderer>
  /**
   * Skip this task depending on the context.
   *
   * The function that has been passed in will be evaluated at the runtime when the task tries to initially run.
   */
  skip?: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean | string>)
  /**
   * Enable a task depending on the context.
   *
   * The function that has been passed in will be evaluated at the initial creation of the Listr class for rendering purposes,
   * as well as re-evaluated when the time for that specific task has come.
   */
  enabled?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  /**
   * Adds the given number of retry attempts to the task if the task fails.
   */
  retry?: number
  /**
   * Runs a specific event if the current task or any of the subtasks has failed.
   *
   * Mostly useful for rollback purposes for subtasks.
   * But can also be useful whenever a task is failed and some measures have to be taken to ensure the state is not changed.
   */
  rollback?: ListrTaskFn<Ctx, Renderer>
  /**
   * Set exit on the error option from task-level instead of setting it for all the subtasks.
   */
  exitOnError?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  /**
   * Per task options, that depends on the selected renderer.
   *
   * These options depend on the implementation of the selected renderer. If the selected renderer has no options it will
   * be displayed as never.
   */
  options?: ListrGetRendererTaskOptions<Renderer>
}

/**
 * Task can be set of sync or async function, an Observable or a stream.
 */
export type ListrTaskResult<Ctx> = string | Promise<any> | Listr<Ctx, ListrRendererValue, any> | Readable | NodeJS.ReadableStream | Observable<any>

export type ListrTaskFn<Ctx, Renderer extends ListrRendererFactory> = (ctx: Ctx, task: TaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>

export type ListrTaskPrompt = PromptInstance | PromptError

export interface ListrTaskRetry {
  count: number
  withError?: Error
}

export interface ListrTaskMessage {
  /** Run time of the task, if it has been successfully resolved. */
  duration?: number
  /** Error message of the task, if it has been failed. */
  error?: string
  /** Skip message of the task, if it has been skipped. */
  skip?: string
  /** Rollback message of the task, if the rollback finishes */
  rollback?: string
  /** Retry messages */
  retry?: ListrTaskRetry
}

export type { Task as ListrTaskObject }
export type { TaskWrapper as ListrTaskWrapper }
