/**
 * Deep clones a object in the easiest manner.
 */
export function cloneObject<T extends Record<PropertyKey, any>>(obj: T): T {
  return structuredClone(obj)
}
