import { spawnSync } from 'child_process'
import { readFileSync } from 'fs'
import { createLogUpdate } from 'log-update'
import { EOL } from 'os'
import { onExit } from 'signal-exit'
import wrapAnsi from 'wrap-ansi'

import { ProcessOutputStream } from './process-output-stream'
import { TERMINAL_POLL_INTERVAL } from './process-output.constants'
import type { ProcessOutputCapture, ProcessOutputOptions, ProcessOutputStreamMap } from './process-output.interface'
import { ANSI_ESCAPE_CODES } from '#constants'
import { cleanseAnsi } from '#utils'

/**
 * Creates a new Listr2 process-output controller.
 *
 * This is used to control the flow to `process.stdout` and `process.stderr` for all renderers.
 *
 * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
 */
export class ProcessOutput {
  public readonly stream: ProcessOutputStreamMap
  protected active: boolean
  private readonly shared: boolean
  private updater?: ReturnType<typeof createLogUpdate>
  private live = ''
  private captured: ProcessOutputCapture[] = []
  private drawn?: { text: string; columns: number; rows: number }
  private frame?: string[]
  private input?: string
  private stopped?: number
  private background?: number
  private failed = false
  private proc = true
  private removeExitHook?: () => void

  constructor(
    stdout?: NodeJS.WriteStream,
    stderr?: NodeJS.WriteStream,
    private readonly options?: ProcessOutputOptions
  ) {
    this.stream = {
      stdout: new ProcessOutputStream(stdout ?? process.stdout),
      stderr: new ProcessOutputStream(stderr ?? process.stderr)
    }

    this.shared = (stdout ?? process.stdout) === (stderr ?? process.stderr)

    this.options = {
      dump: ['stdout', 'stderr'],
      ...options
    }
  }

  get stdout(): NodeJS.WriteStream {
    return this.stream.stdout.out
  }

  get stderr(): NodeJS.WriteStream {
    return this.stream.stderr.out
  }

  public hijack(): void {
    if (this.active) {
      throw new Error('ProcessOutput has been already hijacked!')
    }

    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)
    this.removeExitHook = onExit(() => this.restore(), { alwaysLast: true })

    for (const name of Object.keys(this.stream) as (keyof ProcessOutputStreamMap)[]) {
      this.stream[name].hijack((entry) => this.capture(name, entry))
    }

