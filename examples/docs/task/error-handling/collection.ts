import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      task: (): void => {
        throw new Error('1')
      }
    },
    {
      task: (_, task): Listr => {
        return task.newListr(
          [
            {
              task: (): void => {
                throw new Error('3')
              }
            },
            {
              task: (): void => {
                throw new Error('4')
              }
            }
          ],
          { exitOnError: true }
        )
      }
    },
    {
      task: (): void => {
        throw new Error('2')
      }
    }
  ],
  { exitOnError: false, collectErrors: 'minimal' }
)

await tasks.run()

console.log(tasks.errors)
