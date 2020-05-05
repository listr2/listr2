import { ListrRendererFactory } from '@interfaces/listr.interface'

export interface SupportedRenderer {
  renderer: ListrRendererFactory
  nonTTY: boolean
}