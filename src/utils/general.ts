import * as clone from 'clone'

/**
 * Deep clones a object in the most easiest manner.
 */
export function cloneObject<T extends Record<PropertyKey, any>> (obj: T): T {
  return clone(obj)
}
