import type { ListrLogger } from './logger'
import type { ListrLogLevels, ProcessOutputRendererOptions } from '@utils'

/**
 * Options for the logger
 */
export interface ListrLoggerOptions<Levels extends string, T = any> extends ProcessOutputRendererOptions {
  /**
   * Use icons for the log levels.
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
  /**
   * Send the designated levels to `process.stderr`.
   */
  toStderr?: Levels | string[]
}

export interface ListrLoggerStyleMap<Levels extends string> {
  /**
   * Coloring of the levels.
   */
  color?: Partial<Record<Levels, LoggerFormat>>
  /**
   * Icons of the levels.
   */
  icon?: Partial<Record<Levels, string>>
}

export interface LoggerFieldOptions<MultipleOnly extends boolean = false> {
  /**
   * Prefix fields for the log entry.
   */
  prefix?: MultipleOnly extends false ? LoggerField | LoggerField[] : LoggerField[]
  /**
   * Suffix fields for the log entry.
   */
  suffix?: MultipleOnly extends false ? LoggerField | LoggerField[] : LoggerField[]
}

export type LoggerFormat = (message?: string) => string

export interface LoggerFieldFn<Args extends any[] = any[]> {
  /**
   * The value of the given field.
   */
  field: ((...args: Args) => string) | string
  /**
   * Condition to display the given field.
   */
  condition?: ((...args: Args) => boolean) | boolean
  /**
   * Formatting/coloring of the field.
   */
  format?: (...args: Args) => LoggerFormat
  /**
   * Args to pass to other functions whenever this field is triggered.
   */
  args?: Args
}

export type LoggerField<Args extends any[] = any[]> = LoggerFieldFn<Args> | string

export interface LoggerRendererOptions<Levels extends string = ListrLogLevels> {
  /**
   * Inject your custom implementation of the ListrLogger.
   *
   * @see {@link https://listr2.kilic.dev/renderer/logger.html}
   */
  logger?: typeof ListrLogger
  /**
   * Inject your settings for the ListrLogger.
   *
   * @see {@link https://listr2.kilic.dev/renderer/logger.html}
   */
  loggerOptions?: ListrLoggerOptions<Levels>
}
