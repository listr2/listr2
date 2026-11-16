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
  ListrDefaultRendererSummarized,
  ListrDefaultRendererFrame,
  ListrDefaultRendererFrozen,
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
    markIndentation: true,
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
  /** Tags the header that shows the status of a group with the id of its task, until the frame is written. */
  private static readonly MARK = /\u{F8FF}([^\u{F8FF}]*)\u{F8FF}/u

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
  private readonly frozen = new Map<string, ListrDefaultRendererFrozen>()
  // the groups whose header is persisted, so their footer shows their status
  private readonly headers = new Set<string>()
  // the groups whose live header does not fit on the terminal, so their footer shows their status for this frame
  private clipped = new Set<string>()
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
    this.headers.clear()
    this.hasPersisted = false

    this.logger.process.hijack()
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
    const { render, summary } = typeof rows === 'number' && live.length > rows - 1 ? this.summarize(rows - 1) : { render: live, summary: undefined }

    if (persist.length > 0) {
      this.hasPersisted = true
    }

    const bars = [this.renderBottomBar(), this.renderPrompt()]
    const compose = (lines: string[]): string[] =>
      bars.reduce((output, bar) => (bar.length > 0 ? [...output, ...(output.length > 0 || this.hasPersisted ? [''] : []), ...bar] : output), lines)
    const output = this.unclip(compose(render), (clipped) => {
      this.clipped = clipped

      try {
        return compose(this.renderer(this.tasks, 0, { summary }).live)
      } finally {
        this.clipped = new Set()
      }
    })

    if (persist.length > 0) {
      this.logger.process.persist(this.unmark(persist).join(EOL), this.unmark(output).join(EOL))
    } else {
      this.logger.process.update(this.unmark(output).join(EOL))
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

      this.logger.process.persist(this.unmark(persist).join(EOL), '')
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

  protected format(message: string, icon: string, level: number): string[] {
    // we dont like empty data around here
    if (message.trim() === '') {
      return []
    }

    if (icon) {
      message = icon + ' ' + message
    }

    let parsed: string[]

    const columns = (this.logger.process.stdout.columns ?? 80) - level * this.options.indentation - 2

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

    return parsed.map((str) => indent(str, level * this.options.indentation))
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

  private summarize(height: number): ListrDefaultRendererSummarized {
    const completed = this.fit(height, (keep) => ({ completed: keep }))

    if (completed.render.length <= height) {
      return completed
    }

    const waiting = this.fit(height, (keep) => ({ completed: 0, waiting: keep }))

    // the rows that the waiting tasks leave go back to the completed tasks
    return this.fit(height, (keep) => ({ completed: keep, waiting: waiting.keep }))
  }

  /**
   * A live header that the live region does not show, since it is taller than the terminal, hands its status to a footer until it fits
   * again. Rendering the footer can take rows, which can push more headers off, so this repeats until no more headers are hidden.
   */
  private unclip(lines: string[], render: (clipped: Set<string>) => string[]): string[] {
    const clipped = new Set<string>()

    while (this.logger.process.overflow(this.unmark(lines).join(EOL)) > 0) {
      const text = this.unmark(lines)
      const hidden = lines
        .map((line, index) => ({ id: DefaultRenderer.MARK.exec(line)?.[1], index }))
        .filter(({ id, index }) => id && !clipped.has(id) && this.logger.process.overflow(text.slice(index).join(EOL)) > 0)

      if (hidden.length === 0) {
        break
      }

      hidden.forEach(({ id }) => clipped.add(id))
      lines = render(clipped)
    }

    return lines
  }

  private unmark(lines: string[]): string[] {
    return lines.map((line) => line.replace(DefaultRenderer.MARK, ''))
  }

  private fit(height: number, summary: (keep: number) => ListrDefaultRendererSummary): ListrDefaultRendererFit {
    let render = this.renderer(this.tasks, 0, { summary: summary(0) }).live

    if (render.length > height) {
      return {
        keep: 0,
        render,
        summary: summary(0)
      }
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

    return {
      keep: low,
      render,
      summary: summary(low)
    }
  }

  private renderer(tasks: ListrDefaultRendererTask[], level = 0, context: ListrDefaultRendererContext = {}): ListrDefaultRendererFrame {
    const completed = context.compact ? this.getCompleted(tasks, context.summary.completed) : []
    const pending = tasks.filter((task) => !completed.includes(task))
    const waiting = context.summary?.waiting !== undefined ? this.getWaiting(pending, context.summary.waiting) : []
    const shown = pending.slice(0, pending.length - waiting.length)

    const frames = this.renderFrames(shown, tasks, level, context)
    const output = shown.flatMap((task) => frames.get(task.id)?.live ?? [])

    if (completed.length > 0) {
      output.unshift(...this.format(`${completed.length}`, this.logger.icon(ListrDefaultRendererLogLevels.SUMMARY_COMPLETED), level))
    }

    const titled = waiting.filter((task) => task.isEnabled() && task.hasTitle())

    if (titled.length > 0) {
      output.push(...this.format(`${titled.length}`, this.logger.icon(ListrDefaultRendererLogLevels.SUMMARY_WAITING), level))
    }

    return {
      persist: [...frames.values()].flatMap((frame) => frame.persist),
      live: output
    }
  }

  private renderFrames(
    tasks: ListrDefaultRendererTask[],
    siblings: ListrDefaultRendererTask[],
    level: number,
    context: ListrDefaultRendererContext
  ): Map<string, ListrDefaultRendererFrame> {
    const concurrent = (siblings[0]?.listr.options.concurrent as number) > 1
    const opened = context.commit ? tasks.find((task) => this.frozen.get(task.id) === 'open') : undefined
    const frames = new Map<string, ListrDefaultRendererFrame>()
    let held = false

    // siblings wait for an open task, so its subtasks stay under its title
    for (const task of opened ? [opened, ...tasks.filter((other) => other !== opened)] : tasks) {
      if (!task.isEnabled() || this.frozen.get(task.id) === 'done') {
        continue
      }

      const commit = context.commit && !held

      frames.set(
        task.id,
        this.renderBlock(task, siblings, level, {
          ...context,
          commit,
          compact: false
        })
      )

      if (this.frozen.get(task.id) !== 'done' && (!concurrent || this.frozen.has(task.id))) {
        held = true
      }
    }

    return frames
  }

  private renderBlock(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], level: number, context: ListrDefaultRendererContext): ListrDefaultRendererFrame {
    this.calculate(task)

    if (context.commit && this.isProgressive(task)) {
      return this.renderProgressive(task, siblings, level, context)
    }

    const commit = context.commit && (context.final || task.isClosed())
    const output = this.renderLines(task, siblings, level, commit ? undefined : context.summary)

    if (!commit) {
      return { persist: [], live: output }
    }

    this.frozen.set(task.id, 'done')

    return { persist: output, live: [] }
  }

  private renderProgressive(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], level: number, context: ListrDefaultRendererContext): ListrDefaultRendererFrame {
    const final = context.final || task.isClosed()
    const { title, header, footer, body, subtasks, subtaskLevel, bracket } = this.renderTask(task, siblings, level)

    // the children persisted something in this frame when the frozen map grew, and the header goes with the first of them
    const frozenBefore = this.frozen.size
    const children = this.renderer(task.subtasks, subtaskLevel, { ...context, final })
    const opened = this.frozen.has(task.id)

    if (final && task.subtasks.every((subtask) => !subtask.isEnabled() || this.frozen.get(subtask.id) === 'done')) {
      this.frozen.set(task.id, 'done')

      if (!opened) {
        return {
          persist: [...header, ...this.close(task, level, [...body, ...children.persist], footer)],
          live: []
        }
      }

      // without a bracket, the closing line is the title itself, at the column of the task
      return {
        persist: bracket ? [...this.connect(task, level, [...children.persist, ...body]), ...footer] : [...this.connect(task, level, children.persist), ...title, ...body],
        live: []
      }
    }

    const live = subtasks ? [...body, ...children.live] : body

    if (!opened && this.frozen.size === frozenBefore) {
      return {
        persist: children.persist,
        live: [...header, ...(subtasks ? this.close(task, level, live, footer) : live)]
      }
    }

    // the header is persisted with the first subtask that is persisted, so it is rendered again to move the status to the footer
    if (!opened) {
      this.frozen.set(task.id, 'open')
      this.headers.add(task.id)
    }

    const persisted = opened ? { header, footer } : this.renderTask(task, siblings, level)
    const block = [...this.connect(task, level, live), ...persisted.footer]

    return {
      persist: opened ? this.connect(task, level, children.persist) : [...persisted.header, ...this.connect(task, level, children.persist)],
      live: block
    }
  }

  private renderLines(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], level: number, summary?: ListrDefaultRendererSummary): string[] {
    const open = this.frozen.get(task.id) === 'open'

    // a clipped group shows its status on its footer only for this frame, so it bypasses the cache
    const cached = !this.clipped.has(task.id)

    // if this is already cached return the cache
    if (cached && !open && task.isClosed() && this.cache.render.has(task.id)) {
      return this.cache.render.get(task.id)
    }

    const { header, footer, body, subtasks, subtaskLevel, bracket } = this.renderTask(task, siblings, level)
    const lines = [...body]

    if (subtasks) {
      const compact = summary !== undefined && !task.isClosed() && !this.isProgressive(task)

      lines.push(...this.renderer(task.subtasks, subtaskLevel, { summary, compact }).live)
    }

    const group = subtasks || open ? this.connect(task, level, lines) : lines

    if (open) {
      return [...group, ...footer]
    }

    const output = [...header, ...(bracket ? this.close(task, level, lines, footer) : group)]

    // a summarized render is not the final one
    if (cached && task.isClosed() && !summary) {
      this.cache.render.set(task.id, output)
      this.reset(task)
    }

    return output
  }

  // eslint-disable-next-line complexity
  private renderTask(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], level: number): ListrDefaultRendererTaskRender {
    this.calculate(task)
    this.setupBuffer(task)

    const rendererOptions = this.cache.rendererOptions.get(task.id)
    const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id)

    const title: string[] = []
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

    // the status line of a bracket takes the column after its connector, on its header while the header is live and on its footer once
    // the header is persisted or does not fit on the terminal
    const bracket = subtasks && this.isConnected(task)
    const titleLevel = bracket ? level + 1 : level
    const persisted = this.headers.has(task.id)
    const text = task.title
    // a failed group shows the failed icon, since its own icon for failed subtasks reads like a running one
    const icon = bracket && task.hasFailed() ? this.logger.icon(ListrDefaultRendererLogLevels.FAILED) : this.style(task)
    const line = (message: string, icon: string): string[] => this.format(message, icon, titleLevel)

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
          title.push(...line(!task.hasSubtasks() && task.message.error && rendererOptions.showErrorMessage ? task.message.error : text, icon))
        } else if (task.isSkipped() && rendererOptions.collapseSkips) {
          // current task title and skip change the title
          title.push(
            ...line(
              this.logger.suffix(task.message.skip && rendererOptions.showSkipMessage ? task.message.skip : text, {
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
              this.logger.suffix(text, {
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
              this.logger.suffix(text, {
                ...rendererTaskOptions.timer,
                args: [task.message.duration]
              }),
              icon
            )
          )
        } else if (task.isPaused()) {
          title.push(
            ...line(
              this.logger.suffix(text, {
                ...rendererOptions.pausedTimer,
                args: [task.message.paused - Date.now()]
              }),
              icon
            )
          )
        } else {
          // normal state
          title.push(...line(text, icon))
        }
      } else {
        // some sibling task but self has failed and this has stopped
        title.push(...line(text, this.logger.icon(ListrDefaultRendererLogLevels.COMPLETED_WITH_FAILED_SISTER_TASKS)))
      }
    }

    // task should not have subtasks since subtasks will handle the error already
    // maybe it is a better idea to show the error or skip messages when show subtasks is disabled.
    if (!task.hasSubtasks() || !rendererOptions.showSubtasks) {
      // without the collapse option for skip and errors
      if (task.hasFailed() && rendererOptions.collapseErrors === false && (rendererOptions.showErrorMessage || !rendererOptions.showSubtasks)) {
        // show skip data if collapsing is not defined
        body.push(...this.dump(task, level, ListrLogLevels.FAILED))
      } else if (task.isSkipped() && rendererOptions.collapseSkips === false && (rendererOptions.showSkipMessage || !rendererOptions.showSubtasks)) {
        // show skip data if collapsing is not defined
        body.push(...this.dump(task, level, ListrLogLevels.SKIPPED))
      }
    }

    if (task.isPending() || rendererTaskOptions.persistentOutput) {
      body.push(...this.renderOutputBar(task, level))
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
      title,
      header: bracket ? (persisted ? this.renderHeader(task, level) : this.mark(task, this.renderHeader(task, level, title))) : title,
      footer: bracket && (persisted || this.clipped.has(task.id)) ? this.renderFooter(task, level, title) : [],
      body,
      subtasks,
      subtaskLevel: task.hasTitle() ? level + 1 : level,
      bracket
    }
  }

  private isProgressive(task: ListrDefaultRendererTask): boolean {
    const rendererOptions = this.cache.rendererOptions.get(task.id)

    // a retrying task runs its subtasks again
    if (!task.hasSubtasks() || rendererOptions.showSubtasks === false || task.task?.retry) {
      return false
    }

    if (!task.hasTitle()) {
      return true
    }

    const collapse = task.subtasks.map((subtask) => {
      this.calculate(subtask)

      return this.cache.rendererOptions.get(subtask.id).collapseSubtasks
    })

    return (rendererOptions.collapseSubtasks === false && !collapse.includes(true)) || collapse.includes(false)
  }

  private isConnected(task: ListrDefaultRendererTask): boolean {
    // a parent without a title renders its subtasks at its own level, so there is no column to draw into
    return this.options.markIndentation && task.hasTitle() && this.options.indentation > 0
  }

  /** The header carries the status line while it is live, and only the title once it is persisted. */
  private renderHeader(task: ListrDefaultRendererTask, level: number, status?: string[]): string[] {
    if (status) {
      const [first, ...rest] = status

      return [...this.connect(task, level, [first], this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_START)), ...this.connect(task, level, rest)]
    }

    const [first, ...rest] = this.format(task.title, this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_START), level)

    return [first, ...this.connect(task, level, rest)]
  }

  /** The footer carries the status line once the header is persisted or does not fit on the terminal, and is bare only to close an empty group. */
  private renderFooter(task: ListrDefaultRendererTask, level: number, status?: string[]): string[] {
    const [first, ...rest] = status ?? ['']

    return [...this.connect(task, level, [first], this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_END)), ...rest]
  }

  /** Connects the lines of a bracket and closes it on its footer, or without one on its last line. */
  private close(task: ListrDefaultRendererTask, level: number, lines: string[], footer: string[]): string[] {
    if (footer.length > 0) {
      return [...this.connect(task, level, lines), ...footer]
    } else if (lines.length === 0) {
      return this.renderFooter(task, level)
    }

    return [...this.connect(task, level, lines.slice(0, -1)), ...this.connect(task, level, lines.slice(-1), this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_END))]
  }

  private mark(task: ListrDefaultRendererTask, [first, ...rest]: string[]): string[] {
    return [`${first}\u{F8FF}${task.id}\u{F8FF}`, ...rest]
  }

  private connect(task: ListrDefaultRendererTask, level: number, lines: string[], connector = this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR)): string[] {
    if (!this.isConnected(task)) {
      return lines
    }

    const column = level * this.options.indentation

    // the column is part of the indentation of every subtask line, so the connector does not change the width
    return lines.map((line) => {
      const padded = line.padEnd(column + 1)

      return padded.slice(0, column) + connector + padded.slice(column + 1)
    })
  }

  private getCompleted(tasks: ListrDefaultRendererTask[], keep: number): ListrDefaultRendererTask[] {
    const completed = tasks.filter((task) => task.isEnabled() && (task.isCompleted() || task.isSkipped()))

    return completed.slice(0, Math.max(completed.length - keep, 0))
  }

  private getWaiting(tasks: ListrDefaultRendererTask[], keep: number): ListrDefaultRendererTask[] {
    let shown = tasks.length

    while (shown > 0 && (!tasks[shown - 1].isEnabled() || tasks[shown - 1].state === ListrTaskState.WAITING)) {
      shown--
    }

    let kept = 0

    while (shown < tasks.length && kept < keep) {
      if (tasks[shown].isEnabled() && tasks[shown].hasTitle()) {
        kept++
      }

      shown++
    }

    return tasks.slice(shown)
  }

  private renderOutputBar(task: ListrDefaultRendererTask, level: number): string[] {
    const output = this.buffer.output.get(task.id)

    if (!output) {
      return []
    }

    return output.all.flatMap((o) => this.dump(task, level, ListrLogLevels.OUTPUT, o.entry))
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
        const data = this.dump(task, -1, ListrLogLevels.OUTPUT, output)

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
    if ((task.hasTitle() && source === ListrLogLevels.FAILED && data === task.title) || typeof data !== 'string') {
      return []
    }

    if (source === ListrLogLevels.OUTPUT) {
      data = cleanseAnsi(data)
    }

    return this.format(data, this.style(task, true), level + 1)
  }

  private indent(str: string, i: number): string {
    return i > 0 ? indent(str.trimEnd(), this.options.indentation) : str.trimEnd()
  }
}
