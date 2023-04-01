import { Listr } from 'listr2'

const tasks = new Listr([
  {
    task: (ctx): void => {
      ctx.test = true
    }
  }
])

await tasks.run()

console.log(tasks.ctx.test) // true
