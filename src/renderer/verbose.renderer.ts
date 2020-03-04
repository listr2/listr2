import { ListrEvent, ListrOptions, ListrRenderer, ListrTaskObject } from '../interfaces/listr.interface'
import { Logger } from '../utils/logger'

export class VerboseRenderer implements ListrRenderer {
  static nonTTY = true
  private logger: Logger

  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) {
    this.logger = new Logger()
  }

  public render (): void {
    // render data
    this.verboseRenderer(this.tasks)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public end (): void {}

  // verbose renderer multi-level
  private verboseRenderer (tasks: ListrTaskObject<any>[]): void {
    return tasks?.forEach((task) => {
      task.subscribe((event: ListrEvent) => {
        if (task.isEnabled()) {
        // render lower level if multi-level
          if (event.type === 'SUBTASK' && task.hasSubtasks()) {
            this.verboseRenderer(task.subtasks)

          } else if (event.type === 'STATE') {
          // render depending on the state
            const taskTitle = task.hasTitle() ? task.title: 'Task without title.'

            if (task.isPending()) {
              this.logger.start(taskTitle)

            } else if (task.isCompleted()) {
              this.logger.success(taskTitle)

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
          }
        }
      }, (err) => {
        this.logger.fail(err)
      }
      )
    })
  }
}
