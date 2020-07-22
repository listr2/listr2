import { ListrEvent, ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'
import { Logger } from '@utils/logger'

export class VerboseRenderer implements ListrRenderer {
  public static nonTTY = true
  public static rendererOptions: {
    // useIcons instead of text for log level
    useIcons?: boolean
    // inject a custom loger
    logger?: new (...args: any) => Logger
    // log tasks with empty titles
    logEmptyTitle?: boolean
    // log title changes
    logTitleChange?: boolean
  } = {
    useIcons: false,
    logEmptyTitle: true,
    logTitleChange: true
  }
  public static rendererTaskOptions: never
  private logger: Logger

  constructor (public tasks: ListrTaskObject<any, typeof VerboseRenderer>[], public options: typeof VerboseRenderer['rendererOptions']) {
    if (!this.options?.logger) {
      this.logger = new Logger({ useIcons: this.options?.useIcons })
    } else {
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
            if (event.type === 'SUBTASK' && task.hasSubtasks()) {
              // render lower level if multi-level
              this.verboseRenderer(task.subtasks)
            } else if (event.type === 'STATE') {
              if (this.options?.logEmptyTitle !== false || task.hasTitle()) {
                // render depending on the state
                const taskTitle = task.hasTitle() ? task.title : 'Task without title.'

                if (task.isPending()) {
                  this.logger.start(taskTitle)
                } else if (task.isCompleted()) {
                  this.logger.success(taskTitle)
                } else if (task.isSkipped()) {
                  this.logger.skip(task.output)
                }
              }
            } else if (event.type === 'DATA') {
              // render if outputs data like states, fail, skip or data
              if (task.hasFailed()) {
                this.logger.fail(String(event.data))
              } else if (task.isSkipped()) {
                this.logger.skip(String(event.data))
              } else {
                this.logger.data(String(event.data))
              }
            } else if (event.type === 'TITLE') {
              if (this.options?.logTitleChange !== false) {
                this.logger.title(String(event.data))
              }
            }
          }
        },
        (err) => {
          this.logger.fail(err)
        }
      )
    })
  }
}
