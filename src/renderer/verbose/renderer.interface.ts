import type { VerboseRenderer } from './renderer'
import type { ListrRendererCacheMap, ListrRendererTask } from '@interfaces'
import type { PresetTimer, RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { ListrLogLevels, ListrLoggerStyleMap, RendererLoggerOptions } from '@utils'

export type ListrVerboseRendererTask = ListrRendererTask<typeof VerboseRenderer>

export interface ListrVerboseRendererOptions extends RendererPresetTimer, RendererPresetTimestamp, RendererLoggerOptions<ListrLogLevels>, ListrLoggerStyleMap<ListrLogLevels> {
  /**
   * Log the title changes of the task.
   *
   * @default `false`
   */
  logTitleChange?: boolean
  /**
   * Show duration for the pauses.
   *
   * @defaultValue `PRESET_TIMER`
   */
  pausedTimer?: PresetTimer
}

export interface ListrVerboseRendererTaskOptions extends RendererPresetTimer {}

export interface ListrVerboseRendererCache {
  rendererOptions: ListrRendererCacheMap<ListrVerboseRendererOptions>
  rendererTaskOptions: ListrRendererCacheMap<ListrVerboseRendererTaskOptions>
}
