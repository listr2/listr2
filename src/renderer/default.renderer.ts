import * as chalk from 'chalk'
import * as cliCursor from 'cli-cursor'
import * as cliTruncate from 'cli-truncate'
import * as elegantSpinner from 'elegant-spinner'
import * as figures from 'figures'
import * as indentString from 'indent-string'
import * as logUpdate from 'log-update'

import { ListrOptions, ListrRenderer, ListrTaskObject } from '../interfaces/listr-task.interface'

// type MultiLineRendererOptions = ListrOptions<any> & { showSubtasks: boolean, collapse: boolean }

export class MultiLineRenderer implements ListrRenderer {
  static nonTTY = false
  private id?: NodeJS.Timeout
  private indentation = 2

  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) { }

  public render (): void {
    // hide cursor
    cliCursor.hide()
    // Do not render if we are already rendering
    if (this.id) {
      return
    }

    this.id = setInterval(() => {
      logUpdate(this.multiLineRenderer(this.tasks))
    }, 100)
  }

  public end (): void {
    // hide cursor
    cliCursor.show()
    if (this.id) {
      clearInterval(this.id)
      this.id = undefined
    }

    logUpdate(this.multiLineRenderer(this.tasks))
    logUpdate.done()
  }

  private multiLineRenderer (tasks: ListrTaskObject<any>[], level = 0): string {
    let output: string[] = []

    for (const task of tasks) {
      if (task.isEnabled()) {
        // CURRENT TASK TITLE
        const taskTitle = !task.isSkipped() ? task.title : `${task.output} ${chalk.dim('[SKIPPED]')}`
        output.push(this.formatString(taskTitle, this.getSymbol(task, this.options), level))

        // CURRENT TASK OUTPUT
        if (task.isPending() && task?.output) {
          if (typeof task.output === 'string') {
            // indent and color
            task.output.split('\n').filter(Boolean).forEach((line, i) => {
              const icon = i === 0 ? figures.pointerSmall : ' '
              output.push(this.formatString(line, icon, level +1))
            })
          }
        }

        // SUBTASKS
        if ((task.isPending() || task.hasFailed() || this.options.collapse === false) && (task.hasFailed() || this.options.showSubtasks !== false) && task.hasSubtasks()) {
          output = [...output, this.multiLineRenderer(task.subtasks, level + 1)]
        }
      }
    }

    return output.join('\n')
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