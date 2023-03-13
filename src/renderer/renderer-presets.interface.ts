import type { LoggerPrefixOrSuffixFn } from '@utils/logger/logger.interface'

export interface RendererPresetTimer {
  /**
   * show duration for all tasks
   *
   * @default false
   * @global global option that can not be temperated with subtasks
   */
  timer?: LoggerPrefixOrSuffixFn<[number]>
}

export interface RendererPresetTimestamp {
  timestamp?: LoggerPrefixOrSuffixFn
}
