import type { ObservableLike, ReadableLike } from './data.interface'
import type { ListrContext } from './listr.interface'
import type { ListrPrimaryRendererTaskOptions, ListrRendererFactory, ListrRendererValue, ListrSecondaryRendererTaskOptions } from './renderer.interface'
import type { Task, TaskWrapper } from '@lib'
import type { Listr } from '@root'
import type { ListrPromptAdapter } from '@utils'

/**
 * Defines the task, conditions and options to run a specific task in the Listr.
 * This defines the external API for the task where {@link TaskWrapper} is used internally.
 *
 * @see {@link https://listr2.kilic.dev/task/task.html}
 */
export interface ListrTask<Ctx = ListrContext, Renderer extends ListrRendererFactory = any, FallbackRenderer extends ListrRendererFactory = any>
  extends ListrPrimaryRendererTaskOptions<Renderer>,
  ListrSecondaryRendererTaskOptions<FallbackRenderer> {
  /**
   * Title of the task.
   *
   * Give this task a title to enchance it on the preferred renderer.
   *
   * - Tasks without a title will be hidden from view in renderers and will act as a background task.
   *
   * @see {@link https://listr2.kilic.dev/task/title.html}
   */
  title?: string | any[]
  /**
   * The task itself in the form of a `Function`, `Promise`, `Listr`, `Observable` or `Stream`.
   *
   * - Task will be executed, whenever the provided criterion is met with the current state and whenever the time for that specific task has come.
   *
   * @see {@link https://listr2.kilic.dev/task/task.html}
   */
  task: ListrTaskFn<Ctx, Renderer, FallbackRenderer>
  /**
   * Enable a task depending on the context.
   *
   * - The callback function will be evaluated before all the tasks start to check which tasks has been enabled.
   * - The callback function will be evaluated again before the task starts.
   *
   * @see {@link https://listr2.kilic.dev/task/enable.html}
   */
  enabled?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  /**
   * Skip this task depending on the context.
   *
   * - The callback function will be evaluated once before the task starts.
   *
   * @see {@link https://listr2.kilic.dev/task/skip.html}
   */
  skip?: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean | string>)
  /**
   * Retries a task with the given amounts whenever a task fails.
   *
   * @see {@link https://listr2.kilic.dev/task/retry.html}
   */
  retry?: number | { tries: number, delay?: number }
  /**
   * The callback function that you provide will run whenever the attached task fails and
   * give you the ability to revert your changes, before failing.
   *
   * @see {@link https://listr2.kilic.dev/task/rollback.html}
   */
  rollback?: ListrTaskFn<Ctx, Renderer, FallbackRenderer>
  /**
   * Determine the default behavior of exiting on errors for this attached task.
   */
  exitOnError?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
}

/**
 * Result of the processed task can be any of the supported types.
 */
export type ListrTaskResult<Ctx> = string | Promise<any> | Listr<Ctx, ListrRendererValue, ListrRendererValue> | ReadableLike | ObservableLike<any>

/**
 * The callback function from the user that defines the task.
 */
export type ListrTaskFn<Ctx, Renderer extends ListrRendererFactory, FallbackRenderer extends ListrRendererFactory> = (
  ctx: Ctx,
  task: TaskWrapper<Ctx, Renderer, FallbackRenderer>
) => void | ListrTaskResult<Ctx>

/**
 * Tasks can have attached prompts to them.
 */
export type ListrTaskPrompt = ListrPromptAdapter

/**
 * Tasks can retry themselves when defined.
 *
 * - This holds the value of the current error and the current retry attempt.
 */
export interface ListrTaskRetry {
  count: number
  error?: Error
}

/**
 * Task can provide additional information depending on the current state of the Task.
 *
 * TaskMessage is used to propagate these messages to the renderers for displaying them to the end-user.
 */
export interface ListrTaskMessage {
  /** Elapsed time of the current task, whenever the Task completes. */
  duration?: number
  /** Error message from the current task, whenever the Task fails. */
  error?: string
  /** Skip message from the current task, whenever the Task skips. */
  skip?: string
  /** Rollback message from the current task, whenever the Task finishes rollback. */
  rollback?: string
  /** Retry message from the current task, whenever the Task tries to retry. */
  retry?: ListrTaskRetry
  /** Holds the time as epoch time of when will this task continue to execute. */
  paused?: number
}

/**
 * Listr Task after the renderer has been selected and renderer related options removed.
 */
export type ListrRendererTask<SelectedRenderer extends ListrRendererFactory> = Task<any, SelectedRenderer, SelectedRenderer>

export type { Task as ListrTaskObject, TaskWrapper as ListrTaskWrapper }
