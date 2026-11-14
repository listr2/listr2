import type { ListrGetRendererOptions, ListrRendererValue } from 'listr2'

export type RendererSetup = [ListrRendererValue, ListrGetRendererOptions<ListrRendererValue>]
