import { format } from 'util'

export function splat (message: string, ...splat: any[]): string {
  return format(String(message), ...splat)
}
