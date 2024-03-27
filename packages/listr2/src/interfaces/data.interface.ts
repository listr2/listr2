interface ObserverLike<T> {
  next: (value: T) => void
  complete: () => void
  error: (err: unknown) => void
}

export interface ObservableLike<T = any> {
  subscribe: (observer: ObserverLike<T>) => unknown
}

export interface ReadableLike {
  readable: boolean
  read: (size?: number) => string | Buffer
  on: (eventName: 'data' | 'error' | 'end', listener: (data: Buffer | string) => void) => unknown
}
