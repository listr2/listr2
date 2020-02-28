/* eslint-disable @typescript-eslint/no-empty-function */
import * as cliCursor from 'cli-cursor'

import { ListrOptions, ListrRenderer, ListrTaskObject } from '../interfaces/listr-task.interface'

export class SilentRenderer implements ListrRenderer {
  static nonTTY = true
  constructor (public tasks: ListrTaskObject<any>[], public options: ListrOptions) {}

  render (): void {
    cliCursor.hide()
  }

  end (): void {
    cliCursor.show()
  }
}
