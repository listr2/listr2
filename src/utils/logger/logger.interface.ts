import type { ListrLogger } from './logger'
import type { RendererStyleMap } from '@interfaces'
import type { LogLevels, ProcessOutputRendererOptions } from '@utils'

/**
 * Options for the logger
 */
export interface ListrLoggerOptions<Levels extends string> extends ProcessOutputRendererOptions {
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
  style?: ListrLoggerOptionStyle<Levels>
  /**
   * Pass custom options to user created logger on different environments.
   *
   * Not used on the default logger.
   */
  user?: any

  toStderr?: Levels[]
}

export type ListrLoggerOptionStyle<Levels extends string = LogLevels> = RendererStyleMap<Levels>

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

export interface LoggerRendererOptions<Levels extends string = LogLevels> {
  logger?: typeof ListrLogger
  loggerOptions?: ListrLoggerOptions<Levels>
}
