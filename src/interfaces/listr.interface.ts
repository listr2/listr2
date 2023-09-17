import type Enquirer from 'enquirer'

import type {
  ListrPrimaryRendererOptions,
  ListrPrimaryRendererSelection,
  ListrPrimaryRendererValue,
  ListrRendererValue,
  ListrSecondaryRendererOptions,
  ListrSecondaryRendererSelection,
  ListrSecondaryRendererValue
} from './renderer.interface'

/** Listr context. */
export type ListrContext = any | undefined

/**
 * Options to set the behavior of Listr.
 */
export interface ListrOptions<Ctx = ListrContext> {
  /**
   * Inject a context through this options wrapper.
   *
   * @defaultValue `{}`
   * @see {@link https://listr2.kilic.dev/listr/context.html}
   */
  ctx?: Ctx
  /**
   * Concurrency limits how many tasks will be running in parallel.
   *
   * - `false` will only run a single task at a time.
   * - `true` will set it to `Infinity` to run all the tasks in parallel.
   * - Given a `number` it will limit the concurrency to that number.
   *
   * @defaultValue `false`
   */
  concurrent?: boolean | number
  /**
   * Determine the default behavior of exiting on errors.
   *
   * - `true` will exit the current Listr whenever it encounters an error.
   * - `false` will continue the execution of current Listr if it encounters an error.
   *
   * @defaultValue `true`
   */
  exitOnError?: boolean
  /**
   * Determine the behavior of exiting after rollback actions.
   *
   * This is independent of `exitOnError`, since failure of a rollback can be a more critical operation comparing to
   * failing a single task.
   *
   * - `true` will stop the execution whenever a rollback happens.
   * - `false` will continue after successfully recovering from a rollback.
   *
   * @defaultValue `true`
   */
  exitAfterRollback?: boolean
  /**
   * Collects errors inside the `Listr.errors`.
   *
   * - `false` will collect no errors.
   * - `minimal` will only collect the error message and the location.
   * - `full` will clone the current context and task in to the error instance.
   *
   * @defaultValue `false`
   * @see {@link https://listr2.kilic.dev/task/error-handling.html#collected-errors}
   */
  collectErrors?: false | 'minimal' | 'full'
  /**
   * Listr will track SIGINIT signal to update the renderer one last time before failing, therefore it needs to
   * register exit listeners.
   *
   * @defaultValue true
   */
  registerSignalListeners?: boolean
  /**
   * Determine the certain condition required to use the fallback renderer.
   *
   * @defaultValue handled internally
   */
  fallbackRendererCondition?: boolean | (() => boolean)
  /**
   * Determine the certain condition required to use the silent renderer.
   *
   * @defaultValue handled internally
   */
  silentRendererCondition?: boolean | (() => boolean)
  /**
   * Forces TTY stdout even though your current output may not be compatible.
   *
   * @defaultValue `false`
   */
  forceTTY?: boolean
  /**
   * Forces unicode icons even though your current output may not be compatible.
   *
   * @defaultValue `false`
   */
  forceUnicode?: boolean
  /**
   * Inject data directly to TaskWrapper.
   */
  injectWrapper?: {
    /**
     * Inject an `enquirer` instance for using with prompts.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    enquirer?: Enquirer<object>
  }
}

/**
 * Parent Listr has more options where you can also change global settings.
 *
 * Any subtasks will respect those options so they will be stripped of that properties.
 */
export interface ListrBaseClassOptions<
  Ctx = ListrContext,
  Renderer extends ListrRendererValue = ListrPrimaryRendererValue,
  FallbackRenderer extends ListrRendererValue = ListrSecondaryRendererValue
> extends ListrOptions<Ctx>,
  ListrPrimaryRendererSelection<Renderer>,
  ListrSecondaryRendererSelection<FallbackRenderer> {}

/**
 * Subtasks has reduced set options where the missing ones are explicitly set by the base class.
 */
export interface ListrSubClassOptions<
  Ctx = ListrContext,
  Renderer extends ListrRendererValue = ListrPrimaryRendererValue,
  FallbackRenderer extends ListrRendererValue = ListrSecondaryRendererValue
> extends Omit<ListrOptions<Ctx>, 'registerSignalListeners' | 'fallbackRendererCondition' | 'silentRendererCondition' | 'forceTTY' | 'forceUnicode'>,
  ListrPrimaryRendererOptions<Renderer>,
  ListrSecondaryRendererOptions<FallbackRenderer> {}
