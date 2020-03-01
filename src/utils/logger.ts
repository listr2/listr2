import chalk from 'chalk'
import figures from 'figures'
import pad from 'pad'
import { createLogger, format, transports } from 'winston'

import { logLevels } from './logger.constants'
import { ILogger , ILoggerFormat } from './logger.interface'

export class Logger {
  static readonly levels = {
    [logLevels.fail]: 1,
    [logLevels.skip]: 2,
    [logLevels.success]: 3,
    [logLevels.data]: 4,
    [logLevels.start]: 5
  }

  public log: ILogger

  constructor (logLevel?: logLevels) {
    this.log = this.initiateLogger(logLevel)
  }

  private initiateLogger (logLevel?: logLevels): ILogger {
    const loglevel: string = logLevel
    const logFormat = format.printf(({ level, message }: ILoggerFormat) => {
      // parse multi line messages
      let multiLineMessage = message?.split('\n')
      multiLineMessage = multiLineMessage?.map((msg) => {
        // format messages
        return this.logColoring({ level, message: msg })
      })
      // join back multi line messages
      message = multiLineMessage?.join('\n')
      return message
    })

    return createLogger({
      level: loglevel || logLevels.start,
      silent: (loglevel === logLevels.silent),
      format: format.combine(logFormat),
      levels: Logger.levels,
      transports: [new transports.Console()]
    }) as ILogger
  }

  private logColoring ({ level, message }: ILoggerFormat): string {
    let icon: string

    // parse context from custom or module
    const context = level

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

    return coloring(`${icon} ${pad(context.toUpperCase(), 8)} | ${message}`)
  }
}
