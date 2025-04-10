// adapted from https://github.com/fabiospampinato/promise-concurrency-limiter
// with MIT license, since it is again ESM only
// we needed to stop on the first failing case unlike the original
export class Concurrency {
  promise: Promise<void>

  private resolve: () => void
  private reject: (error: Error) => void
  private concurrency: number
  private count: number
  private queue: Set<() => void>

  constructor (options: { concurrency: number }) {
    this.concurrency = options.concurrency
    this.count = 0
    this.queue = new Set()
    this.initPromise()
  }

  public add<T>(fn: () => Promise<T>): Promise<T> {
    if (this.count < this.concurrency) {
      return this.run(fn)
    }

    return new Promise<T>((resolve) => {
      const callback = (): void => resolve(this.run(fn))

      this.queue.add(callback)
    })
  }

  private initPromise (): void {
    const { promise, resolve, reject } = this.withResolvers<void>()

    this.promise = promise.finally(() => this.initPromise())
    this.resolve = resolve
    this.reject = reject
  }

  private flush (): void {
    for (const callback of this.queue) {
      if (this.count >= this.concurrency) {
        break
      }

      this.queue.delete(callback)

      callback()
    }
  }

  private run<T>(fn: () => Promise<T>): Promise<T> {
    this.count++

    const promise = fn()

    const cleanup = (): void => {
      this.count--

      this.flush()

      if (this.count === 0) {
        this.resolve()
      }
    }

    promise.then(cleanup, (error) => {
      this.queue.clear()
      this.reject(error)
    })

    return promise
  }

  private withResolvers<T>(): { promise: Promise<T>, resolve: (value: T) => void, reject: (error: Error) => void } {
    let resolve: (value: T) => void
    let reject: (error: Error) => void

    const promise = new Promise<T>((res, rej) => {
      resolve = res
      reject = rej
    })

    return {
      promise,
      resolve: resolve!,
      reject: reject!
    }
  }
}
