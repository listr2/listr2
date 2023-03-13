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
  prefix?: MultipleOnly extends false ? LoggerField | LoggerField[] : LoggerField[]
  suffix?: MultipleOnly extends false ? LoggerField | LoggerField[] : LoggerField[]
}

export type LoggerFormat = (message?: string) => string

export interface LoggerFieldFn<Args extends any[] = any[]> {
  condition?: ((...args: Args) => boolean) | boolean
  data: ((...args: Args) => string) | string
  args?: Args
  format?: LoggerFormat
  conditionalFormat?: (...args: Args) => LoggerFormat
}

export type LoggerField<Args extends any[] = any[]> = LoggerFieldFn<Args> | string

export interface LoggerRendererOptions {
  logger?: ListrLogger
}
