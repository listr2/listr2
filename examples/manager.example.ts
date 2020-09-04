/* eslint-disable @typescript-eslint/naming-convention */
import delay from 'delay'

import { ListrBaseClassOptions } from '@interfaces/listr.interface'
import { Manager } from '@root/index'
import { Logger } from '@utils/logger'

function TaskManagerFactory<T = any> (override?: ListrBaseClassOptions): Manager<T> {
  const myDefaultOptions: ListrBaseClassOptions = {
    concurrent: false,
    exitOnError: false,
    rendererOptions: {
      collapse: false,
      collapseSkips: false
    }
  }
  return new Manager({ ...myDefaultOptions, ...override })
}

interface Ctx {
  injected?: boolean
  runTime?: number
}

class MyMainClass {
  private tasks = TaskManagerFactory<Ctx>()
  private logger = new Logger({ useIcons: false })

  constructor () {
    this.run()
  }

  private async run (): Promise<void> {
    this.tasks.add(
      [
        {
          title: 'A task running manager [0]',
          task: async (): Promise<void> => {
            throw new Error('Do not dare to run the second task.')
          }
        },
        {
          title: 'This will never run first one failed.',
          task: async (): Promise<void> => {
            await delay(2000)
          }
        }
      ],
      { exitOnError: true, concurrent: false }
    )

    this.tasks.add(
      [
        {
          title: 'Some task that will run in sequential execution mode. [0]',
          task: async (): Promise<void> => {
            await delay(2000)
          }
        },
        {
          title: 'Some task that will run in sequential execution mode. [1]',
          task: async (): Promise<void> => {
            await delay(2000)
          }
        },
        this.tasks.indent(
          [
            {
              title: 'This will run in parallel. [0]',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            },
            {
              title: 'This will run in parallel. [1]',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true }
        )
      ],
      { concurrent: false }
    )

    this.logger.start('This will run all the tasks in a queue and clear the queue afterwards.')
    await this.tasks.runAll()

    this.logger.start('You can use listr directly without importing it.')
    this.logger.start('It will use the options set on the manager so you dont have to initialize it with options everytime.')
    try {
      this.tasks.run([
        {
          title: 'I will survive, dont worry',
          task: (): void => {
            throw new Error('This will not crash since exitOnError is set to false eventhough default setting in Listr is false.')
          }
        }
      ])
    } catch (e) {
      this.logger.fail(e)
    }

    this.logger.start('Access the errors on the last run as in a similar way.')
    this.logger.data(this.tasks.err.toString())

    this.logger.start('You can also access Listr directly in the same way.')
    this.logger.start('It is not the same manager instance, just a jumper function.')
    try {
      await this.tasks
        .newListr([
          {
            title: 'I will die now, goodbye my freinds.',
            task: (): void => {
              throw new Error('This will not crash since exitOnError is set to false eventhough default setting in Listr is false.')
            }
          }
        ])
        .run()
    } catch (e) {
      this.logger.fail(e)
    }

    this.logger.start('You can inject context directly to main instance.')
    this.tasks.ctx = { injected: true }
    await this.tasks.run([
      {
        title: 'I got the context',
        task: (ctx, task): void => {
          task.title = String(ctx.injected)
        }
      }
    ])

    this.logger.start('There is an embeded function of getting the run time, that can be useful in concurrent tasks.')
    this.tasks.run(
      [
        {
          task: async (ctx): Promise<void> => {
            // start the clock
            ctx.runTime = Date.now()
          }
        },
        {
          title: 'Running',
          task: async (): Promise<void> => {
            await delay(1000)
          }
        },
        {
          task: async (ctx, task): Promise<string> => task.title = this.tasks.getRuntime(ctx.runTime)
        }
      ],
      { concurrent: false }
    )
  }
}

new MyMainClass()
