import { execaCommand as command } from 'execa'

import { Listr } from 'listr2'

const tasks = new Listr([
  {
    title: 'This task will list the directory.',
    task: async (_, task): Promise<void> => {
      const execute = command('curl -v http://google.com')

      execute.stdout.pipe(task.stdout())
      execute.stderr.pipe(task.stdout())

      await execute
    },
    options: {
      persistentOutput: true
    }
  }
])

await tasks.run()
