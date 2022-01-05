import { ListrRendererFactory } from './renderer.interface'
import { Task } from '@lib/task'
import { cloneObject } from '@utils/general'

/** The internal error handling mechanism.. */
export class ListrError<Ctx extends Record<PropertyKey, any> = Record<PropertyKey, any>> extends Error {
  public ctx?: Ctx

  public taskPath: string
  public task?: Task<Ctx, ListrRendererFactory>

  constructor (public error: Error, public type: ListrErrorTypes, keepAllData: boolean, task: Task<Ctx, ListrRendererFactory>, ctx?: Ctx) {
    super(error.message)

    this.taskPath = [ ...task.listr.currentPath, task.title ].join(' > ')

    if (keepAllData) {
      this.task = cloneObject(task)
      this.ctx = cloneObject(ctx)
    }

    this.stack = error?.stack

    this.name = 'ListrError'
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
