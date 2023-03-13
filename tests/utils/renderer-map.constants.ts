import type {
  ListrDefaultRendererValue,
  ListrFallbackRendererValue,
  ListrGetRendererOptions,
  ListrRendererValue,
  ListrSimpleRendererValue,
  ListrTestRendererValue
} from '@interfaces'

export type RendererSetup = [ListrRendererValue, ListrGetRendererOptions<ListrRendererValue>]

export const RENDERER_SETUP: RendererSetup[] = [
  [ 'default', { lazy: true } satisfies ListrGetRendererOptions<ListrDefaultRendererValue> ],
  [ 'simple', {} satisfies ListrGetRendererOptions<ListrSimpleRendererValue> ],
  [ 'verbose', { logTitleChange: true } satisfies ListrGetRendererOptions<ListrFallbackRendererValue> ],
  [ 'test', {} satisfies ListrGetRendererOptions<ListrTestRendererValue> ]
]
