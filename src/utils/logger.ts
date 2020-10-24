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

  protected parseMessage (level: LogLevels, message: string): string {
    // parse multi line messages
    let multiLineMessage: string[]

    try {
      multiLineMessage = message.split('\n')
    } catch {
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
    case LogLevels.fail:
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.cross
      } else {
        icon = '[FAILED]'
      }

      break
    case LogLevels.skip:
      if (this.options?.useIcons) {
        coloring = chalk.yellow
        icon = figures.main.arrowDown
      } else {
        icon = '[SKIPPED]'
      }
      break
    case LogLevels.success:
      if (this.options?.useIcons) {
        coloring = chalk.green
        icon = figures.main.tick
      } else {
        icon = '[SUCCESS]'
      }
      break
    case LogLevels.data:
      if (this.options?.useIcons) {
        icon = figures.main.arrowRight
      } else {
        icon = '[DATA]'
      }
      break
    case LogLevels.start:
      if (this.options?.useIcons) {
        icon = figures.main.pointer
      } else {
        icon = '[STARTED]'
      }
      break
    case LogLevels.title:
      if (this.options?.useIcons) {
        icon = figures.main.checkboxOn
      } else {
        icon = '[TITLE]'
      }
      break
    }

    return coloring(`${icon} ${message}`)
  }
}
