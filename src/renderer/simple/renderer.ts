import type { ListrSimpleRendererOptions, ListrSimpleRendererTasks } from './renderer.interface'
import { ListrTaskState } from '@constants'
import { ListrTaskEventType } from '@constants/event.constants'
import type { ListrRenderer } from '@interfaces/renderer.interface'
import type { Task } from '@lib/task'
import type { RendererPresetTimer, RendererPresetTimestamp } from '@presets'
import type { LoggerRendererOptions } from '@utils'
import { color, ListrLogger, LogLevels } from '@utils'

/**
 * This is the default renderer which is neither verbose or updating.
 * It provides short output like update renderer, but does not disturb
 * stdin during execution of listr tasks
 */
export class SimpleRenderer implements ListrRenderer {
  // Designate this renderer as tty or nonTTY
  public static nonTTY = true
  // designate your renderer options that will be showed inside the `ListrOptions` as rendererOptions
  public static rendererOptions: RendererPresetTimer & RendererPresetTimestamp & LoggerRendererOptions = {}

  // designate your custom internal task-based options that will show as `options` in the task itself
  public static rendererTaskOptions: RendererPresetTimer = {}

  private readonly logger: ListrLogger
  constructor (private readonly tasks: ListrSimpleRendererTasks, private options: ListrSimpleRendererOptions) {
    this.options = { ...SimpleRenderer.rendererOptions, ...options }

    this.logger =
      this.options.logger ??
      new ListrLogger({
        useIcons: true,
        entityOptions: {
          prefix: [ this.options.timestamp ]
        }
      })
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

  private renderer (tasks: ListrSimpleRendererTasks): void {
    tasks.forEach((task) => {
      task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
        this.renderer(subtasks)
      })

      task.on(ListrTaskEventType.STATE, (state) => {
        if (!task.hasTitle()) {
          return
        }

        if (state === ListrTaskState.STARTED) {
          this.logger.started(task.title)
        } else if (state === ListrTaskState.COMPLETED) {
          const timer = this.getSelfOrParentOption(task, 'timer')

          this.logger.completed(
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
        } else if (state === ListrTaskState.PROMPT_COMPLETED) {
          this.logger.process.release()
        }
      })

      task.on(ListrTaskEventType.OUTPUT, (output) => {
        this.logger.output(output)
      })

      task.on(ListrTaskEventType.PROMPT, (prompt) => {
        this.logger.process.toStderr(prompt, false)
      })

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message.error) {
          // error message
          this.logger.failed(task.title, {
            suffix: {
              field: `${LogLevels.FAILED}: ${message.error}`,
              format: () => color.red
            }
          })
        } else if (message.skip) {
          this.logger.skipped(task.title, {
            suffix: {
              field: `${LogLevels.SKIPPED}: ${message.skip}`,
              format: () => color.yellow
            }
          })
        } else if (message.rollback) {
          this.logger.rollback(task.title, {
            suffix: {
              field: `${LogLevels.ROLLBACK}: ${message.rollback}`,
              format: () => color.red
            }
          })
        } else if (message.retry) {
          this.logger.retry(task.title, {
            suffix: {
              field: `${LogLevels.RETRY}:${message.retry.count}`,
              format: () => color.red
            }
          })
        }
      })
    })
  }
}
