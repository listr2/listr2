/**
 * Give event map a set of indexes to not make it go crazy when some events are missing from it.
 * They are optional after all.
 */
export class BaseEventMap {
  [k: string]: any
}

/**
 * Parameters for the given event in the {@link EventMap}.
 */
export type EventData<Event extends string, Map extends Record<string, unknown>> = Event extends keyof Map ? Map[Event] : never

/**
 * An event map of given events that defined the parameters and return types for firing a certain event.
 */
export type EventMap<Events extends string> = Partial<Record<Events, unknown>>
