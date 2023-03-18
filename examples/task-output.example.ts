/* eslint-disable @typescript-eslint/no-empty-function */
import { delay } from '@tests/utils'
import { Observable } from 'rxjs'

import { Listr } from '@root/index'
import { ListrLogger } from '@utils/logger'

interface Ctx {
  skip: boolean
}

const logger = new ListrLogger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  // rMG224TBrLk3ocYtKidc1D4AyZtEHm11
  logger.started('Example output from a task.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  // oYHBlOYGg8juKRkaqigY617eyLbGMuDd
  logger.started('Example output with task with persistent output.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  // 767BkeBTfR1lrS2ANYYH7CLWPATxqyat
  logger.started('Example output to bottom bar from a task.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  // JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP
  logger.started('Example output from a task with no title.')

  task = new Listr<Ctx>(
    [
      {
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  // NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus
  logger.started('Example persistent output from a task.')

  task = new Listr<Ctx>(
    [
      {
        title: 'Some task task with no persistent output to bottom bar.',
        task: async (_, task): Promise<void> => {
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
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  // SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT
  logger.started('Example output from a observable.')

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
              .catch(() => {})
          })
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  // j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn
  logger.started('Example long multiline output with task with persistent output.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Example long multiline output with task with persistent output and wrap.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Example long multiline output with task with persistent output and word wrap.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Example long multiline output with task with persistent output and with skipping empty lines.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }

  logger.started('Example long multiline output with task with persistent output and without skipping empty lines.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
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

    logger.completed([ 'ctx: %o', context ])
  } catch (e: any) {
    logger.failed(e)
  }
}

void main()
