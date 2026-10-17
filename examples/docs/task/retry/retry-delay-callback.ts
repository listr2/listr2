import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'Some type errors',
      task: async(): Promise<void> => {
        await delay(1000)
        throw new Error('This type can not be assigned to type with, oh noes')
      },
      retry: {
        tries: 3,
        delay: ({ count }): number => Math.min(1000 * 2 ** (count - 1), 30000)
      }
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

await tasks.run()
