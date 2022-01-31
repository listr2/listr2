import type { ListrRendererFactory } from './renderer.interface'
import type { Task } from '@lib/task'
import { cloneObject } from '@utils/general'

/** The internal error handling mechanism.. */
export class ListrError<Ctx extends Record<PropertyKey, any> = Record<PropertyKey, any>> extends Error {
  public path: string
  public ctx: Ctx

  constructor (public error: Error, public type: ListrErrorTypes, public task: Task<Ctx, ListrRendererFactory>) {
    super(error.message)

    this.name = 'ListrError'

    this.path = [ ...task.listr.path ?? [], task.title ].join(' > ')

    // memory intensive error collection for circular objects on demand
    if (task?.options.collectErrors === 'full') {
      this.task = cloneObject(task)
      this.ctx = cloneObject(task.listr.ctx)
    }

    this.stack = error?.stack
  }
}

/**
 * The actual error type that is collected and to help identify where the error is triggered from.
 */
export enum ListrErrorTypes {
  /** Task has failed and will try to retry. */
  WILL_RETRY = 'WILL_RETRY',
  /** Task has failed and will try to rollback. */
  WILL_ROLLBACK = 'WILL_ROLLBACK',
  /** Task has failed, ran the rollback action but the rollback action itself has failed. */
  HAS_FAILED_TO_ROLLBACK = 'HAS_FAILED_TO_ROLLBACK',
  /** Task has failed. */
  HAS_FAILED = 'HAS_FAILED',
  /** Task has failed, but exitOnError is set to false, so will ignore this error. */
  HAS_FAILED_WITHOUT_ERROR = 'HAS_FAILED_WITHOUT_ERROR'
}

/** The internal error handling mechanism for prompts only. */
export class PromptError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'PromptError'
  }
}
