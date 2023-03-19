import { delay } from '@tests/utils'
import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'I will push an output. [0]'
        await delay(500)

        task.output = 'I will push an output. [1]'
        await delay(500)

        task.output = 'I will push an output. [2]'
        await delay(500)
      },
      options: {
        bottomBar: Infinity
      }
    }
  ],
  { concurrent: false }
)

await tasks.run()
