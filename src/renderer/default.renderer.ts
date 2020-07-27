import cliTruncate from 'cli-truncate'
import figures from 'figures'
import indentString from 'indent-string'
import logUpdate from 'log-update'
import { EOL } from 'os'

import { ListrContext, ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'
import chalk from '@utils/chalk'

export class DefaultRenderer implements ListrRenderer {
  public static nonTTY = false
  public static rendererOptions: {
    // indentation per level
    indentation?: number
    // clear output when task finishes
    clearOutput?: boolean
    // show subtasks
    showSubtasks?: boolean
    // collapse subtasks after finish
    collapse?: boolean
    // collapse skips in to single message
    collapseSkips?: boolean
    // only update via renderhook
    lazy?: boolean
  } = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapse: true,
    collapseSkips: true,
    lazy: false
  }
  public static rendererTaskOptions: {
    // write task output to bottom bar
    bottomBar?: boolean | number
    // keep output after task finishes
    persistentOutput?: boolean
  }

  private id?: NodeJS.Timeout
  private bottomBar: { [uuid: string]: { data?: string[], items?: number } } = {}
  private promptBar: string
  private spinner: string[] = process.platform === 'win32' && !process.env.WT_SESSION ? [ '-', '\\', '|', '/' ] : [ '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ]
  private spinnerPosition = 0

  constructor (
    public tasks: ListrTaskObject<any, typeof DefaultRenderer>[],
    public options: typeof DefaultRenderer['rendererOptions'],
    public renderHook$?: ListrTaskObject<any, any>['renderHook$']
  ) {
    this.options = { ...DefaultRenderer.rendererOptions, ...this.options }
  }

  public getTaskOptions (task: ListrTaskObject<any, typeof DefaultRenderer>): typeof DefaultRenderer['rendererTaskOptions'] {
    return { ...DefaultRenderer.rendererTaskOptions, ...task.rendererTaskOptions }
  }

  public isBottomBar (task: ListrTaskObject<any, typeof DefaultRenderer>): boolean {
    const bottomBar = this.getTaskOptions(task).bottomBar
    return typeof bottomBar === 'number' && bottomBar !== 0 || typeof bottomBar === 'boolean' && bottomBar !== false
  }

  public hasPersistentOutput (task: ListrTaskObject<any, typeof DefaultRenderer>): boolean {
    return this.getTaskOptions(task).persistentOutput === true
  }

  public render (): void {
    // Do not render if we are already rendering
    if (this.id) {
      return
    }

    const updateRender = (): void => logUpdate(this.multiLineRenderer(this.tasks), this.renderBottomBar(), this.renderPrompt())

    if (!this.options?.lazy) {
      this.id = setInterval(() => {
        this.spinnerPosition = ++this.spinnerPosition % this.spinner.length
        updateRender()
      }, 100)
    }

    this.renderHook$.subscribe(() => {
      updateRender()
    })
  }

  public end (): void {
    clearInterval(this.id)
    if (this.id) {
      this.id = undefined
    }

    logUpdate(this.multiLineRenderer(this.tasks), this.renderBottomBar())

    if (this.options.clearOutput) {
      logUpdate.clear()
    } else {
      logUpdate.done()
    }
  }

  // eslint-disable-next-line complexity
  private multiLineRenderer (tasks: ListrTaskObject<any, typeof DefaultRenderer>[], level = 0): string {
    let output: string[] = []

    for (const task of tasks) {
      if (task.isEnabled()) {
        // Current Task Title
        if (task.hasTitle()) {
          // if task is skipped
          if (task.isSkipped() && this.options.collapseSkips) {
            // Current Task Title and skip change the title
            task.title = !task.isSkipped() ? `${task?.title}` : `${task?.output} ${chalk.dim('[SKIPPED]')}`
          }

          if (!(tasks.some((task) => task.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
            // normal state
            output.push(this.formatString(task.title, this.getSymbol(task), level))
          } else {
            // some sibling task but self has failed and this has stopped
            output.push(this.formatString(task.title, chalk.red(figures.main.squareSmallFilled), level))
          }
        }

        // Current Task Output
        if (task?.output) {
          if (task.isPending() && task.isPrompt()) {
            // data output to prompt bar if prompt
            this.promptBar = task.output
          } else if (this.isBottomBar(task) || !task.hasTitle()) {
            // data output to bottom bar
            const data = this.dumpData(task, -1)

            // create new if there is no persistent storage created for bottom bar
            if (!this.bottomBar[task.id]) {
              this.bottomBar[task.id] = {}
              this.bottomBar[task.id].data = []

              const bottomBar = this.getTaskOptions(task).bottomBar
              if (typeof bottomBar === 'boolean') {
                this.bottomBar[task.id].items = 1
              } else {
                this.bottomBar[task.id].items = bottomBar
              }
            }

            // persistent bottom bar and limit items in it
            if (!data?.some((element) => this.bottomBar[task.id].data.includes(element))) {
              this.bottomBar[task.id].data = [ ...this.bottomBar[task.id].data, ...data ]
            }
          } else if (task.isPending() || this.hasPersistentOutput(task)) {
            // keep output if persistent output is set
            output = [ ...output, ...this.dumpData(task, level) ]
          } else if (task.isSkipped() && this.options.collapseSkips === false) {
            // show skip data if collapsing is not defined
            output = [ ...output, ...this.dumpData(task, level) ]
          }
        }

        // render subtasks, some complicated conditionals going on
        if (
          // check if renderer option is on first
          this.options.showSubtasks !== false &&
          // if it doesnt have subtasks no need to check
          task.hasSubtasks() &&
          (
            task.isPending() ||
            task.hasFailed() ||
            task.isCompleted() && !task.hasTitle() ||
            // have to be completed and have subtasks
            task.isCompleted() && this.options.collapse === false && !task.subtasks.some((subtask) => subtask.rendererOptions.collapse === true) ||
            // if any of the subtasks have the collapse option of
            task.subtasks.some((subtask) => subtask.rendererOptions.collapse === false) ||
            // if any of the subtasks has failed
            task.subtasks.some((subtask) => subtask.hasFailed())
          )
        ) {
          // set level
          const subtaskLevel = !task.hasTitle() ? level : level + 1

          // render the subtasks as in the same way
          const subtaskRender = this.multiLineRenderer(task.subtasks, subtaskLevel)
          if (subtaskRender?.trim() !== '' && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
            output = [ ...output, subtaskRender ]
          }
        }

        // after task is finished actions
        if (task.isCompleted() || task.hasFailed()) {
          // clean up prompts
          this.promptBar = null

          // clean up bottom bar items if not indicated otherwise
          if (task.hasFailed() || (!task.hasTitle() || this.isBottomBar(task)) && this.hasPersistentOutput(task) !== true) {
            delete this.bottomBar[task.id]
          }
        }
      }
    }

    if (output.length > 0) {
      return output.join('\n')
    } else {
      return
    }
  }

  private renderBottomBar (): string {
    // parse through all objects return only the last mentioned items
    if (Object.keys(this.bottomBar).length > 0) {
      this.bottomBar = Object.keys(this.bottomBar).reduce((o, key) => {
        if (!o?.[key]) {
          o[key] = {}
        }

        o[key] = this.bottomBar[key]

        this.bottomBar[key].data = this.bottomBar[key].data.slice(-this.bottomBar[key].items)
        o[key].data = this.bottomBar[key].data
        return o
      }, {})

      // render the bar
      const returnRender = Object.values(this.bottomBar).reduce((o, value) => o = [ ...o, ...value.data ], [])

      return [ '\n', ...returnRender ].join('\n')
    }
  }

  private renderPrompt (): string {
    if (this.promptBar) {
      return `\n\n${this.promptBar}`
    }
  }

  private dumpData (task: ListrTaskObject<ListrContext, typeof DefaultRenderer>, level: number): string[] {
    const output: string[] = []

    if (typeof task.output === 'string') {
      // indent and color
      task.output
        .split('\n')
        .filter(Boolean)
        .forEach((line, i) => {
          const icon = i === 0 ? this.getSymbol(task, true) : ' '
          output.push(this.formatString(line, icon, level + 1))
        })
    }

    return output
  }

  private formatString (string: string, icon: string, level: number): string {
    return `${cliTruncate(indentString(`${icon} ${string}`, level * this.options.indentation), process.stdout.columns ?? 80)}`
  }

  // eslint-disable-next-line complexity
  private getSymbol (task: ListrTaskObject<ListrContext, typeof DefaultRenderer>, data = false): string {
    if (task.isPending() && !data) {
      return this.options?.lazy || this.options.showSubtasks !== false && task.hasSubtasks() && !task.subtasks.every((subtask) => !subtask.hasTitle())
        ? chalk.yellow(figures.main.pointer)
        : chalk.yellowBright(this.spinner[this.spinnerPosition])
    }

    if (task.isCompleted() && !data) {
      if (task.hasSubtasks() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return chalk.yellow(figures.main.warning)
      }

      return chalk.green(figures.main.tick)
    }

    if (task.hasFailed() && !data) {
      return task.hasSubtasks() ? chalk.red(figures.main.pointer) : chalk.red(figures.main.cross)
    }

    if (task.isSkipped() && !data && this.options.collapseSkips === false) {
      return chalk.yellow(figures.main.warning)
    } else if (task.isSkipped() && (data || this.options.collapseSkips)) {
      return chalk.yellow(figures.main.arrowDown)
    }

    if (task.isPrompt()) {
      return chalk.cyan(figures.main.questionMarkPrefix)
    }

    if (!data) {
      return chalk.dim(figures.main.squareSmallFilled)
    } else {
      return figures.main.pointerSmall
    }
  }
}
