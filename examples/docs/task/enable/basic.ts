import { delay, Listr } from 'listr2'

interface Ctx {
  enableSecondTask?: boolean
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.enableSecondTask = false
      }
    },

    {
      title: 'This task will never execute.',
      enabled: (ctx): boolean => ctx.enableSecondTask,
      task: (): void => {}
    }
  ],
  { concurrent: false }
)

await tasks.run()
