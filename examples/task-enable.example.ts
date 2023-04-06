import { delay, Listr, LogLevels, ListrLogger } from 'listr2'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

let task: Listr<Ctx>

// JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU
logger.log(LogLevels.STARTED, 'Example for enabling a task by utilizing previous tasks and the general context.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (ctx): Promise<void> => {
        ctx.skip = true
        await delay(2000)
      }
    },

    {
      title: 'This task will never execute.',
      enabled: (ctx): boolean => !ctx.skip,
      task: async (): Promise<void> => {
        await delay(2000)
      }
    }
  ],
  { concurrent: false }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}

// 2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB
logger.log(LogLevels.STARTED, 'A more complex enable example with subtasks.')
task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will show subtasks.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This task will execute.',
              task: (): void => {}
            },

            {
              title: 'This task will never execute.',
              enabled: (ctx): boolean => !ctx.skip,
              task: (): void => {}
            }
          ],
          { rendererOptions: { collapseSubtasks: false }, concurrent: true }
        )
    }
  ],
  { concurrent: false }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}
