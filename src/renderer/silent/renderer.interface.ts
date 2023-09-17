import type { SilentRenderer } from './renderer'
import type { ListrRendererTask } from '@interfaces'

export type ListrSilentRendererTask = ListrRendererTask<typeof SilentRenderer>

export type ListrSilentRendererOptions = never
export type ListrSilentRendererTaskOptions = never
