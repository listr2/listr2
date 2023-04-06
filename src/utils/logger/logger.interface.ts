import type { ListrLogger } from './logger'
import type { ListrLogLevels, ProcessOutputRendererOptions } from '@utils'

/**
 * Options for the logger
 */
export interface ListrLoggerOptions<Levels extends string, T = any> extends ProcessOutputRendererOptions {
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
  style?: ListrLoggerStyleMap<Levels | string>
  /**
   * Pass custom options to user created logger on different environments.
   *
   * Not used on the default logger.
   */
  user?: T

  toStderr?: Levels | string[]
}

export interface ListrLoggerStyleMap<Levels extends string> {
  color?: Partial<Record<Levels, LoggerFormat>>
  icon?: Partial<Record<Levels, string>>
}

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

export interface LoggerRendererOptions<Levels extends string = ListrLogLevels> {
  logger?: typeof ListrLogger<Levels>
  loggerOptions?: ListrLoggerOptions<Levels>
}
