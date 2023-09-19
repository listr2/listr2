import { execaCommand as command } from 'execa'
import { Listr } from 'listr2'

const tasks = new Listr([
  {
    title: 'This task will do a curl request.',
    task: async (_, task): Promise<void> => {
      const execute = command('curl -v http://google.com')

      execute.stdout.pipe(task.stdout())
      execute.stderr.pipe(task.stdout())

      await execute
    },
    rendererOptions: {
      outputBar: Infinity,
      persistentOutput: true
    }
  }
])

await tasks.run()
