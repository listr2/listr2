import type { LoggerFieldFn } from '@utils'
import { color } from '@utils'

export type PresetTimestamp = LoggerFieldFn

export interface RendererPresetTimestamp {
  timestamp?: PresetTimestamp
}

/* istanbul ignore next */
export function parseTimestamp (): string {
  const now = new Date()

  return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0')
}

export const RENDERER_TIMESTAMP: PresetTimestamp = {
  condition: true,
  field: parseTimestamp,
  format: () => color.dim
}
