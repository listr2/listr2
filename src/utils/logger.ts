/* eslint-disable no-console */
import chalk from 'chalk'
import figures from 'figures'

import { logLevels } from './logger.constants'

export interface LoggerOptions {
  direct: boolean
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
    let multiLineMessage = message?.split('\n')
    multiLineMessage = multiLineMessage?.map((msg) => {
      // format messages
      return this.logColoring({
        level, message: msg
      })
    })
    // join back multi line messages
    message = multiLineMessage?.join('\n')

    return message
  }

  private logColoring ({ level, message }: {level: logLevels, message: string}): string {
    let icon: string

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }
    switch (level) {
    case logLevels.fail:
      if (!this.options?.direct) {
        coloring = chalk.red
        icon = figures.cross
      } else {
        icon = '[FAILED]'
      }

      break
    case logLevels.skip:
      if (!this.options?.direct) {
        coloring = chalk.yellow
        icon = figures.arrowDown
      } else {
        icon ='[SKIPPED]'
      }
      break
    case logLevels.success:
      if (!this.options?.direct) {
        coloring = chalk.green
        icon = figures.tick
      } else {
        icon = '[SUCCESS]'
      }
      break
    case logLevels.data:
      if (!this.options?.direct) {
        icon = figures.arrowRight
      } else {
        icon = '[DATA]'
      }
      break
    case logLevels.start:
      if (!this.options?.direct) {
        icon = figures.pointer
      } else {
        icon = '[STARTED]'
      }
      break
    case logLevels.title:
      if (!this.options?.direct) {
        icon = figures.checkboxOn
      } else {
        icon = '[TITLE]'
      }
      break
    default:
      icon = figures.pointer
      break
    }

    return coloring(`${icon} ${message}`)
  }
}
