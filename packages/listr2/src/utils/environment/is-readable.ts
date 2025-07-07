import type { ReadableLike } from '@interfaces'

/**
 * Tests to see if the object is an Readable or NodeJS.ReadableStream {@link Readable, NodeJS.ReadableStream}
 * @param obj the object to test
 */
export function isReadable(obj: any): obj is ReadableLike {
  return !!obj && typeof obj === 'object' && obj.readable === true && typeof obj.read === 'function' && typeof obj.on === 'function'
}
