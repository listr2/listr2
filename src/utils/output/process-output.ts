import { EOL } from 'os'

import { ProcessOutputHook } from './process-output-hook'

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
    Object.values(this.stream).forEach((stream) => stream.hijack())
  }

  public release (): void {
    Object.values(this.stream).forEach((stream) => stream.release())
  }

  public writeToStdout (buffer: string): boolean {
    return this.stream.stdout.write(buffer + EOL)
  }

  public writeToStderr (buffer: string): boolean {
    return this.stream.stderr.write(buffer + EOL)
  }
}
