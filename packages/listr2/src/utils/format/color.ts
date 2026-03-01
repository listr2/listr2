import { inspect, styleText } from 'node:util'
import type { InspectColor } from 'node:util'

/**
 * Color palette.
 */
export const color = Object.fromEntries(
  Object.keys(inspect.colors).map((color) => [color, (text: string | number): string => styleText(color as InspectColor, String(text))])
) as Record<InspectColor, (text: string | number) => string>
