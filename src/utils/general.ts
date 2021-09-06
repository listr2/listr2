/**
 * Deep clones a object in the most easiest manner.
 */
export function cloneObject<T extends Record<PropertyKey, any>> (obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
