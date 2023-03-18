import { EOL } from 'os'

import { ProcessOutputBuffer } from './process-output-buffer'
import { cleanseAnsi } from '@utils'

// taken from https://github.com/keindev/stdout-update/blob/main/src/Hook.ts
// with all credits to keindev, wish i could integrate the stdout-update
export class ProcessOutputHook {
  private readonly method: NodeJS.WriteStream['write']
  private buffer = new ProcessOutputBuffer()

  constructor (private stream: NodeJS.WriteStream) {
    this.method = stream.write
  }

  get out (): NodeJS.WriteStream {
    return Object.assign({}, this.stream, {
      write: this.write.bind(this)
    })
  }

  public hijack (): void {
    this.stream.write = this.buffer.write.bind(this.buffer)
  }

  public release (): void {
    this.stream.write = this.method

    const buffer = this.buffer.all.map((message) => cleanseAnsi(message)).filter(Boolean)

    if (buffer.length > 0) {
      this.write(EOL)

      buffer.forEach((message) => this.write(message), this)
    }

    this.buffer.reset()
  }

  public write (...args: Parameters<NodeJS.WriteStream['write']>): ReturnType<NodeJS.WriteStream['write']> {
    return this.method.apply(this.stream, args)
  }
}
