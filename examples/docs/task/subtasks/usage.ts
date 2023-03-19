import { delay } from '@tests/utils'
import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr([
          {
            title: 'This is a subtask.',
            task: async (): Promise<void> => {
              await delay(3000)
            }
          }
        ])
    }
  ],
  { concurrent: false }
)

await tasks.run()
