import type { ListrEventManager, Task } from '@lib'
import type { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'

/** Name of the default renderer. */
export type ListrDefaultRendererValue = 'default'
/** Type of default renderer. */
export type ListrDefaultRenderer = typeof DefaultRenderer
/** Name of simple renderer. */
export type ListrSimpleRendererValue = 'simple'
/** Type of simple renderer. */
export type ListrSimpleRenderer = typeof SimpleRenderer
/** Name of verbose renderer. */
export type ListrVerboseRendererValue = 'verbose'
/** Type of verbose renderer. */
export type ListrVerboseRenderer = typeof VerboseRenderer
/** Name of test renderer. */
export type ListrTestRendererValue = 'test'
/** Type of test renderer. */
export type ListrTestRenderer = typeof TestRenderer
/** Name of silent renderer. */
export type ListrSilentRendererValue = 'silent'
/** Type of silent renderer. */
export type ListrSilentRenderer = typeof SilentRenderer

/** The default prefered renderer. */
export type ListrPrimaryRendererValue = ListrDefaultRendererValue
/** The default fallback renderer. */
export type ListrSecondaryRendererValue = ListrSimpleRendererValue

/**
 * Listr2 can process either the integrated renderers as string aliases,
 * or utilize a compatible style renderer that extends the ListrRenderer abstract class.
 */
export type ListrRendererValue =
  | ListrSilentRendererValue
  | ListrDefaultRendererValue
  | ListrSimpleRendererValue
  | ListrVerboseRendererValue
  | ListrTestRendererValue
  | ListrRendererFactory

/**
 * Returns the class type from friendly names of the renderers.
 */
export type ListrGetRendererClassFromValue<T extends ListrRendererValue> = T extends ListrDefaultRendererValue
  ? ListrDefaultRenderer
  : T extends ListrSimpleRendererValue
    ? ListrSimpleRenderer
    : T extends ListrVerboseRendererValue
      ? ListrVerboseRenderer
      : T extends ListrTestRendererValue
        ? ListrTestRenderer
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
  : T extends SimpleRenderer
    ? ListrSimpleRendererValue
    : T extends VerboseRenderer
      ? ListrVerboseRendererValue
      : T extends TestRenderer
        ? ListrTestRendererValue
        : T extends SilentRenderer
          ? ListrSilentRenderer
          : T extends ListrRendererFactory
            ? T
            : never

/**
 * Returns renderer global options depending on the renderer type.
 */
export type ListrGetRendererOptions<T extends ListrRendererValue> = T extends ListrRendererValue ? ListrGetRendererClassFromValue<T>['rendererOptions'] : never

/**
 * Returns renderer per-task options depending on the renderer type.
 */
export type ListrGetRendererTaskOptions<T extends ListrRendererValue> = T extends ListrRendererValue ? ListrGetRendererClassFromValue<T>['rendererTaskOptions'] : never

/** Selection and options of the primary preferred renderer. */
export interface ListrPrimaryRendererOptions<T extends ListrRendererValue> {
  /** Default renderer preferred. */
  renderer?: T
  /** Renderer options depending on the current renderer. */
  rendererOptions?: ListrGetRendererOptions<T>
}

/** Selection and options of the preferred fallback renderer. */
export interface ListrSecondaryRendererOptions<T extends ListrRendererValue> {
  /** Fallback renderer preferred. */
  fallbackRenderer?: T
  /** Renderer options depending on the fallback renderer. */
  fallbackRendererOptions?: ListrGetRendererOptions<T>
}

/** Renderer options for the parent Listr class, including setup for selecting default and fallback renderers.  */
export type ListrRendererOptions<Renderer extends ListrRendererValue, FallbackRenderer extends ListrRendererValue> = ListrPrimaryRendererOptions<Renderer> &
ListrSecondaryRendererOptions<FallbackRenderer>

/**
 * The definition of a ListrRenderer.
 *
 * @see {@link https://listr2.kilic.dev/renderer/renderer.html}
 */
export declare class ListrRenderer {
  /** designate renderer global options that is specific to the current renderer */
  public static rendererOptions: Record<PropertyKey, any>
  /** designate renderer per task options that is specific to the current renderer  */
  public static rendererTaskOptions: Record<PropertyKey, any>
  /** designate whether this renderer can work in non-tty environments */
  public static nonTTY: boolean
  /** A function to what to do on render */
  public render: () => void | Promise<void>
  /** A function to what to do on end of the render */
  public end: (err?: Error) => void
  /** create a new renderer */
  constructor (tasks: readonly Task<any, ListrRendererFactory>[], options: typeof ListrRenderer.rendererOptions, events?: ListrEventManager)
}

/** Factory of compatible Listr renderers. */
export type ListrRendererFactory = typeof ListrRenderer

/** Renderer selection for current Listr. */
export interface SupportedRenderer<Renderer extends ListrRendererFactory> {
  renderer: Renderer
  options?: ListrGetRendererOptions<Renderer>
}
