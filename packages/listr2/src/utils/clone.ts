import rfdc from 'rfdc'

const clone = rfdc({ circles: true })

/**
 * Deep clones a object in the easiest manner.
 */
// TODO: swap this with structured clone whenever we migrate to node 18
export function cloneObject<T extends Record<PropertyKey, any>>(obj: T): T {
  return clone(obj)
}
