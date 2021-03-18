import { BaseEventMap, EventMap } from './event.interface'
import { ListrEvents } from '@constants/listr-events.constants'
import { StateConstants } from '@constants/state.constants'
import { Task } from '@lib/task'

/** Event map for internal listr events. */
export declare class ListrEventMap extends BaseEventMap implements EventMap<ListrEvents> {
  [ListrEvents.STATE]: StateConstants;
  [ListrEvents.ENABLED]: boolean;
  [ListrEvents.SUBTASK]: void;
  [ListrEvents.TITLE]: string;
  [ListrEvents.DATA]: string;
  [ListrEvents.MESSAGE]: Task<any, any>['message']
}
