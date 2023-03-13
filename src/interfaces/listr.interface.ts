import type Enquirer from 'enquirer'

import type {
  ListrDefaultNonTTYRendererOptions,
  ListrDefaultRendererOptions,
  ListrDefaultRendererValue,
  ListrFallbackRendererValue,
  ListrRendererValue
} from './renderer.interface'

/** Listr Default Context */
export type ListrContext = any | undefined

/**
 * Options to set the behavior of this base task.
 */
export interface ListrOptions<Ctx = ListrContext> {
  /**
   * To inject a context through this options wrapper. Context can also be defined in run time.
   *
   * @default {}
   */
  ctx?: Ctx
  /**
   * Concurrency sets how many tasks will be run at the same time in parallel.
   *
   * @default false > Default is to run everything synchronously.
   *
   * `true` will set it to `Infinity`, `false` will set it to synchronous.
   *
   * If you pass in a `number` it will limit it to that number.
   */
  concurrent?: boolean | number
  /**
   * Determine the default behavior of exiting on errors.
   *
   * @default true > exit on any error coming from the tasks.
   */
  exitOnError?: boolean
  /**
   * Determine the behavior of exiting after rollback actions.
   *
   * This is independent of exitOnError, since failure of a rollback can be a more critical operation comparing to
   * failing a single task.
   *
   * @default true > exit after rolling back tasks
   */
  exitAfterRollback?: boolean
  /**
   * Collects errors to `ListrInstance.errors`
   *
   * This can take up a lot of memory, so disabling it can fix out-of-memory errors
   *
   * - 'full' will clone the current context and task in to the error instance
   * - 'minimal' will only collect the error message and the location
   * - false will collect no errors
   *
   * @default 'minimal'
   */
  collectErrors?: false | 'minimal' | 'full'
  /**
   * By default, Listr2 will track SIGINIT signal to update the renderer one last time before completely failing.
   *
   * @default true
   */
  registerSignalListeners?: boolean
  /**
   * Determine the certain condition required to use the non-TTY renderer.
   *
   * @default null > handled internally
   */
  rendererFallback?: boolean | (() => boolean)
  /**
   * Determine the certain condition required to use the silent renderer.
   *
   * @default null > handled internally
   */
  rendererSilent?: boolean | (() => boolean)
  /**
   * Disabling the color, useful for tests and such.
   *
   * @default false
   */
  disableColor?: boolean
  /**
   * Forces usage of color.
   *
   * @default false
   */
  forceColor?: boolean
  /**
   * Forces TTY stdout eventhough current terminal might not support it.
   *
   * @default false
   */
  forceTTY?: boolean
  /**
   * Forces unicode eventhough current terminal might not support it.
   *
   * @default false
   */
  forceUnicode?: boolean
  /**
   * Inject data directly to TaskWrapper.
   */
  injectWrapper?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    enquirer?: Enquirer<object>
  }
}

/**
 * Parent class options.
 *
 * Parent class has more options where you can also select the and set renderer and non-tty renderer.
 *
 * Any subtasks will respect those options so they will be stripped of that properties.
 */
export type ListrBaseClassOptions<
  Ctx = ListrContext,
  Renderer extends ListrRendererValue = ListrDefaultRendererValue,
  FallbackRenderer extends ListrRendererValue = ListrFallbackRendererValue
> = ListrOptions<Ctx> & ListrDefaultRendererOptions<Renderer> & ListrDefaultNonTTYRendererOptions<FallbackRenderer>

/**
 * Sub class options.
 *
 * Subtasks has reduced set options where the missing ones are explicitly set by the base class.
 */
export type ListrSubClassOptions<Ctx = ListrContext, Renderer extends ListrRendererValue = ListrDefaultRendererValue> = ListrOptions<Ctx> &
Omit<ListrDefaultRendererOptions<Renderer>, 'renderer'>
