/* eslint-disable no-console */
import chalk from 'chalk'
import figures from 'figures'

import { logLevels } from './logger.constants'

export interface LoggerOptions {
  useIcons: boolean
}

export class Logger {
  constructor (private options?: LoggerOptions) {}

  public fail (message: string): void {
    message = this.parseMessage(logLevels.fail, message)
    console.error(message)
  }

  public skip (message: string): void {
    message = this.parseMessage(logLevels.skip, message)
    console.warn(message)
  }

  public success (message: string): void {
    message = this.parseMessage(logLevels.success, message)
    console.log(message)
  }

  public data (message: string): void {
    message = this.parseMessage(logLevels.data, message)
    console.info(message)
  }

  public start (message: string): void {
    message = this.parseMessage(logLevels.start, message)
    console.log(message)
  }

  public title (message: string): void {
    message = this.parseMessage(logLevels.title, message)
    console.info(message)
  }

  private parseMessage (level: logLevels, message: string): string {
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

  private logColoring ({ level, message }: { level: logLevels, message: string }): string {
    let icon: string

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }
    switch (level) {
    case logLevels.fail:
      if (this.options?.useIcons) {
        coloring = chalk.red
        icon = figures.main.cross
      } else {
        icon = '[FAILED]'
      }

      break
    case logLevels.skip:
      if (this.options?.useIcons) {
        coloring = chalk.yellow
        icon = figures.main.arrowDown
      } else {
        icon = '[SKIPPED]'
      }
      break
    case logLevels.success:
      if (this.options?.useIcons) {
        coloring = chalk.green
        icon = figures.main.tick
      } else {
        icon = '[SUCCESS]'
      }
      break
    case logLevels.data:
      if (this.options?.useIcons) {
        icon = figures.main.arrowRight
      } else {
        icon = '[DATA]'
      }
      break
    case logLevels.start:
      if (this.options?.useIcons) {
        icon = figures.main.pointer
      } else {
        icon = '[STARTED]'
      }
      break
    case logLevels.title:
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
