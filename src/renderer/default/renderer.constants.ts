import type { ListrLoggerStyleMap } from '@utils'
import { color, figures } from '@utils'

export enum ListrDefaultRendererListrLogLevels {
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
  WAITING = 'WAITING',
  PAUSED = 'PAUSED'
}

export const LISTR_DEFAULT_RENDERER_STYLE: ListrLoggerStyleMap<ListrDefaultRendererListrLogLevels> = {
  icon: {
    [ListrDefaultRendererListrLogLevels.SKIPPED_WITH_COLLAPSE]: figures.arrowDown,
    [ListrDefaultRendererListrLogLevels.SKIPPED_WITHOUT_COLLAPSE]: figures.warning,
    [ListrDefaultRendererListrLogLevels.OUTPUT]: figures.pointerSmall,
    [ListrDefaultRendererListrLogLevels.OUTPUT_WITH_BOTTOMBAR]: figures.pointerSmall,
    [ListrDefaultRendererListrLogLevels.PENDING]: figures.pointer,
    [ListrDefaultRendererListrLogLevels.COMPLETED]: figures.tick,
    [ListrDefaultRendererListrLogLevels.COMPLETED_WITH_FAILED_SUBTASKS]: figures.warning,
    [ListrDefaultRendererListrLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS]: figures.squareSmallFilled,
    [ListrDefaultRendererListrLogLevels.RETRY]: figures.warning,
    [ListrDefaultRendererListrLogLevels.ROLLING_BACK]: figures.warning,
    [ListrDefaultRendererListrLogLevels.ROLLED_BACK]: figures.arrowLeft,
    [ListrDefaultRendererListrLogLevels.FAILED]: figures.cross,
    [ListrDefaultRendererListrLogLevels.FAILED_WITH_FAILED_SUBTASKS]: figures.pointer,
    [ListrDefaultRendererListrLogLevels.WAITING]: figures.squareSmallFilled,
    [ListrDefaultRendererListrLogLevels.PAUSED]: figures.squareSmallFilled
  },
  color: {
    [ListrDefaultRendererListrLogLevels.SKIPPED_WITH_COLLAPSE]: color.yellow,
    [ListrDefaultRendererListrLogLevels.SKIPPED_WITHOUT_COLLAPSE]: color.yellow,
    [ListrDefaultRendererListrLogLevels.PENDING]: color.yellow,
    [ListrDefaultRendererListrLogLevels.COMPLETED]: color.green,
    [ListrDefaultRendererListrLogLevels.COMPLETED_WITH_FAILED_SUBTASKS]: color.yellow,
    [ListrDefaultRendererListrLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS]: color.red,
    [ListrDefaultRendererListrLogLevels.RETRY]: color.yellowBright,
    [ListrDefaultRendererListrLogLevels.ROLLING_BACK]: color.redBright,
    [ListrDefaultRendererListrLogLevels.ROLLED_BACK]: color.redBright,
    [ListrDefaultRendererListrLogLevels.FAILED]: color.red,
    [ListrDefaultRendererListrLogLevels.FAILED_WITH_FAILED_SUBTASKS]: color.red,
    [ListrDefaultRendererListrLogLevels.WAITING]: color.dim,
    [ListrDefaultRendererListrLogLevels.PAUSED]: color.yellowBright
  }
}
