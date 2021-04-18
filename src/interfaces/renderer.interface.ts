import { Subject } from 'rxjs'

import { Task } from '@lib/task'
import { DefaultRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'

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
/**
 * Returns the class type from friendly names of the renderers.
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
 * Returns the friendly names from the type of renderer classes.
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
  /** A function to what to do on render */
  public render: () => void
  /** A function to what to do on end of the render */
  public end: (err?: Error) => void
  /** create a new renderer */
  constructor (tasks: readonly Task<any, ListrRendererFactory>[], options: typeof ListrRenderer.rendererOptions | undefined, renderHook$?: Subject<void>)
}

/** Exported for javascript applications to extend the base renderer */
export declare class ListrBaseRenderer implements ListrRenderer {
  public static rendererOptions: Record<string, any>
  public static rendererTaskOptions: Record<string, any>
  public static nonTTY: boolean
  public tasks: Task<any, typeof ListrBaseRenderer>[]
  public options: typeof ListrBaseRenderer.rendererOptions
  public render: () => void
  public end: (err?: Error) => void
  constructor (tasks: Task<any, typeof ListrBaseRenderer>[], options: typeof ListrBaseRenderer.rendererOptions)
}

/** A renderer factory from the current type */
export type ListrRendererFactory = typeof ListrRenderer

/** Supported type of renderers for each type in the listr. */
export interface SupportedRenderer {
  renderer: ListrRendererFactory
  nonTTY: boolean
}
