import { LeveledLogMethod, Logger as Winston } from 'winston'

import { logLevels } from './logger.constants'

export interface ILoggerFormat {
  level: string
  message: string
}

export type ILogger = Winston & Record<keyof typeof logLevels, LeveledLogMethod>
