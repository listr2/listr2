/**
 * Tests to see if the object is an RxJS {@link Observable}
 * @param obj the object to test
 */
export function isObservable<T> (obj: any): obj is { subscribe: T, next: any, error: any, complete: any } {
  return !!obj && typeof obj.lift === 'function' && typeof obj.subscribe === 'function'
}
