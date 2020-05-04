/* eslint-disable @typescript-eslint/no-empty-function */
import { ListrOptions, ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'

export class SilentRenderer implements ListrRenderer {
  static nonTTY = true
  static rendererOptions: never

  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) {}

  render (): void {}

  end (): void {}
}
