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
   * After the `ProcessOutput.release()` which streams should be dumped.
   *
   * @defaultValue `[ 'stdout', 'stderr' ]`
   */
  dump?: (keyof ProcessOutputStreamMap)[]
  /**
   * After the `ProcessOutput.release()` whether to leave empty line or not.
   *
   * @defaultValue `true`
   */
  leaveEmptyLine?: boolean
}

export type ProcessOutputStreamMap = Record<'stdout' | 'stderr', ProcessOutputStream>
