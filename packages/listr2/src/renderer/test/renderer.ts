import type { ListrTestRendererOptions, ListrTestRendererTask, ListrTestRendererTaskOptions } from './renderer.interface'
import { TestRendererSerializer } from './serializer'
import { ListrTaskEventType, ListrTaskState } from '#constants'
import type { ListrRenderer, ListrTaskMessage } from '#interfaces'
import { ListrLogger, assertLoggerOptions, assertOption } from '#utils'

export class TestRenderer implements ListrRenderer {
  public static nonTTY = true
  public static rendererOptions: ListrTestRendererOptions = {
    subtasks: true,
    state: Object.values(ListrTaskState),
    output: true,
    prompt: true,
    title: true,
    messages: ['skip', 'error', 'retry', 'rollback', 'paused'],
    messagesToStderr: ['error', 'rollback', 'retry'],
    task: [
      'hasRolledBack',
      'isRollingBack',
      'isCompleted',
      'isSkipped',
      'hasFinalized',
      'hasSubtasks',
      'title',
      'hasReset',
      'hasTitle',
      'isPrompt',
      'isPaused',
      'isPending',
      'isCancelled',
      'isStarted',
      'hasFailed',
      'isEnabled',
      'isRetrying',
      'path'
    ]
  }
  public static rendererTaskOptions: ListrTestRendererTaskOptions

  private readonly logger: ListrLogger
  private serializer: TestRendererSerializer

  constructor(
    private readonly tasks: ListrTestRendererTask[],
    private readonly options: ListrTestRendererOptions
  ) {
    this.options = { ...TestRenderer.rendererOptions, ...this.options }

    this.logger = this.options.logger ?? new ListrLogger<never>({ useIcons: false })

    this.serializer = new TestRendererSerializer(this.options)
  }

  /**
   * Throws a `RangeError` for an invalid `logger`, a `state`, `messages` or `messagesToStderr` that is not a list,
   * or a `task` that is neither `false` nor a list, when a task list is created.
   */
  public static assertOptions(options: ListrTestRendererOptions = {}): void {
    assertLoggerOptions(options)

    for (const name of ['state', 'messages', 'messagesToStderr'] as const) {
      if (options[name] !== undefined) {
        assertOption(name, options[name], Array.isArray(options[name]), 'must be a list')
      }
    }

    if (options.task !== undefined) {
      assertOption('task', options.task, options.task === false || Array.isArray(options.task), 'must be false or a list')
    }
  }

  public render(): void {
    this.renderer(this.tasks)
  }

  public end(): void {}

  // verbose renderer multi-level
  private renderer(tasks: ListrTestRendererTask[]): void {
    tasks.forEach((task) => {
      if (this.options.subtasks) {
        task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
          this.renderer(subtasks)
        })
      }

      if (this.options.state) {
        task.on(ListrTaskEventType.STATE, (state) => {
          this.logger.toStdout(this.serializer.serialize(ListrTaskEventType.STATE, state, task))
        })
      }

      if (this.options.output) {
        task.on(ListrTaskEventType.OUTPUT, (data) => {
          this.logger.toStdout(this.serializer.serialize(ListrTaskEventType.OUTPUT, data, task))
        })
      }

      if (this.options.prompt) {
        task.on(ListrTaskEventType.PROMPT, (prompt) => {
          this.logger.toStdout(this.serializer.serialize(ListrTaskEventType.PROMPT, prompt, task))
        })
      }

      if (this.options.title) {
        task.on(ListrTaskEventType.TITLE, (title) => {
          this.logger.toStdout(this.serializer.serialize(ListrTaskEventType.TITLE, title, task))
        })
      }

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        const parsed: ListrTaskMessage = Object.fromEntries(
          Object.entries(message)
            .map(([key, value]) => {
              if (this.options.messages.includes(key as keyof ListrTaskMessage)) {
                return [key, value]
              }
            })
            .filter(Boolean)
        )

        if (Object.keys(parsed).length > 0) {
          const output = this.serializer.serialize(ListrTaskEventType.MESSAGE, parsed, task)

          if (this.options.messagesToStderr.some((state) => Object.keys(parsed).includes(state))) {
            this.logger.toStderr(output)
          } else {
            this.logger.toStdout(output)
          }
        }
      })
    })
  }
}
