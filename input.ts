import delay from 'delay'

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
  let ctx: ListrCtx
  const tasks3 = new Listr<ListrCtx>([
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
        },
        {
          title: 'Getting some input',
          task: async (ctx, task): Promise<any> => task.prompt('Input', { message: 'test' })
        },
        {
          title: 'Dump prompt concurrent.',
          task: (ctx,task): void => {
            task.title = `asdasda ${ctx.testInput}`
          }
        }
      ], { concurrent: false, exitOnError: true })
    },
    {
      title: 'Dump prompt.',
      task: (ctx,task): void => {
        task.title = ctx.testInput
      }
    }
  ], { ctx, renderer: 'default' })

  try {
    ctx = await tasks3.run()
  } catch (e) {
    console.error(e.message)
  }

  console.log(ctx.testInput)
}

main()