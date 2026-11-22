import { spawnSync } from 'child_process'

import { STTY_TIMEOUT } from './process-input-lock.constants'
import type { ProcessOutput } from './process-output'
import { ProcessOutputEventType } from '#constants'

/**
 * Hides keyboard input while a renderer draws on a hijacked `ProcessOutput`.
 *
 * @see {@link https://listr2.kilic.dev/renderer/default.html#keyboard-input}
 */
export class ProcessInputLock {
  private mode?: string
  private failed = false

  constructor(private readonly output: ProcessOutput) {}

  /** Hides keyboard input until `unlock()`, the release of the output, the next stop of the job, or the exit of the process. */
  public lock(): void {
    if (this.mode !== undefined || this.failed || !this.output.hijacked || this.output.suspended) {
      return
    }

    if (process.platform === 'win32' || !process.stdin.isTTY || !this.output.stdout.isTTY) {
      return
    }

    const mode = this.stty('-g')

    if (!mode || this.stty('-echo') === undefined) {
      this.failed = true

      return
    }

    this.mode = mode
    this.output.events.on(ProcessOutputEventType.STOP, this.drop)
    this.output.events.on(ProcessOutputEventType.CONTINUE, this.drop)
    this.output.events.on(ProcessOutputEventType.EXIT, this.unlock)
    this.output.events.on(ProcessOutputEventType.RELEASE, this.unlock)
  }

  /** Shows keyboard input again. */
  public readonly unlock = (): void => {
    if (this.mode === undefined) {
      return
    }

    this.stty(this.mode)
    this.forget()
  }

  // the shell takes the terminal back in its own mode, so the lock ends without stty
  private readonly drop = (): void => {
    this.forget()
  }

  private forget(): void {
    this.mode = undefined
    this.output.events.off(ProcessOutputEventType.STOP, this.drop)
    this.output.events.off(ProcessOutputEventType.CONTINUE, this.drop)
    this.output.events.off(ProcessOutputEventType.EXIT, this.unlock)
    this.output.events.off(ProcessOutputEventType.RELEASE, this.unlock)
  }

  private stty(...args: string[]): string | undefined {
    const { status, stdout } = spawnSync('stty', args, {
      stdio: ['inherit', 'pipe', 'ignore'],
      encoding: 'utf-8',
      timeout: STTY_TIMEOUT,
      killSignal: 'SIGKILL'
    })

    return status === 0 ? stdout.trim() : undefined
  }
}
