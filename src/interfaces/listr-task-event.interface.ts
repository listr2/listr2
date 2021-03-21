import { BaseEventMap, EventMap } from './event.interface'
import { ListrTaskEvents } from '@constants/listr-task-events.constants'
import { Task } from '@lib/task'
import { ListrTaskState } from '@root/constants/listr-task-state.constants'

/** Event map for internal listr events. */
export declare class ListrTaskEventMap extends BaseEventMap implements EventMap<ListrTaskEvents> {
  [ListrTaskEvents.STATE]: ListrTaskState;
  [ListrTaskEvents.ENABLED]: boolean;
  [ListrTaskEvents.SUBTASK]: void;
  [ListrTaskEvents.TITLE]: string;
  [ListrTaskEvents.DATA]: string;
  [ListrTaskEvents.MESSAGE]: Task<any, any>['message']
}
