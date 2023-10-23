import { Writable } from 'stream'

/* istanbul ignore next */
export function createWritable (cb: (chunk: string) => void): NodeJS.WritableStream {
  const writable = new Writable()

  writable.write = (chunk: Buffer | string): boolean => {
    cb(chunk.toString())

    return true
  }

  return writable
}
