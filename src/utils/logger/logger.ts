/* eslint-disable no-console */
import { EOL } from 'os'

import { LogLevels } from './logger.constants'
import type { LogEntityOptions, LoggerFormat, ListrLoggerOptions, LoggerField } from './logger.interface'
import { color, figures, ProcessOutput, splat } from '@utils'

/**
 * A internal logger for using in the verbose renderer mostly.
 */
export class ListrLogger {
  public readonly process: ProcessOutput

  constructor (private options?: ListrLoggerOptions) {
    this.options = {
      useIcons: true,
      ...options
    }

    this.process = this.options.processOutput ?? new ProcessOutput()
  }

  public started (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.STARTED, message, options))
  }

  public failed (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStderr(this.format(LogLevels.FAILED, message, options))
  }

  public skipped (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.SKIPPED, message, options))
  }

  public completed (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.COMPLETED, message, options))
  }

  public output (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.OUTPUT, message, options))
  }

  public title (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.TITLE, message, options))
  }

  public retry (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStderr(this.format(LogLevels.RETRY, message, options))
  }

  public rollback (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStderr(this.format(LogLevels.ROLLBACK, message, options))
  }

  public prompt (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.PROMPT, message, options))
  }

  public stdout (message: string | string[], options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.STDOUT, message, options))
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
          ` ${this.wrap(typeof suffix.field === 'string' ? suffix.field : suffix.field(...args), {
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
          `${this.wrap(typeof prefix.field === 'string' ? prefix.field : prefix.field(...args), {
            format: prefix?.format()
          })} ` + message
      }
    })

    return message
  }

  public applyToEntity (message: string, options?: LogEntityOptions<true>): string {
    if (options?.prefix) {
      message = this.prefix(message, ...options.prefix)
    }

    if (options?.suffix) {
      message = this.suffix(message, ...options.suffix)
    }

    return message
  }

  protected format (level: LogLevels, message: string | string[], options?: LogEntityOptions): string {
    if (!Array.isArray(message)) {
      message = [ message ]
    }

    message = this.splat(message.shift(), ...message)
      .split(EOL)
      .filter((msg) => msg.trim() !== '')
      .map((msg) => {
        // format messages
        return this.applyToEntity(this.style(level, msg), {
          prefix: [ ...this.options?.entityOptions?.prefix ?? [], ...Array.isArray(options?.prefix) ? options.prefix : [ options?.prefix ] ],
          suffix: [ ...this.options?.entityOptions?.suffix ?? [], ...Array.isArray(options?.suffix) ? options.suffix : [ options?.suffix ] ]
        })
      })
      .join(EOL)

    return message
  }

  protected style (level: LogLevels, message: string): string {
    let icon: string

    // do the coloring
    let coloring: LoggerFormat = (input: string): string => {
      return input
    }

    switch (level) {
    case LogLevels.STDOUT:
      return message

    case LogLevels.FAILED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = color.red
        icon = figures.cross
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.SKIPPED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = color.yellow
        icon = figures.arrowDown
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.COMPLETED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = color.green
        icon = figures.tick
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.OUTPUT:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.pointerSmall
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.PROMPT:
      if (!this.options?.useIcons) {
        icon = this.wrap(level)
      }

      break

    case LogLevels.STARTED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.pointer
        coloring = color.yellow
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.TITLE:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.arrowRight
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.RETRY:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = color.yellowBright
        icon = figures.warning
      } else {
        icon = this.wrap(level)
      }

      break

    case LogLevels.ROLLBACK:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = color.redBright
        icon = figures.arrowLeft
      } else {
        icon = this.wrap(level)
      }

      break
    }

    if (icon) {
      message = coloring(icon) + ' ' + message
    }

    return message
  }
}
