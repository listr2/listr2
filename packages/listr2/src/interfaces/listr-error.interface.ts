import type { ListrContext } from './listr.interface'
import type { ListrRendererFactory } from './renderer.interface'
import type { ListrErrorTypes } from '@constants'
import type { Task } from '@lib'
import { cloneObject } from '@utils'

/**
 * Internal error handling mechanism for Listr collects the errors and details for a failed task.
 *
 * @see {@link https://listr2.kilic.dev/task/error-handling.html}
 */
export class ListrError<Ctx extends ListrContext = ListrContext> extends Error {
  public path: string[]
  public ctx: Ctx

  constructor(
    public error: Error,
    public type: ListrErrorTypes,
    public task: Task<Ctx, ListrRendererFactory, ListrRendererFactory>
  ) {
    super(error.message)

    this.name = 'ListrError'

    this.path = task.path

    // memory intensive error collection for circular objects on demand
    if (task?.options.collectErrors === 'full') {
      this.task = cloneObject(task)
      this.ctx = cloneObject(task.listr.ctx)
    }

    this.stack = error?.stack
  }
}
