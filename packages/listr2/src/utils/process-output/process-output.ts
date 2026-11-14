import { spawnSync } from 'child_process'
import { readFileSync } from 'fs'
import { createLogUpdate } from 'log-update'
import { EOL } from 'os'
import { onExit } from 'signal-exit'
import wrapAnsi from 'wrap-ansi'

import { ProcessOutputStream } from './process-output-stream'
import type { ProcessOutputOptions, ProcessOutputStreamMap } from './process-output.interface'
import { ANSI_ESCAPE_CODES } from '@constants'
import { cleanseAnsi } from '@utils'

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
  private lines: string[] = []
  private input?: string
  private stopped?: number
  private background?: number
  private failed = false
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
      leaveEmptyLine: true,
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
    Object.values(this.stream).forEach((stream) => stream.hijack(() => this.schedule()))
    this.active = true
  }

  /**
   * Redraws the live region at the bottom of `stdout`.
   *
   * Once a live region is drawn, captured writes are written above it as they arrive instead of on `release()`.
   */
  public update(live: string): void {
    this.live = live

    this.draw()
  }

  /** Writes the text above the live region, where it stays, and redraws the live region below it. */
  public persist(text: string, live = this.live): void {
    this.live = live

    if (text !== '') {
      this.yieldTerminal()
      this.start().persist(text)
      this.lines = []
    }

    this.draw()
  }

  public clear(): void {
    this.live = ''

    this.draw()
  }

  /**
   * Stops the terminal from echoing keyboard input until `unlockInput()` or `release()`, while the output is hijacked.
   *
   * @see {@link https://listr2.kilic.dev/renderer/default.html#keyboard-input}
   */
  public lockInput(): void {
    if (!this.active || this.input !== undefined || this.failed || process.platform === 'win32' || !process.stdin.isTTY || !this.stdout.isTTY) {
      return
    }

    // a job in the background draws like any other, and checks now and then whether it got the terminal
    if (this.background !== undefined && Date.now() - this.background < 1000) {
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

  public release(): void {
    if (this.updater) {
      this.stdout.off('resize', this.onResize)
      this.updater.done()
      this.updater = undefined
    }

    this.live = ''
    this.lines = []

    // not the most performant of functions, since creating a lots of memory
    // maybe refactor this sometime, but shouldnt be concern since we do not expect
    // huge number of outputs being buffered
    const output = Object.entries(this.stream)
      .map(([name, stream]) => ({ name, buffer: stream.release() }))
      .filter((output) => this.options.dump.includes(output.name as keyof ProcessOutputStreamMap))
      .flatMap((output) => output.buffer)
      .sort((a, b) => a.time - b.time)
      .map((message) => {
        return {
          ...message,
          entry: cleanseAnsi(message.entry)
        }
      })
      .filter((message) => message.entry)

    if (output.length > 0) {
      if (this.options.leaveEmptyLine) {
        this.stdout.write(EOL)
      }

      output.forEach((message) => {
        const stream = message.stream ?? this.stdout

        stream.write(message.entry + EOL)
      })
    }

    this.restore()
    this.removeExitHook?.()
    this.removeExitHook = undefined
    this.failed = false

    this.active = false
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
      this.updater = createLogUpdate(this.stdout, { showCursor: true })
      this.stdout.on('resize', this.onResize)
    }

    return this.updater
  }

  private draw(): void {
    this.yieldTerminal()

    // `fg` sends no SIGCONT to a job that already runs in the background, so check for the terminal now and then
    if (this.stopped !== undefined) {
      if (Date.now() - this.stopped >= 1000) {
        this.resume()
      }

      return
    }

    if (this.live === '') {
      this.updater?.clear()
    } else {
      this.start()(this.live)
    }

    this.lines = this.layout(this.live)
  }

  private readonly onResize = (): void => {
    if (this.lines.length === 0) {
      return
    }

    const columns = this.stdout.columns
    // log-update erases with the line count of the last frame, which is stale once the terminal reflowed it
    const height = this.reflows() ? this.lines.reduce((height, line) => height + this.wrap(line, columns).length, 0) : this.lines.length

    this.stream.stdout.write(ANSI_ESCAPE_CODES.ERASE_LINE + (ANSI_ESCAPE_CODES.CURSOR_UP + ANSI_ESCAPE_CODES.ERASE_LINE).repeat(height) + ANSI_ESCAPE_CODES.CURSOR_LEFT)
    this.updater.done()

    this.draw()
  }

  private layout(text: string): string[] {
    if (text === '') {
      return []
    }

    const lines = this.wrap(text.replace(/\n$/, ''), this.stdout.columns ?? 80)
    const rows = this.stdout.rows ?? 24

    return lines.slice(Math.max(lines.length - rows + 1, 0))
  }

  private wrap(text: string, columns: number): string[] {
    return wrapAnsi(text, columns, {
      hard: true, trim: false, wordWrap: false
    }).split('\n')
  }

  private reflows(): boolean {
    // tmux reflows, and its panes inherit the environment of the terminal it was started from
    if (process.env.TMUX) {
      return true
    }

    const term = process.env.TERM ?? ''

    return !(process.env.XTERM_VERSION || process.env.STY || term === 'linux' || /^(rxvt|st|screen)/.test(term))
  }

  private schedule(): void {
    if (this.updater) {
      queueMicrotask(() => this.flush())
    }
  }

  private flush(): void {
    if (!this.updater || !this.active) {
      return
    }

    const entries = (Object.keys(this.stream) as (keyof ProcessOutputStreamMap)[])
      .flatMap((name) =>
        this.stream[name].take().map((message) => ({
          name,
          time: message.time,
          entry: cleanseAnsi(message.entry)
        }))
      )
      .filter((message) => message.entry && this.options.dump.includes(message.name))
      .sort((a, b) => a.time - b.time)

    if (entries.length === 0) {
      return
    }

    if (this.shared || entries.every((message) => message.name === 'stdout')) {
      this.persist(entries.map((message) => message.entry).join(EOL))

      return
    }

    this.updater.clear()
    entries.forEach((message) => this.stream[message.name].write(message.entry + EOL))

    this.draw()
  }

  private restore(): void {
    this.unlockInput()
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW)
  }

  // under a wrapper such as pnpm, the shell takes the terminal back and writes below the live region before this process handles SIGTSTP
  private yieldTerminal(): void {
    if (this.input === undefined || this.stopped !== undefined || this.owns() !== false) {
      return
    }

    this.updater?.done()
    this.lines = []
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
    try {
      const stat = readFileSync('/proc/self/stat', 'utf-8')
      // the process name in the second field can hold spaces and parentheses
      const [, , pgrp, , , tpgid] = stat.slice(stat.lastIndexOf(')') + 2).split(' ')

      // without a controlling terminal there is no job control to stop the process
      return pgrp === tpgid || tpgid === '-1'
    } catch {
      return undefined
    }
  }

  private stty(...args: string[]): string | undefined {
    const { status, stdout } = spawnSync('stty', args, {
      stdio: ['inherit', 'pipe', 'ignore'],
      encoding: 'utf-8',
      timeout: 1000,
      killSignal: 'SIGKILL'
    })

    return status === 0 ? stdout.trim() : undefined
  }

  // a SIGTSTP listener keeps the process from stopping, and the shell may already have written below the live region, so it stays as it is
  private readonly onStop = (): void => {
    this.updater?.done()
    this.lines = []
    this.stopped = Date.now()
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW)

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
    process.off('SIGTSTP', this.onStop)
    process.on('SIGTSTP', this.onStop)
    this.stty('-echo')
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)

    this.draw()
  }
}
