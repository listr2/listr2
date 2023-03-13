import type { LoggerFieldFn } from '@utils'
import { color, parseTimestamp } from '@utils'

export type PresetTimestamp = LoggerFieldFn

export interface RendererPresetTimestamp {
  timestamp?: PresetTimestamp
}

export const RENDERER_TIMESTAMP: PresetTimestamp = {
  condition: true,
  field: parseTimestamp,
  format: () => color.dim
}
