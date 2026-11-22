/**
 * Events of the ProcessOutput while it is hijacked.
 *
 * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
 */
export enum ProcessOutputEventType {
  /** The terminal changed its size, so what is drawn for it may not fit anymore. */
  RESIZE = 'RESIZE',
  /** The job is about to stop, and the shell takes the terminal back. */
  STOP = 'STOP',
  /** The job continues after a stop. */
  CONTINUE = 'CONTINUE',
  /** The process exits while the output is hijacked. */
  EXIT = 'EXIT',
  /** The output is about to be released. */
  RELEASE = 'RELEASE'
}
