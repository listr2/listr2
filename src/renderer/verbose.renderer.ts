import { ListrRenderer } from '@interfaces/listr-renderer.interface'
import { Task } from '@lib/task'
import { ListrEvents, StateConstants } from '@root/constants'
import { Logger } from '@utils/logger'

export class VerboseRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the verbose renderer */
  public static rendererOptions: {
    /**
     * useIcons instead of text for log level
     * @default false
     */
    useIcons?: boolean
    /**
     * inject a custom loger
     */
    logger?: new (...args: any) => Logger
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
  } = {
    useIcons: false,
    logEmptyTitle: true,
    logTitleChange: true
  }
  /** per task options for the verbose renderer */
  public static rendererTaskOptions: never
  private logger: Logger

  constructor (public tasks: Task<any, typeof VerboseRenderer>[], public options: typeof VerboseRenderer['rendererOptions']) {
    if (!this.options?.logger) {
      this.logger = new Logger({ useIcons: this.options?.useIcons })
    } /* istanbul ignore next */ else {
      this.logger = new this.options.logger()
    }

    this.options = { ...VerboseRenderer.rendererOptions, ...this.options }
  }

  public render (): void {
    this.verboseRenderer(this.tasks)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public end (): void {}

  // verbose renderer multi-level
  private verboseRenderer (tasks: Task<any, typeof VerboseRenderer>[]): void {
    tasks?.forEach((task) => {
      task.on(ListrEvents.ENABLED, () => {
        const taskTitle = task.hasTitle() ? task.title : 'Task without title.'

        task.on(ListrEvents.SUBTASK, () => {
          this.verboseRenderer(task.subtasks)
        })

        if (this.options?.logEmptyTitle !== false || task.hasTitle()) {
          task.on(ListrEvents.STATE, (state) => {
            switch (state) {
            case StateConstants.PENDING:
              this.logger.start(taskTitle)

              break
            case StateConstants.COMPLETED:
              this.logger.success(taskTitle)

              break
            }
          })
        }

        task.on(ListrEvents.DATA, (data) => {
          this.logger.data(String(data))
        })

        if (this.options?.logTitleChange !== false) {
          task.on(ListrEvents.TITLE, (title) => {
            this.logger.title(String(title))
          })
        }

        task.on(ListrEvents.MESSAGE, (message) => {
          if (message?.error) {
            // error message
            this.logger.fail(String(message.error))
          } else if (message?.skip) {
            // skip message
            this.logger.skip(String(message.skip))
          } else if (message?.rollback) {
            // rollback message
            this.logger.rollback(String(message.rollback))
          } else if (message?.retry) {
            this.logger.retry(`[${message.retry.count}] ` + String(taskTitle))
          }
        })
      })
    })
  }
}
