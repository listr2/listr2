import type { TestRenderer } from './renderer'
import type { TestRendererSerializerTaskKeys } from './serializer.interface'
import type { ListrTaskState } from '@constants'
import type { ListrTaskMessage } from '@interfaces'
import type { Task } from '@lib'
import type { LoggerRendererOptions } from '@utils'

export type ListrTestRendererTask = Task<any, typeof TestRenderer>

export interface ListrTestRendererOptions extends LoggerRendererOptions {
  /**
   * Log subtasks.
   *
   * @defaultValue `true`
   */
  subtasks?: boolean
  /**
   * Log given task states.
   */
  state?: ListrTaskState[]
  /**
   * Log output.
   */
  output?: boolean
  /**
   * Log prompt.
   */
  prompt?: boolean
  /**
   * Log title changes.
   */
  title?: boolean
  /**
   * Log given messages.
   */
  messages?: (keyof ListrTaskMessage)[]
  /**
   * Log given messages to stderr instead of stdout.
   */
  messagesToStderr?: (keyof ListrTaskMessage)[]
  /**
   * Serialize the given properties of the task inside the logs.
   */
  task?: false | TestRendererSerializerTaskKeys[]
}

export type ListrTestRendererTaskOptions = never
