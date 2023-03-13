/** Available task states. */
export enum ListrTaskState {
  UNINITIALIZED = 'UNINITIALIZED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  ROLLING_BACK = 'ROLLING_BACK',
  ROLLED_BACK = 'ROLLED_BACK',
  RETRY = 'RETRY'
}