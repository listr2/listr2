/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<any>

  // ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F
  logger.start('Example for skipping a task from the results of function.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: (_, task): void => {
          task.skip('I am skipping this tasks for reasons.')
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }

  // 8KLp76vGVlGdzoy4HztCYcYe2coxpO7e
  logger.start('Example for skipping a task by using context.')

  task = new Listr<Ctx>(
    [
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
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }

  // 7IvF8C3RevPE0cdsG7QZonUN1JS26n0N
  logger.start('You can also not collapse the skip messages instead of changing the title by setting the collapseSkips option of the default renderer to false.')

  task = new Listr<Ctx>(
    [
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
    ],
    { concurrent: false, rendererOptions: { collapseSkips: false } }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }

  // BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK
  logger.start('skip from function.')
  task = new Listr<Ctx>(
    [
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
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e: any) {
    logger.fail(e)
  }
}

main()
