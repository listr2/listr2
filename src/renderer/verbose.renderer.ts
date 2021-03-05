import { ListrEvent, ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'
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

  constructor (public tasks: ListrTaskObject<any, typeof VerboseRenderer>[], public options: typeof VerboseRenderer['rendererOptions']) {
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
  private verboseRenderer (tasks: ListrTaskObject<any, typeof VerboseRenderer>[]): void {
    return tasks?.forEach((task) => {
      task.subscribe(
        (event: ListrEvent) => {
          if (task.isEnabled()) {
            // render depending on the state
            const taskTitle = task.hasTitle() ? task.title : 'Task without title.'

            if (event.type === 'SUBTASK' && task.hasSubtasks()) {
              // render lower level if multi-level
              this.verboseRenderer(task.subtasks)
            } else if (event.type === 'STATE') {
              if (this.options?.logEmptyTitle !== false || task.hasTitle()) {
                if (task.isPending()) {
                  this.logger.start(taskTitle)
                } else if (task.isCompleted()) {
                  this.logger.success(taskTitle)
                }
              }
            } else if (event.type === 'DATA' && !!event.data) {
              this.logger.data(String(event.data))
            } else if (event.type === 'TITLE') {
              if (this.options?.logTitleChange !== false) {
                this.logger.title(String(event.data))
              }
            } else if (event.type === 'MESSAGE') {
              if (event.data?.error) {
                // error message
                this.logger.fail(String(event.data.error))
              } else if (event.data?.skip) {
                // skip message
                this.logger.skip(String(event.data.skip))
              } else if (event.data?.rollback) {
                // rollback message
                this.logger.rollback(String(event.data.rollback))
              } else if (event.data?.retry) {
                this.logger.retry(`[${event.data.retry.count}] ` + String(taskTitle))
              }
            }
          }
        },
        /* istanbul ignore next */ (err) => {
          this.logger.fail(err)
        }
      )
    })
  }
}
