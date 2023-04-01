import { EOL } from 'os'

import { LISTR_LOGGER_STYLE, LogLevels } from './logger.constants'
import type { ListrLoggerOptions, LoggerFieldOptions, LoggerField, LoggerFormat } from './logger.interface'
import type { RendererStyleMap } from '@interfaces'
import { ProcessOutput, splat } from '@utils'

/**
 * A internal logger for using in the verbose renderer mostly.
 */
export class ListrLogger {
  public readonly process: ProcessOutput

  constructor (private readonly options?: ListrLoggerOptions) {
    this.options = {
      useIcons: true,
      ...options,
      style: {
        icon: {
          ...LISTR_LOGGER_STYLE.icon,
          ...this.options?.style?.icon ?? {}
        },
        color: {
          ...LISTR_LOGGER_STYLE.color,
          ...this.options?.style?.color ?? {}
        }
      }
    }

    this.process = this.options.processOutput ?? new ProcessOutput()
  }

  public started (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.STARTED, message, options))
  }

  public failed (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStderr(this.format(LogLevels.FAILED, message, options))
  }

  public skipped (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.SKIPPED, message, options))
  }

  public completed (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.COMPLETED, message, options))
  }

  public output (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.OUTPUT, message, options))
  }

  public title (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.TITLE, message, options))
  }

  public retry (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStderr(this.format(LogLevels.RETRY, message, options))
  }

  public rollback (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStderr(this.format(LogLevels.ROLLBACK, message, options))
  }

  public prompt (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.PROMPT, message, options))
  }

  public paused (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(LogLevels.PAUSED, message, options))
  }

  public stdout (message: string | any[], options?: LoggerFieldOptions): void {
    this.process.toStdout(this.format(null, message, options))
  }

  public wrap (message: string, options?: { format?: LoggerFormat }): string {
    message = `[${message}]`

    if (options?.format) {
      return options.format(message)
    }

    return message
  }

  public splat (...args: Parameters<typeof splat>): ReturnType<typeof splat> {
    return splat(...args)
  }

  public suffix (message: string, ...suffixes: LoggerField[]): string {
    suffixes.filter(Boolean).forEach((suffix) => {
      if (typeof suffix === 'string') {
        message = message + ` ${this.wrap(suffix)}`
      } else if (typeof suffix === 'object') {
        const args = suffix.args ?? []

        if (typeof suffix.condition === 'function' ? !suffix.condition(...args) : !(suffix.condition ?? true)) {
          return message
        }

        message =
          message +
          ` ${this.wrap(typeof suffix.field === 'function' ? suffix.field(...args) : suffix.field, {
            format: suffix?.format(...args)
          })}`
      }
    })

    return message
  }

  public prefix (message: string, ...prefixes: LoggerField[]): string {
    prefixes.filter(Boolean).forEach((prefix) => {
      if (typeof prefix === 'string') {
        message = `${this.wrap(prefix)} ` + message
      } else if (typeof prefix === 'object') {
        const args = prefix.args ?? []

        if (typeof prefix.condition === 'function' ? !prefix.condition(...args) : !(prefix.condition ?? true)) {
          return message
        }

        message =
          `${this.wrap(typeof prefix.field === 'function' ? prefix.field(...args) : prefix.field, {
            format: prefix?.format()
          })} ` + message
      }
    })

    return message
  }

  public fields (message: string, options?: LoggerFieldOptions<true>): string {
    if (options?.prefix) {
      message = this.prefix(message, ...options.prefix)
    }

    if (options?.suffix) {
      message = this.suffix(message, ...options.suffix)
    }

    return message
  }

  public icon<T extends RendererStyleMap<K>, K extends string>(map: T, level: K, icon?: string | false): string {
    if (!level) {
      return null
    }

    icon = icon || map.icon?.[level]

    // do the coloring
    const coloring: LoggerFormat = map.color?.[level]

    if (icon && coloring) {
      icon = coloring(icon)
    }

    return icon
  }

  protected format (level: LogLevels, message: string | any[], options?: LoggerFieldOptions): string {
    if (!Array.isArray(message)) {
      message = [ message ]
    }

    message = this.splat(message.shift(), ...message)
      .split(EOL)
      .filter((msg) => msg.trim() !== '')
      .map((msg) => {
        // format messages
        return this.fields(this.style(level, msg), {
          prefix: [ ...this.options?.fieldOptions?.prefix ?? [], ...Array.isArray(options?.prefix) ? options.prefix : [ options?.prefix ] ],
          suffix: [ ...this.options?.fieldOptions?.suffix ?? [], ...Array.isArray(options?.suffix) ? options.suffix : [ options?.suffix ] ]
        })
      })
      .join(EOL)

    return message
  }

  protected style (level: LogLevels, message: string): string {
    if (!level) {
      return message
    }

    const icon = this.icon(this.options.style, level, !this.options.useIcons && this.wrap(level))

    if (icon) {
      message = icon + ' ' + message
    }

    return message
  }
}
