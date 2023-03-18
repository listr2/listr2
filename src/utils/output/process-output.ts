import { EOL } from 'os'

import { ProcessOutputHook } from './process-output-hook'
import { ANSI_ESCAPE_CODES } from '@constants/ansi-escape-codes.constants'

export class ProcessOutput {
  public readonly stream: {
    stdout: ProcessOutputHook
    stderr: ProcessOutputHook
  }

  constructor (stdout: NodeJS.WriteStream = process.stdout, stderr: NodeJS.WriteStream = process.stderr) {
    this.stream = {
      stdout: new ProcessOutputHook(stdout),
      stderr: new ProcessOutputHook(stderr)
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
    Object.values(this.stream).forEach((stream) => stream.release())
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
