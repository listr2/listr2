import { EOL } from 'os'
import { StringDecoder } from 'string_decoder'

// taken from https://github.com/keindev/stdout-update/blob/main/src/Hook.ts
// with all credits to keindev, wish i could integrate the stdout-update
export class ProcessOutputHook {
  private readonly decoder = new StringDecoder()
  private history: string[] = []
  private readonly method: NodeJS.WriteStream['write']

  constructor (private stream: NodeJS.WriteStream) {
    this.method = stream.write
  }

  get out (): NodeJS.WriteStream {
    return Object.assign({}, this.stream, {
      write: this.write.bind(this)
    })
  }

  public hijack (): void {
    this.stream.write = (
      data: Uint8Array | string,
      ...args: [(string | undefined)?, ((err?: Error) => void)?] | [((err?: Error) => void)?]
    ): ReturnType<NodeJS.WriteStream['write']> => {
      const callback = args[args.length - 1]

      this.history.push(
        this.decoder.write(typeof data === 'string' ? Buffer.from(data, typeof args[0] === 'string' ? (args[0] as BufferEncoding) : undefined) : Buffer.from(data))
      )

      if (typeof callback === 'function') {
        callback()
      }

      return true
    }
  }

  public release (): void {
    if (this.history.length) {
      this.write(EOL)

      this.history.forEach((message) => this.write(message), this)
      this.history = []
    }

    this.stream.write = this.method
  }

  public write (...args: Parameters<NodeJS.WriteStream['write']>): ReturnType<NodeJS.WriteStream['write']> {
    return this.method.apply(this.stream, args)
  }
}
