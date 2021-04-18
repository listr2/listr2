import { ListrRendererFactory } from '@root/interfaces'
import { Task } from '@root/lib/task'

/**
 * A user-defined type guard that tests a value that _shouldn't_ be undefined,
 * throwing at runtime if it _is_ found to be undefined.
 *
 * @param value Value to test
 * @param message description of the value, to be presented in the error message if the assertion fails
 */
export function assertIsDefined<T> (value: T | undefined, message: string): asserts value is T {
  if (!isDefined(value)) throw new Error(`Assertion error: undefined value found\n${message}`)
}

/**
 * A user-defined type guard that checks whether a value is undefined.
 *
 * @param value Value to test
 */
export function isDefined<T> (value: T | undefined): value is T {
  return typeof value !== 'undefined'
}

/**
 * A user-defined type guard for checking that a task has a title
 * @param task task to test
 * @returns true if the task has a title, false otherwise
 */
export function taskHasTitle<C, R extends ListrRendererFactory> (task: Task<C, R>): task is Task<C, R> & { title: string } {
  return task.hasTitle()
}

/**
 * A user-defined type guard for checking that a task has subtasks
 * @param task task to test
 * @returns true if the task has subtasks, false otherwise
 */
export function taskHasSubtasks<C, R extends ListrRendererFactory> (task: Task<C, R>): task is Task<C, R> & Required<Pick<Task<C, R>, 'subtasks'>> {
  return task.hasSubtasks()
}
