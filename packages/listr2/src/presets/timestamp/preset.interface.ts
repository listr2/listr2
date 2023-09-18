import type { LoggerFieldFn } from '@utils'

export type PresetTimestamp = LoggerFieldFn

export interface RendererPresetTimestamp {
  /**
   * Show timestamp for each event that has been logged.
   */
  timestamp?: PresetTimestamp
}
