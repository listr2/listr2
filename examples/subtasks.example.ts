import delay from 'delay'

/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  // JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR
  logger.start('Example for subtasks.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr => task.newListr([
        {
          title: 'This is a subtask.',
          task: async (): Promise<void> => {
            await delay(3000)
          }
        }
      ])
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  // 3ygUxrTkCDLDfDrXzF1ocWR6626jaL0kA
  // 8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ
  logger.start('Example for subtasks with different renderer options.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr => task.newListr([
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
      ], { concurrent: true })
    },

    {
      title: 'This task will execute.',
      task: (ctx, task): Listr => task.newListr([
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
      ], { concurrent: true, rendererOptions: { collapse: false } })
    }
  ], { concurrent: false })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.start('Example for subtasks with different disabled rendering from parent.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute but will not render subtasks.',
      task: (ctx, task): Listr => task.newListr([
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
      ], { concurrent: true })
    }
  ], { concurrent: false, rendererOptions: { showSubtasks: false } })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.start('Example for subtasks that change exit on error.')

  task = new Listr<Ctx>([
    {
      title: 'This task will execute and not quit on errors.',
      task: (ctx, task): Listr => task.newListr([
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
          task: async (ctx, task): Promise<void> => {
            task.title = 'I have succeeded.'
          }
        }
      ], { exitOnError: false })
    },
    {
      title: 'This task will execute.',
      task: (): void => {
        throw new Error('I will exit on error since I am a direct child of parent task.')
      }
    }
  ], { concurrent: false, exitOnError: true })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.data('You can also access all the errors spew out by the tasks by `task.err` which will return an array of errors.')
  logger.fail(task.err.toString())
}

main()