    this.active = true
  }

  /** Draws the live region at the bottom of `stdout`, which captured writes are then printed above. */
  public update(live: string): void {
    this.live = live

    this.batch(() => this.draw())
  }

  /** Writes the text above the live region, where it stays, and redraws the live region below it. */
  public persist(text: string, live = this.live): void {
    this.live = live
    this.yieldTerminal()

    this.batch(() => {
      if (text !== '') {
        this.start().persist(text)
        this.drawn = undefined
      }

      this.draw(true)
    })
  }

  /** Erases the live region. */
  public clear(): void {
    this.live = ''

    this.batch(() => this.draw())
  }

  /**
   * Hides keyboard input until `unlockInput()` or `release()`, while the output is hijacked.
   *
   * @see {@link https://listr2.kilic.dev/renderer/default.html#keyboard-input}
   */
  public lockInput(): void {
    if (!this.active || this.input !== undefined || this.failed) {
      return
    }

    if (process.platform === 'win32' || !process.stdin.isTTY || !this.stdout.isTTY) {
      return
    }

    // a job in the background draws like any other, and checks now and then whether it got the terminal
    if (this.background !== undefined && Date.now() - this.background < TERMINAL_POLL_INTERVAL) {
      return
    }

    if (!this.foreground()) {
      this.background = Date.now()

      return
    }

    this.background = undefined

    const input = this.stty('-g')

    if (!input || this.stty('-echo') === undefined) {
      this.failed = true

      return
    }

    this.input = input
    process.on('SIGTSTP', this.onStop)
  }

  /** Shows keyboard input again after `lockInput()`. */
  public unlockInput(): void {
    this.background = undefined

    if (this.input === undefined) {
      return
    }

    process.off('SIGTSTP', this.onStop)
    process.off('SIGCONT', this.onContinue)

    if (this.stopped === undefined && this.foreground()) {
      this.stty(this.input)
    }

    this.input = undefined
    this.stopped = undefined
  }

  /** Writes what was captured and not written yet, and restores the streams. */
  public release(): void {
    if (this.updater) {
      this.stdout.off('resize', this.onResize)
      this.updater.done()
      this.updater = undefined
    }

    this.live = ''
    this.drawn = undefined

    Object.values(this.stream).forEach((stream) => stream.release())
    this.take().forEach((message) => this.stream[message.name].write(message.entry + EOL))

    this.restore()
    this.removeExitHook?.()
    this.removeExitHook = undefined
    this.failed = false

    this.active = false
  }

  /** The rows at the top of the text that `update()` would not show, since the live region only shows what fits on the terminal. */
  public overflow(text: string): number {
    // the same rows and columns that log-update clips to
    return Math.max(this.wrap(text, this.stdout.columns ?? 80).length - (this.stdout.rows ?? 24) + 1, 0)
  }

  public toStdout(buffer: string, eol = true): boolean {
    if (eol) {
      buffer = buffer + EOL
    }

    return this.stream.stdout.write(buffer)
  }

  public toStderr(buffer: string, eol = true): boolean {
    if (eol) {
      buffer = buffer + EOL
    }

    return this.stream.stderr.write(buffer)
  }

  private start(): ReturnType<typeof createLogUpdate> {
    if (!this.updater) {
      this.updater = createLogUpdate(
        new Proxy(this.stdout, {
          get: (target, prop, receiver): any => (prop === 'write' ? (chunk: string): boolean => this.writeFrame(chunk) : Reflect.get(target, prop, receiver))
        }),
        { showCursor: true }
      )
      this.stdout.on('resize', this.onResize)
    }

    return this.updater
  }

  // the caller passes yielded when it already checked for the terminal in this frame
  private draw(yielded = false): void {
    if (!yielded) {
      this.yieldTerminal()
    }

    // `fg` sends no SIGCONT to a job that already runs in the background, so check for the terminal now and then
    if (this.stopped !== undefined) {
      if (Date.now() - this.stopped >= TERMINAL_POLL_INTERVAL) {
        this.resume()
      }

      return
    }

    if (this.live === '') {
      this.updater?.clear()
      this.drawn = undefined

      return
    }

    this.start()(this.live)
    // laid out only on a resize, at the size it was drawn at
    this.drawn = {
      text: this.live,
      columns: this.stdout.columns ?? 80,
      rows: this.stdout.rows ?? 24
    }
  }

  private readonly onResize = (): void => {
    if (!this.drawn) {
      return
    }

    const lines = this.layout(this.drawn)
    const columns = this.stdout.columns
    // log-update erases with the line count of the last frame, which is stale once the terminal reflowed it
    const height = this.reflows() ? lines.reduce((height, line) => height + this.wrap(line, columns).length, 0) : lines.length

    this.batch(() => {
      this.writeFrame(ANSI_ESCAPE_CODES.ERASE_LINE + (ANSI_ESCAPE_CODES.CURSOR_UP + ANSI_ESCAPE_CODES.ERASE_LINE).repeat(height) + ANSI_ESCAPE_CODES.CURSOR_LEFT)
      this.updater.done()

      this.draw()
    })
  }

  // log-update wraps each of its writes in a synchronized update, so a persist and the redraw below it would show as two frames, the first
  // without a live region
  private batch(draw: () => void): void {
    if (this.frame) {
      return draw()
    }

    this.frame = []

    try {
      draw()
    } finally {
      const frame = this.frame.join('')

      this.frame = undefined

      if (frame !== '') {
        this.writeSynced(frame)
      }
    }
  }

  private writeFrame(chunk: string): boolean {
    chunk = chunk.replaceAll(ANSI_ESCAPE_CODES.SYNC_START, '').replaceAll(ANSI_ESCAPE_CODES.SYNC_END, '')

    if (this.frame) {
      this.frame.push(chunk)

      return true
    }

    return this.writeSynced(chunk)
  }

  private writeSynced(text: string): boolean {
    return this.stream.stdout.write(this.stdout.isTTY ? ANSI_ESCAPE_CODES.SYNC_START + text + ANSI_ESCAPE_CODES.SYNC_END : text)
  }

  private layout({ text, columns, rows }: { text: string; columns: number; rows: number }): string[] {
    const lines = this.wrap(text.endsWith(EOL) ? text.slice(0, -EOL.length) : text, columns)

    return lines.slice(Math.max(lines.length - rows + 1, 0))
  }

  // wrap-ansi turns every line break into \n, also where EOL is \r\n
  private wrap(text: string, columns: number): string[] {
    return wrapAnsi(text, columns, {
      hard: true,
      trim: false,
      wordWrap: false
    }).split('\n')
  }

  private reflows(): boolean {
    // tmux reflows, and its panes inherit the environment of the terminal it was started from
    if (process.env.TMUX) {
      return true
    }

    // these terminals truncate lines instead of reflowing them
    if (process.env.XTERM_VERSION || process.env.STY) {
      return false
    }

    const term = process.env.TERM ?? ''

    return term !== 'linux' && !/^(rxvt|st|screen)/.test(term)
  }

  private capture(name: keyof ProcessOutputStreamMap, entry: string): void {
    if (!this.options.dump.includes(name)) {
      return
    }

    this.captured.push({ name, entry })

    if (this.updater) {
      queueMicrotask(() => this.flush())
    }
  }

  private flush(): void {
    if (!this.updater || !this.active) {
      return
    }

    const captured = this.take()

    if (captured.length === 0) {
      return
    }

    if (this.shared || captured.every((message) => message.name === 'stdout')) {
      this.persist(captured.map((message) => message.entry).join(EOL))

      return
    }

    this.updater.clear()
    captured.forEach((message) => this.stream[message.name].write(message.entry + EOL))

    this.draw()
  }

  private take(): ProcessOutputCapture[] {
    const captured = this.captured.map((message) => ({ ...message, entry: cleanseAnsi(message.entry) })).filter((message) => message.entry)

    this.captured = []

    return captured
  }

  // a terminal left in a synchronized update shows nothing anymore, so end it in case the process stops in the middle of a frame
  private restore(): void {
    this.unlockInput()
    this.stream.stdout.write(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)
  }

  // under a wrapper such as pnpm, the shell takes the terminal back and writes below the live region before this process handles SIGTSTP
  private yieldTerminal(): void {
    if (this.input === undefined || this.stopped !== undefined || this.owns() !== false) {
      return
    }

    this.updater?.done()
    this.drawn = undefined
    this.stopped = Date.now()
  }

  // stty stops the whole job with SIGTTOU when it changes the mode of the terminal from the background, so anything unknown is the background
  private foreground(): boolean {
    const owns = this.owns()

    if (owns !== undefined) {
      return owns
    }

    const { stdout } = spawnSync('ps', ['-o', 'stat=', '-p', String(process.pid)], { encoding: 'utf-8' })

    return stdout?.includes('+') ?? false
  }

  // reading /proc is cheap enough for every frame, unlike ps, so it is undefined where there is no /proc
  private owns(): boolean | undefined {
    if (!this.proc) {
      return undefined
    }

    try {
      const stat = readFileSync('/proc/self/stat', 'utf-8')
      // the process name in the second field can hold spaces and parentheses
      const [, , pgrp, , , tpgid] = stat.slice(stat.lastIndexOf(')') + 2).split(' ')

      // without a controlling terminal there is no job control to stop the process
      return pgrp === tpgid || tpgid === '-1'
    } catch {
      // there is no /proc on this platform, so do not look for it on every frame
      this.proc = false

      return undefined
    }
  }

  private stty(...args: string[]): string | undefined {
    const { status, stdout } = spawnSync('stty', args, {
      stdio: ['inherit', 'pipe', 'ignore'],
      encoding: 'utf-8',
      timeout: TERMINAL_POLL_INTERVAL,
      killSignal: 'SIGKILL'
    })

    return status === 0 ? stdout.trim() : undefined
  }

  // a SIGTSTP listener keeps the process from stopping, and the shell may already have written below the live region, so it stays as it is
  private readonly onStop = (): void => {
    this.updater?.done()
    this.drawn = undefined
    this.stopped = Date.now()
    this.stream.stdout.write(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)

    process.off('SIGTSTP', this.onStop)
    process.on('SIGCONT', this.onContinue)
    process.kill(process.pid, 'SIGTSTP')
  }

  private readonly onContinue = (): void => {
    this.resume()
  }

  private resume(): void {
    if (!this.foreground()) {
      this.stopped = Date.now()

      return
    }

    this.stopped = undefined
    process.off('SIGCONT', this.onContinue)
    // a resume through the poll in draw() never went through onStop, so remove the listener first to never register it twice
    process.off('SIGTSTP', this.onStop)
    process.on('SIGTSTP', this.onStop)

    if (this.stty('-echo') === undefined) {
      this.failed = true
    }

    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)

    this.batch(() => this.draw())
  }
}
