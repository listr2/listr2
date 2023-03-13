/* eslint-disable @typescript-eslint/no-empty-function */
import { delay } from '@tests/utils'

import { Listr } from '@root/index'
import { ListrLogger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  logger.started('Renderer fallback when conditions is true.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererFallback: (): boolean => 3 > 0 }
  )

  try {
    const context = await task.run()

    logger.completed(`Context: ${JSON.stringify(context, null, 2)}`)
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Renderer fallback when conditions is false.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererFallback: (): boolean => 3 < 0 }
  )

  try {
    const context = await task.run()

    logger.completed(`Context: ${JSON.stringify(context, null, 2)}`)
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Fallback try with function.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (): Promise<void> => {
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererFallback: someTestFunction }
  )

  try {
    const context = await task.run()

    logger.completed(`Context: ${JSON.stringify(context, null, 2)}`)
  } catch (e: any) {
    logger.failed(e)
  }
}

function someTestFunction (): boolean {
  let sum = 0
  const total = 2

  for (let index = 0; index < 5; index++) {
    sum += index
  }

  return sum > total
}

void main()
