import cliTruncate from 'cli-truncate'
import figures from 'figures'
import indentString from 'indent-string'
import { EOL } from 'os'
import { UpdateManager } from 'stdout-update'
import cliWrap from 'wrap-ansi'

import { ListrContext, ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'
import chalk from '@utils/chalk'

/** Default updating renderer for Listr2 */
export class DefaultRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = false
  /** renderer options for the defauult renderer */
  public static rendererOptions: {
    /**
     * indentation per level of subtask
     * @default 2
     * @global global option that can not be temperated with from subtasks
     */
    indentation?: number
    /**
     * clear output when task finishes
     * @default false
     * @global global option that can not be temperated with from subtasks
     */
    clearOutput?: boolean
    /**
     * show the subtasks of the current task if it returns a new listr
     * @default true
     * @global global option that can not be temperated with from subtasks
     */
    showSubtasks?: boolean
    /**
     * collapse subtasks after finish
     * @default true
     */
    collapse?: boolean
    /**
     * collapse skip messages in to single message and override the task title
     * @default true
     */
    collapseSkips?: boolean
    /**
     * show skip messages or show the original title of the task, this will also disable collapseSkips mode
     *
     * You can disable showing the skip messages, eventhough you passed in a message by settings this option,
     * if you want to keep the original task title intacted.
     * @default true
     */
    showSkipMessage?: boolean
    /**
     * suffix skip messages with [SKIPPED] when in collapseSkips mode
     * @default true
     */
    suffixSkips?: boolean
    /**
     * collapse error messages in to single message in task title
     * @default true
     */
    collapseErrors?: boolean
    /**
     * shows the thrown error message or show the original title of the task, this will also disable collapseErrors mode
     * You can disable showing the error messages, eventhough you passed in a message by settings this option,
     * if you want to keep the original task title intacted.
     * @default true
     */
    showErrorMessage?: boolean
    /**
     * suffix retry messages with [RETRY-${COUNT}] when retry is enabled for a task
     * @default true
     */
    suffixRetries?: boolean
    /**
     * only update via renderhook
     *
     * useful for tests and stuff. this will disable showing spinner and only update the screen if the something else has
     * happened in the task worthy to show
     * @default false
     * @global global option that can not be temperated with from subtasks
     */
    lazy?: boolean
    /**
     * show duration for all tasks
     *
     * overwrites per task renderer options
     * @default false
     */
    showTimer?: boolean
    /**
     * removes empty lines from the data output
     *
     * @default true
     * @global global option that can not be temperated with from subtasks
     */
    removeEmptyLines?: boolean
    /**
     * formats data output depending on your requirements.
     * log-update mostly breaks if there is no wrap, so there is many options to choose your preference
     *
     * @default 'truncate'
     * @global global option that can not be temperated with from subtasks
     */
    formatOutput?: 'truncate' | 'wrap'
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
    suffixRetries: true,
    lazy: false,
    showTimer: false,
    removeEmptyLines: true,
    formatOutput: 'truncate'
  }

  /** per task options for the default renderer */
  public static rendererTaskOptions: {
    /**
     * write task output to bottom bar instead of the gap under the task title itself.
     * useful for stream of data.
     * @default false
     *
     * `true` only keep 1 line of latest data outputted by the task.
     * `false` only keep 1 line of latest data outputted by the task.
     * `number` will keep designated data of latest data outputted by the task.
     */
    bottomBar?: boolean | number
    /**
     * keep output after task finishes
     * @default false
     *
     * works both for bottom bar and the default behavior
     */
    persistentOutput?: boolean
    /**
     * show the task time if it was successful
     */
    showTimer?: boolean
  }

  private id?: NodeJS.Timeout
  private bottomBar: { [uuid: string]: { data?: string[], items?: number } } = {}
  private rendered: string[] = []
  private pointer = 0
  private pointerTotal = 0
  private promptBar: string
  private spinner: string[] = process.platform === 'win32' && !process.env.WT_SESSION ? [ '-', '\\', '|', '/' ] : [ '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ]
  private spinnerPosition = 0
  private updateManager: UpdateManager = UpdateManager.getInstance()

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

  public getSelfOrParentOption<T extends keyof typeof DefaultRenderer['rendererOptions']>(
    task: ListrTaskObject<any, typeof DefaultRenderer>,
    key: T
  ): typeof DefaultRenderer['rendererOptions'][T] {
    return task?.rendererOptions?.[key] ?? this.options?.[key]
  }

  /* istanbul ignore next */
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

    return parsedTime
  }

  public createRender (options?: { tasks?: boolean, bottomBar?: boolean, prompt?: boolean }): string[] {
    options = {
      ...{
        tasks: true,
        bottomBar: true,
        prompt: true
      },
      ...options
    }

    const render: string[] = []

    const renderTasks = this.multiLineRenderer()
    const renderBottomBar = this.renderBottomBar()
    const renderPrompt = this.renderPrompt()

    if (options.tasks && renderTasks?.length > 0) {
      render.push(...renderTasks)
    }

    if (options.bottomBar && renderBottomBar?.length > 0) {
      render.push(...render?.length > 0 || this.pointerTotal > 0 ? EOL : [], ...renderBottomBar)
    }

    if (options.prompt && renderPrompt?.length > 0) {
      render.push(...render.length > 0 ? EOL : [], renderPrompt)
    }

    return render.length > 0 ? render : []
  }

  public render (): void {
    // Do not render if we are already rendering
    if (this.id) {
      return
    }

    this.updateManager.hook()

    /* istanbul ignore if */
    if (!this.options?.lazy) {
      this.id = setInterval(() => {
        this.spinnerPosition = ++this.spinnerPosition % this.spinner.length
        this.updateRender()
      }, 100)
    }

    this.renderHook$.subscribe(() => {
      this.updateRender()
    })
  }

  public end (): void {
    clearInterval(this.id)
    if (this.id) {
      this.id = undefined
    }

    if (!this.options.clearOutput) {
      this.updateRender({ prompt: false })
    } else {
      this.updateManager.erase(this.updateManager.outside + this.updateManager.lastLength)
    }

    // clear log updater
    this.updateManager.unhook(true)
  }

  private updateRender (...args: Parameters<DefaultRenderer['createRender']>): void {
    const pointer = this.pointer

    this.shiftRenderPointer()

    const render = this.createRender(...args)

    if (render.length > 0) {
      this.updateManager.update(render, pointer)
    } else if (this.updateManager.lastLength - this.pointerTotal > 0) {
      // clear the not finalized lines, if the render returns empty since update method checks length > 0
      this.updateManager.erase(this.updateManager.lastLength - this.pointerTotal)
    }
  }

  private multiLineRenderer (tasks: ListrTaskObject<any, typeof DefaultRenderer>[] = this.tasks, level = 0, parent?: boolean): string[] {
    let output: string[] = []
    let renderIndex = -1

    // eslint-disable-next-line complexity
    tasks.forEach((task, index) => {
      if (!this.rendered.includes(task.id) && task.isEnabled()) {
        let taskOutput: string[] = []

        // Current Task Title
        if (task.hasTitle()) {
          if (!(tasks.some((task) => task.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
            // if task is skipped
            if (task.hasFailed() && this.getSelfOrParentOption(task, 'collapseErrors')) {
              // current task title and skip change the title
              taskOutput = [
                ...taskOutput,
                ...this.formatString(
                  !task.hasSubtasks() && task.message.error && this.getSelfOrParentOption(task, 'showErrorMessage') ? task.message.error : task.title,
                  this.getSymbol(task),
                  level
                )
              ]
            } else if (task.isSkipped() && this.getSelfOrParentOption(task, 'collapseSkips')) {
              // current task title and skip change the title
              taskOutput = [
                ...taskOutput,
                ...this.formatString(
                  this.addSuffixToMessage(
                    task.message.skip && this.getSelfOrParentOption(task, 'showSkipMessage') ? task.message.skip : task.title,
                    'SKIPPED',
                    this.getSelfOrParentOption(task, 'suffixSkips')
                  ),
                  this.getSymbol(task),
                  level
                )
              ]
            } else if (task.isRetrying() && this.getSelfOrParentOption(task, 'suffixRetries')) {
              taskOutput = [ ...taskOutput, ...this.formatString(this.addSuffixToMessage(task.title, `RETRYING-${task.message.retry.count}`), this.getSymbol(task), level) ]
            } else if (task.isCompleted() && task.hasTitle() && (this.getSelfOrParentOption(task, 'showTimer') || this.hasTimer(task))) {
              // task with timer
              taskOutput = [ ...taskOutput, ...this.formatString(this.addSuffixToMessage(task.title, this.getTaskTime(task)), this.getSymbol(task), level) ]
            } else {
              // normal state
              taskOutput = [ ...taskOutput, ...this.formatString(task.title, this.getSymbol(task), level) ]
            }
          } else {
            // some sibling task but self has failed and this has stopped
            taskOutput = [ ...taskOutput, ...this.formatString(task.title, chalk.red(figures.main.squareSmallFilled), level) ]
          }
        }

        // task should not have subtasks since subtasks will handle the error already
        // maybe it is a better idea to show the error or skip messages when show subtasks is disabled.
        if (!task.hasSubtasks() || !this.getSelfOrParentOption(task, 'showSubtasks')) {
          // without the collapse option for skip and errors
          if (
            task.hasFailed() &&
            this.getSelfOrParentOption(task, 'collapseErrors') === false &&
            (this.getSelfOrParentOption(task, 'showErrorMessage') || !this.getSelfOrParentOption(task, 'showSubtasks'))
          ) {
            // show skip data if collapsing is not defined
            taskOutput = [ ...taskOutput, ...this.dumpData(task, level, 'error') ]
          } else if (
            task.isSkipped() &&
            this.getSelfOrParentOption(task, 'collapseSkips') === false &&
            (this.getSelfOrParentOption(task, 'showSkipMessage') || !this.getSelfOrParentOption(task, 'showSubtasks'))
          ) {
            // show skip data if collapsing is not defined
            taskOutput = [ ...taskOutput, ...this.dumpData(task, level, 'skip') ]
          }
        }

        // Current Task Output
        if (task?.output) {
          if (task.isRunning() && task.isPrompt()) {
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
            if (!this.bottomBar[task.id]?.data?.some((element) => data.includes(element))) {
              this.bottomBar[task.id].data = [ ...this.bottomBar[task.id].data, ...data ]
            }
          } else if (task.isRunning() || this.hasPersistentOutput(task)) {
            // keep output if persistent output is set
            taskOutput = [ ...taskOutput, ...this.dumpData(task, level) ]
          }
        }

        // render subtasks, some complicated conditionals going on
        let subtaskOutput: string[] = []

        if (
          // check if renderer option is on first
          this.getSelfOrParentOption(task, 'showSubtasks') !== false &&
          // if it doesnt have subtasks no need to check
          task.hasSubtasks() &&
          (task.isRunning() ||
            task.isCompleted() &&
              (!task.hasTitle() || this.getSelfOrParentOption(task, 'collapse') === false && !task.subtasks.some((subtask) => subtask.rendererOptions.collapse === true)) ||
            // have to be completed and have subtasks
            // if any of the subtasks have the collapse option of, has failed, has rolled back, or skipped
            task.subtasks.some((subtask) => subtask.hasFailed() || subtask.rendererOptions.collapse === false || subtask.hasRolledBack() || subtask.isSkipped()))
        ) {
          // set level
          const subtaskLevel = !task.hasTitle() ? level : level + 1

          // render the subtasks as in the same way
          const subtaskRender = this.multiLineRenderer(task.subtasks, subtaskLevel, task.hasFinalized())
          if (subtaskRender?.length > 0 && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
            subtaskOutput = subtaskRender
          }
        }

        output = [ ...output, ...taskOutput, ...subtaskOutput ]

        // after task is finished actions
        if (task.hasFinalized()) {
          // clean up prompts
          this.promptBar = null

          // clean up bottom bar items if not indicated otherwise
          if (!this.hasPersistentOutput(task)) {
            delete this.bottomBar[task.id]
          }

          // tasks before this should be finished as well as parent task should be finished
          if (renderIndex === index - 1 && (parent ?? true)) {
            this.shiftRenderPointer(taskOutput.length)

            renderIndex = index

            this.rendered.push(task.id)
          }
        }
      } else {
        renderIndex += 1
      }
    })

    return output
  }

  private renderBottomBar (): string[] {
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
        .filter(Boolean)
    }
  }

  private renderPrompt (): string {
    if (this.promptBar) {
      return this.promptBar
    }
  }

  private dumpData (task: ListrTaskObject<ListrContext, typeof DefaultRenderer>, level: number, source: 'output' | 'skip' | 'error' = 'output'): string[] {
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

    // dont return anything on some occasions, where error might be equal to task title already
    if (!(task.hasTitle() && source === 'error' && data === task.title) && typeof data === 'string') {
      return this.formatString(data, this.getSymbol(task, true), level + 1)
    }

    return []
  }

  private formatString (str: string, icon: string, level: number): string[] {
    // we dont like empty data around here
    if (str.trim() === '') {
      return []
    }

    str = `${icon} ${str}`
    let parsedStr: string[]

    let columns = process.stdout.columns ? process.stdout.columns : 80
    columns = columns - level * this.options.indentation - 2

    switch (this.options.formatOutput) {
    case 'truncate':
      parsedStr = str.split(EOL).map((s, i) => {
        return cliTruncate(this.indentMultilineOutput(s, i), columns)
      })
      break

    case 'wrap':
      parsedStr = cliWrap(str, columns, { hard: true })
        .split(EOL)
        .map((s, i) => this.indentMultilineOutput(s, i))
      break

    default:
      throw new Error('Format option for the renderer is wrong.')
    }

    // this removes the empty lines
    if (this.options.removeEmptyLines) {
      parsedStr = parsedStr.filter(Boolean)
    }

    return indentString(parsedStr.join(EOL), level * this.options.indentation).split(EOL)
  }

  private indentMultilineOutput (str: string, i: number): string {
    return i > 0 ? indentString(str.trim(), 2, { includeEmptyLines: false }) : str.trim()
  }

  private shiftRenderPointer (next?: number): void {
    if (!next) {
      this.pointerTotal += this.pointer
      this.pointer = 0
    } else {
      this.pointer += next
    }
  }

  // eslint-disable-next-line complexity
  private getSymbol (task: ListrTaskObject<ListrContext, typeof DefaultRenderer>, data = false): string {
    if (task.isPending() && !data) {
      return this.options?.lazy || this.getSelfOrParentOption(task, 'showSubtasks') !== false && task.hasSubtasks() && !task.subtasks.every((subtask) => !subtask.hasTitle())
        ? chalk.yellow(figures.main.pointer)
        : chalk.yellowBright(this.spinner[this.spinnerPosition])
    } else if (task.isCompleted() && !data) {
      return task.hasSubtasks() && task.subtasks.some((subtask) => subtask.hasFailed()) ? chalk.yellow(figures.main.warning) : chalk.green(figures.main.tick)
    } else if (task.isRetrying() && !data) {
      return this.options?.lazy ? chalk.keyword('orange')(figures.main.warning) : chalk.keyword('orange')(this.spinner[this.spinnerPosition])
    } else if (task.isRollingBack() && !data) {
      return this.options?.lazy ? chalk.red(figures.main.warning) : chalk.red(this.spinner[this.spinnerPosition])
    } else if (task.hasRolledBack() && !data) {
      return chalk.red(figures.main.arrowLeft)
    } else if (task.hasFailed() && !data) {
      return task.hasSubtasks() ? chalk.red(figures.main.pointer) : chalk.red(figures.main.cross)
    } else if (task.isSkipped() && !data && this.getSelfOrParentOption(task, 'collapseSkips') === false) {
      return chalk.yellow(figures.main.warning)
    } else if (task.isSkipped() && (data || this.getSelfOrParentOption(task, 'collapseSkips'))) {
      return chalk.yellow(figures.main.arrowDown)
    } else if (data) {
      return figures.main.pointerSmall
    } else {
      return chalk.dim(figures.main.squareSmallFilled)
    }
  }

  private addSuffixToMessage (message: string, suffix: string, condition?: boolean): string {
    return condition ?? true ? message + ' ' + chalk.dim(`[${suffix}]`) : message
  }
}
