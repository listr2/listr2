import type { SimpleRenderer } from './renderer'
import type { ListrRendererCacheMap, ListrRendererTask } from '@interfaces'
import type { PresetTimer, RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { ListrLogLevels, ListrLoggerStyleMap, RendererLoggerOptions } from '@utils'

export type ListrSimpleRendererTask = ListrRendererTask<typeof SimpleRenderer>

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
