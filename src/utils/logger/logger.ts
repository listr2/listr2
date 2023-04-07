import { EOL } from 'os'

import type { ListrLoggerOptions, LoggerField, LoggerFieldOptions, LoggerFormat } from './logger.interface'
import { ProcessOutput, splat } from '@utils'

/**
 * Creates a new Listr2 logger.
 *
 * This logger is used throughout the renderers for consistency.
 *
 * @see {@link https://listr2.kilic.dev/renderer/logger.html}
 */
export class ListrLogger<Levels extends string = string> {
  public readonly process: ProcessOutput

  constructor (public options?: ListrLoggerOptions<Levels>) {
    this.options = {
      useIcons: true,
      toStderr: [],
      ...options ?? {}
    }

    this.options.fields ??= {}
    this.options.fields.prefix ??= []
    this.options.fields.suffix ??= []

    this.process = this.options.processOutput ?? new ProcessOutput()
  }

  public log (level: Levels, message: string | any[], options?: LoggerFieldOptions): void {
    const output = this.format(level, message, options)

    if (this.options.toStderr.includes(level)) {
      this.process.toStderr(output)

      return
    }

    this.process.toStdout(output)
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
        suffix.args ??= []

        if (typeof suffix.condition === 'function' ? !suffix.condition(...suffix.args) : !(suffix.condition ?? true)) {
          return message
        }

        message =
          message +
          ` ${this.wrap(typeof suffix.field === 'function' ? suffix.field(...suffix.args) : suffix.field, {
            format: suffix?.format(...suffix.args)
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
        prefix.args ??= []

        if (typeof prefix.condition === 'function' ? !prefix.condition(...prefix.args) : !(prefix.condition ?? true)) {
          return message
        }

        message =
          `${this.wrap(typeof prefix.field === 'function' ? prefix.field(...prefix.args) : prefix.field, {
            format: prefix?.format()
          })} ` + message
      }
    })

    return message
  }

  public fields (message: string, options?: LoggerFieldOptions<true>): string {
    if (this.options?.fields?.prefix) {
      message = this.prefix(message, ...this.options.fields.prefix)
    }

    if (options?.prefix) {
      message = this.prefix(message, ...options.prefix)
    }

    if (options?.suffix) {
      message = this.suffix(message, ...options.suffix)
    }

    if (this.options?.fields?.suffix) {
      message = this.suffix(message, ...this.options.fields.suffix)
    }

    return message
  }

  public icon (level: Levels, icon?: string | false): string {
    if (!level) {
      return null
    }

    icon = icon || this.options.icon?.[level]

    // do the coloring
    const coloring: LoggerFormat = this.options.color?.[level]

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
          prefix: Array.isArray(options?.prefix) ? options.prefix : [ options?.prefix ],
          suffix: Array.isArray(options?.suffix) ? options.suffix : [ options?.suffix ]
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
