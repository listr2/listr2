import { input } from '@inquirer/prompts'
import { ListrInquirerPromptAdapter } from '@listr2/prompt-adapter-inquirer'

import { delay, Listr } from 'listr2'

interface Ctx {
  input: string
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will get your input.',
      task: async(ctx, task): Promise<void> => {
        const prompt = task.prompt(ListrInquirerPromptAdapter)

        // Cancel the prompt after 5 seconds
        void delay(5000).then(() => prompt.cancel())

        ctx.input = await prompt.run(input, {
          message: 'Give me input before you lose your chance to do so.'
        })
      }
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
