import { EOL } from 'os'

import { Listr, ListrLogger, ProcessOutput, delay } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)

        console.log('i am logging some stuff out')
      }
    },

    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)

        console.log('i am logging some more stuff out')
      }
    },

    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)

        process.stdout.write('writing something here' + EOL)
        process.stdout.write('writing something here' + EOL)
      }
    }
  ],
  {
    concurrent: true,
    rendererOptions: {
      logger: new ListrLogger({ processOutput: new ProcessOutput(null, null, { dump: [] }) })
    }
  }
)

await tasks.run()
