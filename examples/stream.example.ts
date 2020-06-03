/* eslint-disable @typescript-eslint/no-empty-function */

import { spawn } from 'child_process'
import { Readable } from 'stream'

import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  output: string
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  logger.start('Example output from a task.')

  // eslint-disable-next-line prefer-const
  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: async (): Promise<Readable> => {
        return spawn('ls').stdout
      },
      options: {
        persistentOutput: true
      }
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

}

main()