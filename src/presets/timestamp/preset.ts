import { parseTimestamp } from './parser'
import type { PresetTimestamp } from './preset.interface'
import { color } from '@utils'

export const PRESET_TIMESTAMP: PresetTimestamp = {
  condition: true,
  field: parseTimestamp,
  format: () => color.dim
}
