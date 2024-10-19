import type { ListrDefaultRendererValue, ListrVerboseRendererValue, ListrGetRendererOptions, ListrRendererValue, ListrSimpleRendererValue, ListrTestRendererValue } from 'listr2'

export type RendererSetup = [ListrRendererValue, ListrGetRendererOptions<ListrRendererValue>]

export const RENDERER_SETUP: RendererSetup[] = [
  ['default', { lazy: true } satisfies ListrGetRendererOptions<ListrDefaultRendererValue>],
  ['simple', {} satisfies ListrGetRendererOptions<ListrSimpleRendererValue>],
  ['verbose', { logTitleChange: true } satisfies ListrGetRendererOptions<ListrVerboseRendererValue>],
  ['test', {} satisfies ListrGetRendererOptions<ListrTestRendererValue>]
]
