import { StringDecoder } from 'string_decoder'

import type { ProcessOutputBufferEntry, ProcessOutputBufferOptions } from './process-output-buffer.interface'

export class ProcessOutputBuffer {
  private buffer: ProcessOutputBufferEntry[] = []
  private readonly decoder = new StringDecoder()

  constructor(private readonly options?: ProcessOutputBufferOptions) {}

  get all(): ProcessOutputBufferEntry[] {
    return this.buffer
  }

  get last(): ProcessOutputBufferEntry {
    return this.buffer.at(-1)
  }

  get length(): number {
    return this.buffer.length
  }

  public write(data: Uint8Array | string, ...args: [(string | undefined)?, ((err?: Error) => void)?] | [((err?: Error) => void)?]): ReturnType<NodeJS.WriteStream['write']> {
    const callback = args[args.length - 1]

    this.buffer.push({
      time: Date.now(),
      stream: this.options?.stream,
      entry: this.decoder.write(typeof data === 'string' ? Buffer.from(data, typeof args[0] === 'string' ? (args[0] as BufferEncoding) : undefined) : Buffer.from(data))
    })

    if (this.options?.limit) {
      this.buffer = this.buffer.slice(-this.options.limit)
    }

    if (typeof callback === 'function') {
      callback()
    }

    return true
  }

  public reset(): void {
    this.buffer = []
  }
}
