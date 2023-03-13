import type { ProcessOutput } from './process-output'

export interface ProcessOutputRendererOptions {
  /**
   * Pass your implementation of process output class to write to stdout and stderr.
   *
   * @default 'ProcessOutput'
   * @global global option that can not be temperated with subtasks
   */
  processOutput?: ProcessOutput
}
