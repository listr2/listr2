import type { VerboseRenderer } from './renderer'
import type { Task } from '@lib'

export type ListrVerboseRendererTasks = Task<any, typeof VerboseRenderer>[]
export type ListrVerboseRendererOptions = (typeof VerboseRenderer)['rendererOptions']
