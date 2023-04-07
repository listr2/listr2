export interface ProcessOutputBufferEntry {
  time: number
  entry: string
  stream?: NodeJS.WriteStream
}

export interface ProcessOutputBufferOptions {
  limit?: number
  stream?: NodeJS.WriteStream
}
