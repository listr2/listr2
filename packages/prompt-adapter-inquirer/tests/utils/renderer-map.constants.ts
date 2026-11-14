import type { ListrDefaultRendererValue, ListrVerboseRendererValue, ListrGetRendererOptions, ListrSimpleRendererValue, ListrTestRendererValue } from 'listr2'

import type { RendererSetup } from './renderer-map.interface'

export const RENDERER_SETUP: RendererSetup[] = [
  ['default', { lazy: true } satisfies ListrGetRendererOptions<ListrDefaultRendererValue>],
  ['simple', {} satisfies ListrGetRendererOptions<ListrSimpleRendererValue>],
  ['verbose', { logTitleChange: true } satisfies ListrGetRendererOptions<ListrVerboseRendererValue>],
  ['test', {} satisfies ListrGetRendererOptions<ListrTestRendererValue>]
]
