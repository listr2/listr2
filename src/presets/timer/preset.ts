import { parseTimer } from './parser'
import type { PresetTimer } from './preset.interface'
import { color } from '@utils'

/* istanbul ignore next */
export const PRESET_TIMER: PresetTimer = {
  condition: true,
  field: parseTimer,
  format: () => color.dim
}
