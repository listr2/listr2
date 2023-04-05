import type { SimpleRenderer } from './renderer'
import type { Task } from '@lib'
import type { RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { LoggerRendererOptions } from '@utils'

export type ListrSimpleRendererTask = Task<any, typeof SimpleRenderer>

export interface ListrSimpleRendererOptions extends RendererPresetTimer, RendererPresetTimestamp, LoggerRendererOptions {}

export interface ListrSimpleRendererTaskOptions extends RendererPresetTimer {}
