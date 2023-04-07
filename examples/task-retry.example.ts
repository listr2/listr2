import { delay, Listr } from 'listr2'

await new Listr(
  [
    {
      title: 'Some type errors',
      task: async (_, task): Promise<void> => {
        await delay(1000)
        task.output = 'test'

        await delay(1000)
        const retry = task.isRetrying()

        if (retry.count > 0) {
          task.output = `I am self aware that I am retrying for the ${retry.count}th time.`
        }

        await delay(1000)
        throw new Error('This type can not be assigned to type with, oh noes')
      },
      retry: 3
    }
  ],
  { exitOnError: false }
).run()

await new Listr(
  [
    {
      title: 'Some type errors',
      task: async (_, task): Promise<void> => {
        await delay(1000)
        task.output = 'test'

        await delay(1000)
        const retry = task.isRetrying()

        if (retry.count > 0) {
          task.output = `Last error was, i can further process it: ${retry.error}`
        }

        await delay(1000)
        throw new Error('This type can not be assigned to type with, oh noes')
      },
      retry: 3
    }
  ],
  { exitOnError: false }
).run()

await new Listr(
  [
    {
      title: 'Some type errors',
      task: async (_, task): Promise<void> => {
        await delay(1000)
        task.output = 'test'

        await delay(1000)
        const retry = task.isRetrying()

        if (retry.count > 0) {
          task.output = `I am self aware that I am retrying for the ${retry.count}th time.`
        }

        await delay(1000)
        throw new Error('This type can not be assigned to type with, oh noes')
      },
      retry: {
        tries: 3,
        delay: 3000
      }
    }
  ],
  { exitOnError: false }
).run()
