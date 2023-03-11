import { stderr as logUpdate } from 'log-update'
import { EOL } from 'os'

import { ListrTaskState } from '@constants'
import { ListrTaskEventType } from '@constants/event.constants'
import type { ListrRenderer } from '@interfaces/renderer.interface'
import type { Task } from '@lib/task'
import { colorette } from '@utils/colorette'
import { figures } from '@utils/figures'

/**
 * This is the default renderer which is neither verbose or updating.
 * It provides short output like update renderer, but does not disturb
 * stdin during execution of listr tasks
 */
export class SimpleRenderer implements ListrRenderer {
  // Designate this renderer as tty or nonTTY
  public static nonTTY = true

  // designate your renderer options that will be showed inside the `ListrOptions` as rendererOptions
  public static rendererOptions: {
    /**
     * if true this will add
     * timestamp at the begin of the rendered line
     *
     * @example
     *
     * ```bash
     * [12:33:44] ✔ Do something important
     * ```
     *
     * @default false
     */
    prefixWithTimestamp?: boolean
    /**
     * choose between process.stdout and process.stderr
     *
     * @default stdout
     */
    output?: 'stdout' | 'stderr'
  } = { prefixWithTimestamp: false, output: 'stdout' }

  // designate your custom internal task-based options that will show as `options` in the task itself
  public static rendererTaskOptions: never

  constructor (public readonly tasks: Task<any, typeof SimpleRenderer>[], public options: (typeof SimpleRenderer)['rendererOptions']) {
    this.options = { ...SimpleRenderer.rendererOptions, ...options }
  }

  // This is used for mocks, since mocking Date is cumbesome
  public static now (): Date {
    return new Date()
  }

  // Used to sanitize title output
  public static formatTitle (task?: Task<any, typeof SimpleRenderer>): string {
    return task?.title ? ` ${task.title}` : ''
  }

  // Writes sanitized output
  public log (output?: string): void {
    const logOut = (msg: string): void => {
      // Need appent \n to mimic console.log
      process[this.options.output].write(msg.endsWith(EOL) ? msg : `${msg}${EOL}`)
    }

    if (!this.options.prefixWithTimestamp) {
      logOut(`${output}`)

      return
    }

    const now = SimpleRenderer.now()

    const timestamp = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0')

    logOut(`${colorette.dim(`[${timestamp}]`)} ${output}`)
  }

  // eslint-disable-next-line
  public end(): void {}

  public render (): void {
    this.simpleRenderer(this.tasks)
  }

  private simpleRenderer (tasks: Task<any, typeof SimpleRenderer>[]): void {
    tasks.forEach((task) => {
      task.on(ListrTaskEventType.SUBTASK, (subtasks) => {
        if (task.hasTitle()) {
          // if Task has subtasks where we want to log the group indication
          this.log(`${colorette.blue(figures.pointer)} ${task.title}`)
        }

        this.simpleRenderer(subtasks)
      })

      task.on(ListrTaskEventType.STATE, (state) => {
        if (state === ListrTaskState.COMPLETED && task.hasTitle()) {
          // The title is only logged at the end of the task execution
          this.log(`${colorette.green(figures.tick)} ${task.title}`)
        }
      })

      task.on(ListrTaskEventType.DATA, (data) => {
        // ! This is where it gets dirty
        // * We want the prompt to stay visible after confirmation
        if (task.isPrompt() && !String(data).match(/^\n$/)) {
          logUpdate(data)
        } else {
          this.log(`${figures.pointerSmall} ${data}`)
        }
      })

      task.on(ListrTaskEventType.MESSAGE, (message) => {
        if (message.error) {
          // error message
          const title = SimpleRenderer.formatTitle(task)

          this.log(`${colorette.red(figures.cross)}${title}: ${message.error}`)
        } else if (message.skip) {
          // Skip message
          const title = SimpleRenderer.formatTitle(task)
          const skip = task.title !== message.skip ? `: ${message.skip}` : ''

          this.log(`${colorette.yellow(figures.arrowDown)}${title} [${colorette.yellow(`skipped${skip}`)}]`)
        } else if (message.rollback) {
          // rollback message
          const title = SimpleRenderer.formatTitle(task)

          this.log(`${colorette.red(figures.arrowLeft)}${title}: ${message.rollback}`)
        } else if (message.retry) {
          // Retry Message
          const title = SimpleRenderer.formatTitle(task)

          this.log(`[${colorette.yellow(`${message.retry.count}`)}]${title}`)
        }
      })
    })
  }
}
