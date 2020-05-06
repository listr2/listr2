/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<any>

  logger.start('Example for skipping a task from the results of function.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.skip('I am skipping this tasks for reasons.')
      }
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.start('Example for skipping a task by using context.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will never execute.',
      skip: (ctx): boolean => ctx.skip,
      task: (): void => {}
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.start('You can also not collapse the skip messages instead of changing the title by setting the collapseSkips option of the default renderer to false.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will never execute.',
      skip: (ctx): boolean => ctx.skip,
      task: (): void => {}
    }
  ], { concurrent: false, rendererOptions: { collapseSkips: false } })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will never execute.',
      skip: (ctx): string | boolean => ctx.skip ? 'I will be skipped!' : false,
      task: (): void => {}
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