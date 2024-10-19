import { EOL } from 'os'

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

  constructor(
    stdout?: NodeJS.WriteStream,
    stderr?: NodeJS.WriteStream,
    private readonly options?: ProcessOutputOptions
  ) {
    this.stream = {
      stdout: new ProcessOutputStream(stdout ?? process.stdout),
      stderr: new ProcessOutputStream(stderr ?? process.stderr)
    }

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
    Object.values(this.stream).forEach((stream) => stream.hijack())
    this.active = true
  }

  public release(): void {
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

    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW)

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
}
