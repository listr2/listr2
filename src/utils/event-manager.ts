import EventEmitter from 'eventemitter3'

import { ListrEventManagerTypes } from '@constants/listr-event-manager.constants'
import { EventData } from '@interfaces/event.interface'

export class EventManager<Event extends string = string, Map extends Partial<Record<Event, unknown>> = Partial<Record<Event, any>>> {
  static instance: Partial<Record<ListrEventManagerTypes, EventManager<any, any>>> = {}
  private readonly emitter: EventEmitter

  constructor (type: ListrEventManagerTypes) {
    if (type === ListrEventManagerTypes.TASK) {
      this.emitter = new EventEmitter()

      return this
    } else if (!(EventManager.instance?.[type] instanceof EventManager)) {
      this.emitter = new EventEmitter()

      EventManager.instance[type] = this
    }

    return EventManager.instance[type]
  }

  public emit<E extends Event = Event>(dispatch: E, args?: EventData<E, Map>): void {
    this.emitter.emit(dispatch, args)
  }

  public on<E extends Event = Event>(dispatch: E, handler: (data: EventData<E, Map>) => void): void {
    this.emitter.addListener(dispatch, handler)
  }

  public complete (): void {
    this.emitter.removeAllListeners()
  }
}
