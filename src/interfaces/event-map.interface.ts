import { BaseEventMap, EventMap } from './event.interface'
import { ListrTaskEventType } from '@constants/event.constants'
import { ListrTaskState } from '@constants/state.constants'
import { Task } from '@lib/task'

/** Event map for internal listr events. */
export declare class ListrTaskEventMap extends BaseEventMap implements EventMap<ListrTaskEventType> {
  [ListrTaskEventType.STATE]: ListrTaskState;
  [ListrTaskEventType.ENABLED]: boolean;
  [ListrTaskEventType.SUBTASK]: never;
  [ListrTaskEventType.TITLE]: string;
  [ListrTaskEventType.DATA]: string;
  [ListrTaskEventType.MESSAGE]: Task<any, any>['message']
}
