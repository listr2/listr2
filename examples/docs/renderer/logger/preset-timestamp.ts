import { Listr, PRESET_TIMESTAMP, delay } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(500)
      }
    },

    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(2000)
      }
    },

    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(100)
      }
    }
  ],
  {
    concurrent: true,
    renderer: 'simple',
    rendererOptions: {
      timestamp: PRESET_TIMESTAMP
    }
  }
)

await tasks.run()
