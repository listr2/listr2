/* eslint-disable @typescript-eslint/no-empty-function */

import { ListrRenderer } from '@interfaces/listr-renderer.interface'
import { Task } from '@lib/task'

export class SilentRenderer implements ListrRenderer {
  /** designates whether this renderer can output to a non-tty console */
  public static nonTTY = true
  /** renderer options for the silent renderer */
  public static rendererOptions: never
  /** per task options for the silent renderer */
  public static rendererTaskOptions: never

  constructor (public tasks: Task<any, typeof SilentRenderer>[], public options: typeof SilentRenderer['rendererOptions']) {}

  render (): void {}

  end (): void {}
}
