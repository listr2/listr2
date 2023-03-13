import type { LoggerPrefixOrSuffixFn } from '@utils'
import { parseTaskTime, colorette, timestamp } from '@utils'

export const RENDERER_TIMESTAMP: LoggerPrefixOrSuffixFn = {
  condition: true,
  data: timestamp,
  format: colorette.dim
}

export const RENDERER_TIMER: LoggerPrefixOrSuffixFn<[number]> = {
  condition: true,
  data: parseTaskTime,
  format: colorette.dim
}
