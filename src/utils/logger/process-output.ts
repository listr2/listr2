import { EOL } from 'os'

export class ProcessOutput {
  public stdout (buffer: string): boolean {
    return process.stdout.write(buffer + EOL)
  }

  public stderr (buffer: string): boolean {
    return process.stderr.write(buffer + EOL)
  }
}
