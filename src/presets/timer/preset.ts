import { parseTimer } from './parser'
import type { PresetTimer } from './preset.interface'
import { color } from '@utils'

export const RENDERER_TIMER: PresetTimer = {
  condition: true,
  field: parseTimer,
  format: () => color.dim
}
