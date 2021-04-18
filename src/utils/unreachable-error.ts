/**
 * An error subclass used to indicate that certain code branches
 * should never be entered. This can be used with conditionals
 * and case/switch control flow, to create _exhaustive switches_
 *
 * @example
 * ```ts
 * const x = 4 as string | number
 *
 * if (typeof x === 'string') {
 *    // handle string case
 * } else if (typeof x === 'number') {
 *    // handle number case
 * } else {
 *   // should only compile if `x` is of type `never`
 *   throw new UnreachableError(x, 'x should have been a string or a number')
 * }
 * ```
 */
export default class UnreachableError extends Error {
  constructor (_nvr: never, message: string) {
    super(`Code that was thought to be unreachable has been reached. This is almost certainly a bug\ndetails: ${message}`)
  }
}

