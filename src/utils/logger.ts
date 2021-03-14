/* eslint-disable no-console */
import figures from 'figures'

import { LogLevels } from './logger.constants'
import { LoggerOptions } from './logger.interface'
import chalk from '@utils/chalk'

/**
 * A internal logger for using in the verbose renderer mostly.
 */
export class Logger {
  constructor (private options?: LoggerOptions) {}

  public fail (message: string): void {
    message = this.parseMessage(LogLevels.fail, message)
    console.error(message)
  }

  public skip (message: string): void {
    message = this.parseMessage(LogLevels.skip, message)
    console.info(message)
  }

  public success (message: string): void {
    message = this.parseMessage(LogLevels.success, message)
    console.log(message)
  }

  public data (message: string): void {
    message = this.parseMessage(LogLevels.data, message)
    console.info(message)
  }

  public start (message: string): void {
    message = this.parseMessage(LogLevels.start, message)
    console.log(message)
  }

  public title (message: string): void {
    message = this.parseMessage(LogLevels.title, message)
    console.info(message)
  }

  public retry (message: string): void {
    message = this.parseMessage(LogLevels.retry, message)

    console.warn(message)
  }

  public rollback (message: string): void {
    message = this.parseMessage(LogLevels.rollback, message)

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
    let coloring = (input: string): string => input

    switch (level) {
    case LogLevels.fail:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.cross
      } else {
        icon = '[FAILED]'
      }

      break
    case LogLevels.skip:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.yellow
        icon = figures.main.arrowDown
      } else {
        icon = '[SKIPPED]'
      }
      break
    case LogLevels.success:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.green
        icon = figures.main.tick
      } else {
        icon = '[SUCCESS]'
      }
      break
    case LogLevels.data:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.main.arrowRight
      } else {
        icon = '[DATA]'
      }
      break
    case LogLevels.start:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.main.pointer
      } else {
        icon = '[STARTED]'
      }
      break
    case LogLevels.title:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        icon = figures.main.checkboxOn
      } else {
        icon = '[TITLE]'
      }
      break
    case LogLevels.retry:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.keyword('orange')
        icon = figures.main.pointer
      } else {
        icon = '[RETRY]'
      }
      break
    case LogLevels.rollback:
      /* istanbul ignore if */
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.arrowLeft
      } else {
        icon = '[ROLLBACK]'
      }
      break
    }

    return coloring(`${icon} ${message}`)
  }
}
