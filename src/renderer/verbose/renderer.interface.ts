import type { VerboseRenderer } from './renderer'
import type { Task } from '@lib'
import type { RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { LoggerRendererOptions } from '@utils'

export type ListrVerboseRendererTask = Task<any, typeof VerboseRenderer>

export interface ListrVerboseRendererOptions extends RendererPresetTimer, RendererPresetTimestamp, LoggerRendererOptions {
  /**
   * Log the title changes of the task.
   *
   * @default `false`
   */
  logTitleChange?: boolean
}

export interface ListrVerboseRendererTaskOptions extends RendererPresetTimer {}
