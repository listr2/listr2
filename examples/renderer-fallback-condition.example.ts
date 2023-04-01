import { delay, Listr, ListrLogger, LogLevels } from 'listr2'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

let task: Listr<Ctx>

logger.log(LogLevels.STARTED, 'Renderer fallback when conditions is true.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false, fallbackRendererCondition: (): boolean => 3 > 0 }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}

logger.log(LogLevels.STARTED, 'Renderer fallback when conditions is false.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false, fallbackRendererCondition: (): boolean => 3 < 0 }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}

logger.log(LogLevels.STARTED, 'Fallback try with function.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false, fallbackRendererCondition: someTestFunction }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}

function someTestFunction (): boolean {
  let sum = 0
  const total = 2

  for (let index = 0; index < 5; index++) {
    sum += index
  }

  return sum > total
}
