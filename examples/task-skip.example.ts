import { Listr, ListrLogger, ListrLogLevels } from 'listr2'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

let task: Listr<any>

// ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F
logger.log(ListrLogLevels.STARTED, 'Example for skipping a task from the results of function.')

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

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

// 8KLp76vGVlGdzoy4HztCYcYe2coxpO7e
logger.log(ListrLogLevels.STARTED, 'Example for skipping a task by using context.')

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

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

// 7IvF8C3RevPE0cdsG7QZonUN1JS26n0N
logger.log(
  ListrLogLevels.STARTED,
  'You can also not collapse the skip messages instead of changing the title by setting the collapseSkips option of the default renderer to false.'
)

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

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

// BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK
logger.log(ListrLogLevels.STARTED, 'skip from function.')
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
      skip: (ctx): string | boolean => (ctx.skip ? 'I will be skipped!' : false),
      task: (): void => {}
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
