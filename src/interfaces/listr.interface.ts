/* eslint-disable @typescript-eslint/member-ordering */
import type Enquirer from 'enquirer'
import { Observable, Subject } from 'rxjs'
import { Readable } from 'stream'

import { DefaultRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'
import { Listr } from '@root/index'
import { PromptOptions } from '@utils/prompt.interface'

/** Listr Default Context */
export type ListrContext = any | undefined

/** The default renderer value used in Listr2 applications */
export type ListrDefaultRendererValue = 'default'
/** Type of default renderer */
export type ListrDefaultRenderer = typeof DefaultRenderer
/** Name of default fallback renderer */
export type ListrFallbackRendererValue = 'verbose'
/** Type of default fallback renderer */
export type ListrFallbackRenderer = typeof VerboseRenderer
/** Silent rendere for internal usage */
export type ListrSilentRendererValue = 'silent'
/** Typeof silent renderer */
export type ListrSilentRenderer = typeof SilentRenderer

/**
 * Listr2 can process either the integrated renderers as string aliases,
 * or utilize a compatible style renderer that extends the ListrRenderer abstract class.
 */
export type ListrRendererValue = ListrSilentRendererValue | ListrDefaultRendererValue | ListrFallbackRendererValue | ListrRendererFactory

export interface ListrTaskObject<Ctx, Renderer extends ListrRendererFactory> extends Observable<ListrEvent> {
  /** Unique id per task, randomly generated in the uuid v4 format */
  id: string
  /** Title of the task */
  title?: string
  /** Untouched unchanged title of the task */
  initialTitle?: string
  /** Output data from the task. */
  output?: string
  /** The task object itself, to further utilize it. */
  task(ctx: Ctx, task: ListrTaskWrapper<Ctx, Renderer>): void | ListrTaskResult<Ctx>
  /** Skip current task. */
  skip: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean> | Promise<string>)
  /** Extend current task with multiple subtasks. */
  subtasks: ListrTaskObject<Ctx, any>[]
  /** The current state of the task. */
  state: string
  /** Current retry number of the task if retrying */
  retry?: { count: number, withError?: any }
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  message: {
    /** Run time of the task, if it has been successfully resolved. */
    duration?: number
    /** Error message of the task, if it has been failed. */
    error?: string
    /** Skip message of the task, if it has been skipped. */
    skip?: string
    /** Rollback message of the task, if the rollback finishes */
    rollback?: string
    /** Retry messages */
    retry?: { count: number, withError?: any }
  }
  /**
   * A function to check whether this task should run at all via enable.
   */
  check: (ctx: Ctx) => void
  /** Run the current task. */
  run(ctx: Ctx, wrapper: ListrTaskWrapper<Ctx, Renderer>): Promise<void>
  /** Options for listr itself. */
  options: ListrOptions
  /** Options for the current renderer of the task. */
  rendererOptions: ListrGetRendererOptions<Renderer>
  /** Per task options for the current renderer of the task. */
  rendererTaskOptions: ListrGetRendererTaskOptions<Renderer>
  /** A hook to refresh render if desired. */
  renderHook$: Subject<void>
  /** Returns whether this task has subtasks. */
  hasSubtasks: () => boolean
  /** Returns whether this task is in progress. */
  isPending: () => boolean
  /** Returns whether this task is skipped. */
  isSkipped: () => boolean
  /** Returns whether this task has been completed. */
  isCompleted: () => boolean
  /** Returns whether this task has an active rollback task going on. */
  isRollingBack: () => boolean
  /** Returns whether the rollback action was successful. */
  hasRolledBack: () => boolean
  /** Returns whether this task has an actively retrying task going on. */
  isRetrying: () => boolean
  /** Returns whether enabled function resolves to true. */
  isEnabled: () => boolean
  /** Returns whether this task has a prompt inside. */
  isPrompt: () => boolean
  /** Returns whether this task has been failed. */
  hasFailed: () => boolean
  /** Returns whether this task actually has a title. */
  hasTitle: () => boolean
  /** Returns whether this task is finalized and no further action will be performed. */
  hasFinalized: () => boolean
  /** Returns whether this task is still running in some form. */
  isRunning: () => boolean
}

