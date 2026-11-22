import { EOL } from 'os'
import { onExit } from 'signal-exit'

import { LiveRegion } from './live-region'
import { ProcessOutputStream } from './process-output-stream'
import type { ProcessOutputCapture, ProcessOutputOptions, ProcessOutputStreamMap } from './process-output.interface'
import { ANSI_ESCAPE_CODES, ProcessOutputEventType } from '#constants'
import { EventManager } from '#lib'
import { cleanseAnsi } from '#utils'

/**
 * Creates a new Listr2 process-output controller.
 *
 * This is used to control the flow to `process.stdout` and `process.stderr` for all renderers.
 *
 * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
 */
export class ProcessOutput {
  // a job that was stopped once never changes the terminal mode again in this process, since stty from the background would stop it
  private static suspended = false
  public readonly stream: ProcessOutputStreamMap
  /** What happens to the terminal while the output is hijacked. */
  public readonly events = new EventManager<ProcessOutputEventType>()
  protected active: boolean
  private readonly shared: boolean
  private readonly region: LiveRegion
  private live = ''
  private drawing = false
  private captured: ProcessOutputCapture[] = []
  private stopped = false
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
    this.region = new LiveRegion(stdout ?? process.stdout)

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

  /** Whether the output is hijacked. */
  get hijacked(): boolean {
    return this.active === true
  }

  /** Whether this process was stopped while an output was hijacked, after which the terminal mode must not change anymore. */
  get suspended(): boolean {
    return ProcessOutput.suspended
  }

  /** Captures the writes to `stdout` and `stderr`, and writes them above the live region. */
  public hijack(): void {
    if (this.active) {
      throw new Error('ProcessOutput has been already hijacked!')
    }

    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)
    this.removeExitHook = onExit(this.onExit, { alwaysLast: true })

    for (const name of Object.keys(this.stream) as (keyof ProcessOutputStreamMap)[]) {
      this.stream[name].hijack((entry) => this.capture(name, entry))
    }

    this.stdout.on('resize', this.onResize)
    this.stopped = false

    // without a terminal there is no shell to give it back to, and windows has no job control
    if (process.platform !== 'win32' && this.stdout.isTTY) {
      process.on('SIGTSTP', this.onStop)
      process.on('SIGCONT', this.onContinue)
    }

    this.active = true
  }

  /** Draws the live region at the bottom of `stdout`, which captured writes are then printed above. */
  public update(live: string): void {
    this.live = live

    this.write(this.region.paint(live))
  }

  /** Writes the text above the live region, where it stays, and redraws the live region below it. */
  public persist(text: string, live = this.live): void {
    this.live = live

    this.write((text === '' ? '' : this.region.paint('') + text + (text.endsWith('\n') ? '' : '\n')) + this.region.paint(live))
  }

  /** Erases the live region. */
  public clear(): void {
    this.update('')
  }

  /** Writes what was captured and not written yet, and restores the streams. */
  public release(): void {
    this.events.emit(ProcessOutputEventType.RELEASE)
    this.stdout.off('resize', this.onResize)
    process.off('SIGTSTP', this.onStop)
    process.off('SIGCONT', this.onContinue)

    this.region.reset()
    this.live = ''
    this.drawing = false

    Object.values(this.stream).forEach((stream) => stream.release())
    this.take().forEach((message) => this.stream[message.name].write(message.entry + EOL))

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

  /** Writes a frame as one synchronized update. */
  private write(frame: string): void {
    if (frame === '') {
      return
    }

    this.drawing = true
    this.stream.stdout.write(this.stdout.isTTY ? ANSI_ESCAPE_CODES.SYNC_START + frame + ANSI_ESCAPE_CODES.SYNC_END : frame)
  }

  private capture(name: keyof ProcessOutputStreamMap, entry: string): void {
    if (!this.options.dump.includes(name)) {
      return
    }

    this.captured.push({ name, entry })

    if (this.drawing) {
      queueMicrotask(this.flush)
    }
  }

  private readonly flush = (): void => {
    if (!this.active) {
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

    this.write(this.region.paint(''))
    captured.forEach((message) => this.stream[message.name].write(message.entry + EOL))
    this.write(this.region.paint(this.live))
  }

  private take(): ProcessOutputCapture[] {
    const captured = this.captured.map((message) => ({ ...message, entry: cleanseAnsi(message.entry) })).filter((message) => message.entry)

    this.captured = []

    return captured
  }

  // a terminal left in a synchronized update shows nothing anymore, so end it in case the process stops in the middle of a frame
  private restore(): void {
    this.stream.stdout.write(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)
  }

  private readonly onExit = (): void => {
    try {
      this.events.emit(ProcessOutputEventType.EXIT)
    } finally {
      this.restore()
    }
  }

  private readonly onResize = (): void => {
    this.events.emit(ProcessOutputEventType.RESIZE)
    // nothing is left to draw when a listener drew for the new size
    this.update(this.live)
  }

  // a SIGTSTP listener keeps the process from stopping, and the shell writes below the live region, so it stays as it is
  private readonly onStop = (): void => {
    ProcessOutput.suspended = true

    try {
      this.events.emit(ProcessOutputEventType.STOP)
    } finally {
      this.region.reset()
      this.stopped = true
      this.restore()

      process.off('SIGTSTP', this.onStop)
      process.kill(process.pid, 'SIGTSTP')
    }
  }

  // also reached after a SIGSTOP, which never went through onStop
  private readonly onContinue = (): void => {
    ProcessOutput.suspended = true

    process.off('SIGTSTP', this.onStop)
    process.on('SIGTSTP', this.onStop)

    try {
      this.events.emit(ProcessOutputEventType.CONTINUE)
    } finally {
      // a frame drawn after onStop is already below the shell's output
      if (!this.stopped) {
        this.region.reset()
      }

      this.stopped = false

      // a prompt that draws no live region, as with the simple renderer, keeps its cursor
      if (this.live !== '') {
        this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)
        this.update(this.live)
      }
    }
  }
}
