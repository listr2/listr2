/* eslint-disable @typescript-eslint/no-empty-function */

import { spawn } from 'child_process'
import type { Readable } from 'stream'

import { Listr } from '@root/index'
import { ListrLogger } from '@utils/logger'

interface Ctx {
  output: string
}

const logger = new ListrLogger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  logger.started('Example output from a task.')

  // eslint-disable-next-line prefer-const
  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<Readable> => {
          return spawn('ls').stdout
        },
        options: {
          persistentOutput: true
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }
}

void main()
