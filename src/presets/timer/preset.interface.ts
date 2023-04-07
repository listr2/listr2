import type { LoggerFieldFn } from '@utils'

export type PresetTimer = LoggerFieldFn<[number]>

export interface RendererPresetTimer {
  /**
   * Show duration for the tasks.
   */
  timer?: PresetTimer
}
