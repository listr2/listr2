/* eslint-disable no-console */
import { figures } from './figures'
import { LogLevels } from './logger.constants'
import type { LoggerOptions } from './logger.interface'
import colorette from '@utils/colorette'

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
    let icon: string

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }

    switch (level) {
    case LogLevels.FAILED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = colorette.red
        icon = figures.cross
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.SKIPPED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = colorette.yellow
        icon = figures.arrowDown
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.SUCCESS:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = colorette.green
        icon = figures.tick
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.DATA:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.arrowRight
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.STARTED:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.pointer
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.TITLE:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.checkboxOn
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.RETRY:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = colorette.yellow
        icon = figures.pointer
      } else {
        icon = this.wrapInBrackets(level)
      }

      break

    case LogLevels.ROLLBACK:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = colorette.red
        icon = figures.arrowLeft
      } else {
        icon = this.wrapInBrackets(level)
      }

      break
    }

    return coloring(`${icon} ${message}`)
  }

  private wrapInBrackets (level: string): string {
    return `[${level}]`
  }
}
