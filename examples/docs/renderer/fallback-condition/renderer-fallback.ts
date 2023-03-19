import { delay } from '@tests/utils'
import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'test'

        await delay(500)
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false, rendererFallback: (): boolean => 3 < 1 }
)

await tasks.run()
