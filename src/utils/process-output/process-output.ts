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
  private active: boolean

  constructor (stdout?: NodeJS.WriteStream, stderr?: NodeJS.WriteStream, private readonly options?: ProcessOutputOptions) {
    this.stream = {
      stdout: new ProcessOutputStream(stdout ?? process.stdout),
      stderr: new ProcessOutputStream(stderr ?? process.stderr)
    }

    this.options = {
      dump: [ 'stdout', 'stderr' ],
      leaveEmptyLine: true,
      ...options
    }
  }

  get stdout (): NodeJS.WriteStream {
    return this.stream.stdout.out
  }

  get stderr (): NodeJS.WriteStream {
    return this.stream.stderr.out
  }

  public hijack (): void {
    if (this.active) {
      throw new Error('ProcessOutput has been already hijacked!')
    }

    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)
    Object.values(this.stream).forEach((stream) => stream.hijack())
    this.active = true
  }

  public release (): void {
    const output = Object.entries(this.stream)
      .filter(([ name ]) => this.options.dump.includes(name as keyof ProcessOutputStreamMap))
      .map(([ , stream ]) => stream)
      .map((stream) => stream.release())
      .flat()
      .sort((a, b) => a.time - b.time)
      .map((message) => {
        return {
          ...message,
          entry: cleanseAnsi(message.entry)
        }
      })

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

  public toStdout (buffer: string, eol = true): boolean {
    if (eol) {
      buffer = buffer + EOL
    }

    return this.stream.stdout.write(buffer)
  }

  public toStderr (buffer: string, eol = true): boolean {
    if (eol) {
      buffer = buffer + EOL
    }

    return this.stream.stderr.write(buffer)
  }
}
