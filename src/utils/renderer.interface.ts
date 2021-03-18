import { ListrRendererFactory } from '@interfaces/listr-renderer.interface'

export interface SupportedRenderer {
  renderer: ListrRendererFactory
  nonTTY: boolean
}
