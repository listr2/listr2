import type { DefaultRenderer } from './renderer'
import type { ListrDefaultRendererLogLevels } from './renderer.constants'
import type { RendererStyleMap } from '@interfaces'
import type { Task } from '@lib'

export type ListrDefaultRendererOptionsStyle = RendererStyleMap<ListrDefaultRendererLogLevels>

export type ListrDefaultRendererTasks = Task<any, typeof DefaultRenderer>[]
export type ListrDefaultRendererOptions = (typeof DefaultRenderer)['rendererOptions']
