import type { LoggerFieldFn } from '@utils'
import { colorette, parseTaskTime } from '@utils'

export type PresetTimer = LoggerFieldFn<[number]>

export interface RendererPresetTimer {
  /**
   * show duration for all tasks
   *
   * @default false
   * @global global option that can not be temperated with subtasks
   */
  timer?: PresetTimer
}

export const RENDERER_TIMER: PresetTimer = {
  condition: true,
  data: parseTaskTime,
  format: colorette.dim
}
