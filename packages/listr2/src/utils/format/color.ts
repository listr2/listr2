import { inspect, styleText } from 'node:util'
import type { InspectColor } from 'node:util'

/**
 * Color palette.
 */
export const color = Object.fromEntries(Object.keys(inspect.colors).map((color) => [color, (text) => styleText(color as InspectColor, String(text))])) as {
  [K in InspectColor]: (text: string | number) => string
}
