import type { LoggerFieldFn } from '@utils'
import { color, parseTimestamp } from '@utils'

export type PresetTimestamp = LoggerFieldFn

export interface RendererPresetTimestamp {
  timestamp?: PresetTimestamp
}

export const RENDERER_TIMESTAMP: PresetTimestamp = {
  condition: true,
  data: parseTimestamp,
  format: color.dim
}
