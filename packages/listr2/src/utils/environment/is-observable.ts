import type { ObservableLike } from '@interfaces'

/**
 * Tests to see if the object is an RxJS {@link Observable}
 * @param obj the object to test
 */
export function isObservable<T>(obj: any): obj is ObservableLike<T> {
  return !!obj && typeof obj === 'object' && typeof obj.subscribe === 'function'
}
