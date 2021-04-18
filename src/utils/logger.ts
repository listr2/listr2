/* eslint-disable no-console */
import * as figures from 'figures'

import { LogLevels } from './logger.constants'
import { LoggerOptions } from './logger.interface'
import UnreachableError from './unreachable-error'
import chalk from '@utils/chalk'

/**
 * A internal logger for using in the verbose renderer mostly.
 */
export class Logger {
  constructor (private options?: LoggerOptions) {}

  public fail (message: string): void {
    message = this.parseMessage(LogLevels.FAILED, message)
    console.error(message)
  }

  public skip (message: string): void {
    message = this.parseMessage(LogLevels.SKIPPED, message)
    console.info(message)
  }

  public success (message: string): void {
    message = this.parseMessage(LogLevels.SUCCESS, message)
    console.log(message)
  }

  public data (message: string): void {
    message = this.parseMessage(LogLevels.DATA, message)
    console.info(message)
  }

  public start (message: string): void {
    message = this.parseMessage(LogLevels.STARTED, message)
    console.log(message)
  }

  public title (message: string): void {
    message = this.parseMessage(LogLevels.TITLE, message)
    console.info(message)
  }

  public retry (message: string): void {
    message = this.parseMessage(LogLevels.RETRY, message)

    console.warn(message)
  }

  public rollback (message: string): void {
    message = this.parseMessage(LogLevels.ROLLBACK, message)

    console.warn(message)
  }

  protected parseMessage (level: LogLevels, message: string): string {
    // parse multi line messages
    let multiLineMessage: string[]

    try {
      multiLineMessage = message.split('\n')
    } catch /* istanbul ignore next */ {
      multiLineMessage = [ message ]
    }

    multiLineMessage = multiLineMessage.map((msg) => {
      // format messages
      return this.logColoring({
        level,
        message: msg
      })
    })
    // join back multi line messages
    message = multiLineMessage.join('\n')

    return message
  }

  protected logColoring ({ level, message }: { level: LogLevels, message: string }): string {
    let icon: string | undefined

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }
    switch (level) {
    case LogLevels.FAILED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.cross
      } else {
        icon = this.wrapInBrackets(level)
      }

      break
    case LogLevels.SKIPPED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.yellow
        icon = figures.main.arrowDown
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.SUCCESS:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.green
        icon = figures.main.tick
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.DATA:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.main.arrowRight
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.STARTED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.main.pointer
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.TITLE:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.main.checkboxOn
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.RETRY:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.keyword('orange')
        icon = figures.main.pointer
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.ROLLBACK:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.arrowLeft
      } else {
        icon = this.wrapInBrackets(level)
      }
      break
    case LogLevels.SILENT:
      // This case clause is defined only to serve the purpose of an
      // exhaustive switch pattern
      break
    default: throw new UnreachableError(level, `Unexpected log level: ${level}`)
    }

    return coloring(`${icon} ${message}`)
  }

  private wrapInBrackets (level: string): string {
    return `[${level}]`
  }
}
