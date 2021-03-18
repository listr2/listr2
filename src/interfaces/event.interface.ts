/**
 * Give event map a set of indexes to not make it go crazy when some events are missing from it.
 * They are optional after all.
 */
export class BaseEventMap {
  [k: string]: any
}

/**
 * Request type of an event.
 */
export type EventData<Event extends string, Map extends Record<string, unknown>> = Event extends keyof Map ? Map[Event] : never

/**
 * For fast typing the event map.
 */
export type EventMap<Events extends string> = Partial<Record<Events, unknown>>
