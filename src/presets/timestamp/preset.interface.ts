import type { LoggerFieldFn } from '@utils'

export type PresetTimestamp = LoggerFieldFn

export interface RendererPresetTimestamp {
  timestamp?: PresetTimestamp
}
