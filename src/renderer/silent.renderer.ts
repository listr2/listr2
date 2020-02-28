/* eslint-disable @typescript-eslint/no-empty-function */
import { ListrOptions, ListrRenderer, ListrTaskObject } from '../interfaces/listr-task.interface'

export class SilentRenderer implements ListrRenderer {
  static nonTTY = true
  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) {}

  render (): void {}

  end (): void {}
}
