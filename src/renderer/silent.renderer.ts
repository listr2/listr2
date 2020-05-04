/* eslint-disable @typescript-eslint/no-empty-function */
import { ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'

export class SilentRenderer implements ListrRenderer {
  public static nonTTY = true
  public static rendererOptions: never
  public static rendererTaskOptions: never

  constructor (public tasks: ListrTaskObject<any, typeof SilentRenderer>[], public options: typeof SilentRenderer['rendererOptions']) {}

  render (): void {}

  end (): void {}
}
