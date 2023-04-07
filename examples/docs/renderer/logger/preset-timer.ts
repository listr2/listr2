import type { LoggerFormat } from 'listr2'
import { delay, color, Listr, PRESET_TIMER } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)
      }
    },

    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(2000)
      }
    },

    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(100)
      }
    }
  ],
  {
    concurrent: true,
    rendererOptions: {
      timer: {
        ...PRESET_TIMER,
        condition: (duration): boolean => duration > 250,
        format: (duration): LoggerFormat => {
          if (duration > 1000) {
            return color.red
          }

          return color.green
        }
      }
    }
  }
)

await tasks.run()
