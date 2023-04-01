import { EOL } from 'os'

import { LogLevels, LISTR_LOGGER_STYLE } from './logger.constants'
import type { ListrLoggerOptions, LoggerField, LoggerFieldOptions, LoggerFormat } from './logger.interface'
import { ProcessOutput, splat } from '@utils'

/**
 * A internal logger for using in the verbose renderer mostly.
 */
export class ListrLogger<Levels extends string = LogLevels> {
  public readonly process: ProcessOutput

  constructor (private readonly options?: ListrLoggerOptions<Levels>) {
    this.options = {
      useIcons: true,
      ...options,
      style: {
        icon: {
          ...(LISTR_LOGGER_STYLE.icon as any),
          ...this.options?.style?.icon ?? {}
        },
        color: {
          ...(LISTR_LOGGER_STYLE.color as any),
          ...this.options?.style?.color ?? {}
        }
      },
      toStderr: [ LogLevels.FAILED, LogLevels.RETRY, LogLevels.ROLLBACK ] as Levels[]
    }

    this.process = this.options.processOutput ?? new ProcessOutput()
  }

  public log (level: Levels, message: string | any[], options?: LoggerFieldOptions): void {
    if (this.options.toStderr.includes(level)) {
      this.process.toStderr(this.format(level, message, options))

      return
    }

    this.process.toStdout(this.format(level, message, options))
  }

  public toStdout (message: string | any[], options?: LoggerFieldOptions, eol = true): void {
    this.process.toStdout(this.format(null, message, options), eol)
  }

  public toStderr (message: string | any[], options?: LoggerFieldOptions, eol = true): void {
    this.process.toStderr(this.format(null, message, options), eol)
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

  public icon (level: Levels, icon?: string | false): string {
    if (!level) {
      return null
    }

    icon = icon || this.options.style.icon?.[level]

    // do the coloring
    const coloring: LoggerFormat = this.options.style.color?.[level]

    if (icon && coloring) {
      icon = coloring(icon)
    }

    return icon
  }

  protected format (level: Levels, message: string | any[], options?: LoggerFieldOptions): string {
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

  protected style (level: Levels, message: string): string {
    if (!level) {
      return message
    }

    const icon = this.icon(level, !this.options.useIcons && this.wrap(level))

    if (icon) {
      message = icon + ' ' + message
    }

    return message
  }
}
