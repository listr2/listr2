import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'I will push an output. [0]'
      },
      rendererOptions: { persistentOutput: true }
    }
  ],
  { concurrent: false }
)

await tasks.run()
