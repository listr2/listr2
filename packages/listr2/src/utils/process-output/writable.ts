import { Writable } from 'stream'
import type { WriteStream } from 'tty'

/* istanbul ignore next */
export function createWritable(cb: (chunk: string) => void): NodeJS.WritableStream {
  const writable = new Writable()

  ;(writable as WriteStream).rows = Infinity
  ;(writable as WriteStream).columns = Infinity

  writable.write = (chunk: Buffer | string): boolean => {
    cb(chunk.toString())

    return true
  }

  return writable
}
