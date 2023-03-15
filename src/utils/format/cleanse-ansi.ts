import { BELL_REGEX, CLEAR_LINE_REGEX } from '@constants/clearline-regex.constants'

export function cleanseAnsiOutput (chunk: string): string {
  return String(chunk).replace(new RegExp(CLEAR_LINE_REGEX, 'gmi'), '').replace(new RegExp(BELL_REGEX, 'gmi'), '')
}
