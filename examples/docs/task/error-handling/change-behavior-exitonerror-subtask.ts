import { delay, Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute and not quit on errors.',
      task: (ctx, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async(): Promise<void> => {
                throw new Error('I have failed [0]')
              }
            },
            {
              title: 'This is yet an another subtask and it will run.',
              task: async(ctx, task): Promise<void> => {
                task.title = 'I have succeeded.'
              }
            }
          ],
          { exitOnError: false }
        )
    },
    {
      title: 'This task will execute.',
      task: (): void => {
        throw new Error('I will exit on error since I am a direct child of parent task.')
      }
    }
  ],
  { concurrent: false, exitOnError: true }
)

await tasks.run()
