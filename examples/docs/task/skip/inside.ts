import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.skip('I am skipping this tasks for reasons.')
      }
    }
  ],
  { concurrent: false }
)

await tasks.run()
