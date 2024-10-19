import { input } from '@inquirer/prompts'
import { ListrInquirerPromptAdapter } from '@listr2/prompt-adapter-inquirer'

import { Listr } from 'listr2'

interface Ctx {
  input: string
}

const tasks = new Listr<Ctx>(
  [
    {
      task: async(ctx, task): Promise<string> => (ctx.input = await task.prompt(ListrInquirerPromptAdapter).run(input, { message: 'Please tell me about yourself' }))
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
