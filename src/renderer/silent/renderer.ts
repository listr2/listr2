/* eslint-disable @typescript-eslint/no-empty-function */
import type { ListrSilentRendererOptions, ListrSilentRendererTask, ListrSilentRendererTaskOptions } from './renderer.interface'
import type { ListrRenderer } from '@interfaces'

export class SilentRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the silent renderer */
  public static rendererOptions: ListrSilentRendererOptions
  /** per task options for the silent renderer */
  public static rendererTaskOptions: ListrSilentRendererTaskOptions

  constructor (public tasks: ListrSilentRendererTask[], public options: ListrSilentRendererOptions) {}

  public render (): void {}

  public end (): void {}
}
