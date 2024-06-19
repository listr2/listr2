import { execaCommand as command } from 'execa'

import { Listr, createWritable } from 'listr2'

const tasks = new Listr([
  {
    title: 'This task will list the directory.',
    task: async (_, task): Promise<void> => {
      const output = createWritable((chunk: string) => {
        if (chunk.toString().match(/.*Connected to.*/)) {
          task.output = 'Connection successful.'
        }
      })

      const execute = command('curl -v http://google.com')

      execute.stdout.pipe(output)
      execute.stderr.pipe(output)

      await execute
    },
    rendererOptions: {
      persistentOutput: true
    }
  }
])

await tasks.run()
