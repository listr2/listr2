import type { TestRenderer } from './renderer'
import type { TestRendererSerializerTaskKeys } from './serializer.interface'
import type { ListrTaskState } from '@constants'
import type { ListrRendererTask, ListrTaskMessage } from '@interfaces'
import type { ListrLogLevels, RendererLoggerOptions } from '@utils'

export type ListrTestRendererTask = ListrRendererTask<typeof TestRenderer>

export interface ListrTestRendererOptions extends RendererLoggerOptions<ListrLogLevels> {
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
