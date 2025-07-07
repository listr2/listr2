import { ListrEnquirerPromptAdapter } from '@listr2/prompt-adapter-enquirer'

import { delay, Listr } from 'listr2'

interface Ctx {
  input: boolean
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will get your input.',
      task: async(ctx, task): Promise<void> => {
        const prompt = task.prompt(ListrEnquirerPromptAdapter)

        // Cancel the prompt after 5 seconds
        void delay(5000).then(() => prompt.cancel())

        ctx.input = await prompt.run({
          type: 'Input',
          message: 'Give me input before it disappears.'
        })
      }
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
