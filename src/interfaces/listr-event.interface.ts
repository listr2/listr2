import { BaseEventMap, EventMap } from './event.interface'
import { ListrEvents } from '@constants/listr-events.constants'

export declare class ListrEventMap extends BaseEventMap implements EventMap<ListrEvents> {
  [ListrEvents.TRIGGER_RENDER]: never
}
