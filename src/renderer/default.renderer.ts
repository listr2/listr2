import chalk from 'chalk'
import cliCursor from 'cli-cursor'
import elegantSpinner from 'elegant-spinner'
import figures from 'figures'
import indentString from 'indent-string'
import logUpdate from 'log-update'

import { ListrOptions, ListrRenderer, ListrTaskObject } from '../interfaces/listr.interface'
import { ListrContext } from './../interfaces/listr.interface'

export class MultiLineRenderer implements ListrRenderer {
  static nonTTY = false
  private id?: NodeJS.Timeout
  private indentation = 2
  private bottomBar: {[uuid: string]: {data?: string[], items?: number}} = {}
  private promptBar: string

  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) {
  }

  public render (): void {
    // Do not render if we are already rendering
    if (this.id) {
      return
    }

    // hide cursor
    cliCursor.hide()

    this.id = setInterval(() => {
      logUpdate(this.multiLineRenderer(this.tasks), this.renderBottomBar(), this.renderPrompt())
    }, 100)
  }

  public end (): void {
    if (this.id) {
      clearInterval(this.id)
      this.id = undefined
    }

    logUpdate(this.multiLineRenderer(this.tasks), this.renderBottomBar())

    if (this.options.clearOutput) {
      logUpdate.clear()
    } else {
      logUpdate.done()
    }

    // hide cursor
    cliCursor.show()
  }

  // eslint-disable-next-line complexity
  private multiLineRenderer (tasks: ListrTaskObject<any>[], level = 0): string {
    let output: string[] = []

    for (const task of tasks) {

      if (task.isEnabled()) {
        if (task.hasTitle()) {
          let taskTitle: string = task.title

          // if task is skipped
          if (task.isSkipped() && task?.collapseSkips) {
            // CURRENT TASK TITLE and skip change the title
            taskTitle = !task.isSkipped() ? `${task?.title}` : `${task?.output} ${chalk.dim('[SKIPPED]')}`
          }

          output.push(this.formatString(taskTitle, this.getSymbol(task), level))
        }

        // CURRENT TASK OUTPUT
        if (task?.output) {
          if (task.isPending() && task.isPrompt()) {
            this.promptBar = task.output

          } else if (task.isBottomBar() || !task.hasTitle()) {
            const data = this.dumpData(task, -1)

            if (!this.bottomBar[task.id]) {
              this.bottomBar[task.id] = {}
              this.bottomBar[task.id].data = []

              this.bottomBar[task.id].items = typeof task.bottomBar === 'boolean' ? 1 : task.bottomBar
            }

            if (!data?.some((element) => this.bottomBar[task.id].data.includes(element))) {
              this.bottomBar[task.id].data = [ ...this.bottomBar[task.id].data, ...data ]
            }

          } else if (task.isPending() || task.haspersistentOutput()) {
            output = [ ...output, ...this.dumpData(task, level) ]

          } else if (task.isSkipped() && task.collapseSkips === false) {
            output = [ ...output, ...this.dumpData(task, level) ]

          }

        }

        // SUBTASKS
        if (
          (
            task.isPending() || task.hasFailed()
          || task.isCompleted() && !task.hasTitle()
          || task.isCompleted() && task.collapse === false && task.hasSubtasks() && !task.subtasks.some((subtask) => subtask.collapse === true)
          || task.isCompleted() && task.hasSubtasks() && task.subtasks.some((subtask) => subtask.collapse === false)
          )
        && task.showSubtasks !== false && task.hasSubtasks()
        ) {
          const subtaskLevel = !task.hasTitle() ? level : level + 1

          const subtaskRender = this.multiLineRenderer(task.subtasks, subtaskLevel)
          if (subtaskRender !== '') {
            output = [ ...output, subtaskRender ]
          }
        }

        // TASK FINISHED CLEAN BOTTOM BARS
        if (task.isCompleted() || task.hasFailed()) {
          this.promptBar = null

          if (task.hasFailed() || (!task.hasTitle() || task.isBottomBar()) && task.haspersistentOutput() !== true) {
            delete this.bottomBar[task.id]
          }
        }
      }
    }

    return output.join('\n')
  }

  private renderBottomBar (): string {
    // parse through all objects return only the last mentioned items
    if (Object.keys(this.bottomBar).length > 0) {
      this.bottomBar = Object.keys(this.bottomBar).reduce((o, key) => {
        if (!o?.[key]) {
          o[key] = {}
        }

        o[key].data = this.bottomBar[key].data.slice(-this.bottomBar[key].items)
        return o
      }, {})

      // render the bar
      const returnRender = Object.values(this.bottomBar).reduce((o, value )=> o = [ ...o, ...value.data ], [])

      return [ '\n', ...returnRender ].join('\n')
    }
  }

  private renderPrompt (): string {
    if (this.promptBar) {
      return `\n\n${this.promptBar}`
    }
  }

  private dumpData (task: ListrTaskObject<ListrContext>, level: number): string[] {
    const output: string[] = []
    if (typeof task.output === 'string') {
      // indent and color
      task.output.split('\n').filter(Boolean).forEach((line, i) => {
        const icon = i === 0 ? this.getSymbol(task, true) : ' '
        output.push(this.formatString(line, icon, level +1))
      })
    }

    return output
  }

  private formatString (string: string, icon: string, level: number): string {
    return `${indentString(`${icon} ${string}`, level * this.indentation)}`
  }

  private getSymbol (task: ListrTaskObject<ListrContext>, data = false): string {
    if (!task.spinner && !data) {
      task.spinner = elegantSpinner()
    }

    if (task.isPending() && !data) {
      return this.options.showSubtasks !== false && task.hasSubtasks() ? chalk.yellow(figures.pointer) : chalk.yellowBright(task.spinner())
    }

    if (task.isCompleted() && !data) {
      return chalk.green(figures.tick)
    }

    if (task.hasFailed() && !data) {
      return task.hasSubtasks() ? chalk.red(figures.play) : chalk.red(figures.cross)
    }

    if (task.isSkipped() && !data && task.collapseSkips === false) {
      return chalk.yellow(figures.warning)

    } else if (task.isSkipped() && (data || task.collapseSkips)) {
      return chalk.yellow(figures.arrowDown)

    }

    if (task.isPrompt()) {
      return chalk.cyan(figures.questionMarkPrefix)
    }

    if (!data) {
      return chalk.dim(figures.squareSmallFilled)
    } else {
      return figures.pointerSmall
    }
  }
}