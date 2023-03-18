import type { TestRenderer } from './renderer'
import type { ListrTaskEventType } from '@constants/event.constants'
import type { ListrTaskEventMap } from '@interfaces/event-map.interface'
import type { Task } from '@lib/task'

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
