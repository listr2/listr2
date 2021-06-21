import { ListrContext, ListrTaskObject, ListrRenderer, ListrEventType, ListrEvent } from 'listr2'
// We use stderr to not pollute command output
import { stderr as logUpdate } from 'log-update'

import colorette from '@root/utils/colorette'
import { figures } from '@root/utils/figures'

/**
 * Used to match event.type to ListrEvent permutations
 */
type ListrEventFromType<T extends ListrEventType, E = ListrEvent> = E extends {
  type: infer U
}
  ? T extends U
    ? E
    : never
  : never

/**
 * Just a shorthand for the listr object type
 */
type DefaultTaskObject = ListrTaskObject<ListrContext, typeof SimpleRenderer>

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
     * @exmple
     *
     * ```bash
     * [12:33:44] ✔ Do something important
     * ```
     */
    prefixWithTimestamp?: boolean
  } = { prefixWithTimestamp: false }

  // designate your custom internal task-based options that will show as `options` in the task itself
  public static rendererTaskOptions: never

  public options: typeof SimpleRenderer['rendererOptions']

  public tasks: readonly DefaultTaskObject[]

  /**
   * Event type renderer map contains functions to process different task events
   */
  // This is done
  public eventTypeRendererMap: Partial<
  {
    [P in ListrEventType]: (t: DefaultTaskObject, event: ListrEventFromType<P>) => void
  }
  > = {
    [ListrEventType.SUBTASK]: (task) => {
      if (task.hasTitle()) {
        // if Task has subtasks where we want to log the group indication
        this.log(`${colorette.magentaBright(figures.pointer)} ${task.title}`)
      }
      if (task.hasSubtasks()) {
        this.render(task.subtasks)
      }
    },
    [ListrEventType.STATE]: (task) => {
      if (!task.isPending() && !task.isSkipped() && task.hasTitle()) {
        // The title is only logged at the end of the task execution
        this.log(`${colorette.green(figures.tick)} ${task.title}`)
      }
    },
    [ListrEventType.DATA]: (task, event) => {
      // ! This is where it gets dirty
      // * We want the prompt to stay visible after confirmation
      if (task.isPrompt() && !`${event.data}`.match(/^\n$/)) {
        logUpdate(`${event.data}`)
      } else {
        this.log(`  ${event.data}`)
      }
    },
    [ListrEventType.MESSAGE]: (task, event) => {
      if (event.data.error) {
        // error message
        const title = SimpleRenderer.formatTitle(task)
        this.log(`${colorette.red(figures.warning)}${title}: ${event.data.error}`)
      }
      if (event.data.skip) {
        // Skip message
        const title = SimpleRenderer.formatTitle(task)
        const skip = task.title !== event.data.skip ? `: ${event.data.skip}` : ''

        this.log(`${colorette.yellow(figures.arrowDown)}${title} [${colorette.yellow(`skipped${skip}`)}]`)
      } else if (event.data.rollback) {
        // rollback message
        const title = SimpleRenderer.formatTitle(task)
        this.log(`${colorette.red(figures.arrowLeft)}${title}: ${event.data.rollback}`)
      } else if (event.data.retry) {
        // Retry Message
        const title = SimpleRenderer.formatTitle(task)
        this.log(`[${colorette.yellow(`${event.data.retry.count}`)}]${title}`)
      }
    }
    // * We do not log out initial title. Only the final one.
    // [ListrEventType.TITLE]: (t, e) => this.renderTitle(t, e),
  }

  /**
   * Creates an instance of Renderer.
   * This is used by listr internally and should not be called by user code
   */
  public constructor (tasks: readonly DefaultTaskObject[], options: typeof SimpleRenderer['rendererOptions']) {
    this.tasks = tasks
    this.options = { ...SimpleRenderer.rendererOptions, ...options }
  }

  // This is used for mocks, since mocking Date is cumbesome
  public static now (): Date {
    return new Date()
  }

  // Used to sanitize title output
  static formatTitle (task?: DefaultTaskObject): string {
    return task?.title ? ` ${task.title}` : ''
  }

  // Writes sanitized output
  public log (output?: string): void {
    const writeError = (msg: string): void => {
      // Need appent \n to mimic console.log
      process.stderr.write(msg.endsWith('\n') ? msg : `${msg}\n`)
    }

    if (!this.options.prefixWithTimestamp) {
      writeError(`${output}`)
      return
    }

    const now = SimpleRenderer.now()
    const timestamp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    writeError(`${colorette.dim(`[${timestamp}]`)} ${output}`)
  }

  // eslint-disable-next-line
  public end(): void {}

  // yes this is a misuse :)
  public render (tasks?: readonly DefaultTaskObject[]): void {
    if (tasks?.length) {
      tasks.forEach((task) => {
        task.subscribe((event) => {
          // Here event type will match event.type anyway
          this.eventTypeRendererMap[event.type]?.(task, event as never)
        }, this.log)
      })
    } else {
      this.render(this.tasks)
    }
  }
}
