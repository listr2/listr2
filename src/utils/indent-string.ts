export function indentString (string: string, count: number): string {
  return string.replace(/^(?!\s*$)/gm, ' '.repeat(count))
}