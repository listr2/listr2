import { EventManager } from './event-manager'
import type { ListrTaskEventType } from '@constants'
import type { ListrTaskEventMap } from '@interfaces'

export class ListrTaskEventManager extends EventManager<ListrTaskEventType, ListrTaskEventMap> {}
