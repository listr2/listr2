import { EOL } from 'os'

export class ProcessOutput {
  private readonly stream: {
    stdout: NodeJS.WriteStream
    stderr: NodeJS.WriteStream
  }

  constructor (stdout: NodeJS.WriteStream = process.stdout, stderr: NodeJS.WriteStream = process.stderr) {
    this.stream = {
      stdout,
      stderr
    }
  }

  public stdout (buffer: string): boolean {
    return this.stream.stdout.write(buffer + EOL)
  }

  public stderr (buffer: string): boolean {
    return this.stream.stderr.write(buffer + EOL)
  }
}
