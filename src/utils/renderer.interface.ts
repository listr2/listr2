import { ListrRendererClass } from '@interfaces/listr.interface'

export interface SupportedRenderer {
  renderer: ListrRendererClass
  nonTTY: boolean
}