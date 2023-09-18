export type Unionize<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T]: T[P]
}[keyof T]
