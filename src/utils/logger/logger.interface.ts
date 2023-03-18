import type { ListrLogger } from './logger'
import type { RendererStyleMap } from '@interfaces'
import type { LogLevels, ProcessOutputRendererOptions } from '@utils'

/**
 * Options for the logger
 */
export interface ListrLoggerOptions extends ProcessOutputRendererOptions {
  /**
   * useIcons instead of text for log level
   * @default false
   */
  useIcons?: boolean
  /**
   * Apply fields and templates as presets before and after each message.
   */
  fieldOptions?: LoggerFieldOptions<true>
  /**
   * Style map for coloring and icons.
   */
  style?: ListrLoggerOptionStyle
  /**
   * Pass custom options to user created logger on different environments.
   *
   * Not used on the default logger.
   */
  user?: any
}

export type ListrLoggerOptionStyle<T extends string = LogLevels> = RendererStyleMap<T>

export interface LoggerFieldOptions<MultipleOnly extends boolean = false> {
  prefix?: MultipleOnly extends false ? LoggerField | LoggerField[] : LoggerField[]
  suffix?: MultipleOnly extends false ? LoggerField | LoggerField[] : LoggerField[]
}

export type LoggerFormat = (message?: string) => string

export interface LoggerFieldFn<Args extends any[] = any[]> {
  field: ((...args: Args) => string) | string
  condition?: ((...args: Args) => boolean) | boolean
  format?: (...args: Args) => LoggerFormat
  args?: Args
}

export type LoggerField<Args extends any[] = any[]> = LoggerFieldFn<Args> | string

export interface LoggerRendererOptions {
  logger?: typeof ListrLogger
  loggerOptions?: ListrLoggerOptions
}
