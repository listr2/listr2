import { StringDecoder } from 'string_decoder'

// taken from https://github.com/keindev/stdout-update/blob/main/src/Hook.ts
// with all credits to keindev, wish i could integrate the stdout-update
export class ProcessOutputStream {
  private readonly method: NodeJS.WriteStream['write']
  private readonly decoder = new StringDecoder()

  constructor(private stream: NodeJS.WriteStream) {
    this.method = stream.write
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

  /** Passes the writes to the stream to `onWrite` as text instead of writing them, until `release()`. */
  public hijack(onWrite: (entry: string) => void): void {
    this.stream.write = (data: Uint8Array | string, ...args: [(string | undefined)?, ((err?: Error) => void)?] | [((err?: Error) => void)?]): boolean => {
      const callback = args[args.length - 1]

      onWrite(this.decoder.write(typeof data === 'string' ? Buffer.from(data, typeof args[0] === 'string' ? (args[0] as BufferEncoding) : undefined) : Buffer.from(data)))

      if (typeof callback === 'function') {
        callback()
      }

      return true
    }
  }

  public release(): void {
    this.stream.write = this.method
  }

  public write(...args: Parameters<NodeJS.WriteStream['write']>): ReturnType<NodeJS.WriteStream['write']> {
    return this.method.apply(this.stream, args)
  }
}
