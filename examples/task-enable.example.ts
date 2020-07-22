/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  // JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU
  logger.start('Example for enabling a task by utilizing previous tasks and the general context.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will never execute.',
      enabled: (ctx): boolean => !ctx.skip,
      task: (): void => {}
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  // 2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB
  logger.start('A more complex enable example with subtasks.')
  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will show subtasks.',
      task: (ctx, task): Listr => task.newListr([
        {
          title: 'This task will execute.',
          task: (): void => { }
        },

        {
          title: 'This task will never execute.',
          enabled: (ctx): boolean => !ctx.skip,
          task: (): void => {}
        }
      ], { rendererOptions: { collapse: false }, concurrent: true })
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