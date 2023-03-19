import type { VerboseRenderer } from './renderer'
import type { Task } from '@lib'
import type { RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { LoggerRendererOptions } from '@utils'

export type ListrVerboseRendererTasks = Task<any, typeof VerboseRenderer>[]
export type ListrVerboseRendererOptions = (typeof VerboseRenderer)['rendererOptions']

export interface VerboseRendererOptions extends RendererPresetTimer, RendererPresetTimestamp, LoggerRendererOptions {
  /**
   * log title changes
   * @default true
   */
  logTitleChange?: boolean
}

export interface VerboseRendererTaskOptions extends RendererPresetTimer {}
