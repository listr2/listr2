import type { ListrLoggerOptionStyle } from '@utils'
import { color, figures } from '@utils'

export enum ListrDefaultRendererLogLevels {
  SKIPPED_WITH_COLLAPSE = 'SKIPPED_WITH_COLLAPSE',
  SKIPPED_WITHOUT_COLLAPSE = 'SKIPPED_WITHOUT_COLLAPSE',
  OUTPUT = 'OUTPUT',
  OUTPUT_WITH_BOTTOMBAR = 'OUTPUT_WITH_BOTTOMBAR',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  COMPLETED_WITH_FAILED_SUBTASKS = 'COMPLETED_WITH_FAILED_SUBTASKS',
  COMPLETED_WITH_FAILED_SISTER_TASKS = 'COMPLETED_WITH_SISTER_TASKS_FAILED',
  RETRY = 'RETRY',
  ROLLING_BACK = 'ROLLING_BACK',
  ROLLED_BACK = 'ROLLED_BACK',
  FAILED = 'FAILED',
  FAILED_WITH_FAILED_SUBTASKS = 'FAILED_WITH_SUBTASKS',
  WAITING = 'WAITING'
}

export const LISTR_DEFAULT_RENDERER_STYLE: ListrLoggerOptionStyle<ListrDefaultRendererLogLevels> = {
  icon: {
    [ListrDefaultRendererLogLevels.SKIPPED_WITH_COLLAPSE]: figures.arrowDown,
    [ListrDefaultRendererLogLevels.SKIPPED_WITHOUT_COLLAPSE]: figures.warning,
    [ListrDefaultRendererLogLevels.OUTPUT]: figures.pointerSmall,
    [ListrDefaultRendererLogLevels.OUTPUT_WITH_BOTTOMBAR]: figures.pointerSmall,
    [ListrDefaultRendererLogLevels.PENDING]: figures.pointer,
    [ListrDefaultRendererLogLevels.COMPLETED]: figures.tick,
    [ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SUBTASKS]: figures.warning,
    [ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS]: figures.squareSmallFilled,
    [ListrDefaultRendererLogLevels.RETRY]: figures.warning,
    [ListrDefaultRendererLogLevels.ROLLING_BACK]: figures.warning,
    [ListrDefaultRendererLogLevels.ROLLED_BACK]: figures.arrowLeft,
    [ListrDefaultRendererLogLevels.FAILED]: figures.cross,
    [ListrDefaultRendererLogLevels.FAILED_WITH_FAILED_SUBTASKS]: figures.pointer,
    [ListrDefaultRendererLogLevels.WAITING]: figures.squareSmallFilled
  },
  color: {
    [ListrDefaultRendererLogLevels.SKIPPED_WITH_COLLAPSE]: color.yellow,
    [ListrDefaultRendererLogLevels.SKIPPED_WITHOUT_COLLAPSE]: color.yellow,
    [ListrDefaultRendererLogLevels.PENDING]: color.yellow,
    [ListrDefaultRendererLogLevels.COMPLETED]: color.green,
    [ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SUBTASKS]: color.yellow,
    [ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS]: color.red,
    [ListrDefaultRendererLogLevels.RETRY]: color.yellowBright,
    [ListrDefaultRendererLogLevels.ROLLING_BACK]: color.redBright,
    [ListrDefaultRendererLogLevels.ROLLED_BACK]: color.redBright,
    [ListrDefaultRendererLogLevels.FAILED]: color.red,
    [ListrDefaultRendererLogLevels.FAILED_WITH_FAILED_SUBTASKS]: color.red,
    [ListrDefaultRendererLogLevels.WAITING]: color.dim
  }
}
