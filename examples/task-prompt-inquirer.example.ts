import { input } from '@inquirer/prompts'
import { ListrInquirerPromptAdapter } from '@listr2/prompt-adapter-inquirer'

import { delay, Listr, ListrLogger, ListrLogLevels } from 'listr2'

interface Ctx {
  input: string
}

const logger = new ListrLogger({ useIcons: false })

let task: Listr<Ctx>

logger.log(ListrLogLevels.STARTED, 'Example for getting user input.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will get your input.',
      task: async(ctx, task): Promise<string> => (ctx.input = await task.prompt(ListrInquirerPromptAdapter).run(input, { message: 'Please give me some input' }))
    },
    {
      title: 'Now I will show the input value.',
      task: (ctx, task): void => {
        task.output = ['%o', ctx.input]
      },
      rendererOptions: {
        persistentOutput: true
      }
    }
  ],
  { concurrent: false }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

logger.log(ListrLogLevels.STARTED, 'Canceling a prompt.')
task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute and cancel the prompts.',
      task: async(ctx, task): Promise<void> => {
        const prompt = task.prompt(ListrInquirerPromptAdapter)

        void delay(1000).then(() => prompt.cancel())

        ctx.input = await prompt.run(input, {
          message: 'Give me input before it disappears.'
        })
      }
    }
  ],
  {
    concurrent: false
  }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}
