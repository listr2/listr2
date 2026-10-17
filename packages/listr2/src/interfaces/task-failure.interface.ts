/**
 * Result of `task.fail()` that marks the task as failed without retrying it.
 *
 * @see {@link https://listr2.kilic.dev/task/retry.html}
 */
export class ListrTaskFailure {
  constructor(public error: Error) {}
}
