import { BaseEventMap, EventMap } from './event.interface'
import { ListrEventType, ListrTaskEventType } from '@constants/event.constants'
import { ListrTaskState } from '@constants/state.constants'
import { Task } from '@lib/task'

/** Event map for generic listr events. */
export declare class ListrEventMap extends BaseEventMap implements EventMap<ListrEventType> {
  [ListrEventType.SHOULD_REFRESH_RENDER]: never
}

/** Event map for internal listr events. */
export declare class ListrTaskEventMap extends BaseEventMap implements EventMap<ListrTaskEventType> {
  [ListrTaskEventType.STATE]: ListrTaskState;
  [ListrTaskEventType.ENABLED]: boolean;
  [ListrTaskEventType.SUBTASK]: never;
  [ListrTaskEventType.TITLE]: string;
  [ListrTaskEventType.DATA]: string;
  [ListrTaskEventType.MESSAGE]: Task<any, any>['message']
}