export interface ListrTask<Ctx = ListrContext, Renderer extends ListrRendererFactory = any> {
  /**
   * Title of the task.
   *
   * Give this task a title if you want to track it by name in the current renderer.
   * Tasks without a title will tend to hide themselves in the default renderer and useful for
   * things like prompts and such.
   */
  title?: string
  /**
   * The task itself.
   *
   * Task can be a sync or async function, an Observable or a Stream.
   */
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
  /**
   * Runs a specific event if the current task or any of the subtasks has failed.
   * Mostly useful for rollback purposes for subtasks.
   */
  rollback?: (ctx: Ctx, task: ListrTaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
  /**
   * Adds a couple of retries to the task if the task fails
   */
  retry?: number
  /**
   * Skip this task depending on the context.
   *
   * The function that has been passed in will be evaluated at the runtime when task tries to initially run.
   */
  skip?: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean> | Promise<string>)
  /**
   * Enable a task depending on the context.
   *
   * The function that has been passed in will be evaluated at the initial creation of the Listr class.
   */
  enabled?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  /**
   * Per task options, depending on the selected renderer.
   *
   * This options depend on the implementation of selected renderer. If selected renderer has no options it will
   * be displayed as never.
   */
  options?: ListrGetRendererTaskOptions<Renderer>
}

export interface ListrTaskWrapper<Ctx, Renderer extends ListrRendererFactory> {
  /** Change the title of the current task. */
  title: string
  /** Send a output to the output channel. */
  output: string
  /** Create a new subtask with given renderer selection from the parent task. */
  newListr(
    task: ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[] | ((parent: this) => ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[]),
    options?: ListrSubClassOptions<Ctx, Renderer>
  ): Listr<Ctx, any, any>
  /** Report a error in process for error collection. */
  report: (error: Error) => void
  /** Skip current task. */
  skip: (message?: string) => void
  /** Run this task. */
  run(ctx?: Ctx, task?: ListrTaskWrapper<Ctx, Renderer>): Promise<void>
  /** Get the number of retrying, else returns false */
  isRetrying: () => ListrTaskObject<Ctx, Renderer>['retry']
  /**
   * Create a new Enquirer prompt using prompt options.
   *
   * Since process.stdout is controlled by Listr, this will passthrough all Enquirer data through internal stdout.
   */
  prompt: <T = any>(options: PromptOptions | PromptOptions<true>[]) => Promise<T>
  /** Cancel current prompt. */
  cancelPrompt: (throwError?: boolean) => void
  /**
   * Pass stream of data to internal stdout.
   *
   * Since Listr2 takes control of process.stdout utilizing the default renderer, any data outputed to process.stdout
   * will corupt its looks.
   *
   * This returns a fake stream to pass any stream inside Listr as task data.
   */
  stdout: () => NodeJS.WritableStream
}

/**
 * Task can be set of sync or async function, an Observable or a stream.
 */
export type ListrTaskResult<Ctx> = string | Promise<any> | Listr<Ctx, ListrRendererValue, any> | Readable | NodeJS.ReadableStream | Observable<any>

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

/**
 * Options to set the behavior of this base task.
 */
export interface ListrOptions<Ctx = ListrContext> {
  /**
   * Concurrency will set how many tasks will be run in parallel.
   *
   * @default false > Default is to run everything synchronously.
   *
   * `true` will set it to `Infinity`, `false` will set it to synchronous.
   * If you pass in a `number` it will limit it at that number.
   */
  concurrent?: boolean | number
  /**
   * Determine the behavior of exiting on errors.
   *
   * @default true > exit on any error comming from the tasks.
   */
  exitOnError?: boolean
  /**
   * Determine the behaviour of exiting after rollback actions.
   *
   * @default true > exit after rolling back tasks
   */
  exitAfterRollback?: boolean
  /**
   * To inject a context through this options wrapper. Mostly useful when combined with manager.
   * @default any
   */
  ctx?: Ctx
  /**
   * By default, Listr2 will track SIGINIT signal to update the renderer one last time before compeletely failing.
   * @default true
   */
  registerSignalListeners?: boolean
  /**
   * Determine the certain condition required to use the non-tty renderer.
   * @default null > handled internally
   */
  rendererFallback?: boolean | (() => boolean)
  /**
   * Determine the certain condition required to use the silent renderer.
   * @default null > handled internally
   */
  rendererSilent?: boolean | (() => boolean)
  /**
   * Disabling the color, useful for tests and such.
   * @default false
   */
  disableColor?: boolean
  /**
   * Inject data directly to TaskWrapper.
   */
  injectWrapper?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    enquirer?: Enquirer<object>
  }
}

/**
 * Returns the class type from freindly names of the renderers.
 */
export type ListrGetRendererClassFromValue<T extends ListrRendererValue> = T extends ListrDefaultRendererValue
  ? ListrDefaultRenderer
  : T extends ListrFallbackRendererValue
    ? ListrFallbackRenderer
    : T extends ListrSilentRenderer
      ? ListrSilentRenderer
      : T extends ListrRendererFactory
        ? T
        : never

