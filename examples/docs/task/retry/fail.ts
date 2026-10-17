import type { ListrTaskFailure } from 'listr2'
import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'Clean storage',
      task: async(_, task): Promise<ListrTaskFailure> => {
        await delay(1000)

        if (task.isRetrying().count > 0) {
          return task.fail(new Error('Storage is locked by another process.'))
        }

        throw new Error('Storage is not ready yet.')
      },
      retry: {
        tries: 10,
        delay: 1000
      }
    },
    {
      title: 'This task will still run',
      task: async(): Promise<void> => {
        await delay(3000)
      }
    }
  ],
  {
    concurrent: true,
    exitOnError: false
  }
)

await tasks.run()
