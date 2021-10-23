import { serialize, deserialize } from 'v8'

/**
 * Deep clones a object in the most easiest manner.
 */
export function cloneObject<T extends Record<PropertyKey, any>> (obj: T): T {
  return deserialize(serialize(obj))
}
