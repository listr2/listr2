import EventEmitter from 'eventemitter3'

import { EventData } from '@interfaces/event.interface'

export class EventManager<Event extends string = string, Map extends Partial<Record<Event, unknown>> = Partial<Record<Event, any>>> {
  static instance: EventManager<any, any>
  private emitter: EventEmitter

  constructor () {
    if (!(EventManager.instance instanceof EventManager)) {
      this.emitter = new EventEmitter()

      EventManager.instance = this
    }

    return EventManager.instance
  }

  public emit<E extends Event = Event>(dispatch: E, args?: EventData<E, Map>): void {
    this.emitter.emit(dispatch, args)
  }

  public on<E extends Event = Event>(dispatch: E, handler: (data: EventData<E, Map>) => void): void {
    this.emitter.addListener(dispatch, handler)
  }

  public onMultiple<E extends Event = Event>(dispatchs: E[], handler: () => void): void {
    dispatchs.forEach((dispatch) => this.emitter.addListener(dispatch, handler))
  }

  public complete (): void {
    this.emitter.removeAllListeners()
  }
}
