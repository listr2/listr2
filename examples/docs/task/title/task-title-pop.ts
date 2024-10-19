import { delay, Listr } from 'listr2'

const tasks = new Listr([
  {
    task: async(ctx, task): Promise<void> => {
      await delay(1000)

      task.title = 'I have done stuff, but should do some more.'

      await delay(1000)

      task.title = 'All the stuff has been done.'
    }
  },
  {
    task: async(ctx, task): Promise<void> => {
      await delay(1000)

      task.title = 'I am popping in to existence.'

      await delay(1000)

      task.title = 'Hey yo I am done!'
    }
  }
])

await tasks.run()
