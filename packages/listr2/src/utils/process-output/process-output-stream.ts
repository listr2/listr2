import { ProcessOutputBuffer } from './process-output-buffer'
import type { ProcessOutputBufferEntry } from '#utils'

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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    return new Proxy(this.stream, {
      get(target, prop, receiver): any {
        if (prop === 'write') {
          return self.write.bind(self)
        }

        return Reflect.get(target, prop, receiver)
      }
    })
  }

  /** Captures the writes to the stream in a buffer, and calls `onWrite` after each of them. */
  public hijack(onWrite?: () => void): void {
    this.stream.write = (...args: Parameters<ProcessOutputBuffer['write']>): boolean => {
      // the arguments are a union of tuples, which neither a spread nor a typed apply can pass on
      const result: boolean = Reflect.apply(this.buffer.write, this.buffer, args)

      onWrite?.()

      return result
    }
  }

  /** Returns the captured writes and empties the buffer, while the stream stays hijacked. */
  public take(): ProcessOutputBufferEntry[] {
    const buffer = [...this.buffer.all]

    this.buffer.reset()

    return buffer
  }

  public release(): ProcessOutputBufferEntry[] {
    this.stream.write = this.method

    return this.take()
  }

  public write(...args: Parameters<NodeJS.WriteStream['write']>): ReturnType<NodeJS.WriteStream['write']> {
    return this.method.apply(this.stream, args)
  }
}
