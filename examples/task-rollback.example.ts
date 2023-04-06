import { delay, Listr, ListrLogger, ListrLogLevels } from 'listr2'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

let task: Listr<Ctx>

// 4SIhMkI14b8s2hW1esiORoa1UINGHwAr
logger.log(ListrLogLevels.STARTED, 'This would trigger the rollback functionality if the parent task fails.')

task = new Listr<Ctx>(
  [
    {
      title: 'Something with rollback.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This task will fail.',
              task: async (): Promise<void> => {
                await delay(2000)
                throw new Error('This task failed after 2 seconds.')
              }
            },
            {
              title: 'This task will execute.',
              task: (_, task): void => {
                task.title = 'I will change my title if this executes.'
              }
            }
          ],
          { exitOnError: true }
        ),
      rollback: async (_, task): Promise<void> => {
        task.title = 'I am trying to rollback stuff, previous action failed.'

        await delay(1000)

        task.title = 'Doing something other than this.'

        await delay(1000)

        task.title = 'Some actions required rollback stuff.'
      }
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

// vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx
logger.log(ListrLogLevels.STARTED, 'Rollback in normal task.')

task = new Listr<Ctx>(
  [
    {
      title: 'Something with rollback in the subtask itself.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This task will execute.',
              task: async (): Promise<void> => {
                await delay(1000)
              }
            },
            {
              title: 'This task will fail.',
              task: async (): Promise<void> => {
                await delay(2000)

                throw new Error('This task failed after 2 seconds.')
              },
              rollback: async (_, task): Promise<void> => {
                task.title = 'I am trying to rollback stuff, previous action failed.'

                await delay(1000)

                task.title = 'Doing something other than this.'

                await delay(1000)

                task.title = 'Some actions required rollback stuff.'
              }
            }
          ],
          { exitOnError: true }
        )
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}
