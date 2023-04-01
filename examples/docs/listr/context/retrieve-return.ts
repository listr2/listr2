import { Listr } from 'listr2'

const tasks = new Listr([
  {
    task: (ctx): void => {
      ctx.test = true
    }
  }
])

const ctx = await tasks.run()

console.log(ctx.test) // true
