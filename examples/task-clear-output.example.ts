import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This will clear its output.',
      task: async (_, task): Promise<void> => {
        task.output = 'I will push an output. [0]'

        await delay(1000)

        task.output = 'I will push an output. [1]'

        await delay(1000)

        task.output = 'I will push an output. [2]'

        await delay(1000)

        task.output = ''
      },
      rendererOptions: { persistentOutput: true, outputBar: Infinity }
    },
    {
      title: 'This will not clear its output.',
      task: async (_, task): Promise<void> => {
        task.output = 'I will push an output. [0]'

        await delay(1000)

        task.output = 'I will push an output. [1]'

        await delay(1000)

        task.output = 'I will push an output. [2]'
      },
      rendererOptions: { persistentOutput: true, outputBar: Infinity }
    }
  ],
  {
    rendererOptions: {
      collapse: false,
      removeEmptyLines: false
    }
  }
)

await tasks.run()
