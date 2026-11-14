export function range<T>(count: number, format: (index: number) => T): T[] {
  return Array.from({ length: count }, (_, index) => format(index))
}

/** Keeps a task in-flight until an interruption races it out, without leaving a real timer alive past the test. */
export function hang(): Promise<void> {
  return new Promise<void>(() => undefined)
}
