/* eslint-disable @typescript-eslint/no-empty-function */
import delay from 'delay'

import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<any>

  logger.start('Example for showing the timer per task.')

  task = new Listr<any>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(1000)
        },
        options: {
          showTimer: true
        }
      },

      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(1000)
        },
        options: {
          showTimer: false
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }

  logger.start('Example for showing the timer per listr.')

  task = new Listr<any>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(500)
        }
      },

      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
          task.title = 'Changing task title.'
          await delay(200)
        }
      }
    ],
    { concurrent: false, rendererOptions: { showTimer: true } }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }

  logger.start('Example for showing the timer per listr in verbose renderer when on fallback.')

  task = new Listr<any>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(500)
        }
      },

      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
          task.title = 'Changing task title.'
          await delay(200)
        }
      }
    ],
    {
      concurrent: false,
      rendererOptions: { showTimer: true },
      rendererFallback: true,
      nonTTYRendererOptions: { showTimer: true, useIcons: true }
    }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }
}

main()
