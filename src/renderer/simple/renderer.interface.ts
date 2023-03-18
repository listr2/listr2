import type { SimpleRenderer } from './renderer'
import type { Task } from '@lib'

export type ListrSimpleRendererTasks = Task<any, typeof SimpleRenderer>[]
export type ListrSimpleRendererOptions = (typeof SimpleRenderer)['rendererOptions']
