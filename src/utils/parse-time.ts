export function parseTaskTime (duration: number): string | undefined {
  const seconds = Math.floor(duration / 1000)
  const minutes = Math.floor(seconds / 60)

  let parsedTime: string | undefined
  if (seconds === 0 && minutes === 0) {
    parsedTime = `0.${Math.floor(duration / 100)}s`
  }

  if (seconds > 0) {
    parsedTime = `${seconds % 60}s`
  }

  if (minutes > 0) {
    parsedTime = `${minutes}m${parsedTime}`
  }

  return parsedTime
}
