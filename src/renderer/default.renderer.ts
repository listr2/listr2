import * as chalk from 'chalk'
import * as cliCursor from 'cli-cursor'
import * as cliTruncate from 'cli-truncate'
import * as elegantSpinner from 'elegant-spinner'
import * as figures from 'figures'
import * as indentString from 'indent-string'
import * as logUpdate from 'log-update'

import { ListrOptions, ListrRenderer, ListrTaskObject } from '../interfaces/listr-task.interface'

export class MultiLineRenderer implements ListrRenderer {
  static nonTTY = false
  private id?: NodeJS.Timeout
  private indentation = 2
  private bottomBarItems: number
  private bottomBar: string[] = []

  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) {
    this.bottomBarItems = this.options.bottomBarItems || 3
  }

  public render (): void {
    // hide cursor
    cliCursor.hide()
    // Do not render if we are already rendering
    if (this.id) {
      return
    }

    this.id = setInterval(() => {
      logUpdate(this.multiLineRenderer(this.tasks), this.renderBottomBar())
    }, 100)
  }

  public end (): void {
    if (this.id) {
      clearInterval(this.id)
      this.id = undefined
    }

    logUpdate(this.multiLineRenderer(this.tasks))
    logUpdate.done()

    // hide cursor
    cliCursor.show()
  }

  // eslint-disable-next-line complexity
  private multiLineRenderer (tasks: ListrTaskObject<any>[], level = 0): string {
    let output: string[] = []

    for (const task of tasks) {

      if (task.isEnabled()) {
        if (task.hasTitle()) {
        // CURRENT TASK TITLE and skip change the title
          const taskTitle = !task.isSkipped() ? task?.title : `${task?.output} ${chalk.dim('[SKIPPED]')}`
          output.push(this.formatString(taskTitle, this.getSymbol(task, this.options), level))
        }

        // CURRENT TASK OUTPUT
        if (task.isPending() && task?.output) {
          if (task.isBottomBar() || !task.hasTitle()) {
            const data = this.dumpData(task.output, -1)

            if (!data?.some((element) => this.bottomBar.includes(element))) {
              this.bottomBar = [...this.bottomBar, ...data]
            }

          } else {
            output = [...output, ...this.dumpData(task.output, level)]
          }
        }

        // SUBTASKS
        if ((task.isPending() || task.hasFailed() || this.options.collapse === false || !task.hasTitle())
        && (task.hasFailed() || this.options.showSubtasks !== false)
        && task.hasSubtasks()) {
          const subtaskLevel = !task.hasTitle() ? level : level + 1
          output = [...output, this.multiLineRenderer(task.subtasks, subtaskLevel)]
        }
      }
    }

    return output.join('\n')
  }

  private renderBottomBar (): string {
    if (this.bottomBar.length > 0) {
      this.bottomBar = this.bottomBar.slice(-this.bottomBarItems)
      return ['\n', ...this.bottomBar].join('\n')
    }
  }

  private dumpData (taskOutput: string, level: number): string[] {
    const output: string[] = []
    if (typeof taskOutput === 'string') {
      // indent and color
      taskOutput.split('\n').filter(Boolean).forEach((line, i) => {
        const icon = i === 0 ? figures.pointerSmall : ' '
        output.push(this.formatString(line, icon, level +1))
      })
    }

    return output
  }

  private formatString (string: string, icon: string, level: number): string {
    return `${cliTruncate(indentString(`${icon} ${string}`, (level) * this.indentation), process.stdout.columns - 3)}`
  }

  private getSymbol (task, options): string {
    if (!task.spinner) {
      task.spinner = elegantSpinner()
    }

    if (task.isPending()) {
      return options.showSubtasks !== false && task.hasSubtasks() ? chalk.yellow(figures.pointer) : chalk.yellowBright(task.spinner())
    }

    if (task.isCompleted()) {
      return chalk.green(figures.tick)
    }

    if (task.hasFailed()) {
      return task.hasSubtasks() ? chalk.red(figures.play) : chalk.red(figures.cross)
    }

    if (task.isSkipped()) {
      return chalk.yellow(figures.arrowDown)
    }

    return chalk.dim(figures.squareSmallFilled)
  }
}