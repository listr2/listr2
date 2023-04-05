import type { ListrSimpleRendererOptions, ListrSimpleRendererTask, SimpleRendererOptions, SimpleRendererTaskOptions } from './renderer.interface'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrRenderer } from '@interfaces'
import type { Task } from '@lib'
import { parseTimer } from '@presets'
import { ListrLogger, LogLevels, color } from '@utils'

/**
 * This is the default renderer which is neither verbose or updating.
 * It provides short output like update renderer, but does not disturb
 * stdin during execution of listr tasks
 */
export class SimpleRenderer implements ListrRenderer {
  // Designate this renderer as tty or nonTTY
  public static nonTTY = true
  // designate your renderer options that will be showed inside the `ListrOptions` as rendererOptions
  public static rendererOptions: SimpleRendererOptions = {
    logger: ListrLogger
  }

  // designate your custom internal task-based options that will show as `options` in the task itself
  public static rendererTaskOptions: SimpleRendererTaskOptions = {}

  private readonly logger: ListrLogger
  constructor (private readonly tasks: ListrSimpleRendererTask[], private options: ListrSimpleRendererOptions) {
    this.options = {
      ...SimpleRenderer.rendererOptions,
      ...options,
      loggerOptions: {
        useIcons: true,
        ...this.options?.loggerOptions ?? {},
        fieldOptions: {
          prefix: [ this.options?.timestamp ],
          ...this.options?.loggerOptions?.fieldOptions ?? {}
        }
      }
    }

    this.logger = new this.options.logger(this.options.loggerOptions)
  }

  public end (): void {
    this.logger.process.release()
  }

  public render (): void {
    this.renderer(this.tasks)
  }

  public getSelfOrParentOption<K extends keyof ListrSimpleRendererOptions>(task: Task<any, typeof SimpleRenderer>, key: K): ListrSimpleRendererOptions[K] {
    return task?.rendererOptions?.[key] ?? this.options?.[key]
  }

  private renderer (tasks: ListrSimpleRendererTask[]): void {
    tasks.forEach((task) => {
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
        this.logger.log(LogLevels.OUTPUT, output)
      })

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message.error) {
          // error message
          this.logger.log(LogLevels.FAILED, task.title, {
            suffix: {
              field: `${LogLevels.FAILED}: ${message.error}`,
              format: () => color.red
            }
          })
        } else if (message.skip) {
          this.logger.log(LogLevels.SKIPPED, task.title, {
            suffix: {
              field: `${LogLevels.SKIPPED}: ${message.skip}`,
              format: () => color.yellow
            }
          })
        } else if (message.rollback) {
          this.logger.log(LogLevels.ROLLBACK, task.title, {
            suffix: {
              field: `${LogLevels.ROLLBACK}: ${message.rollback}`,
              format: () => color.red
            }
          })
        } else if (message.retry) {
          this.logger.log(LogLevels.RETRY, task.title, {
            suffix: {
              field: `${LogLevels.RETRY}:${message.retry.count}`,
              format: () => color.red
            }
          })
        } else if (message.paused) {
          this.logger.log(LogLevels.PAUSED, task.title, {
            suffix: {
              field: `${LogLevels.PAUSED}: ${parseTimer(message.paused - Date.now())}`,
              format: () => color.dim
            }
          })
        }
      })
    })
  }
}
