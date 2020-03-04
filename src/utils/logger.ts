/* eslint-disable no-console */
import chalk from 'chalk'
import figures from 'figures'

import { logLevels } from './logger.constants'

export class Logger {

  public fail (message: string): void {
    message = this.parseMessage(logLevels.fail, message)
    console.error(message)
  }

  public skip (message: string): void {
    message = this.parseMessage(logLevels.fail, message)
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
    console.info(message)
  }

  private parseMessage (level: logLevels ,message: string): string {
    // parse multi line messages
    let multiLineMessage = message?.split('\n')
    multiLineMessage = multiLineMessage?.map((msg) => {
      // format messages
      return this.logColoring({ level, message: msg })
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
      coloring = chalk.red
      icon = figures.cross
      break
    case logLevels.skip:
      coloring = chalk.yellow
      icon = figures.arrowDown
      break
    case logLevels.success:
      coloring = chalk.green
      icon = figures.tick
      break
    case logLevels.data:
      icon = figures.arrowRight
      break
    case logLevels.start:
      icon = figures.pointer
      break
    default:
      icon = figures.pointer
      break
    }

    return coloring(`${icon} ${message}`)
  }
}
