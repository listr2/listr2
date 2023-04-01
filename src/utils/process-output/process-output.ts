import { EOL } from 'os'

import { ProcessOutputStream } from './process-output-stream'
import { ANSI_ESCAPE_CODES } from '@constants'
import { cleanseAnsi } from '@utils'

export class ProcessOutput {
  public readonly stream: {
    stdout: ProcessOutputStream
    stderr: ProcessOutputStream
  }

  constructor (stdout: NodeJS.WriteStream = process.stdout, stderr: NodeJS.WriteStream = process.stderr) {
    this.stream = {
      stdout: new ProcessOutputStream(stdout),
      stderr: new ProcessOutputStream(stderr)
    }
  }

  get stdout (): NodeJS.WriteStream {
    return this.stream.stdout.out
  }

  get stderr (): NodeJS.WriteStream {
    return this.stream.stderr.out
  }

  public hijack (): void {
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE)
    Object.values(this.stream).forEach((stream) => stream.hijack())
  }

  public release (): void {
    const output = Object.values(this.stream)
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
      this.stdout.write(EOL)

      output.forEach((message) => {
        const stream = message.stream ?? this.stdout

        stream.write(message.entry)
      })
    }

    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW)
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
