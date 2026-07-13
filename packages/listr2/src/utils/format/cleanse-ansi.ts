import { CLEAR_LINE_REGEX } from './cleanse-ansi.constants'

export function cleanseAnsi(chunk: string): string {
  return String(chunk).replace(new RegExp(CLEAR_LINE_REGEX, 'gmi'), '').trim()
}
