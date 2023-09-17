import { Listr, ListrEnquirerPromptAdapter } from 'listr2'

interface Ctx {
  input: boolean
}

const tasks = new Listr<Ctx>(
  [
    {
      task: async (ctx, task): Promise<boolean> => ctx.input = await task.prompt(ListrEnquirerPromptAdapter).run<boolean>({ type: 'Toggle', message: 'Do you love me?' })
    },
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<void> => {
        ctx.input = await task.prompt(ListrEnquirerPromptAdapter).run<boolean>({ type: 'Toggle', message: 'Do you love me?' })

        // do something
        if (ctx.input === false) {
          throw new Error(':/')
        }
      }
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
