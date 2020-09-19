/* eslint-disable @typescript-eslint/no-empty-function */
import delay from 'delay'

import { Listr } from '../src/index'
import { Logger } from '@utils/logger'

interface Ctx {
  input: boolean | Record<string, boolean>
}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx>

  logger.start('Example for getting user input.')

  task = new Listr<Ctx>(
    [
      {
        title: 'This task will get your input.',
        task: async (ctx, task): Promise<Record<string, boolean>> =>
          ctx.input = await task.prompt<{ test: boolean, other: boolean }>([
            {
              type: 'Select',
              name: 'first',
              message: 'Please select something',
              choices: [ 'A', 'B', 'C' ],
              validate: (response): boolean | string => {
                //  i do declare you valid!
                if (response === 'A') {
                  return true
                }
              }
            },
            {
              type: 'Input',
              name: 'second',
              message: 'Please type something in:'
            }
          ])
      },
      {
        title: 'Now I will show the input value.',
        task: (ctx, task): void => {
          task.output = JSON.stringify(ctx.input)
        },
        options: {
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

  logger.start('You can go ahead with complicated functions with prompts as well.')
  task = new Listr<Ctx>(
    [
      {
        title: 'This task will get your input.',
        task: async (ctx, task): Promise<void> => {
          ctx.input = await task.prompt<boolean>({ type: 'Toggle', message: 'Do you love me?' })
          // do something
          if (ctx.input === false) {
            throw new Error(':/')
          }
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

  logger.start('More complicated prompt.')
  task = new Listr<Ctx>(
    [
      {
        title: 'This task will get your input.',
        task: async (ctx, task): Promise<void> => {
          ctx.input = await task.prompt<boolean>({
            type: 'Select',
            message: 'Do you love me?',
            choices: [ 'test', 'test', 'test', 'test' ]
          })
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

  logger.start('Very complicated prompt.')
  task = new Listr<Ctx>(
    [
      {
        title: 'This task will get your input.',
        task: async (ctx, task): Promise<void> => {
          ctx.input = await task.prompt({
            type: 'Survey',
            message: 'Please rate your experience',
            scale: [
              { name: '1', message: 'Strongly Disagree' },
              { name: '2', message: 'Disagree' },
              { name: '3', message: 'Neutral' },
              { name: '4', message: 'Agree' },
              { name: '5', message: 'Strongly Agree' }
            ],
            margin: [ 0, 0, 2, 1 ],
            choices: [
              {
                name: 'interface',
                message: 'The website has a friendly interface.'
              },
              {
                name: 'navigation',
                message: 'The website is easy to navigate.'
              },
              {
                name: 'images',
                message: 'The website usually has good images.'
              },
              {
                name: 'upload',
                message: 'The website makes it easy to upload images.'
              },
              {
                name: 'colors',
                message: 'The website has a pleasing color palette.'
              }
            ]
          })
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

  logger.start('Skipping a prompt.')
  task = new Listr<Ctx>(
    [
      {
        title: 'This task will execute.',
        task: async (ctx, task): Promise<void> => {
          delay(1000).then(() => task.skip('Skip this task.'))
          ctx.input = await task.prompt({
            type: 'Input',
            message: 'Give me some input.'
          })
        }
      },

      {
        title: 'Another task.',
        task: async (): Promise<void> => {
          await delay(1000)
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: false
    }
  )

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    logger.fail(e)
  }
}

main()
