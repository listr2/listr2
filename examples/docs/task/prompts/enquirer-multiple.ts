import { ListrEnquirerPromptAdapter } from '@listr2/prompt-adapter-enquirer'

import { Listr } from 'listr2'

interface Ctx {
  input?: {
    first: boolean
    second: boolean
  }
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<void> => {
        ctx.input = await task.prompt(ListrEnquirerPromptAdapter).run<{ first: boolean, second: boolean }>([
          {
            type: 'Toggle',
            name: 'first',
            message: 'Do you love me?'
          },
          {
            type: 'Toggle',
            name: 'second',
            message: 'Do you love me?'
          }
        ])

        // do something
        if (ctx.input.first === false) {
          task.output = 'oh okay'
        }

        if (ctx.input.second === false) {
          throw new Error('You did not had to tell me for the second time')
        }
      }
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
