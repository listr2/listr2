import type { TestRenderer } from './renderer'
import type { TestRendererSerializerTaskKeys } from './serializer.interface'
import type { ListrTaskState } from '@constants'
import type { ListrTaskMessage } from '@interfaces'
import type { Task } from '@lib'
import type { LoggerRendererOptions } from '@utils'

export type ListrTestRendererTask = Task<any, typeof TestRenderer>

export interface ListrTestRendererOptions extends LoggerRendererOptions {
  subtasks?: boolean
  state?: ListrTaskState[]
  output?: boolean
  prompt?: boolean
  title?: boolean
  messages?: (keyof ListrTaskMessage)[]
  messagesToStderr?: (keyof ListrTaskMessage)[]
  task?: false | TestRendererSerializerTaskKeys[]
}

export type ListrTestRendererTaskOptions = never
