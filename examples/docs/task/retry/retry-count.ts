import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'Some thing with errors',
      task: async (_, task): Promise<void> => {
        const retry = task.isRetrying()

        if (retry.count > 0) {
          task.title = 'This means I am retrying.'
          task.output = [ 'I am self aware that I am retrying for the %dth time.', retry.count ]
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
