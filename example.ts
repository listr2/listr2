import delay from 'delay'
import { Observable } from 'rxjs'

import { Listr } from './src'

interface ListrCtx {
  yarn: boolean
  inside: string
  second: boolean
  hidden: boolean
  testInput: string
  prompt: {
    [name: string]: any
  }
}

async function main (): Promise<void> {

  const tasks = new Listr<ListrCtx>([
    {
      title: 'Concurrent sub test.',
      task: (): Listr => new Listr<ListrCtx>([
        {
          title: 'Promise with changing output. [1.5s]',
          task: async (ctx, task): Promise<void> => {
            ctx.inside = 'test'
            await delay(500)
            task.output = 'Dumping output.'

            await delay(500)
            task.output = 'Dumping more output.'

            await delay(500)
            task.title = 'I change the title now.'
          }

        },
        {
          title: 'Async task. [2s]',
          task: async (): Promise<void> => await delay(2000)
        }
      ], { concurrent: true })
    },
    {
      title: 'Task Skip test, with title and skip note. [1s]',
      task: async (ctx, task): Promise<void> => {
        await delay(1000)
        ctx.yarn = false
        task.title = 'Changed title succesfully.'
        task.skip('Showing skip message')
      }
    },
    {
      title: 'Context enabled via the top one fail. [1s]',
      enabled: (ctx): boolean => ctx.yarn === false,
      task: (): Promise<void> => delay(1000)
    },
    {
      title: 'Observable test.',
      task: (): Observable<string> =>
        new Observable((observer) => {
          observer.next('test')

          delay(1000)
            .then(() => {
              observer.next('changed')
              return delay(1000)
            })
            .then(() => {
              observer.complete()
            })
        })
    },
    {
      title: 'Throw error test',
      task:  async (): Promise<void> => {
        await delay(1000)
        throw new Error('I have failed.')
      }
    },
    {
      title: 'I will fail from inside.',
      task: (): Listr => new Listr([
        {
          title: 'I am going to fail.',
          task: (): void => {
            throw new Error('Oh noes, i failed already.')
          }
        }
      ])
    }
  ], { exitOnError: false })

  let ctx: ListrCtx
  try {
    ctx = await tasks.run()
  } catch (e) {
    console.error(e)
  }

  const tasks2 = new Listr<ListrCtx>([
    {
      title: 'Got the context variables from the first listr.',
      task: (ctx, task): void => {
        ctx.second = true
      }
    },
    {
      task: (ctx): Listr => new Listr<ListrCtx>([
        {
          title: 'If title is empty task will be hidden, but subtasks will be one level less indented.',
          task: async (): Promise<void> => {
            await delay(5000)
            ctx.hidden = false
          }
        },
        {
          task: async (): Promise<void> => {
            await delay(4500)
            ctx.hidden = true
          }
        }
      ], { concurrent: true }),
    },
    {
      task: (): Listr => new Listr<ListrCtx>([
        {
          task: async (ctx, task): Promise<void> => {
            await delay(500)
            task.output = 'I am outputting from a task without a title.'
            await delay(800)
            task.output = 'This will drop to the bottom bar instead.'
            await delay(1000)
            task.output = 'Last message.'
            await delay(1000)
          }
        },
        {
          task: async (ctx, task): Promise<void> => {
            await delay(600)
            task.output = 'Some output to bottom bar.'
            await delay(850)
            task.output = 'Pushing moreee.'
            await delay(1020)
          }
        },
        {
          title: 'I have a title but still can push to the bottom bar.',
          task: async (ctx, task): Promise<void> => {
            await delay(550)
            task.output = 'Still pushing some.'
            await delay(775)
            task.output = 'Multiple output.'
            await delay(995)
          },
          bottomBar: true
        }
      ], { concurrent: true })
    }

  ], { ctx })
  try {
    ctx = await tasks2.run()
  } catch (e) {
    console.error(e)
  }

  const tasks3 = new Listr<ListrCtx>([
    {
      task: async (ctx, task): Promise<any> => ctx.testInput = await task.prompt('Input', { message: 'test' })
    },
    {
      title: 'Dump prompt.',
      task: (ctx,task): void => {
        task.title = ctx.testInput
      }
    }
  ], { ctx, renderer: 'verbose' })

  try {
    ctx = await tasks3.run()
  } catch (e) {
    console.error(e)
  }

  console.log(ctx.testInput)
}

main()
