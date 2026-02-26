import * as util from 'node:util'

/**
 * Color palette.
 */
export const color: { [k in keyof typeof util.inspect.colors]: (text: string | number) => string } = Object.fromEntries(
  Object.keys(util.inspect.colors).map((color) => [color, (text: string | number): string => util.styleText(color, String(text))])
)
