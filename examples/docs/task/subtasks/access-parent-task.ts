import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr(
          (parent) => [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)

                parent.title = 'I am changing the title from subtask.'
              }
            }
          ],
          { concurrent: true }
        )
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()
