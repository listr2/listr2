import type { ListrLogger } from './logger'
import type { ProcessOutputRendererOptions } from './process-output.interface'

/**
 * Options for the logger
 */
export interface ListrLoggerOptions extends ProcessOutputRendererOptions {
  /**
   * useIcons instead of text for log level
   * @default false
   */
  useIcons?: boolean
  entityOptions?: LogEntityOptions<true>
}

export interface LogEntityOptions<MultipleOnly extends boolean = false> {
  prefix?: MultipleOnly extends false ? LoggerPrefixOrSuffix | LoggerPrefixOrSuffix[] : LoggerPrefixOrSuffix[]
  suffix?: MultipleOnly extends false ? LoggerPrefixOrSuffix | LoggerPrefixOrSuffix[] : LoggerPrefixOrSuffix[]
}

export type LoggerFormat = (message?: string) => string

export interface LoggerPrefixOrSuffixFn<Args extends any[] = any[]> {
  condition?: ((...args: Args) => boolean) | boolean
  data: ((...args: Args) => string) | string
  args?: Args
  format?: LoggerFormat
  conditionalFormat?: (...args: Args) => LoggerFormat
}

export type LoggerPrefixOrSuffix<Args extends any[] = any[]> = LoggerPrefixOrSuffixFn<Args> | string

export interface LoggerRendererOptions {
  logger?: ListrLogger
}
