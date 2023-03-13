/* eslint-disable @typescript-eslint/no-empty-function */
import { delay } from '@tests/utils'

import { Listr, RENDERER_TIMER } from '@root/index'
import { ListrLogger } from '@utils/logger'

const logger = new ListrLogger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<any>

  logger.started('Example for showing the timer per task.')

  task = new Listr<any>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(1000)
        },
        options: {
          timer: RENDERER_TIMER
        }
      },

      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(1000)
        },
        options: {
          timer: RENDERER_TIMER
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()

    logger.completed(`Context: ${JSON.stringify(context, null, 2)}`)
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Example for showing the timer per listr.')

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
    { concurrent: false, rendererOptions: { timer: RENDERER_TIMER } }
  )

  try {
    const context = await task.run()

    logger.completed(`Context: ${JSON.stringify(context, null, 2)}`)
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Example for showing the timer per listr in verbose renderer when on fallback.')

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
      rendererOptions: { timer: RENDERER_TIMER },
      rendererFallback: true,
      nonTTYRendererOptions: { timer: RENDERER_TIMER }
    }
  )

  try {
    const context = await task.run()

    logger.completed(`Context: ${JSON.stringify(context, null, 2)}`)
  } catch (e: any) {
    logger.failed(e)
  }
}

void main()
