/* eslint-disable @typescript-eslint/no-empty-function */
import type { ListrSilentRendererOptions, ListrSilentRendererTask, ListrSilentRendererTaskOptions } from './renderer.interface'
import type { ListrRenderer } from '@interfaces'

export class SilentRenderer implements ListrRenderer {
  public static nonTTY = true
  public static rendererOptions: ListrSilentRendererOptions
  public static rendererTaskOptions: ListrSilentRendererTaskOptions

  constructor (public tasks: ListrSilentRendererTask[], public options: ListrSilentRendererOptions) {}

  public render (): void {}

  public end (): void {}
}
