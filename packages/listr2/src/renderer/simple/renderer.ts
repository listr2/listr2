import type { ListrSimpleRendererCache, ListrSimpleRendererOptions, ListrSimpleRendererTask, ListrSimpleRendererTaskOptions } from './renderer.interface'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrRenderer } from '@interfaces'
import { PRESET_TIMER } from '@presets'
import { LISTR_LOGGER_STDERR_LEVELS, LISTR_LOGGER_STYLE, ListrLogLevels, ListrLogger, color } from '@utils'

export class SimpleRenderer implements ListrRenderer {
  public static nonTTY = true
  public static rendererOptions: ListrSimpleRendererOptions = {
    pausedTimer: {
      ...PRESET_TIMER,
      field: (time) => `${ListrLogLevels.PAUSED}:${time}`,
      format: () => color.yellowBright
    }
  }
  public static rendererTaskOptions: ListrSimpleRendererTaskOptions = {}

  private readonly logger: ListrLogger
  private readonly cache: ListrSimpleRendererCache = {
    rendererOptions: new Map(),
    rendererTaskOptions: new Map()
  }

  constructor(
    private readonly tasks: ListrSimpleRendererTask[],
    private options: ListrSimpleRendererOptions
  ) {
    this.options = {
      ...SimpleRenderer.rendererOptions,
      ...options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ...(options?.icon ?? {})
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ...(options?.color ?? {})
      }
    }

    this.logger = this.options.logger ?? new ListrLogger<ListrLogLevels>({ useIcons: true, toStderr: LISTR_LOGGER_STDERR_LEVELS })

    this.logger.options.icon = this.options.icon
    this.logger.options.color = this.options.color

    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp)
    }
  }

  public end(): void {}

  public render(): void {
    this.renderer(this.tasks)
  }

  private renderer(tasks: ListrSimpleRendererTask[]): void {
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
          const timer = rendererTaskOptions?.timer

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
        } else if (state === ListrTaskState.PROMPT) {
          this.logger.process.hijack()

          task.on(ListrTaskEventType.PROMPT, (prompt) => {
            this.logger.process.toStderr(prompt, false)
          })
        } else if (state === ListrTaskState.PROMPT_COMPLETED) {
          task.off(ListrTaskEventType.PROMPT)

          this.logger.process.release()
        }
      })

      task.on(ListrTaskEventType.OUTPUT, (output) => {
        this.logger.log(ListrLogLevels.OUTPUT, output)
      })

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message.error) {
          // error message
          this.logger.log(ListrLogLevels.FAILED, task.title, {
            suffix: {
              field: `${ListrLogLevels.FAILED}: ${message.error}`,
              format: () => color.red
            }
          })
        } else if (message.skip) {
          this.logger.log(ListrLogLevels.SKIPPED, task.title, {
            suffix: {
              field: `${ListrLogLevels.SKIPPED}: ${message.skip}`,
              format: () => color.yellow
            }
          })
        } else if (message.rollback) {
          this.logger.log(ListrLogLevels.ROLLBACK, task.title, {
            suffix: {
              field: `${ListrLogLevels.ROLLBACK}: ${message.rollback}`,
              format: () => color.red
            }
          })
        } else if (message.retry) {
          this.logger.log(ListrLogLevels.RETRY, task.title, {
            suffix: {
              field: `${ListrLogLevels.RETRY}:${message.retry.count}`,
              format: () => color.red
            }
          })
        } else if (message.paused) {
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

  private calculate(task: ListrSimpleRendererTask): void {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return
    }

    const rendererOptions: ListrSimpleRendererOptions = {
      ...this.options,
      ...task.rendererOptions
    }

    this.cache.rendererOptions.set(task.id, rendererOptions)

    this.cache.rendererTaskOptions.set(task.id, {
      ...SimpleRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    })
  }

  private reset(task: ListrSimpleRendererTask): void {
    this.cache.rendererOptions.delete(task.id)
    this.cache.rendererTaskOptions.delete(task.id)
  }
}
