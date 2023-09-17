import type { TestRenderer } from './renderer'
import type { ListrTaskEventType } from '@constants'
import type { ListrRendererTask, ListrTaskEventMap } from '@interfaces'

export interface TestRendererSerializerOutput<T extends ListrTaskEventType> {
  event: T
  data: ListrTaskEventMap[T]
  task?: Partial<Record<TestRendererSerializerTaskKeys, unknown>>
}

export type TestRendererSerializerTaskKeys = Extract<
keyof ListrRendererTask<typeof TestRenderer>,
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
