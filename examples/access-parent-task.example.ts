import { delay } from '@tests/utils'

/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'
import { ListrLogger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

async function main (): Promise<void> {
  logger.started('Example for subtasks with different renderer options.')

  const task: Listr<Ctx> = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: (_, task): Listr =>
          task.newListr(
            (parent) => [
              {
                title: 'This is a subtask.',
                task: async (): Promise<void> => {
                  await delay(3000)
                  parent.title = 'I am changing title from subtask.'
                }
              },
              {
                title: 'This is an another subtask.',
                task: async (): Promise<void> => {
                  await delay(2000)
                }
              }
            ],
            { concurrent: true }
          )
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
}

void main()
