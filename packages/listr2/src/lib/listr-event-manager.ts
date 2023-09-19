import { EventManager } from './event-manager'
import type { ListrEventType } from '@constants'
import type { ListrEventMap } from '@interfaces'

export class ListrEventManager extends EventManager<ListrEventType, ListrEventMap> {}
