import { StringDecoder } from 'string_decoder'

export class ProcessOutputBuffer {
  private buffer: string[] = []
  private readonly decoder = new StringDecoder()

  get all (): string[] {
    return this.buffer
  }

  get last (): string {
    return this.buffer.at(-1)
  }

  get length (): number {
    return this.buffer.length
  }

  public write (data: Uint8Array | string, ...args: [(string | undefined)?, ((err?: Error) => void)?] | [((err?: Error) => void)?]): ReturnType<NodeJS.WriteStream['write']> {
    const callback = args[args.length - 1]

    this.buffer.push(this.decoder.write(typeof data === 'string' ? Buffer.from(data, typeof args[0] === 'string' ? (args[0] as BufferEncoding) : undefined) : Buffer.from(data)))

    if (typeof callback === 'function') {
      callback()
    }

    return true
  }

  public reset (): void {
    this.buffer = []
  }
}
