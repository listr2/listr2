/** Generic events that occur throughout the whole listr task set. */
export enum ListrEventType {
  SHOULD_REFRESH_RENDER = 'SHOUD_REFRESH_RENDER'
}

/** Internal events that occur inside listr task. */
export enum ListrTaskEventType {
  TITLE = 'TITLE',
  STATE = 'STATE',
  ENABLED = 'ENABLED',
  SUBTASK = 'SUBTASK',
  DATA = 'DATA',
  MESSAGE = 'MESSAGE'
}
