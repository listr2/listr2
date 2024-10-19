import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will fail.',
      task: async(): Promise<void> => {
        await delay(2000)
        throw new Error('This task failed after 2 seconds.')
      },
      exitOnError: false
    },
    {
      title: 'This task will execute.',
      task: (_, task): void => {
        task.title = 'I will change my title if this executes.'
      }
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

await tasks.run()
