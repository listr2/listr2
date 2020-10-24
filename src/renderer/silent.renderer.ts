/* eslint-disable @typescript-eslint/no-empty-function */
import { ListrRenderer, ListrTaskObject } from '@interfaces/listr.interface'

export class SilentRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the silent renderer */
  public static rendererOptions: never
  /** per task options for the silent renderer */
  public static rendererTaskOptions: never

  constructor (public tasks: ListrTaskObject<any, typeof SilentRenderer>[], public options: typeof SilentRenderer['rendererOptions']) {}

  render (): void {}

  end (): void {}
}