/**
 * Returns the freindly names from the type of renderer classes.
 */
export type ListrGetRendererValueFromClass<T extends ListrRendererFactory> = T extends DefaultRenderer
  ? ListrDefaultRendererValue
  : T extends VerboseRenderer
    ? ListrFallbackRendererValue
    : T extends SilentRenderer
      ? ListrSilentRenderer
      : T extends ListrRendererFactory
        ? T
        : never

/**
 * Returns renderer global options depending on the renderer type.
 */
export type ListrGetRendererOptions<T extends ListrRendererValue> = T extends ListrDefaultRendererValue
  ? ListrDefaultRenderer['rendererOptions']
  : T extends ListrFallbackRendererValue
    ? ListrFallbackRenderer['rendererOptions']
    : T extends ListrSilentRenderer
      ? ListrSilentRenderer['rendererOptions']
      : T extends ListrRendererFactory
        ? T['rendererOptions']
        : never

/**
 * Returns renderer per task options depending on the renderer type.
 */
export type ListrGetRendererTaskOptions<T extends ListrRendererValue> = T extends ListrDefaultRendererValue
  ? ListrDefaultRenderer['rendererTaskOptions']
  : T extends ListrFallbackRendererValue
    ? ListrFallbackRenderer['rendererTaskOptions']
    : T extends ListrSilentRenderer
      ? ListrSilentRenderer['rendererTaskOptions']
      : T extends ListrRendererFactory
        ? T['rendererTaskOptions']
        : never

/** Select renderer as default renderer */
export interface ListrDefaultRendererOptions<T extends ListrRendererValue> {
  /** the default renderer */
  renderer?: T
  /** Renderer options depending on the current renderer */
  rendererOptions?: ListrGetRendererOptions<T>
}

/** Select a fallback renderer to fallback to in non-tty conditions */
export interface ListrDefaultNonTTYRendererOptions<T extends ListrRendererValue> {
  /** the fallback renderer to fallback to on non-tty conditions */
  nonTTYRenderer?: T
  /** Renderer options depending on the current renderer */
  nonTTYRendererOptions?: ListrGetRendererOptions<T>
}

/** Renderer options for the base class, including setup for selecting default and fallback renderers.  */
export type ListrRendererOptions<Renderer extends ListrRendererValue, FallbackRenderer extends ListrRendererValue> = ListrDefaultRendererOptions<Renderer> &
ListrDefaultNonTTYRendererOptions<FallbackRenderer>

/** The bones of a listr renderer. */
export declare class ListrRenderer {
  /** designate renderer global options that is specific to the current renderer */
  public static rendererOptions: Record<string, any>
  /** designate renderer per task options that is specific to the current renderer  */
  public static rendererTaskOptions: Record<string, any>
  /** designate whether this renderer can work in non-tty environments */
  public static nonTTY: boolean
  /** create a new renderer */
  constructor (tasks: readonly ListrTaskObject<any, ListrRendererFactory>[], options: typeof ListrRenderer.rendererOptions, renderHook$?: Subject<void>)
  /** A function to what to do on render */
  public render: () => void
  /** A function to what to do on end of the render */
  public end: (err?: Error) => void
}

/** Exported for javascript applications to extend the base renderer */
export declare class ListrBaseRenderer implements ListrRenderer {
  public static rendererOptions: Record<string, any>
  public static rendererTaskOptions: Record<string, any>
  public static nonTTY: boolean
  public tasks: ListrTaskObject<any, typeof ListrBaseRenderer>[]
  public options: typeof ListrBaseRenderer.rendererOptions
  constructor (tasks: ListrTaskObject<any, typeof ListrBaseRenderer>[], options: typeof ListrBaseRenderer.rendererOptions)
  public render: () => void
  public end: (err?: Error) => void
}

/** A renderer factory from the current type */
export type ListrRendererFactory = typeof ListrRenderer

/** The internal communication event. */
export type ListrEvent =
  | {
    type: Exclude<ListrEventTypes, 'MESSAGE'>
    data?: string | boolean
  }
  | {
    type: 'MESSAGE'
    data: ListrTaskObject<any, any>['message']
  }

/** The internal error handling mechanism.. */
export class ListrError extends Error {
  constructor (public message: string, public errors?: Error[], public context?: any) {
    super(message)
    this.name = 'ListrError'
  }
}

/** The internal error handling mechanism for prompts only. */
export class PromptError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'PromptError'
  }
}

/** Type of listr internal events. Not using enum for easy of use in custom JavaScript renderers. */
export type ListrEventTypes = 'TITLE' | 'STATE' | 'ENABLED' | 'SUBTASK' | 'DATA' | 'MESSAGE'
