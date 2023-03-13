import { stderr as logUpdate } from 'log-update'

import type { RendererPresetTimer, RendererPresetTimestamp } from './renderer-presets.interface'
import { ListrTaskState } from '@constants'
import { ListrTaskEventType } from '@constants/event.constants'
import type { ListrRenderer } from '@interfaces/renderer.interface'
import type { Task } from '@lib/task'
import type { LoggerRendererOptions } from '@utils'
import { colorette, ListrLogger, LogLevels } from '@utils'

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

  constructor (public readonly tasks: Task<any, typeof SimpleRenderer>[], public options: (typeof SimpleRenderer)['rendererOptions']) {
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

  // eslint-disable-next-line
  public end(): void {}

  public render (): void {
    this.renderer(this.tasks)
  }

  public getSelfOrParentOption<K extends keyof (typeof SimpleRenderer)['rendererOptions']>(
    task: Task<any, typeof SimpleRenderer>,
    key: K
  ): (typeof SimpleRenderer)['rendererOptions'][K] {
    return task?.rendererOptions?.[key] ?? this.options?.[key]
  }

  private renderer (tasks: Task<any, typeof SimpleRenderer>[]): void {
    tasks.forEach((task) => {
      task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
        if (task.hasTitle()) {
          this.logger.subtask(task.title)
        }

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
        }
      })

      task.on(ListrTaskEventType.OUTPUT, (output) => {
        // ! This is where it gets dirty
        // * We want the prompt to stay visible after confirmation
        if (task.isPrompt() && !String(output).match(/^\n$/)) {
          logUpdate(output)
        } else {
          this.logger.output(output)
        }
      })

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message.error) {
          // error message
          this.logger.failed(task.title, {
            suffix: {
              data: `${LogLevels.FAILED}: ${message.error}`,
              format: colorette.red
            }
          })
        } else if (message.skip) {
          this.logger.skipped(task.title, {
            suffix: {
              data: `${LogLevels.SKIPPED}: ${message.skip}`,
              format: colorette.yellow
            }
          })
        } else if (message.rollback) {
          this.logger.rollback(task.title, {
            suffix: {
              data: `${LogLevels.ROLLBACK}: ${message.rollback}`,
              format: colorette.red
            }
          })
        } else if (message.retry) {
          this.logger.retry(task.title, {
            suffix: {
              data: `${LogLevels.RETRY}:${message.retry.count}`,
              format: colorette.red
            }
          })
        }
      })
    })
  }
}
