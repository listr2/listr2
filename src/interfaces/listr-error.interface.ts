import { ListrRendererFactory } from './renderer.interface'
import { Task } from '@lib/task'

/** The internal error handling mechanism.. */
export class ListrError<Ctx extends Record<PropertyKey, any> = Record<PropertyKey, any>> extends Error {
  constructor (public error: Error, public type?: ListrErrorTypes, public ctx?: Ctx, public task?: Task<Ctx, ListrRendererFactory>) {
    super(error.message)

    this.stack = error?.stack

    this.name = 'ListrError'
  }
}

/**
 * The metadata field for the listr errors, which may or may not contain additional information but is helpful to debug
 * the cause of the error.
 */
export type ListrErrorTypesWithMetadata = ListrErrorMetadata<
ListrErrorTypes.HAS_FAILED | ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR | ListrErrorTypes.HAS_FAILED_TO_ROLLBACK | ListrErrorTypes.WILL_RETRY
>

interface ListrErrorMetadata<Type extends ListrErrorTypes, With extends any = never> {
  type: Type
  with?: With
}

/**
 * The actual error type that is collected and to help identify where the error is triggered from.
 */
export enum ListrErrorTypes {
  WILL_RETRY = 'WILL_RETRY',
  WILL_ROLLBACK = 'WILL_ROLLBACK',
  HAS_FAILED_TO_ROLLBACK = 'HAS_FAILED_TO_ROLLBACK',
  HAS_FAILED = 'HAS_FAILED',
  HAS_FAILED_WITHOUT_ERROR = 'HAS_FAILED_WITHOUT_ERROR'
}

/** The internal error handling mechanism for prompts only. */
export class PromptError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'PromptError'
  }
}
