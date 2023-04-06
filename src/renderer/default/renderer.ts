import type truncate from 'cli-truncate'
import type { createLogUpdate } from 'log-update'
import { EOL } from 'os'
import type wrap from 'wrap-ansi'

import { LISTR_DEFAULT_RENDERER_STYLE, ListrDefaultRendererListrLogLevels } from './renderer.constants'
import type { ListrDefaultRendererOptions, ListrDefaultRendererTask, ListrDefaultRendererTaskOptions } from './renderer.interface'
import { ListrEventType, ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrRenderer, ListrTaskEventMap } from '@interfaces'
import { PromptError } from '@interfaces'
import type { ListrEventManager } from '@lib'
import { PRESET_TIMER } from '@presets'
import { ListrLogger, ListrLogLevels, ProcessOutputBuffer, Spinner, assertFunctionOrSelf, cleanseAnsi, color, indent } from '@utils'

/** Default updating renderer for Listr2 */
export class DefaultRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = false
  /** renderer options for the defauult renderer */
  public static rendererOptions: ListrDefaultRendererOptions = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapseSubtasks: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: true,
    collapseErrors: true,
    showErrorMessage: true,
    suffixRetries: true,
    lazy: false,
    removeEmptyLines: true,
    formatOutput: 'wrap',
    logger: ListrLogger
  }

  /** per task options for the default renderer */
  public static rendererTaskOptions: ListrDefaultRendererTaskOptions

  private bottom: Map<string, ProcessOutputBuffer> = new Map()
  private prompt: string
  private activePrompt: string
  private readonly spinner: Spinner
  private readonly logger: ListrLogger<ListrDefaultRendererListrLogLevels>
  private updater: ReturnType<typeof createLogUpdate>
  private truncate: typeof truncate
  private wrap: typeof wrap

  constructor (private readonly tasks: ListrDefaultRendererTask[], private readonly options: ListrDefaultRendererOptions, private readonly events: ListrEventManager) {
    this.options = {
      ...DefaultRenderer.rendererOptions,
      ...this.options,
      loggerOptions: {
        useIcons: true,
        ...this.options?.loggerOptions ?? {},
        style: {
          icon: {
            ...LISTR_DEFAULT_RENDERER_STYLE.icon,
            ...this.options?.loggerOptions?.style?.icon ?? {}
          },
          color: {
            ...LISTR_DEFAULT_RENDERER_STYLE.color,
            ...this.options?.loggerOptions?.style?.color ?? {}
          }
        },
        toStderr: []
      }
    }

    this.logger = new this.options.logger(this.options.loggerOptions)
    this.spinner = this.options.spinner ?? new Spinner()
  }

  public getTaskOptions (task: ListrDefaultRendererTask): ListrDefaultRendererTaskOptions {
    return { ...DefaultRenderer.rendererTaskOptions, ...task.rendererTaskOptions }
  }

  public isBottomBar (task: ListrDefaultRendererTask): boolean {
    const bottomBar = this.getTaskOptions(task).bottomBar

    return typeof bottomBar === 'number' && bottomBar !== 0 || typeof bottomBar === 'boolean' && bottomBar !== false || !task.hasTitle()
  }

  public hasPersistentOutput (task: ListrDefaultRendererTask): boolean {
    return this.getTaskOptions(task).persistentOutput === true
  }

  public getSelfOrParentOption<K extends keyof ListrDefaultRendererOptions>(task: ListrDefaultRendererTask, key: K): ListrDefaultRendererOptions[K] {
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
  protected style (task: ListrDefaultRendererTask, output = false): string {
    if (task.isSkipped()) {
      if (output || this.getSelfOrParentOption(task, 'collapseSkips')) {
        return this.logger.icon(ListrDefaultRendererListrLogLevels.SKIPPED_WITH_COLLAPSE)
      } else if (this.getSelfOrParentOption(task, 'collapseSkips') === false) {
        return this.logger.icon(ListrDefaultRendererListrLogLevels.SKIPPED_WITHOUT_COLLAPSE)
      }
    }

    if (output) {
      if (this.isBottomBar(task)) {
        return this.logger.icon(ListrDefaultRendererListrLogLevels.OUTPUT_WITH_BOTTOMBAR)
      }

      return this.logger.icon(ListrDefaultRendererListrLogLevels.OUTPUT)
    }

    if (task.hasSubtasks()) {
      if (task.isStarted() || task.isPrompt() && this.getSelfOrParentOption(task, 'showSubtasks') !== false && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
        return this.logger.icon(ListrDefaultRendererListrLogLevels.PENDING)
      } else if (task.isCompleted() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return this.logger.icon(ListrDefaultRendererListrLogLevels.COMPLETED_WITH_FAILED_SUBTASKS)
      } else if (task.hasFailed()) {
        return this.logger.icon(ListrDefaultRendererListrLogLevels.FAILED_WITH_FAILED_SUBTASKS)
      }
    }

    if (task.isStarted() || task.isPrompt()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.PENDING, !this.options?.lazy && this.spinner.fetch())
    } else if (task.isCompleted()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.COMPLETED)
    } else if (task.isRetrying()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.RETRY, !this.options?.lazy && this.spinner.fetch())
    } else if (task.isRollingBack()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.ROLLING_BACK, !this.options?.lazy && this.spinner.fetch())
    } else if (task.hasRolledBack()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.ROLLED_BACK)
    } else if (task.hasFailed()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.FAILED)
    } else if (task.isPaused()) {
      return this.logger.icon(ListrDefaultRendererListrLogLevels.PAUSED)
    }

    return this.logger.icon(ListrDefaultRendererListrLogLevels.WAITING)
  }

  protected format (message: string, icon: string, level: number): string[] {
    // we dont like empty data around here
    if (message.trim() === '') {
      return []
    }

    if (icon) {
      message = icon + ' ' + message
    }

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

  private renderer (tasks: ListrDefaultRendererTask[], level = 0): string[] {
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
            const cleansed = cleanseAnsi(prompt)

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
                  field: ListrLogLevels.SKIPPED,
                  condition: this.getSelfOrParentOption(task, 'suffixSkips'),
                  format: () => color.dim
                }),
                this.style(task),
                level
              )
            )
          } else if (task.isRetrying()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  field: `${ListrLogLevels.RETRY}:${task.message.retry.count}`,
                  format: () => color.yellow,
                  condition: this.getSelfOrParentOption(task, 'suffixRetries')
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
          } else if (task.isPaused()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  ...PRESET_TIMER,
                  args: [ task.message.paused - Date.now() ]
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
          output.push(...this.format(task.title, this.logger.icon(ListrDefaultRendererListrLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS), level))
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
          output.push(...this.dump(task, level, ListrLogLevels.FAILED))
        } else if (
          task.isSkipped() &&
          this.getSelfOrParentOption(task, 'collapseSkips') === false &&
          (this.getSelfOrParentOption(task, 'showSkipMessage') || !this.getSelfOrParentOption(task, 'showSubtasks'))
        ) {
          // show skip data if collapsing is not defined
          output.push(...this.dump(task, level, ListrLogLevels.SKIPPED))
        }
      }

      // Current Task Output
      if (task?.output) {
        if (this.isBottomBar(task)) {
          // create new if there is no persistent storage created for bottom bar
          if (!this.bottom.has(task.id)) {
            const bottomBar = this.getTaskOptions(task).bottomBar

            this.bottom.set(task.id, new ProcessOutputBuffer({ limit: typeof bottomBar === 'boolean' ? 1 : bottomBar }))

            task.on(ListrTaskEventType.OUTPUT, (output) => {
              const data = this.dump(task, -1, ListrLogLevels.OUTPUT, output)

              this.bottom.get(task.id).write(data.join(EOL))
            })
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
          task.isCompleted() &&
            this.getSelfOrParentOption(task, 'collapseSubtasks') === false &&
            !task.subtasks.some((subtask) => subtask.rendererOptions.collapseSubtasks === true) ||
          // if any of the subtasks have the collapse option of
          task.subtasks.some((subtask) => subtask.rendererOptions.collapseSubtasks === false) ||
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
          this.bottom.delete(task.id)
        }
      }

      return output
    })
  }

  private renderBottomBar (): string[] {
    // parse through all objects return only the last mentioned items
    if (this.bottom.size === 0) {
      return []
    }

    return Array.from(this.bottom.values())
      .flatMap((output) => output.all)
      .sort((a, b) => a.time - b.time)
      .map((output) => output.entry)
  }

  private renderPrompt (): string[] {
    if (!this.prompt) {
      return []
    }

    return [ this.prompt ]
  }

  private dump (
    task: ListrDefaultRendererTask,
    level: number,
    source: ListrLogLevels.OUTPUT | ListrLogLevels.SKIPPED | ListrLogLevels.FAILED = ListrLogLevels.OUTPUT,
    data?: string | boolean
  ): string[] {
    if (!data) {
      switch (source) {
      case ListrLogLevels.OUTPUT:
        data = task.output

        break

      case ListrLogLevels.SKIPPED:
        data = task.message.skip

        break

      case ListrLogLevels.FAILED:
        data = task.message.error

        break
      }
    }

    // dont return anything on some occasions
    if (task.hasTitle() && source === ListrLogLevels.FAILED && data === task.title || typeof data !== 'string') {
      return []
    }

    if ([ ListrLogLevels.OUTPUT ].includes(source)) {
      data = cleanseAnsi(data)
    }

    return this.format(data, this.style(task, true), level + 1)
  }

  private indent (str: string, i: number): string {
    return i > 0 ? indent(str.trim(), this.options.indentation) : str.trim()
  }
}
