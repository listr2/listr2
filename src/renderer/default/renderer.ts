import type truncate from 'cli-truncate'
import type { createLogUpdate } from 'log-update'
import { EOL } from 'os'
import type wrap from 'wrap-ansi'

import { LISTR_DEFAULT_RENDERER_STYLE, ListrDefaultRendererLogLevels } from './renderer.constants'
import type { DefaultRendererOptions, DefaultRendererTaskOptions, ListrDefaultRendererOptions, ListrDefaultRendererTasks } from './renderer.interface'
import { ListrEventType, ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrContext, ListrEventMap, ListrRenderer, ListrTaskEventMap } from '@interfaces'
import { PromptError } from '@interfaces'
import type { EventManager, Task } from '@lib'
import { ListrLogger, LogLevels, Spinner, assertFunctionOrSelf, cleanseAnsi, color, indent } from '@utils'

/** Default updating renderer for Listr2 */
export class DefaultRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = false
  /** renderer options for the defauult renderer */
  public static rendererOptions: DefaultRendererOptions = {
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
    removeEmptyLines: true,
    formatOutput: 'truncate',
    logger: ListrLogger
  }

  /** per task options for the default renderer */
  public static rendererTaskOptions: DefaultRendererTaskOptions

  private bottom: Record<string, { data?: string[], items?: number }> = {}
  private prompt: string
  private activePrompt: string
  private readonly spinner: Spinner
  private readonly logger: ListrLogger
  private updater: ReturnType<typeof createLogUpdate>
  private truncate: typeof truncate
  private wrap: typeof wrap

  constructor (
    private readonly tasks: ListrDefaultRendererTasks,
    private readonly options: ListrDefaultRendererOptions,
    private readonly events: EventManager<ListrEventType, ListrEventMap>
  ) {
    this.options = {
      ...DefaultRenderer.rendererOptions,
      ...this.options,
      style: {
        icon: {
          ...LISTR_DEFAULT_RENDERER_STYLE.icon,
          ...this.options?.style?.icon ?? {}
        },
        color: {
          ...LISTR_DEFAULT_RENDERER_STYLE.color,
          ...this.options?.style?.color ?? {}
        }
      }
    }

    this.logger = new this.options.logger(this.options.loggerOptions)
    this.spinner = this.options.spinner ?? new Spinner()
  }

  public getTaskOptions (task: Task<any, typeof DefaultRenderer>): (typeof DefaultRenderer)['rendererTaskOptions'] {
    return { ...DefaultRenderer.rendererTaskOptions, ...task.rendererTaskOptions }
  }

  public isBottomBar (task: Task<any, typeof DefaultRenderer>): boolean {
    const bottomBar = this.getTaskOptions(task).bottomBar

    return typeof bottomBar === 'number' && bottomBar !== 0 || typeof bottomBar === 'boolean' && bottomBar !== false
  }

  public hasPersistentOutput (task: Task<any, typeof DefaultRenderer>): boolean {
    return this.getTaskOptions(task).persistentOutput === true
  }

  public getSelfOrParentOption<K extends keyof ListrDefaultRendererOptions>(task: Task<any, typeof DefaultRenderer>, key: K): ListrDefaultRendererOptions[K] {
    return task?.rendererOptions?.[key] ?? this.options?.[key]
  }

  public async render (): Promise<void> {
    const { createLogUpdate } = await import('log-update')
    const { default: truncate } = await import('cli-truncate')
    const { default: wrap } = await import('wrap-ansi')

    this.updater = createLogUpdate(this.logger.process.stdout)
    this.truncate = truncate
    this.wrap = wrap

    this.logger.process.hijack()

    /* istanbul ignore if */
    if (!this.options?.lazy) {
      this.spinner.start(() => {
        this.update()
      })
    }

    this.events.on(ListrEventType.SHOULD_REFRESH_RENDER, () => {
      this.update()
    })
  }

  public update (): void {
    this.updater(this.create())
  }

  public end (): void {
    this.spinner.stop()

    // clear log updater
    this.updater.clear()
    this.updater.done()

    // directly write to process.stdout, since logupdate only can update the seen height of terminal
    if (!this.options.clearOutput) {
      this.logger.process.toStdout(this.create({ prompt: false }))
    }

    this.logger.process.release()
  }

  public create (options?: { tasks?: boolean, bottomBar?: boolean, prompt?: boolean }): string {
    options = {
      tasks: true,
      bottomBar: true,
      prompt: true,
      ...options
    }

    const render: string[] = []

    const renderTasks = this.renderer(this.tasks)
    const renderBottomBar = this.renderBottomBar()
    const renderPrompt = this.renderPrompt()

    if (options.tasks && renderTasks.length > 0) {
      render.push(...renderTasks)
    }

    if (options.bottomBar && renderBottomBar.length > 0) {
      if (render.length > 0) {
        render.push('')
      }

      render.push(...renderBottomBar)
    }

    if (options.prompt && renderPrompt.length > 0) {
      if (render.length > 0) {
        render.push('')
      }

      render.push(...renderPrompt)
    }

    return render.join(EOL)
  }

  // eslint-disable-next-line complexity
  protected style (task: Task<ListrContext, typeof DefaultRenderer>, output = false): string {
    if (task.isSkipped()) {
      if (output || this.getSelfOrParentOption(task, 'collapseSkips')) {
        return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.SKIPPED_WITH_COLLAPSE)
      } else if (this.getSelfOrParentOption(task, 'collapseSkips') === false) {
        return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.SKIPPED_WITHOUT_COLLAPSE)
      }
    }

    if (output) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.OUTPUT)
    }

    if (task.hasSubtasks()) {
      if (task.isStarted() || task.isPrompt() && this.getSelfOrParentOption(task, 'showSubtasks') !== false && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
        return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.PENDING)
      } else if (task.isCompleted() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SUBTASKS)
      } else if (task.hasFailed()) {
        return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.FAILED_WITH_FAILED_SUBTASKS)
      }
    }

    if (task.isStarted() || task.isPrompt()) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.PENDING, !this.options?.lazy && this.spinner.fetch())
    } else if (task.isCompleted()) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.COMPLETED)
    } else if (task.isRetrying()) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.RETRY, !this.options?.lazy && this.spinner.fetch())
    } else if (task.isRollingBack()) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.ROLLING_BACK, !this.options?.lazy && this.spinner.fetch())
    } else if (task.hasRolledBack()) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.ROLLED_BACK)
    } else if (task.hasFailed()) {
      return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.FAILED)
    }

    return this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.WAITING)
  }

  protected format (message: string, icon: string, level: number): string[] {
    // we dont like empty data around here
    if (message.trim() === '') {
      return []
    }

    message = `${icon} ${message}`
    let parsed: string[]

    let columns = process.stdout.columns ? process.stdout.columns : 80

    columns = columns - level * this.options.indentation - 2

    switch (this.options.formatOutput) {
    case 'truncate':
      parsed = message.split(EOL).map((s, i) => {
        return this.truncate(this.indent(s, i), columns)
      })

      break

    case 'wrap':
      parsed = this.wrap(message, columns, { hard: true })
        .split(EOL)
        .map((s, i) => this.indent(s, i))

      break

    default:
      throw new Error('Format option for the renderer is wrong.')
    }

    // this removes the empty lines
    if (this.options.removeEmptyLines) {
      parsed = parsed.filter(Boolean)
    }

    return parsed.map((str) => indent(str, level * this.options.indentation))
  }

  private renderer (tasks: ListrDefaultRendererTasks, level = 0): string[] {
    // eslint-disable-next-line complexity
    return tasks.flatMap((task) => {
      const output: string[] = []

      if (!task.isEnabled()) {
        return []
      }

      if (task.isPrompt()) {
        if (this.activePrompt && this.activePrompt !== task.id) {
          throw new PromptError('Only one prompt can be active at the given time, please reevaluate your task design.')
        } else if (!this.activePrompt) {
          task.on(ListrTaskEventType.PROMPT, (prompt: ListrTaskEventMap[ListrTaskEventType.PROMPT]): void => {
            const cleansed = cleanseAnsi(prompt).trim()

            if (cleansed) {
              this.prompt = cleansed
            }
          })

          task.on(ListrTaskEventType.STATE, (state) => {
            if (state === ListrTaskState.PROMPT_COMPLETED || task.hasFinalized() || task.hasReset()) {
              this.prompt = null
              this.activePrompt = null
              task.off(ListrTaskEventType.PROMPT)
            }
          })

          this.activePrompt = task.id
        }
      }

      // Current Task Title
      if (task.hasTitle()) {
        if (!(tasks.some((task) => task.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
          // if task is skipped
          if (task.hasFailed() && this.getSelfOrParentOption(task, 'collapseErrors')) {
            // current task title and skip change the title
            output.push(
              ...this.format(
                !task.hasSubtasks() && task.message.error && this.getSelfOrParentOption(task, 'showErrorMessage') ? task.message.error : task.title,
                this.style(task),
                level
              )
            )
          } else if (task.isSkipped() && this.getSelfOrParentOption(task, 'collapseSkips')) {
            // current task title and skip change the title
            output.push(
              ...this.format(
                this.logger.suffix(task.message.skip && this.getSelfOrParentOption(task, 'showSkipMessage') ? task.message.skip : task.title, {
                  field: LogLevels.SKIPPED,
                  condition: this.getSelfOrParentOption(task, 'suffixSkips'),
                  format: () => color.dim
                }),
                this.style(task),
                level
              )
            )
          } else if (task.isRetrying() && this.getSelfOrParentOption(task, 'suffixRetries')) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  field: `${LogLevels.RETRY}:${task.message.retry.count}`,
                  format: () => color.yellow
                }),
                this.style(task),
                level
              )
            )
          } else if (task.isCompleted() && task.hasTitle() && assertFunctionOrSelf(this.getSelfOrParentOption(task, 'timer')?.condition, task.message.duration)) {
            // task with timer
            output.push(
              ...this.format(
                this.logger.suffix(task?.title, {
                  ...this.getSelfOrParentOption(task, 'timer'),
                  args: [ task.message.duration ]
                }),
                this.style(task),
                level
              )
            )
          } else {
            // normal state
            output.push(...this.format(task.title, this.style(task), level))
          }
        } else {
          // some sibling task but self has failed and this has stopped
          output.push(...this.format(task.title, this.logger.icon(this.options.style, ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS), level))
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
          output.push(...this.dump(task, level, LogLevels.FAILED))
        } else if (
          task.isSkipped() &&
          this.getSelfOrParentOption(task, 'collapseSkips') === false &&
          (this.getSelfOrParentOption(task, 'showSkipMessage') || !this.getSelfOrParentOption(task, 'showSubtasks'))
        ) {
          // show skip data if collapsing is not defined
          output.push(...this.dump(task, level, LogLevels.SKIPPED))
        }
      }

      // Current Task Output
      if (task?.output) {
        if (this.isBottomBar(task) || !task.hasTitle()) {
          // data output to bottom bar
          const data = this.dump(task, -1)

          // create new if there is no persistent storage created for bottom bar
          if (!this.bottom[task.id]) {
            this.bottom[task.id] = {}
            this.bottom[task.id].data = []

            const bottomBar = this.getTaskOptions(task).bottomBar

            if (typeof bottomBar === 'boolean') {
              this.bottom[task.id].items = 1
            } else {
              this.bottom[task.id].items = bottomBar
            }
          }

          // persistent bottom bar and limit items in it
          if (!this.bottom[task.id]?.data?.some((element) => data.includes(element)) && !task.isSkipped()) {
            this.bottom[task.id].data.push(...data)
          }
        } else if (task.isPending() || this.hasPersistentOutput(task)) {
          // keep output if persistent output is set
          output.push(...this.dump(task, level))
        }
      }

      // render subtasks, some complicated conditionals going on
      if (
        // check if renderer option is on first
        this.getSelfOrParentOption(task, 'showSubtasks') !== false &&
        // if it doesnt have subtasks no need to check
        task.hasSubtasks() &&
        (task.isPending() ||
          task.hasFinalized() && !task.hasTitle() ||
          // have to be completed and have subtasks
          task.isCompleted() && this.getSelfOrParentOption(task, 'collapse') === false && !task.subtasks.some((subtask) => subtask.rendererOptions.collapse === true) ||
          // if any of the subtasks have the collapse option of
          task.subtasks.some((subtask) => subtask.rendererOptions.collapse === false) ||
          // if any of the subtasks has failed
          task.subtasks.some((subtask) => subtask.hasFailed()) ||
          // if any of the subtasks rolled back
          task.subtasks.some((subtask) => subtask.hasRolledBack()))
      ) {
        // set level
        const subtaskLevel = !task.hasTitle() ? level : level + 1

        // render the subtasks as in the same way
        const subtaskRender = this.renderer(task.subtasks, subtaskLevel)

        output.push(...subtaskRender)
      }

      // after task is finished actions
      if (task.hasFinalized()) {
        // clean up bottom bar items if not indicated otherwise
        if (!this.hasPersistentOutput(task)) {
          delete this.bottom[task.id]
        }
      }

      return output
    })
  }

  private renderBottomBar (): string[] {
    // parse through all objects return only the last mentioned items
    if (Object.keys(this.bottom).length === 0) {
      return []
    }

    this.bottom = Object.keys(this.bottom).reduce<Record<PropertyKey, { data?: string[], items?: number }>>((o, key) => {
      if (!o?.[key]) {
        o[key] = {}
      }

      o[key] = this.bottom[key]

      this.bottom[key].data = this.bottom[key].data.slice(-this.bottom[key].items)
      o[key].data = this.bottom[key].data

      return o
    }, {})

    return Object.values(this.bottom).reduce((o, value) => o = [ ...o, ...value.data ], [])
  }

  private renderPrompt (): string[] {
    if (!this.prompt) {
      return []
    }

    return [ this.prompt ]
  }

  private dump (task: Task<ListrContext, typeof DefaultRenderer>, level: number, source: LogLevels.OUTPUT | LogLevels.SKIPPED | LogLevels.FAILED = LogLevels.OUTPUT): string[] {
    let data: string | boolean

    switch (source) {
    case LogLevels.OUTPUT:
      data = cleanseAnsi(task.output)

      break

    case LogLevels.SKIPPED:
      data = task.message.skip

      break

    case LogLevels.FAILED:
      data = task.message.error

      break
    }

    // dont return anything on some occasions
    if (task.hasTitle() && source === LogLevels.FAILED && data === task.title) {
      return []
    }

    if (typeof data === 'string') {
      return this.format(data, this.style(task, true), level + 1)
    }

    return []
  }

  private indent (str: string, i: number): string {
    return i > 0 ? indent(str.trim(), 2) : str.trim()
  }
}