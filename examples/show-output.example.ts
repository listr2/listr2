/* eslint-disable @typescript-eslint/no-empty-function */
import delay from 'delay'
import { Observable } from 'rxjs'

import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  // rMG224TBrLk3ocYtKidc1D4AyZtEHm11
  logger.start('Example output from a task.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  // oYHBlOYGg8juKRkaqigY617eyLbGMuDd
  logger.start('Example output with task with persistent output.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  // 767BkeBTfR1lrS2ANYYH7CLWPATxqyat
  logger.start('Example output to bottom bar from a task.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        },
        options: {
          bottomBar: Infinity
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  // JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP
  logger.start('Example output from a task with no title.')

  task = new Listr<Ctx>(
    [
      {
        task: async (ctx, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  // NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus
  logger.start('Example persistent output from a task.')

  task = new Listr<Ctx>(
    [
      {
        title: 'Some task task with no persistent output to bottom bar.',
        task: async (ctx, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        },
        options: {
          bottomBar: true,
          persistentOutput: false
        }
      },

      {
        title: 'Another task with persistent output to bottom bar.',
        task: async (ctx, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  // SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT
  logger.start('Example output from a observable.')

  task = new Listr<Ctx>(
    [
      {
        // Task can also handle and observable
        title: 'Observable test.',
        task: (): Observable<string> =>
          new Observable((observer) => {
            observer.next('test')

            delay(500)
              .then(() => {
                observer.next('changed')
                return delay(500)
              })
              .then(() => {
                observer.complete()
              })
          })
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  // j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn
  logger.start('Example long multiline output with task with persistent output.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          const start = 'This is a'
          const mid = 'long '
          const end = 'multi line output.'
          task.output = start + mid.repeat(100) + '\n' + mid.repeat(100) + end
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  logger.start('Example long multiline output with task with persistent output and wrap.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          const start = 'This is a'
          const mid = 'long '
          const end = 'multi line output.'
          task.output = start + mid.repeat(100) + '\n' + mid.repeat(100) + end
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererOptions: { formatOutput: 'wrap' } }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  logger.start('Example long multiline output with task with persistent output and word wrap and without skipping empty lines.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          const start = 'This is a'
          const mid = 'long '
          const end = 'multi line output.'
          task.output = start + mid.repeat(100) + '\n' + '\n' + '\n' + mid.repeat(100) + end
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererOptions: { formatOutput: 'wrap', removeEmptyLines: false } }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  logger.start('Example long multiline output with task with persistent output and with skipping empty lines.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          const start = 'This is a'
          const mid = 'long '
          const end = 'multi line output.'
          task.output = start + mid.repeat(100) + '\n' + '\n' + '\n' + mid.repeat(100) + end
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererOptions: { removeEmptyLines: true } }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }

  logger.start('Example long multiline output with task with persistent output and without skipping empty lines.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          const start = 'This is a'
          const mid = 'long '
          const end = 'multi line output.'
          task.output = start + mid.repeat(100) + '\n' + '\n' + '\n' + mid.repeat(100) + end
          await delay(500)
        },
        options: { persistentOutput: true }
      }
    ],
    { concurrent: false, rendererOptions: { removeEmptyLines: false } }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }
}

main()
