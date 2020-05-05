/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  input: boolean
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<any>

  logger.start('Example for getting user input.')

  task = new Listr<Ctx>([
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<boolean> => ctx.input = await task.prompt<boolean>('Toggle', { message: 'Do you love me?' })
    },
    {
      title: 'Now I will show the input value.',
      task: (ctx, task): void => {
        task.output = String(ctx.input)
      },
      options: {
        persistentOutput: true
      }
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.start('You can go ahead with complicated functions with prompts as well.')
  task = new Listr<Ctx>([
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<void> => {
        ctx.input = await task.prompt<boolean>('Toggle', { message: 'Do you love me?' })
        // do something
        if (ctx.input === false) {
          throw new Error(':/')
        }
      }
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

}

main()