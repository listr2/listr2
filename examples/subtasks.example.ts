import { delay, Listr, ListrLogger, LogLevels } from 'listr2'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

let task: Listr<Ctx>

// JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR
logger.log(LogLevels.STARTED, 'Example for subtasks.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (_, task): Listr =>
        task.newListr([
          {
            title: 'This is a subtask.',
            task: async (): Promise<void> => {
              await delay(3000)
            }
          }
        ])
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

// 3ygUxrTkCDLDfDrXzF1ocWR6626jaL0kA
// 8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ
logger.log(LogLevels.STARTED, 'Example for subtasks with different renderer options.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true }
        )
    },

    {
      title: 'This task will execute.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true, rendererOptions: { collapseSubtasks: false } }
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

logger.log(LogLevels.STARTED, 'Example for subtasks with different disabled rendering from parent.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute but will not render subtasks.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true }
        )
    }
  ],
  { concurrent: false, rendererOptions: { showSubtasks: false } }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}

// 12ttDlnth5pr1YuJEnfXm3I2CzRbcFlY
logger.log(LogLevels.STARTED, 'Example for subtasks that change exit on error.')

task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute and not quit on errors.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                throw new Error('I have failed [0]')
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                throw new Error('I have failed [1]')
              }
            },
            {
              title: 'This is yet an another subtask.',
              task: async (_, task): Promise<void> => {
                task.title = 'I have succeeded.'
              }
            }
          ],
          { exitOnError: false }
        )
    },
    {
      title: 'This task will execute.',
      task: (): void => {
        throw new Error('I will exit on error since I am a direct child of parent task.')
      }
    }
  ],
  { concurrent: false, exitOnError: true }
)

try {
  const context = await task.run()

  logger.log(LogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(LogLevels.FAILED, e)
}

logger.log(LogLevels.OUTPUT, 'You can also access all the errors spew out by the tasks by `task.err` which will return an array of errors.')
logger.log(LogLevels.FAILED, [ '%o', task.errors ])
