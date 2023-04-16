/**
 * Internal events that are fired from the Task.
 *
 * @see {@link https://listr2.kilic.dev/task/events.html}
 */
export enum ListrTaskEventType {
  /** Title has changed for the current Task. */
  TITLE = 'TITLE',
  /**
   * State has changed for the current Task.
   *
   * @see {@link module:listr2.ListrTaskState}
   */
  STATE = 'STATE',
  /** The current Task has been marked as enabled. */
  ENABLED = 'ENABLED',
  /** The current Task is currently processing subtasks. */
  SUBTASK = 'SUBTASK',
  /** The current Task is now processing a prompt. */
  PROMPT = 'PROMPT',
  /** The current Task is now dumping output. */
  OUTPUT = 'OUTPUT',
  /**
   * The current Task is now dumping a message.
   *
   * @see {module:Listr2.ListrTaskMessage}
   */
  MESSAGE = 'MESSAGE',
  /** The current Task is closed and no further action in expected. */
  CLOSED = 'CLOSED'
}
