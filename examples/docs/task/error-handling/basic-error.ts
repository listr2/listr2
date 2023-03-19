import { delay } from '@tests/utils'
import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will fail.',
      task: async (): Promise<void> => {
        await delay(2000)
        throw new Error('This task failed after 2 seconds.')
      }
    },
    {
      title: 'This task will never execute.',
      task: (ctx, task): void => {
        task.title = 'I will change my title if this executes.'
      }
    }
  ],
  { concurrent: false }
)

await tasks.run()
