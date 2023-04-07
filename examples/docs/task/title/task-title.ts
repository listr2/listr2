import { delay, Listr } from 'listr2'

const tasks = new Listr([
  {
    title: 'Doing some stuff...',
    task: async (ctx, task): Promise<void> => {
      await delay(1000)

      task.title = 'I have done stuff, but should do some more.'

      await delay(1000)

      task.title = 'All the stuff has been done.'
    }
  }
])

await tasks.run()
