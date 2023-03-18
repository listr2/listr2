import type { EventMap } from './event.interface'
import { BaseEventMap } from './event.interface'
import type { ListrTaskMessage } from './task.interface'
import { ListrEventType, ListrTaskEventType } from '@constants'
import type { ListrTaskState } from '@constants'
import type { Task } from '@lib'

/** Event map for generic listr events. */
export declare class ListrEventMap extends BaseEventMap implements EventMap<ListrEventType> {
  [ListrEventType.SHOULD_REFRESH_RENDER]: never
}

/** Event map for internal listr events. */
export declare class ListrTaskEventMap extends BaseEventMap implements EventMap<ListrTaskEventType> {
  [ListrTaskEventType.STATE]: ListrTaskState;
  [ListrTaskEventType.ENABLED]: boolean;
  [ListrTaskEventType.SUBTASK]: Task<any, any>[];
  [ListrTaskEventType.TITLE]: string;
  [ListrTaskEventType.OUTPUT]: string;
  [ListrTaskEventType.MESSAGE]: ListrTaskMessage;
  [ListrTaskEventType.PROMPT]: string
}
