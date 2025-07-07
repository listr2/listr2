import { ProcessOutputBuffer } from './process-output-buffer'
import type { ProcessOutputBufferEntry } from '@utils'

// taken from https://github.com/keindev/stdout-update/blob/main/src/Hook.ts
// with all credits to keindev, wish i could integrate the stdout-update
export class ProcessOutputStream {
  private readonly method: NodeJS.WriteStream['write']
  private readonly buffer: ProcessOutputBuffer

  constructor(private stream: NodeJS.WriteStream) {
    this.method = stream.write
    this.buffer = new ProcessOutputBuffer({ stream })
  }

  get out(): NodeJS.WriteStream {
    return Object.assign({}, this.stream, {
      write: this.write.bind(this)
    })
  }

  public hijack(): void {
    this.stream.write = this.buffer.write.bind(this.buffer)
  }

  public release(): ProcessOutputBufferEntry[] {
    this.stream.write = this.method

    const buffer = [...this.buffer.all]

    this.buffer.reset()

    return buffer
  }

  public write(...args: Parameters<NodeJS.WriteStream['write']>): ReturnType<NodeJS.WriteStream['write']> {
    return this.method.apply(this.stream, args)
  }
}
