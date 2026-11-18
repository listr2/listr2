import truncate from 'cli-truncate'
import { EOL } from 'os'
import wrap from 'wrap-ansi'

import { LISTR_DEFAULT_RENDERER_STYLE, ListrDefaultRendererLogLevels } from './renderer.constants'
import type {
  ListrDefaultRendererCache,
  ListrDefaultRendererOptions,
  ListrDefaultRendererOutputBuffer,
  ListrDefaultRendererTask,
  ListrDefaultRendererTaskOptions
} from './renderer.interface'
import type {
  ListrDefaultRendererContext,
  ListrDefaultRendererFit,
  ListrDefaultRendererFrame,
  ListrDefaultRendererSummary,
  ListrDefaultRendererTaskRender
} from './renderer.internal.interface'
import { ListrEventType, ListrTaskEventType, ListrTaskState } from '#constants'
import type { ListrRenderer, ListrTaskEventMap } from '#interfaces'
import { ListrRendererError } from '#interfaces'
import type { ListrEventManager } from '#lib'
import { PRESET_TIMER } from '#presets'
import { ListrLogLevels, ListrLogger, ProcessOutputBuffer, Spinner, assertFunctionOrSelf, assertOption, cleanseAnsi, color, indent } from '#utils'

export class DefaultRenderer implements ListrRenderer {
  public static nonTTY = false
  public static rendererOptions: ListrDefaultRendererOptions = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapseSubtasks: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: false,
    collapseErrors: true,
    showErrorMessage: true,
    suffixRetries: true,
    lazy: false,
    lockInput: true,
    markIndentation: false,
    removeEmptyLines: true,
    formatOutput: 'wrap',
    pausedTimer: {
      ...PRESET_TIMER,
      format: () => color.yellowBright
    }
  }
  public static rendererTaskOptions: ListrDefaultRendererTaskOptions = {
    outputBar: true
  }

  private prompt: string
  private activePrompt: string
  private readonly spinner: Spinner
  private readonly logger: ListrLogger<ListrDefaultRendererLogLevels>
  private readonly buffer: ListrDefaultRendererOutputBuffer = {
    output: new Map(),
    bottom: new Map()
  }
  private readonly cache: ListrDefaultRendererCache = {
    render: new Map(),
    rendererOptions: new Map(),
    rendererTaskOptions: new Map()
  }
  // the tasks that are written to the scrollback
  private readonly frozen = new Set<string>()
  private hasPersisted = false

  constructor(
    private readonly tasks: ListrDefaultRendererTask[],
    private readonly options: ListrDefaultRendererOptions,
    private readonly events: ListrEventManager
  ) {
    this.options = {
      ...DefaultRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_DEFAULT_RENDERER_STYLE.icon,
        ...(options?.icon ?? {})
      },
      color: {
        ...LISTR_DEFAULT_RENDERER_STYLE.color,
        ...(options?.color ?? {})
      }
    }

    this.spinner = this.options.spinner ?? new Spinner()

    this.logger = this.options.logger ?? new ListrLogger<ListrDefaultRendererLogLevels>({ useIcons: true, toStderr: [] })
    this.logger.options.icon = this.options.icon
    this.logger.options.color = this.options.color
  }

  /**
   * Throws a `RangeError` for an invalid `indentation`, `formatOutput`, `outputBar` or `bottomBar`, when a task list or a task is created.
   */
  public static assertOptions(options: ListrDefaultRendererOptions & ListrDefaultRendererTaskOptions = {}): void {
    if (options.indentation !== undefined) {
      assertOption('indentation', options.indentation, options.indentation >= 0 && Number.isFinite(options.indentation), 'must be a number of 0 or more')
    }

    if (options.formatOutput !== undefined) {
      assertOption('formatOutput', options.formatOutput, ['truncate', 'wrap'].includes(options.formatOutput), 'must be \'truncate\' or \'wrap\'')
    }

    for (const name of ['outputBar', 'bottomBar'] as const) {
      const value = options[name]

      assertOption(name, value, typeof value !== 'number' || value >= 0, 'must be a boolean or a number of 0 or more')
    }
  }

  public render(): void {
    this.cache.render.clear()
    this.frozen.clear()
    this.hasPersisted = false

    this.logger.process.hijack(() => this.update())
    this.syncInputLock()

    /* istanbul ignore if */
    if (!this.options?.lazy) {
      this.spinner.start(() => {
        this.update()
      })
    }

    this.events.on(ListrEventType.SHOULD_REFRESH_RENDER, this.refresh)
  }

  public update(): void {
    const rows = this.logger.process.stdout.rows
    const { persist, live } = this.renderer(this.tasks, 0, { commit: !this.options.clearOutput })

    // rows that scrolled off the top cannot be redrawn, so summarize until the live region fits
    const render = typeof rows === 'number' && live.length > rows - 1 ? this.summarize(rows - 1) : live

    if (persist.length > 0) {
      this.hasPersisted = true
    }

    const bars = [this.renderBottomBar(), this.renderPrompt()]
    const compose = (lines: string[]): string[] =>
      bars.reduce((output, bar) => (bar.length > 0 ? [...output, ...(output.length > 0 || this.hasPersisted ? [''] : []), ...bar] : output), lines)
    const output = compose(render).join(EOL)

    if (persist.length > 0) {
      this.logger.process.persist(persist.join(EOL), output)
    } else {
      this.logger.process.update(output)
    }

    // rendering a prompt task sets the active prompt before the prompt takes over stdin
    this.syncInputLock()
  }

  public end(): void {
    this.spinner.stop()

    // unsubscribe before teardown, otherwise a late refresh repaints a duplicate frame below the persisted output
    this.events.off(ListrEventType.SHOULD_REFRESH_RENDER, this.refresh)

    if (this.options.clearOutput) {
      this.logger.process.clear()
    } else {
      const { persist } = this.renderer(this.tasks, 0, { commit: true, final: true })
      const bottomBar = this.renderBottomBar()

      if (bottomBar.length > 0) {
        if (persist.length > 0 || this.hasPersisted) {
          persist.push('')
        }

        persist.push(...bottomBar)
      }

      this.logger.process.persist(persist.join(EOL), '')
    }

    this.logger.process.release()
  }

  // eslint-disable-next-line complexity
  protected style(task: ListrDefaultRendererTask, output = false): string {
    const rendererOptions = this.cache.rendererOptions.get(task.id)

    if (task.isSkipped()) {
      if (output || rendererOptions.collapseSkips) {
        return this.logger.icon(ListrDefaultRendererLogLevels.SKIPPED_WITH_COLLAPSE)
      } else if (rendererOptions.collapseSkips === false) {
        return this.logger.icon(ListrDefaultRendererLogLevels.SKIPPED_WITHOUT_COLLAPSE)
      }
    }

    if (output) {
      if (this.shouldOutputToBottomBar(task)) {
        return this.logger.icon(ListrDefaultRendererLogLevels.OUTPUT_WITH_BOTTOMBAR)
      }

      return this.logger.icon(ListrDefaultRendererLogLevels.OUTPUT)
    }

    if (task.hasSubtasks()) {
      if (task.isStarted() || (task.isPrompt() && rendererOptions.showSubtasks !== false && !task.subtasks.every((subtask) => !subtask.hasTitle()))) {
        return this.logger.icon(ListrDefaultRendererLogLevels.PENDING)
      } else if (task.isCompleted() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return this.logger.icon(ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SUBTASKS)
      } else if (task.hasFailed()) {
        return this.logger.icon(ListrDefaultRendererLogLevels.FAILED_WITH_FAILED_SUBTASKS)
      }
    }

    if (task.isStarted() || task.isPrompt()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.PENDING, !this.options?.lazy && this.spinner.fetch())
    } else if (task.isCompleted()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.COMPLETED)
    } else if (task.isRetrying()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.RETRY, !this.options?.lazy && this.spinner.fetch())
    } else if (task.isRollingBack()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.ROLLING_BACK, !this.options?.lazy && this.spinner.fetch())
    } else if (task.hasRolledBack()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.ROLLED_BACK)
    } else if (task.hasFailed()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.FAILED)
    } else if (task.isCancelled()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.CANCELLED)
    } else if (task.isPaused()) {
      return this.logger.icon(ListrDefaultRendererLogLevels.PAUSED)
    }

    return this.logger.icon(ListrDefaultRendererLogLevels.WAITING)
  }

  /** Formats a message with its icon into lines that start at the given column and fit the width of the terminal. */
  protected format(message: string, icon: string, column: number): string[] {
    // we dont like empty data around here
    if (message.trim() === '') {
      return []
    }

    if (icon) {
      message = icon + ' ' + message
    }

    let parsed: string[]

    const columns = (this.logger.process.stdout.columns ?? 80) - column - 2

    switch (this.options.formatOutput) {
      case 'truncate':
        parsed = message.split(EOL).map((s, i) => {
          return truncate(this.indent(s, i), columns)
        })

        break

      case 'wrap':
        parsed = wrap(message, columns, { hard: true, trim: false })
          .split(EOL)
          .map((s, i) => this.indent(s, i))

        break

      default:
        throw new ListrRendererError('Format option for the renderer is wrong.')
    }

    // this removes the empty lines
    if (this.options.removeEmptyLines) {
      parsed = parsed.filter(Boolean)
    }

    return parsed.map((str) => indent(str, column))
  }

  protected shouldOutputToOutputBar(task: ListrDefaultRendererTask): boolean {
    const outputBar = this.cache.rendererTaskOptions.get(task.id).outputBar

    return (typeof outputBar === 'number' && outputBar !== 0) || (typeof outputBar === 'boolean' && outputBar !== false)
  }

  protected shouldOutputToBottomBar(task: ListrDefaultRendererTask): boolean {
    const bottomBar = this.cache.rendererTaskOptions.get(task.id).bottomBar

    return (typeof bottomBar === 'number' && bottomBar !== 0) || (typeof bottomBar === 'boolean' && bottomBar !== false) || !task.hasTitle()
  }

  // locks the input while the renderer draws, and lifts the lock while a prompt reads the terminal
  private syncInputLock(): void {
    if (!this.options.lockInput) {
      return
    }

    if (this.activePrompt) {
      this.logger.process.unlockInput()
    } else {
      this.logger.process.lockInput()
    }
  }

  private readonly refresh = (): void => {
    this.update()
  }

  private summarize(height: number): string[] {
    // the waiting tasks fold first, so the open groups keep their rows, and from the bottom up, so the tasks farthest from the running ones go first
    const order = this.getFoldOrder(this.tasks)
    const fold = (keep: number): Set<string> => new Set(order.slice(0, Math.max(order.length - keep, 0)).map((task) => task.id))
    const waiting = this.fit(height, (keep) => ({ folded: fold(keep) }))

    if (waiting.render.length <= height) {
      return waiting.render
    }

    const completed = this.fit(height, (keep) => ({ completed: keep, folded: fold(0) }))
    // the rows that the completed tasks leave go back to the waiting tasks
    const both = this.fit(height, (keep) => ({ completed: completed.keep, folded: fold(keep) }))

    if (both.render.length <= height) {
      return both.render
    }

    // more tasks run than the terminal shows, so the running tasks at the end of a list are counted too
    const running = this.fit(height, (keep) => ({ completed: 0, running: keep }))

    return this.fit(height, (keep) => ({ completed: keep, running: running.keep })).render
  }

  private fit(height: number, summary: (keep: number) => ListrDefaultRendererSummary): ListrDefaultRendererFit {
    let render = this.renderer(this.tasks, 0, { summary: summary(0) }).live

    if (render.length > height) {
      return { keep: 0, render }
    }

    // keeping fewer tasks visible never takes more rows, so search for the most that fit
    let low = 0
    let high = height

    while (low < high) {
      const keep = Math.ceil((low + high) / 2)
      const attempt = this.renderer(this.tasks, 0, { summary: summary(keep) }).live

      if (attempt.length <= height) {
        low = keep
        render = attempt
      } else {
        high = keep - 1
      }
    }

    return { keep: low, render }
  }

  private renderer(tasks: ListrDefaultRendererTask[], column = 0, context: ListrDefaultRendererContext = {}): ListrDefaultRendererFrame {
    const completed = context.compact ? this.unfold(this.getCompleted(tasks, context.summary.completed), tasks, column, context) : []
    const pending = tasks.filter((task) => !completed.includes(task))
    const waiting = this.unfold(this.getWaiting(pending, context.summary), tasks, column, context)
    const shown = pending.slice(0, pending.length - waiting.length)

    const frames = this.renderFrames(shown, tasks, column, context)
    const output = shown.flatMap((task) => frames.get(task.id)?.live ?? [])

    if (completed.length > 0) {
      output.unshift(...this.format(`${completed.length}`, this.logger.icon(ListrDefaultRendererLogLevels.SUMMARY_COMPLETED), column))
    }

    const titled = waiting.filter((task) => task.isEnabled() && task.hasTitle())

    if (titled.length > 0) {
      output.push(...this.format(`${titled.length}`, this.logger.icon(ListrDefaultRendererLogLevels.SUMMARY_WAITING), column))
    }

    return {
      persist: [...frames.values()].flatMap((frame) => frame.persist),
      live: output
    }
  }

  /** A summary of a single task that takes one row shows the task instead. */
  private unfold(
    folded: ListrDefaultRendererTask[],
    siblings: ListrDefaultRendererTask[],
    column: number,
    context: ListrDefaultRendererContext
  ): ListrDefaultRendererTask[] {
    if (folded.filter((task) => task.isEnabled() && task.hasTitle()).length !== 1) {
      return folded
    }

    const rows = [...this.renderFrames(folded, siblings, column, { ...context, commit: false }).values()].flatMap((frame) => frame.live)

    return rows.length === 1 ? [] : folded
  }

  private renderFrames(
    tasks: ListrDefaultRendererTask[],
    siblings: ListrDefaultRendererTask[],
    column: number,
    context: ListrDefaultRendererContext
  ): Map<string, ListrDefaultRendererFrame> {
    const concurrent = (siblings[0]?.listr.options.concurrent as number) > 1
    const frames = new Map<string, ListrDefaultRendererFrame>()
    let held = false

    for (const task of tasks) {
      if (!task.isEnabled() || this.frozen.has(task.id)) {
        continue
      }

      const commit = context.commit && !held

      frames.set(
        task.id,
        this.renderBlock(task, siblings, column, {
          ...context,
          commit,
          compact: false
        })
      )

      // a task of a sequential list is written only once the tasks before it are
      if (!concurrent && !this.frozen.has(task.id)) {
        held = true
      }
    }

    return frames
  }

  private renderBlock(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], column: number, context: ListrDefaultRendererContext): ListrDefaultRendererFrame {
    this.calculate(task)

    if (context.commit && this.isProgressive(task)) {
      return this.renderProgressive(task, siblings, column, context)
    }

    const commit = context.commit && (context.final || task.isClosed())
    const output = this.renderLines(task, siblings, column, commit ? undefined : context.summary)

    if (!commit) {
      return { persist: [], live: output }
    }

    this.frozen.add(task.id)

    return { persist: output, live: [] }
  }

  // a parent without a title writes its subtasks as they finish, like the tasks of the list it is in
  private renderProgressive(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], column: number, context: ListrDefaultRendererContext): ListrDefaultRendererFrame {
    const final = context.final || task.isClosed()
    const { body, subtaskColumn } = this.renderTask(task, siblings, column)
    const children = this.renderer(task.subtasks, subtaskColumn, { ...context, final })

    if (final && task.subtasks.every((subtask) => !subtask.isEnabled() || this.frozen.has(subtask.id))) {
      this.frozen.add(task.id)

      return { persist: [...body, ...children.persist], live: [] }
    }

    return { persist: children.persist, live: [...body, ...children.live] }
  }

  private renderLines(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], column: number, summary?: ListrDefaultRendererSummary): string[] {
    // if this is already cached return the cache
    if (task.isClosed() && this.cache.render.has(task.id)) {
      return this.cache.render.get(task.id)
    }

    const { title, header, body, subtasks, subtaskColumn, bracket } = this.renderTask(task, siblings, column)
    const lines = [...body]

    if (subtasks) {
      const compact = summary !== undefined && !task.isClosed() && !this.isProgressive(task)

      lines.push(...this.renderer(task.subtasks, subtaskColumn, { summary, compact }).live)
    }

    const output = bracket ? this.close(task, column, header, lines, title) : [...header, ...lines]

    // a summarized render is not the final one
    if (task.isClosed() && !summary) {
      this.cache.render.set(task.id, output)
      this.reset(task)
    }

    return output
  }

  // eslint-disable-next-line complexity
  private renderTask(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], column: number): ListrDefaultRendererTaskRender {
    this.calculate(task)
    this.setupBuffer(task)

    const rendererOptions = this.cache.rendererOptions.get(task.id)
    const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id)

    const body: string[] = []

    if (task.isPrompt()) {
      if (this.activePrompt && this.activePrompt !== task.id) {
        throw new ListrRendererError('Only one prompt can be active at the given time, please re-evaluate your task design.')
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

    const subtasks =
      // check if renderer option is on first
      rendererOptions.showSubtasks !== false &&
      // if it doesnt have subtasks no need to check
      task.hasSubtasks() &&
      (task.isPending() ||
        (task.hasFinalized() && !task.hasTitle()) ||
        // have to be completed and have subtasks
        (task.isCompleted() &&
          rendererOptions.collapseSubtasks === false &&
          !task.subtasks.some((subtask) => this.cache.rendererOptions.get(subtask.id)?.collapseSubtasks === true)) ||
        // if any of the subtasks have the collapse option of
        task.subtasks.some((subtask) => this.cache.rendererOptions.get(subtask.id)?.collapseSubtasks === false) ||
        // if any of the subtasks has failed
        task.subtasks.some((subtask) => subtask.hasFailed()) ||
        // if any of the subtasks rolled back
        task.subtasks.some((subtask) => subtask.hasRolledBack()) ||
        // if any of the subtasks was cancelled
        task.subtasks.some((subtask) => subtask.isCancelled()))

    const bracket = subtasks && this.isConnected(task)
    // the corner or connector and the space after it take two columns whatever the indentation is
    const titleColumn = bracket ? column + 2 : column
    // a failed group shows the failed icon, since its own icon for failed subtasks reads like a running one
    const icon = bracket && task.hasFailed() ? this.logger.icon(ListrDefaultRendererLogLevels.FAILED) : this.style(task)
    // the status line, after the corner of a bracket, or at the column of the task for a group without rows
    const status = (at: number): string[] => {
      const line = (message: string, icon: string): string[] => this.format(message, icon, at)
      const title: string[] = []

      // Current Task Title
      if (task.hasTitle()) {
        if (!(
          siblings.some((sibling) => sibling.hasFailed()) &&
          !task.hasFailed() &&
          task.options.exitOnError !== false &&
          !(task.isCompleted() || task.isSkipped() || task.isCancelled())
        )) {
          // if task is skipped
          if (task.hasFailed() && rendererOptions.collapseErrors) {
            // current task title and skip change the title
            title.push(...line(!task.hasSubtasks() && task.message.error && rendererOptions.showErrorMessage ? task.message.error : task.title, icon))
          } else if (task.isSkipped() && rendererOptions.collapseSkips) {
            // current task title and skip change the title
            title.push(
              ...line(
                this.logger.suffix(task.message.skip && rendererOptions.showSkipMessage ? task.message.skip : task.title, {
                  field: ListrLogLevels.SKIPPED,
                  condition: rendererOptions.suffixSkips,
                  format: () => color.dim
                }),
                icon
              )
            )
          } else if (task.isRetrying()) {
            title.push(
              ...line(
                this.logger.suffix(task.title, {
                  field: `${ListrLogLevels.RETRY}:${task.message.retry.count}`,
                  format: () => color.yellow,
                  condition: rendererOptions.suffixRetries
                }),
                icon
              )
            )
          } else if (task.isCompleted() && task.hasTitle() && assertFunctionOrSelf(rendererTaskOptions.timer?.condition, task.message.duration)) {
            // task with timer
            title.push(
              ...line(
                this.logger.suffix(task.title, {
                  ...rendererTaskOptions.timer,
                  args: [task.message.duration]
                }),
                icon
              )
            )
          } else if (task.isPaused()) {
            title.push(
              ...line(
                this.logger.suffix(task.title, {
                  ...rendererOptions.pausedTimer,
                  args: [task.message.paused - Date.now()]
                }),
                icon
              )
            )
          } else {
            // normal state
            title.push(...line(task.title, icon))
          }
        } else {
          // some sibling task but self has failed and this has stopped
          title.push(...line(task.title, this.logger.icon(ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS)))
        }
      }

      return title
    }
    const title = status(titleColumn)

    // task should not have subtasks since subtasks will handle the error already
    // maybe it is a better idea to show the error or skip messages when show subtasks is disabled.
    if (!task.hasSubtasks() || !rendererOptions.showSubtasks) {
      // without the collapse option for skip and errors
      if (task.hasFailed() && rendererOptions.collapseErrors === false && (rendererOptions.showErrorMessage || !rendererOptions.showSubtasks)) {
        // show skip data if collapsing is not defined
        body.push(...this.dump(task, titleColumn + this.options.indentation, ListrLogLevels.FAILED))
      } else if (task.isSkipped() && rendererOptions.collapseSkips === false && (rendererOptions.showSkipMessage || !rendererOptions.showSubtasks)) {
        // show skip data if collapsing is not defined
        body.push(...this.dump(task, titleColumn + this.options.indentation, ListrLogLevels.SKIPPED))
      }
    }

    if (task.isPending() || rendererTaskOptions.persistentOutput) {
      body.push(...this.renderOutputBar(task, titleColumn + this.options.indentation))
    }

    // after task is finished actions
    if (task.hasFinalized()) {
      // clean up the output buffer if not persistent
      if (!rendererTaskOptions.persistentOutput) {
        this.buffer.bottom.delete(task.id)
        this.buffer.output.delete(task.id)
      }
    }

    return {
      // the line of a group without rows, which draws no bracket
      title: bracket ? status(column) : title,
      header: bracket ? this.renderHeader(task, column, title) : title,
      body,
      subtasks,
      // the rows of a group sit one indentation deeper than the column of its status icon
      subtaskColumn: (bracket ? column + 2 : column) + (task.hasTitle() ? this.options.indentation : 0),
      bracket
    }
  }

  private isProgressive(task: ListrDefaultRendererTask): boolean {
    const rendererOptions = this.cache.rendererOptions.get(task.id)

    // a retrying task runs its subtasks again
    return task.hasSubtasks() && !task.hasTitle() && rendererOptions.showSubtasks !== false && !task.task?.retry
  }

  private isConnected(task: ListrDefaultRendererTask): boolean {
    // a parent without a title renders its subtasks at its own column, so there is no column to draw into
    return this.options.markIndentation && task.hasTitle() && this.options.indentation > 0
  }

  /** The header carries the status line of the group. */
  private renderHeader(task: ListrDefaultRendererTask, column: number, [first, ...rest]: string[]): string[] {
    return [...this.connect(task, column, [first], this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_START)), ...this.connect(task, column, rest)]
  }

  /** Connects the lines of a bracket and closes it on its last line. A group without lines is its title. */
  private close(task: ListrDefaultRendererTask, column: number, header: string[], lines: string[], title: string[]): string[] {
    if (lines.length === 0) {
      return title
    }

    return [
      ...header,
      ...this.connect(task, column, lines.slice(0, -1)),
      ...this.connect(task, column, lines.slice(-1), this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_END))
    ]
  }

  private connect(task: ListrDefaultRendererTask, column: number, lines: string[], connector = this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR)): string[] {
    if (!this.isConnected(task)) {
      return lines
    }

    // the column is part of the indentation of every subtask line, so the connector does not change the width
    return lines.map((line) => {
      const padded = line.padEnd(column + 1)

      return padded.slice(0, column) + connector + padded.slice(column + 1)
    })
  }

  private getCompleted(tasks: ListrDefaultRendererTask[], keep?: number): ListrDefaultRendererTask[] {
    if (keep === undefined) {
      return []
    }

    const completed = tasks.filter((task) => task.isEnabled() && (task.isCompleted() || task.isSkipped()))

    return completed.slice(0, Math.max(completed.length - keep, 0))
  }

  /** The waiting tasks at the end of each list, from the bottom of the live region upwards. */
  private getFoldOrder(tasks: ListrDefaultRendererTask[]): ListrDefaultRendererTask[] {
    const order: ListrDefaultRendererTask[] = []
    let tail = true

    for (const task of [...tasks].reverse()) {
      if (!task.isEnabled()) {
        continue
      }

      if (tail && task.state === ListrTaskState.WAITING) {
        order.push(task)

        continue
      }

      tail = false

      if (task.hasSubtasks() && !this.frozen.has(task.id)) {
        order.push(...this.getFoldOrder(task.subtasks))
      }
    }

    return order
  }

  private getWaiting(tasks: ListrDefaultRendererTask[], summary?: ListrDefaultRendererSummary): ListrDefaultRendererTask[] {
    let shown = tasks.length

    if (summary?.running === undefined) {
      while (shown > 0 && (!tasks[shown - 1].isEnabled() || summary?.folded?.has(tasks[shown - 1].id))) {
        shown--
      }

      return tasks.slice(shown)
    }

    // the tasks at the end that have not finished are counted, whether they started or not
    while (shown > 0 && (!tasks[shown - 1].isEnabled() || !tasks[shown - 1].hasFinalized())) {
      shown--
    }

    let kept = 0

    while (shown < tasks.length && kept < summary.running) {
      if (tasks[shown].isEnabled() && tasks[shown].hasTitle()) {
        kept++
      }

      shown++
    }

    return tasks.slice(shown)
  }

  private renderOutputBar(task: ListrDefaultRendererTask, column: number): string[] {
    const output = this.buffer.output.get(task.id)

    if (!output) {
      return []
    }

    return output.all.flatMap((o) => this.dump(task, column, ListrLogLevels.OUTPUT, o.entry))
  }

  private renderBottomBar(): string[] {
    // parse through all objects return only the last mentioned items
    if (this.buffer.bottom.size === 0) {
      return []
    }

    return Array.from(this.buffer.bottom.values())
      .flatMap((output) => output.all)
      .sort((a, b) => a.time - b.time)
      .map((output) => output.entry)
  }

  private renderPrompt(): string[] {
    if (!this.prompt) {
      return []
    }

    return [this.prompt]
  }

  private calculate(task: ListrDefaultRendererTask): void {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return
    }

    const rendererOptions: ListrDefaultRendererOptions = {
      ...this.options,
      ...task.rendererOptions
    }

    this.cache.rendererOptions.set(task.id, rendererOptions)

    this.cache.rendererTaskOptions.set(task.id, {
      ...DefaultRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    })
  }

  private setupBuffer(task: ListrDefaultRendererTask): void {
    if (this.buffer.bottom.has(task.id) || this.buffer.output.has(task.id)) {
      return
    }

    // finalized tasks have their non-persistent buffers torn down every render pass below; re-creating them here would
    // re-attach the output and state listeners each pass and leak them, so leave them until the task runs again
    if (task.hasFinalized()) {
      return
    }

    const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id)

    // lazily create the process output buffer for the current task output
    if (this.shouldOutputToBottomBar(task) && !this.buffer.bottom.has(task.id)) {
      // create new if there is no persistent storage created for bottom bar
      this.buffer.bottom.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.bottomBar === 'number' ? rendererTaskOptions.bottomBar : 1 }))

      task.on(ListrTaskEventType.OUTPUT, (output) => {
        const data = this.dump(task, 0, ListrLogLevels.OUTPUT, output)

        this.buffer.bottom.get(task.id).write(data.join(EOL))
      })

      task.on(ListrTaskEventType.OUTPUT_RESET, () => {
        this.buffer.bottom.get(task.id)?.reset()
      })

      task.on(ListrTaskEventType.STATE, (state) => {
        if (state === ListrTaskState.RETRY || state === ListrTaskState.ROLLING_BACK) {
          this.buffer.bottom.delete(task.id)
        }
      })
    } else if (this.shouldOutputToOutputBar(task) && !this.buffer.output.has(task.id)) {
      this.buffer.output.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.outputBar === 'number' ? rendererTaskOptions.outputBar : 1 }))

      task.on(ListrTaskEventType.OUTPUT, (output) => {
        this.buffer.output.get(task.id).write(output)
      })

      task.on(ListrTaskEventType.OUTPUT_RESET, () => {
        this.buffer.output.get(task.id)?.reset()
      })

      task.on(ListrTaskEventType.STATE, (state) => {
        if (state === ListrTaskState.RETRY || state === ListrTaskState.ROLLING_BACK) {
          this.buffer.output.delete(task.id)
        }
      })
    }
  }

  private reset(task: ListrDefaultRendererTask): void {
    // no need for this since this is now cached
    this.buffer.output.delete(task.id)
  }

  private dump(
    task: ListrDefaultRendererTask,
    column: number,
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
    if ((task.hasTitle() && source === ListrLogLevels.FAILED && data === task.title) || typeof data !== 'string') {
      return []
    }

    if (source === ListrLogLevels.OUTPUT) {
      data = cleanseAnsi(data)
    }

    return this.format(data, this.style(task, true), column)
  }

  private indent(str: string, i: number): string {
    return i > 0 ? indent(str.trimEnd(), this.options.indentation) : str.trimEnd()
  }
}
