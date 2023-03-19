import { delay } from '@tests/utils'
import { ListrLogger } from '@utils'
import { Listr } from 'listr2'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

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

  logger.completed([ 'ctx: %o', context ])
} catch (e: any) {
  logger.failed(e)
}