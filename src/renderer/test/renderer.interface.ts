import type { TestRenderer } from './renderer'
import type { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrTaskEventMap, ListrTaskMessage } from '@interfaces'
import type { Task } from '@lib'
import type { LoggerRendererOptions } from '@utils'

export type ListrTestRendererTasks = Task<any, typeof TestRenderer>[]
export type ListrTestRendererOptions = (typeof TestRenderer)['rendererOptions']

export class TestRendererEvent<T extends ListrTaskEventType> {
  constructor (public event: T, public data: ListrTaskEventMap[T], public task?: Task<any, typeof TestRenderer>) {}

  public toJson (): string {
    return JSON.stringify({
      event: this.event,
      data: this.data,
      task: {
        title: this.task?.title,
        hasFinalized: this.task?.hasFinalized()
      }
    })
  }
}

export interface TestRendererOptions extends LoggerRendererOptions {
  subtasks?: boolean
  state?: ListrTaskState[]
  output?: boolean
  prompt?: boolean
  title?: boolean
  messages?: (keyof ListrTaskMessage)[]
  messagesToStderr?: (keyof ListrTaskMessage)[]
}
