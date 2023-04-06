import type { EventMap } from './event.interface'
import { BaseEventMap } from './event.interface'
import type { ListrTaskMessage } from './task.interface'
import type { ListrTaskState } from '@constants'
import { ListrTaskEventType } from '@constants'
import type { Task } from '@lib'

/**
 * Event map for Task.
 *
 * @see {@link https://listr2.kilic.dev/task/events.html}
 * @see {@link module:listr2.ListrTaskEventType}
 */
export declare class ListrTaskEventMap extends BaseEventMap implements EventMap<ListrTaskEventType> {
  [ListrTaskEventType.STATE]: ListrTaskState;
  [ListrTaskEventType.ENABLED]: boolean;
  [ListrTaskEventType.SUBTASK]: Task<any, any>[];
  [ListrTaskEventType.TITLE]: string;
  [ListrTaskEventType.OUTPUT]: string;
  [ListrTaskEventType.MESSAGE]: ListrTaskMessage;
  [ListrTaskEventType.PROMPT]: string
}
