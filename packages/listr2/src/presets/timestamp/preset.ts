import { parseTimestamp } from './parser'
import type { PresetTimestamp } from './preset.interface'
import { color } from '@utils'

/* istanbul ignore next */
export const PRESET_TIMESTAMP: PresetTimestamp = {
  condition: true,
  field: parseTimestamp,
  format: () => color.dim
}
