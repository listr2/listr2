import type { LoggerFieldFn } from '@utils'
import { colorette, timestamp } from '@utils'

export type PresetTimestamp = LoggerFieldFn

export interface RendererPresetTimestamp {
  timestamp?: PresetTimestamp
}

export const RENDERER_TIMESTAMP: PresetTimestamp = {
  condition: true,
  data: timestamp,
  format: colorette.dim
}
