import type { ProcessOutput } from './process-output'
import type { ProcessOutputStream } from './process-output-stream'

export interface ProcessOutputRendererOptions {
  /**
   * Pass your implementation of process output class to write to stdout and stderr.
   *
   * @default 'ProcessOutput'
   * @global global option that can not be temperated with subtasks
   */
  processOutput?: ProcessOutput
}

/**
 * Customize the behavior of the ProcessOutput.
 */
export interface ProcessOutputOptions {
  /**
   * Which captured streams are written. Writes to the other streams are dropped.
   *
   * @defaultValue `[ 'stdout', 'stderr' ]`
   */
  dump?: (keyof ProcessOutputStreamMap)[]
}

export interface ProcessOutputCapture {
  name: keyof ProcessOutputStreamMap
  entry: string
}

export type ProcessOutputStreamMap = Record<'stdout' | 'stderr', ProcessOutputStream>
