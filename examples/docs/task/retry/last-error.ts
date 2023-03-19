import { delay } from '@tests/utils'
import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'Some thing with errors',
      task: async (_, task): Promise<void> => {
        const retry = task.isRetrying()

        if (retry.count > 0) {
          if (retry.error === new Error('Something')) {
            task.title = 'I will process the task further.'
          }
        }

        await delay(1000)
        throw new Error('This type can not be assigned to type with, oh noes')
      },
      retry: 3
    }
  ],
  { exitOnError: false }
)

await tasks.run()
