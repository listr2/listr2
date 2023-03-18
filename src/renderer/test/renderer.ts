import type { ListrTestRendererOptions, ListrTestRendererTasks } from './renderer.interface'
import { TestRendererEvent } from './renderer.interface'
import { ListrTaskState, ListrTaskEventType } from '@constants'
import type { ListrRenderer, ListrTaskMessage } from '@interfaces'
import type { LoggerRendererOptions } from '@utils'
import { ListrLogger } from '@utils'

export class TestRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the verbose renderer */
  public static rendererOptions: {
    subtasks?: boolean
    state?: ListrTaskState[]
    output?: boolean
    prompt?: boolean
    title?: boolean
    messages?: (keyof ListrTaskMessage)[]
    messagesToStderr?: (keyof ListrTaskMessage)[]
  } & LoggerRendererOptions = {
      subtasks: true,
      state: Object.values(ListrTaskState),
      output: true,
      prompt: true,
      title: true,
      messages: [ 'skip', 'error', 'retry', 'rollback' ],
      messagesToStderr: [ 'error', 'rollback', 'retry' ],
      logger: ListrLogger
    }
  /** per task options for the verbose renderer */
  public static rendererTaskOptions: never

  private readonly logger: ListrLogger

  constructor (private readonly tasks: ListrTestRendererTasks, private readonly options: ListrTestRendererOptions) {
    this.options = { ...TestRenderer.rendererOptions, ...this.options }

    this.logger = new this.options.logger(this.options.loggerOptions)
  }

  public render (): void {
    this.renderer(this.tasks)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public end (): void {}

  // verbose renderer multi-level
  private renderer (tasks: ListrTestRendererTasks): void {
    return tasks?.forEach((task) => {
      if (this.options.subtasks) {
        task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
          this.renderer(subtasks)
        })
      }

      if (this.options.state) {
        task.on(ListrTaskEventType.STATE, (state) => {
          this.logger.process.toStdout(new TestRendererEvent(ListrTaskEventType.STATE, state, task).toJson())
        })
      }

      if (this.options.output) {
        task.on(ListrTaskEventType.OUTPUT, (data) => {
          this.logger.process.toStdout(new TestRendererEvent(ListrTaskEventType.OUTPUT, data, task).toJson())
        })
      }

      if (this.options.prompt) {
        task.on(ListrTaskEventType.PROMPT, (prompt) => {
          this.logger.process.toStdout(new TestRendererEvent(ListrTaskEventType.PROMPT, prompt, task).toJson())
        })
      }

      if (this.options.title) {
        task.on(ListrTaskEventType.TITLE, (title) => {
          this.logger.process.toStdout(new TestRendererEvent(ListrTaskEventType.TITLE, title, task).toJson())
        })
      }

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        const parsed: ListrTaskMessage = Object.fromEntries(
          Object.entries(message)
            .map(([ key, value ]) => {
              if (this.options.messages.includes(key as keyof ListrTaskMessage)) {
                return [ key, value ]
              }
            })
            .filter(Boolean)
        )

        if (Object.keys(parsed).length > 0) {
          const output = new TestRendererEvent(ListrTaskEventType.MESSAGE, parsed, task).toJson()

          if (this.options.messagesToStderr.some((state) => Object.keys(parsed).includes(state))) {
            this.logger.process.toStderr(output)
          } else {
            this.logger.process.toStdout(output)
          }
        }
      })
    })
  }
}
