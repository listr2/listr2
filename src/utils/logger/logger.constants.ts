import type { ListrLoggerOptionStyle } from './logger.interface'
import { color, figures } from '@utils'

/** Default loglevels for the logger */
export enum LogLevels {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  OUTPUT = 'OUTPUT',
  TITLE = 'TITLE',
  ROLLBACK = 'ROLLBACK',
  RETRY = 'RETRY',
  PROMPT = 'PROMPT',
  PAUSED = 'PAUSED'
}

export const LISTR_LOGGER_STYLE: ListrLoggerOptionStyle<LogLevels> = {
  icon: {
    [LogLevels.STARTED]: figures.pointer,
    [LogLevels.FAILED]: figures.cross,
    [LogLevels.SKIPPED]: figures.arrowDown,
    [LogLevels.COMPLETED]: figures.tick,
    [LogLevels.OUTPUT]: figures.pointerSmall,
    [LogLevels.TITLE]: figures.arrowRight,
    [LogLevels.RETRY]: figures.warning,
    [LogLevels.ROLLBACK]: figures.arrowLeft,
    [LogLevels.PAUSED]: figures.squareSmallFilled
  },
  color: {
    [LogLevels.STARTED]: color.yellow,
    [LogLevels.FAILED]: color.red,
    [LogLevels.SKIPPED]: color.yellow,
    [LogLevels.COMPLETED]: color.green,
    [LogLevels.RETRY]: color.yellowBright,
    [LogLevels.ROLLBACK]: color.redBright,
    [LogLevels.PAUSED]: color.yellowBright
  }
}
