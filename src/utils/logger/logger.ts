/* eslint-disable no-console */
import { EOL } from 'os'

import { LogLevels } from './logger.constants'
import type { LogEntityOptions, LoggerFormat, ListrLoggerOptions, LoggerField } from './logger.interface'
import { color, figures, ProcessOutput } from '@utils'

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

  public started (message: string, options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.STARTED, message, options))
  }

  public failed (message: string, options?: LogEntityOptions): void {
    this.process.writeToStderr(this.format(LogLevels.FAILED, message, options))
  }

  public skipped (message: string, options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.SKIPPED, message, options))
  }

  public completed (message: string, options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.COMPLETED, message, options))
  }

  public output (message: string, options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.OUTPUT, message, options))
  }

  public title (message: string, options?: LogEntityOptions): void {
    this.process.writeToStdout(this.format(LogLevels.TITLE, message, options))
  }

  public retry (message: string, options?: LogEntityOptions): void {
    this.process.writeToStderr(this.format(LogLevels.RETRY, message, options))
  }

  public rollback (message: string, options?: LogEntityOptions): void {
    this.process.writeToStderr(this.format(LogLevels.ROLLBACK, message, options))
  }

  public wrap (message: string, options?: { format?: LoggerFormat }): string {
    message = `[${message}]`

    if (options?.format) {
      return options.format(message)
    }

    return message
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
          ` ${this.wrap(typeof suffix.data === 'string' ? suffix.data : suffix.data(...args), {
            format: suffix.conditionalFormat ? suffix.conditionalFormat(...args) : suffix.format
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
          `${this.wrap(typeof prefix.data === 'string' ? prefix.data : prefix.data(...args), {
            format: prefix.conditionalFormat ? prefix.conditionalFormat(...args) : prefix.format
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

  protected format (level: LogLevels, message: string, options?: LogEntityOptions): string {
    // parse multi line messages
    let multiLineMessage: string[]

    try {
      multiLineMessage = message.split(EOL)
    } catch /* istanbul ignore next */ {
      multiLineMessage = [ message ]
    }

    multiLineMessage = multiLineMessage
      .filter((msg) => String(msg).trim() !== '')
      .map((msg) => {
        // format messages
        return this.applyToEntity(this.style(level, msg), {
          prefix: [ ...this.options?.entityOptions?.prefix ?? [], ...Array.isArray(options?.prefix) ? options.prefix : [ options?.prefix ] ],
          suffix: [ ...this.options?.entityOptions?.suffix ?? [], ...Array.isArray(options?.suffix) ? options.suffix : [ options?.suffix ] ]
        })
      })

    // join back multi line messages
    message = multiLineMessage.join(EOL)

    return message
  }

  protected style (level: LogLevels, message: string): string {
    let icon: string

    // do the coloring
    let coloring: LoggerFormat = (input: string): string => {
      return input
    }

    switch (level) {
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

    message = coloring(icon) + ' ' + message

    return message
  }
}
