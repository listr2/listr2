import type truncate from 'cli-truncate'
import { EOL } from 'os'
import type wrap from 'wrap-ansi'

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
  ListrDefaultRendererFrozen,
  ListrDefaultRendererSummary,
  ListrDefaultRendererTaskRender
} from './renderer.internal.interface'
import { ListrEventType, ListrTaskEventType, ListrTaskState } from '#constants'
import type { ListrRenderer, ListrTaskEventMap } from '#interfaces'
import { ListrRendererError } from '#interfaces'
import type { ListrEventManager } from '#lib'
import { PRESET_TIMER } from '#presets'
import { ListrLogLevels, ListrLogger, ProcessOutputBuffer, Spinner, assertFunctionOrSelf, cleanseAnsi, color, indent } from '#utils'

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

  private prompt: string
  private activePrompt: string
  private readonly spinner: Spinner
  private readonly logger: ListrLogger<ListrDefaultRendererLogLevels>
  private truncate: typeof truncate
  private wrap: typeof wrap
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
  private readonly headers = new Map<string, string>()
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

  public async render(): Promise<void> {
    const { default: truncate } = await import('cli-truncate')
    const { default: wrap } = await import('wrap-ansi')

    this.truncate = truncate
    this.wrap = wrap

    this.cache.render.clear()
    this.frozen.clear()
    this.headers.clear()
    this.hasPersisted = false

    this.logger.process.hijack()
    this.lockInput()

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

    const renderBottomBar = this.renderBottomBar()
    const renderPrompt = this.renderPrompt()

    if (renderBottomBar.length > 0) {
      if (render.length > 0 || this.hasPersisted) {
        render.push('')
      }

      render.push(...renderBottomBar)
    }

    if (renderPrompt.length > 0) {
      if (render.length > 0 || this.hasPersisted) {
        render.push('')
      }

      render.push(...renderPrompt)
    }

    if (persist.length > 0) {
      this.logger.process.persist(persist.join(EOL), render.join(EOL))
    } else {
      this.logger.process.update(render.join(EOL))
    }

    // rendering a prompt task sets the active prompt before the prompt takes over stdin
    this.lockInput()
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
          return this.truncate(this.indent(s, i), columns)
        })

        break

      case 'wrap':
        parsed = this.wrap(message, columns, { hard: true, trim: false })
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

  private lockInput(): void {
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
    const completed = this.fit(height, (keep) => ({ completed: keep }))

    if (completed.render.length <= height) {
      return completed.render
    }

    const waiting = this.fit(height, (keep) => ({ completed: 0, waiting: keep }))

    // the rows that the waiting tasks leave go back to the completed tasks
    return this.fit(height, (keep) => ({ completed: keep, waiting: waiting.keep })).render
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

  private renderer(tasks: ListrDefaultRendererTask[], level = 0, context: ListrDefaultRendererContext = {}): ListrDefaultRendererFrame {
    const completed = context.compact ? this.getCompleted(tasks, context.summary.completed) : []
    const pending = tasks.filter((task) => !completed.includes(task))
    const waiting = context.summary?.waiting !== undefined ? this.getWaiting(pending, context.summary.waiting) : []
    const shown = pending.slice(0, pending.length - waiting.length)

    const frames = this.renderFrames(shown, tasks, level, context)
    const output = shown.flatMap((task) => frames.get(task.id)?.live ?? [])

    if (completed.length > 0) {
      output.unshift(...this.format(`${completed.length} completed`, this.logger.icon(ListrDefaultRendererLogLevels.SUMMARY_COMPLETED), level))
    }

    const titled = waiting.filter((task) => task.isEnabled() && task.hasTitle())

    if (titled.length > 0) {
      output.push(...this.format(`${titled.length} waiting`, this.logger.icon(ListrDefaultRendererLogLevels.SUMMARY_WAITING), level))
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
    const open = context.commit ? tasks.find((task) => this.frozen.get(task.id) === 'open') : undefined
    const frames = new Map<string, ListrDefaultRendererFrame>()
    let held = false

    // siblings wait for an open task, so its subtasks stay under its title
    for (const task of open ? [open, ...tasks.filter((task) => task !== open)] : tasks) {
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
    const { title, body, subtasks, subtaskLevel, bracket } = this.renderTask(task, siblings, level)
    const header = bracket ? this.renderHeader(task, level) : title
    const footer = bracket ? this.renderFooter(task, level, title) : []

    const frozen = this.frozen.size
    const children = this.renderer(task.subtasks, subtaskLevel, { ...context, final })
    const opened = this.frozen.has(task.id)

    if (final && task.subtasks.every((subtask) => !subtask.isEnabled() || this.frozen.get(subtask.id) === 'done')) {
      this.frozen.set(task.id, 'done')

      if (!opened) {
        return {
          persist: [...header, ...this.connect(task, level, [...body, ...children.persist]), ...footer],
          live: []
        }
      }

      return {
        persist: bracket ? [...this.connect(task, level, [...children.persist, ...body]), ...footer] : [...this.connect(task, level, children.persist), ...title, ...body],
        live: []
      }
    }

    const live = subtasks ? [...body, ...children.live] : body

    if (!opened && this.frozen.size === frozen) {
      return {
        persist: children.persist,
        live: [...header, ...(subtasks ? this.connect(task, level, live) : live), ...footer]
      }
    }

    // the header is persisted with the first subtask that is persisted
    if (!opened) {
      this.frozen.set(task.id, 'open')
      this.headers.set(task.id, task.title)
    }

    return {
      persist: opened ? this.connect(task, level, children.persist) : [...header, ...this.connect(task, level, children.persist)],
      live: [...this.connect(task, level, live), ...footer]
    }
  }

  private renderLines(task: ListrDefaultRendererTask, siblings: ListrDefaultRendererTask[], level: number, summary?: ListrDefaultRendererSummary): string[] {
    const open = this.frozen.get(task.id) === 'open'

    // if this is already cached return the cache
    if (!open && task.isClosed() && this.cache.render.has(task.id)) {
      return this.cache.render.get(task.id)
    }

    const { title, body, subtasks, subtaskLevel, bracket } = this.renderTask(task, siblings, level)
    const lines = [...body]

    if (subtasks) {
      const compact = summary !== undefined && !task.isClosed() && !this.isProgressive(task)

      lines.push(...this.renderer(task.subtasks, subtaskLevel, { summary, compact }).live)
    }

    const group = subtasks || open ? this.connect(task, level, lines) : lines
    const footer = bracket ? this.renderFooter(task, level, title) : []

    if (open) {
      return [...group, ...footer]
    }

    const output = bracket ? [...this.renderHeader(task, level), ...group, ...footer] : [...title, ...group]

    // a summarized render is not the final one
    if (task.isClosed() && !summary) {
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

    // the final title line of a bracket is its footer, which lines up with the subtasks
    const bracket = subtasks && this.isConnected(task)
    const titleLevel = bracket ? level + 1 : level
    // the closing line of a bracket shows its status, and its title only when its persisted header shows another one
    const text = bracket && task.hasFinalized() && (this.headers.get(task.id) ?? task.title) === task.title ? '' : task.title
    const line = (message: string, icon: string): string[] => (message.trim() === '' ? this.format(icon, '', titleLevel) : this.format(message, icon, titleLevel))

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
          title.push(...line(!task.hasSubtasks() && task.message.error && rendererOptions.showErrorMessage ? task.message.error : text, this.style(task)))
        } else if (task.isSkipped() && rendererOptions.collapseSkips) {
          // current task title and skip change the title
          title.push(
            ...line(
              this.logger.suffix(task.message.skip && rendererOptions.showSkipMessage ? task.message.skip : text, {
                field: ListrLogLevels.SKIPPED,
                condition: rendererOptions.suffixSkips,
                format: () => color.dim
              }),
              this.style(task)
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
              this.style(task)
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
              this.style(task)
            )
          )
        } else if (task.isPaused()) {
          title.push(
            ...line(
              this.logger.suffix(text, {
                ...rendererOptions.pausedTimer,
                args: [task.message.paused - Date.now()]
              }),
              this.style(task)
            )
          )
        } else {
          // normal state
          title.push(...line(text, this.style(task)))
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

  private renderHeader(task: ListrDefaultRendererTask, level: number): string[] {
    const [first, ...rest] = this.format(task.title, this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_START), level)

    return [first, ...this.connect(task, level, rest)]
  }

  private renderFooter(task: ListrDefaultRendererTask, level: number, title: string[]): string[] {
    const [first, ...rest] = title

    return [...this.connect(task, level, [first], this.logger.icon(ListrDefaultRendererLogLevels.CONNECTOR_END)), ...rest]
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
