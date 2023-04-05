import type { TestRenderer } from './renderer'
import type { ListrTaskEventType, ListrTaskState } from '@constants'
import type { ListrTaskEventMap, ListrTaskMessage } from '@interfaces'
import type { Task } from '@lib'
import type { LoggerRendererOptions } from '@utils'

export type ListrTestRendererTask = Task<any, typeof TestRenderer>
export type ListrTestRendererOptions = (typeof TestRenderer)['rendererOptions']

export interface TestRendererOptions extends LoggerRendererOptions {
  subtasks?: boolean
  state?: ListrTaskState[]
  output?: boolean
  prompt?: boolean
  title?: boolean
  messages?: (keyof ListrTaskMessage)[]
  messagesToStderr?: (keyof ListrTaskMessage)[]
  task?: false | TestRendererSerializerTaskKeys[]
}

export class TestRendererSerializer {
  constructor (public options?: TestRendererOptions) {}

  public serialize<T extends ListrTaskEventType>(event: T, data: ListrTaskEventMap[T], task?: ListrTestRendererTask): string {
    return JSON.stringify(this.generate(event, data, task))
  }

  public generate<T extends ListrTaskEventType>(event: T, data: ListrTaskEventMap[T], task?: ListrTestRendererTask): TestRendererSerializerOutput<T> {
    const output: TestRendererSerializerOutput<T> = {
      event,
      data
    }

    if (typeof this.options?.task !== 'boolean') {
      const t = Object.fromEntries(
        this.options.task.map((entity) => {
          const property = task[entity]

          if (typeof property === 'function') {
            return [ entity, property.call(task) ]
          }

          return [ entity, property ]
        })
      )

      if (Object.keys(task).length > 0) {
        output.task = t
      }
    }

    return output
  }
}

export interface TestRendererSerializerOutput<T extends ListrTaskEventType> {
  event: T
  data: ListrTaskEventMap[T]
  task?: Partial<Record<TestRendererSerializerTaskKeys, unknown>>
}

export type TestRendererSerializerTaskKeys = Extract<
keyof Task<any, typeof TestRenderer>,
| 'hasSubtasks'
| 'hasFinalized'
| 'isPending'
| 'isStarted'
| 'isSkipped'
| 'isCompleted'
| 'hasFailed'
| 'isRollingBack'
| 'hasRolledBack'
| 'isRetrying'
| 'hasReset'
| 'isEnabled'
| 'hasTitle'
| 'isPrompt'
| 'isPaused'
| 'title'
| 'path'
>
