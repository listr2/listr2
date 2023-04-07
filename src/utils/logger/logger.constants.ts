import type { ListrLoggerStyleMap } from './logger.interface'
import { color, figures } from '@utils'

/** Default ListrLogLevels for the logger */
export enum ListrLogLevels {
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

export const LISTR_LOGGER_STYLE: ListrLoggerStyleMap<ListrLogLevels> = {
  icon: {
    [ListrLogLevels.STARTED]: figures.pointer,
    [ListrLogLevels.FAILED]: figures.cross,
    [ListrLogLevels.SKIPPED]: figures.arrowDown,
    [ListrLogLevels.COMPLETED]: figures.tick,
    [ListrLogLevels.OUTPUT]: figures.pointerSmall,
    [ListrLogLevels.TITLE]: figures.arrowRight,
    [ListrLogLevels.RETRY]: figures.warning,
    [ListrLogLevels.ROLLBACK]: figures.arrowLeft,
    [ListrLogLevels.PAUSED]: figures.squareSmallFilled
  },
  color: {
    [ListrLogLevels.STARTED]: color.yellow,
    [ListrLogLevels.FAILED]: color.red,
    [ListrLogLevels.SKIPPED]: color.yellow,
    [ListrLogLevels.COMPLETED]: color.green,
    [ListrLogLevels.RETRY]: color.yellowBright,
    [ListrLogLevels.ROLLBACK]: color.redBright,
    [ListrLogLevels.PAUSED]: color.yellowBright
  }
}

export const LISTR_LOGGER_STDERR_LEVELS: ListrLogLevels[] = [ ListrLogLevels.RETRY, ListrLogLevels.ROLLBACK, ListrLogLevels.FAILED ]
