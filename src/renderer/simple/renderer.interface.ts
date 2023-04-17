import type { SimpleRenderer } from './renderer'
import type { ListrRendererCacheMap } from '@interfaces'
import type { Task } from '@lib'
import type { PresetTimer, RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { ListrLogLevels, ListrLoggerStyleMap, RendererLoggerOptions } from '@utils'

export type ListrSimpleRendererTask = Task<any, typeof SimpleRenderer>

export interface ListrSimpleRendererOptions extends RendererPresetTimer, RendererPresetTimestamp, RendererLoggerOptions<ListrLogLevels>, ListrLoggerStyleMap<ListrLogLevels> {
  /**
   * Show duration for the pauses.
   *
   * @defaultValue `PRESET_TIMER`
   */
  pausedTimer?: PresetTimer
}

export interface ListrSimpleRendererTaskOptions extends RendererPresetTimer {}

export interface ListrSimpleRendererCache {
  rendererOptions: ListrRendererCacheMap<ListrSimpleRendererOptions>
  rendererTaskOptions: ListrRendererCacheMap<ListrSimpleRendererTaskOptions>
}
