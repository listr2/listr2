import type { ListrVerboseRendererOptions, ListrVerboseRendererTask, VerboseRendererOptions, VerboseRendererTaskOptions } from './renderer.interface'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrRenderer } from '@interfaces'
import type { Task } from '@lib'
import { parseTimer } from '@presets'
import { ListrLogger, LogLevels, cleanseAnsi } from '@utils'

export class VerboseRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the verbose renderer */
  public static rendererOptions: VerboseRendererOptions = {
    logTitleChange: false,
    logger: ListrLogger
  }
  /** per task options for the verbose renderer */
  public static rendererTaskOptions: VerboseRendererTaskOptions

  private logger: ListrLogger

  constructor (private readonly tasks: ListrVerboseRendererTask[], private readonly options: ListrVerboseRendererOptions) {
    this.options = {
      ...VerboseRenderer.rendererOptions,
      ...this.options,
      loggerOptions: {
        useIcons: false,
        ...this.options?.loggerOptions ?? {},
        fieldOptions: {
          prefix: [ this.options?.timestamp ],
          ...this.options?.loggerOptions?.fieldOptions ?? {}
        }
      }
    }

    this.logger = new this.options.logger(this.options.loggerOptions)
  }

  public render (): void {
    this.renderer(this.tasks)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public end (): void {}

  public getSelfOrParentOption<K extends keyof ListrVerboseRendererOptions>(task: Task<any, typeof VerboseRenderer>, key: K): ListrVerboseRendererOptions[K] {
    return task?.rendererOptions?.[key] ?? this.options?.[key]
  }

  // verbose renderer multi-level
  private renderer (tasks: ListrVerboseRendererTask[]): void {
    return tasks?.forEach((task) => {
      task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
        this.renderer(subtasks)
      })

      task.on(ListrTaskEventType.STATE, (state) => {
        if (!task.hasTitle()) {
          return
        }

        if (state === ListrTaskState.STARTED) {
          this.logger.log(LogLevels.STARTED, task.title)
        } else if (state === ListrTaskState.COMPLETED) {
          const timer = this.getSelfOrParentOption(task, 'timer')

          this.logger.log(
            LogLevels.COMPLETED,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!task.message?.duration && timer.condition,
                args: [ task.message.duration ]
              }
            }
          )
        }
      })

      task.on(ListrTaskEventType.OUTPUT, (data) => {
        this.logger.log(LogLevels.OUTPUT, data)
      })

      task.on(ListrTaskEventType.PROMPT, (prompt) => {
        const cleansed = cleanseAnsi(prompt).trim()

        if (cleansed) {
          this.logger.log(LogLevels.PROMPT, cleansed)
        }
      })

      if (this.options?.logTitleChange !== false) {
        task.on(ListrTaskEventType.TITLE, (title) => {
          this.logger.log(LogLevels.TITLE, title)
        })
      }

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message?.error) {
          // error message
          this.logger.log(LogLevels.FAILED, message.error)
        } else if (message?.skip) {
          // skip message
          this.logger.log(LogLevels.SKIPPED, message.skip)
        } else if (message?.rollback) {
          // rollback message
          this.logger.log(LogLevels.ROLLBACK, message.rollback)
        } else if (message?.retry) {
          this.logger.log(LogLevels.RETRY, task.title, { suffix: message.retry.count.toString() })
        } else if (message?.paused) {
          this.logger.log(LogLevels.PAUSED, task.title, { suffix: parseTimer(message.paused - Date.now()) })
        }
      })
    })
  }
}
