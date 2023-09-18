import type { EventMap } from './event.interface'
import { BaseEventMap } from './event.interface'
import { ListrEventType } from '@constants'

/**
 * Event map for Listr.
 *
 * @see {@link https://listr2.kilic.dev/listr/events.html}
 * @see {@link module:listr2.ListrEventType}
 */
export declare class ListrEventMap extends BaseEventMap implements EventMap<ListrEventType> {
  [ListrEventType.SHOULD_REFRESH_RENDER]: never
}
