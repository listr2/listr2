/**
 * Tasks can be in various states during the execution.
 *
 * Whenever a state change occurs, the task will emit a {@link module:listr2.ListrTaskEventType.STATE} with the appropriate state.
 */
export enum ListrTaskState {
  /** Task has not started yet, waiting for pick-up. */
  WAITING = 'WAITING',
  /** Task has started. */
  STARTED = 'STARTED',
  /** Task has been completed. */
  COMPLETED = 'COMPLETED',
  /** Task has failed. */
  FAILED = 'FAILED',
  /** Task has been skipped. */
  SKIPPED = 'SKIPPED',
  /** Task is currently trying to rollback. */
  ROLLING_BACK = 'ROLLING_BACK',
  /** Task has rolledback successfully after failing. */
  ROLLED_BACK = 'ROLLED_BACK',
  /** Task is currently retrying. */
  RETRY = 'RETRY',
  /** Task is currently paused. */
  PAUSED = 'PAUSED',
  /** Task is currently trying to process a prompt. */
  PROMPT = 'PROMPT',
  /** Task has successfully processed the prompt. */
  PROMPT_COMPLETED = 'PROMPT_COMPLETED'
}
