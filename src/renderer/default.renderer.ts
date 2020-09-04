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
    // collapse skip messages in to single message in task title
    collapseSkips?: boolean
    // show skip messages or show the original title of the task when in collapseSkips Mode
    showSkipMessage?: boolean
    // suffix skip messages with [SKIPPED] when in collapseSkips mode
    suffixSkips?: boolean
    // collapse error messages in to single message in task title
    collapseErrors?: boolean
    // shows the thrown error message or show the original title of the task when in collapseErrors mode
    showErrorMessage?: boolean
    // only update via renderhook
    lazy?: boolean
    // show duration for all tasks overwrites per task options
    showTimer?: boolean
  } = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapse: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: true,
    collapseErrors: true,
    showErrorMessage: true,
    lazy: false,
    showTimer: false
  }

  public static rendererTaskOptions: {
    // write task output to bottom bar
    bottomBar?: boolean | number
    // keep output after task finishes
    persistentOutput?: boolean
    // show timer per task
    showTimer?: boolean
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

  public hasTimer (task: ListrTaskObject<any, typeof DefaultRenderer>): boolean {
    return this.getTaskOptions(task).showTimer === true
  }

  public getTaskTime (task: ListrTaskObject<any, typeof DefaultRenderer>): string {
    const seconds = Math.floor(task.message.duration / 1000)
    const minutes = Math.floor(seconds / 60)

    let parsedTime: string
    if (seconds === 0 && minutes === 0) {
      parsedTime = `0.${Math.floor(task.message.duration / 100)}s`
    }

    if (seconds > 0) {
      parsedTime = `${seconds % 60}s`
    }

    if (minutes > 0) {
      parsedTime = `${minutes}m${parsedTime}`
    }

    return chalk.dim(`[${parsedTime}]`)
  }

  public createRender (options?: { tasks?: boolean, bottomBar?: boolean, prompt?: boolean }): string {
    options = {
      ...{
        tasks: true,
        bottomBar: true,
        prompt: true
      },
      ...options
    }

    const render: string[] = []

    const renderTasks = this.multiLineRenderer(this.tasks)
    const renderBottomBar = this.renderBottomBar()
    const renderPrompt = this.renderPrompt()

    if (options.tasks && renderTasks?.trim().length > 0) {
      render.push(renderTasks)
    }

    if (options.bottomBar && renderBottomBar?.trim().length > 0) {
      render.push((render.length > 0 ? EOL : '') + renderBottomBar)
    }

    if (options.prompt && renderPrompt?.trim().length > 0) {
      render.push((render.length > 0 ? EOL : '') + renderPrompt)
    }

    return render.length > 0 ? render.join(EOL) : ''
  }

  public render (): void {
    // Do not render if we are already rendering
    if (this.id) {
      return
    }

    const updateRender = (): void => logUpdate(this.createRender())

    /* istanbul ignore if */
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

    // clear log updater
    logUpdate.clear()
    logUpdate.done()

    // directly write to process.stdout, since logupdate only can update the seen height of terminal
    if (!this.options.clearOutput) {
      process.stdout.write(this.createRender({ prompt: false }) + EOL)
    }
  }

  // eslint-disable-next-line
  private multiLineRenderer(tasks: ListrTaskObject<any, typeof DefaultRenderer>[], level = 0): string {
    let output: string[] = []

    for (const task of tasks) {
      if (task.isEnabled()) {
        // Current Task Title
        if (task.hasTitle()) {
          if (!(tasks.some((task) => task.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
            // if task is skipped
            if (task.hasFailed() && this.options.collapseErrors) {
              // current task title and skip change the title
              output = [ ...output, this.formatString(task.message.error && this.options.showErrorMessage ? task.message.error : task.title, this.getSymbol(task), level) ]
            } else if (task.isSkipped() && this.options.collapseSkips) {
              // current task title and skip change the title
              output = [
                ...output,
                this.formatString(
                  (task.message.skip && this.options.showSkipMessage ? task.message.skip : task.title) + (this.options.suffixSkips ? chalk.dim(' [SKIPPED]') : ''),
                  this.getSymbol(task),
                  level
                )
              ]
            } else if (task.isCompleted() && task.hasTitle() && (this.options.showTimer || this.hasTimer(task))) {
              // task with timer
              output = [ ...output, this.formatString(`${task?.title} ${this.getTaskTime(task)}`, this.getSymbol(task), level) ]
            } else {
              // normal state
              output = [ ...output, this.formatString(task.title, this.getSymbol(task), level) ]
            }
          } else {
            // some sibling task but self has failed and this has stopped
            output = [ ...output, this.formatString(task.title, chalk.red(figures.main.squareSmallFilled), level) ]
          }
        }

        // without the collapse option for skip and errors
        if (task.hasFailed() && this.options.collapseErrors === false) {
          // show skip data if collapsing is not defined
          output = [ ...output, ...this.dumpData(task, level, 'error') ]
        } else if (task.isSkipped() && this.options.collapseSkips === false) {
          // show skip data if collapsing is not defined
          output = [ ...output, ...this.dumpData(task, level, 'skip') ]
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
            if (!data?.some((element) => this.bottomBar[task.id].data.includes(element)) && !task.isSkipped()) {
              this.bottomBar[task.id].data = [ ...this.bottomBar[task.id].data, ...data ]
            }
          } else if (task.isPending() || this.hasPersistentOutput(task)) {
            // keep output if persistent output is set
            output = [ ...output, ...this.dumpData(task, level) ]
          }
        }

        // render subtasks, some complicated conditionals going on
        if (
          // check if renderer option is on first
          this.options.showSubtasks !== false &&
          // if it doesnt have subtasks no need to check
          task.hasSubtasks() &&
          (task.isPending() ||
            task.hasFailed() ||
            task.isCompleted() && !task.hasTitle() ||
            // have to be completed and have subtasks
            task.isCompleted() && this.options.collapse === false && !task.subtasks.some((subtask) => subtask.rendererOptions.collapse === true) ||
            // if any of the subtasks have the collapse option of
            task.subtasks.some((subtask) => subtask.rendererOptions.collapse === false) ||
            // if any of the subtasks has failed
            task.subtasks.some((subtask) => subtask.hasFailed()))
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
        if (task.isCompleted() || task.hasFailed() || task.isSkipped()) {
          // clean up prompts
          this.promptBar = null

          // clean up bottom bar items if not indicated otherwise
          if (!this.hasPersistentOutput(task)) {
            delete this.bottomBar[task.id]
          }
        }
      }
    }

    if (output.length > 0) {
      return output.join(EOL)
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

      return Object.values(this.bottomBar)
        .reduce((o, value) => o = [ ...o, ...value.data ], [])
        .join(EOL)
    }
  }

  private renderPrompt (): string {
    if (this.promptBar) {
      return this.promptBar
    }
  }

  private dumpData (task: ListrTaskObject<ListrContext, typeof DefaultRenderer>, level: number, source: 'output' | 'skip' | 'error' = 'output'): string[] {
    const output: string[] = []

    let data: string | boolean
    switch (source) {
    case 'output':
      data = task.output
      break
    case 'skip':
      data = task.message.skip
      break
    case 'error':
      data = task.message.error
      break
    }

    if (typeof data === 'string' && data.trim() !== '') {
      // indent and color
      data
        .split(EOL)
        .filter(Boolean)
        .forEach((line, i) => {
          const icon = i === 0 ? this.getSymbol(task, true) : ' '
          output.push(this.formatString(line, icon, level + 1))
        })
    }

    return output
  }

  private formatString (string: string, icon: string, level: number): string {
    return `${cliTruncate(indentString(`${icon} ${string.trim()}`, level * this.options.indentation), process.stdout.columns ?? 80)}`
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

    if (!data) {
      return chalk.dim(figures.main.squareSmallFilled)
    } else {
      return figures.main.pointerSmall
    }
  }
}
