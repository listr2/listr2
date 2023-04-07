import type { TestRenderer } from './renderer'
import type { ListrTaskEventType } from '@constants'
import type { ListrTaskEventMap } from '@interfaces'
import type { Task } from '@lib'

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
