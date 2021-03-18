import { BaseEventMap, EventMap } from './event.interface'
import { RenderHookEvents } from '@constants/render-hook-events.constants'

export declare class RenderHookEventMap extends BaseEventMap implements EventMap<RenderHookEvents> {
  [RenderHookEvents.TRIGGER_RENDER]: never
}
