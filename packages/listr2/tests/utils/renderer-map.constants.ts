import type { RendererSetup } from './renderer-map.interface'
import type { ListrDefaultRendererValue, ListrVerboseRendererValue, ListrGetRendererOptions, ListrSimpleRendererValue, ListrTestRendererValue } from '#interfaces'

export const RENDERER_SETUP: RendererSetup[] = [
  ['default', { lazy: true } satisfies ListrGetRendererOptions<ListrDefaultRendererValue>],
  ['simple', {} satisfies ListrGetRendererOptions<ListrSimpleRendererValue>],
  ['verbose', { logTitleChange: true } satisfies ListrGetRendererOptions<ListrVerboseRendererValue>],
  ['test', {} satisfies ListrGetRendererOptions<ListrTestRendererValue>]
]
