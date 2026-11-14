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
      this.start().persist(text)
      this.lines = []
    }

    this.draw()
  }

  public clear(): void {
    this.live = ''

    this.draw()
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
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW)
  }
}
