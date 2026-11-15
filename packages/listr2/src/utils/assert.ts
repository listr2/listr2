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
