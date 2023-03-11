import { ListrEventType, ListrTaskEventType } from '@constants/event.constants'
import { ListrTaskState } from '@constants/state.constants'
import type { ListrRenderer } from '@interfaces/renderer.interface'
import type { Task } from '@lib/task'
import type { ListrEventMap } from '@root/interfaces/event-map.interface'
import type { EventManager } from '@root/utils/task-event-manager'
import { Logger } from '@utils/logger'
import { parseTaskTime } from '@utils/parse-time'

export class VerboseRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the verbose renderer */
  public static rendererOptions:
  | {
    /**
         * useIcons instead of text for log level
         * @default false
         */
    useIcons?: boolean
    /**
         * log tasks with empty titles
         * @default true
         */
    logEmptyTitle?: boolean
    /**
         * log title changes
         * @default true
         */
    logTitleChange?: boolean
    /**
         * show duration for all tasks
         */
    showTimer?: boolean
  } & {
    /**
         * inject a custom logger
         */
    logger?: new (...args: any) => Logger

    /**
         * inject options to custom logger
         */
    options?: any
  } = {
      useIcons: false,
      logEmptyTitle: true,
      logTitleChange: true
    }
  /** per task options for the verbose renderer */
  public static rendererTaskOptions: never
  private logger: Logger

  constructor (
    public tasks: Task<any, typeof VerboseRenderer>[],
    public options: (typeof VerboseRenderer)['rendererOptions'],
    public events: EventManager<ListrEventType, ListrEventMap>
  ) {
    if (!this.options?.logger) {
      this.logger = new Logger({ useIcons: this.options?.useIcons })
    } /* istanbul ignore next */ else {
      this.logger = new this.options.logger()
    }

    this.options = { ...VerboseRenderer.rendererOptions, ...this.options }
  }

  public render (): void {
    this.events.on(ListrEventType.SHOULD_REFRESH_RENDER, () => {
      // console.log('i should re render')
    })
    this.verboseRenderer(this.tasks)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public end (): void {}

  // verbose renderer multi-level
  private verboseRenderer (tasks: Task<any, typeof VerboseRenderer>[]): void {
    return tasks?.forEach((task) => {
      task.on(ListrTaskEventType.STATE, (state) => {
        if (task.hasTitle() || this.options?.logEmptyTitle !== false) {
          const title = task.hasTitle() ? task.title : 'Task without title.'

          switch (state) {
          case ListrTaskState.PENDING:
            this.logger.start(title)

            break

          case ListrTaskState.COMPLETED:
            this.logger.success(title + (this.options?.showTimer && task.message?.duration ? ` [${parseTaskTime(task.message.duration)}]` : ''))

            break
          }
        }
      })

      task.on(ListrTaskEventType.DATA, (data) => {
        this.logger.data(data)
      })

      if (this.options?.logTitleChange !== false) {
        task.on(ListrTaskEventType.TITLE, (title) => {
          this.logger.title(title)
        })
      }

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message?.error) {
          // error message
          this.logger.fail(message.error)
        } else if (message?.skip) {
          // skip message
          this.logger.skip(message.skip)
        } else if (message?.rollback) {
          // rollback message
          this.logger.rollback(message.rollback)
        } else if (message?.retry) {
          const title = task.hasTitle() ? task.title : 'Task without title.'

          this.logger.retry(`[${message.retry.count}] ` + title)
        }
      })
    })
  }
}
