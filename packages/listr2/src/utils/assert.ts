/**
 * This function asserts the given value as a function or itself.
 * If the value itself is a function it will evaluate it with the passed in arguments,
 * elsewise it will directly return itself.
 */
export function assertFunctionOrSelf<T>(
  functionOrSelf: T,
  ...args: T extends (...args: any[]) => any ? Parameters<T> : never
): T extends (...args: any[]) => any ? ReturnType<T> : T {
  if (typeof functionOrSelf === 'function') {
    return functionOrSelf(...args)
  } else {
    return functionOrSelf as any
  }
}

/**
 * Throws a `RangeError` that names the option and its value, when the value is not one that the option accepts.
 */
export function assertOption(name: string, value: unknown, valid: boolean, expected: string): void {
  if (!valid) {
    throw new RangeError(`The ${name} option ${expected}, but it is ${typeof value === 'string' ? `'${value}'` : String(value)}.`)
  }
}

/**
 * Throws a `RangeError` for a `logger` that is not a `ListrLogger`, or a `timer`, `timestamp` or `pausedTimer` that is not a preset, which the renderers that log share.
 */
export function assertLoggerOptions(options: Partial<Record<'logger' | 'timer' | 'timestamp' | 'pausedTimer', any>>): void {
  if (options.logger !== undefined) {
    assertOption('logger', options.logger, typeof options.logger?.options === 'object' && typeof options.logger?.log === 'function', 'must be a ListrLogger')
  }

  for (const name of ['timer', 'timestamp', 'pausedTimer'] as const) {
    const value = options[name]

    if (value !== undefined) {
      assertOption(name, value, typeof value === 'object' && value !== null && 'field' in value, 'must be an object with a field')
    }
  }
}
