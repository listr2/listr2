import type { ListrVerboseRendererCache, ListrVerboseRendererOptions, ListrVerboseRendererTask, ListrVerboseRendererTaskOptions } from './renderer.interface'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrRenderer } from '@interfaces'
import { PRESET_TIMER } from '@presets'
import { LISTR_LOGGER_STDERR_LEVELS, LISTR_LOGGER_STYLE, ListrLogLevels, ListrLogger, cleanseAnsi, color } from '@utils'

export class VerboseRenderer implements ListrRenderer {
  public static nonTTY = true
  public static rendererOptions: ListrVerboseRendererOptions = {
    logTitleChange: false,
    pausedTimer: {
      ...PRESET_TIMER,
      format: () => color.yellowBright
    }
  }
  public static rendererTaskOptions: ListrVerboseRendererTaskOptions

  private logger: ListrLogger
  private readonly cache: ListrVerboseRendererCache = {
    rendererOptions: new Map(),
    rendererTaskOptions: new Map()
  }

  constructor(
    private readonly tasks: ListrVerboseRendererTask[],
    private readonly options: ListrVerboseRendererOptions
  ) {
    this.options = {
      ...VerboseRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ...(options?.icon ?? {})
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ...(options?.color ?? {})
      }
    }

    this.logger = this.options.logger ?? new ListrLogger<ListrLogLevels>({ useIcons: false, toStderr: LISTR_LOGGER_STDERR_LEVELS })

    this.logger.options.icon = this.options.icon
    this.logger.options.color = this.options.color

    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp)
    }
  }

  public render(): void {
    this.renderer(this.tasks)
  }

  public end(): void {}

  private renderer(tasks: ListrVerboseRendererTask[]): void {
    tasks.forEach((task) => {
      this.calculate(task)

      task.once(ListrTaskEventType.CLOSED, () => {
        this.reset(task)
      })

      const rendererOptions = this.cache.rendererOptions.get(task.id)
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id)

      task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
        this.renderer(subtasks)
      })

      task.on(ListrTaskEventType.STATE, (state) => {
        if (!task.hasTitle()) {
          return
        }

        if (state === ListrTaskState.STARTED) {
          this.logger.log(ListrLogLevels.STARTED, task.title)
        } else if (state === ListrTaskState.COMPLETED) {
          const timer = rendererTaskOptions.timer

          this.logger.log(
            ListrLogLevels.COMPLETED,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!task.message?.duration && timer.condition,
                args: [task.message.duration]
              }
            }
          )
        }
      })

      task.on(ListrTaskEventType.OUTPUT, (data) => {
        this.logger.log(ListrLogLevels.OUTPUT, data)
      })

      task.on(ListrTaskEventType.PROMPT, (prompt) => {
        const cleansed = cleanseAnsi(prompt)

        if (cleansed) {
          this.logger.log(ListrLogLevels.PROMPT, cleansed)
        }
      })

      if (this.options?.logTitleChange !== false) {
        task.on(ListrTaskEventType.TITLE, (title) => {
          this.logger.log(ListrLogLevels.TITLE, title)
        })
      }

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message?.error) {
          // error message
          this.logger.log(ListrLogLevels.FAILED, message.error)
        } else if (message?.skip) {
          // skip message
          this.logger.log(ListrLogLevels.SKIPPED, message.skip)
        } else if (message?.rollback) {
          // rollback message
          this.logger.log(ListrLogLevels.ROLLBACK, message.rollback)
        } else if (message?.retry) {
          this.logger.log(ListrLogLevels.RETRY, task.title, { suffix: message.retry.count.toString() })
        } else if (message?.paused) {
          const timer = rendererOptions?.pausedTimer

          this.logger.log(
            ListrLogLevels.PAUSED,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!message?.paused && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          )
        }
      })
    })
  }

  private calculate(task: ListrVerboseRendererTask): void {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return
    }

    const rendererOptions: ListrVerboseRendererOptions = {
      ...this.options,
      ...task.rendererOptions
    }

    this.cache.rendererOptions.set(task.id, rendererOptions)

    this.cache.rendererTaskOptions.set(task.id, {
      ...VerboseRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    })
  }

  private reset(task: ListrVerboseRendererTask): void {
    this.cache.rendererOptions.delete(task.id)
    this.cache.rendererTaskOptions.delete(task.id)
  }
}
