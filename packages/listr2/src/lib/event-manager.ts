import EventEmitter from 'node:events'

import type { EventData } from '@interfaces'

export class EventManager<Event extends string = string, Map extends Partial<Record<Event, unknown>> = Partial<Record<Event, any>>> {
  private readonly emitter = new EventEmitter()

  constructor() {
    this.emitter.setMaxListeners(0)
  }

  public emit<E extends Event = Event>(dispatch: E, args?: EventData<E, Map>): void {
    this.emitter.emit(dispatch, args)
  }

  public on<E extends Event = Event>(dispatch: E, handler: (data: EventData<E, Map>) => void): void {
    if (!handler) {
      return
    }

    this.emitter.addListener(dispatch, handler)
  }

  public once<E extends Event = Event>(dispatch: E, handler: (data: EventData<E, Map>) => void): void {
    if (!handler) {
      return
    }

    this.emitter.once(dispatch, handler)
  }

  public off<E extends Event = Event>(dispatch: E, handler?: (data: EventData<E, Map>) => void): void {
    if (handler) {
      this.emitter.off(dispatch, handler)
    } else {
      this.emitter.removeAllListeners(dispatch)
    }
  }

  public complete(): void {
    this.emitter.removeAllListeners()
  }
}
