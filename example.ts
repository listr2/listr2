import * as delay from 'delay'
import { Observable } from 'rxjs'

import { Listr } from './src'

interface ListrCtx {
  yarn: boolean
  inside: string
  second: boolean
  prompt: {
    test: {
      [name: string]: string
    }
  }
}

async function main (): Promise<void> {
  const tasks = new Listr<ListrCtx>([
    {
      title: 'Concurrent subtasks test.',
      task: (): Listr => new Listr<ListrCtx>([
        {
          title: 'Promise with changing output. [2s]',
          task: async (ctx, task): Promise<void> => {
            ctx.inside = 'test'
            await delay(1000)
            task.output = 'Dumping output.'

            await delay(1000)
            task.output = 'Dumping more output.'

            await delay(1000)
            task.title = 'I change the title now.'
          }

        },
        {
          title: 'Async task. [5s]',
          task: async (): Promise<void> => await delay(5000)
        }
      ], { concurrent: true })
    },
    {
      title: 'Task Skip test, with title and skip note. [2s]',
      task: async (ctx, task): Promise<void> => {
        await delay(2000)
        ctx.yarn = false
        task.title = 'Changed title succesfully.'
        task.skip('Showing skip message')
      }
    },
    {
      title: 'Context enabled via the top one fail.',
      enabled: (ctx): boolean => ctx.yarn === false,
      task: (): Promise<void> => delay(3000)
    },
    {
      title: 'Observable from promise test',
      task: async (): Promise<Observable<string>> => {
        await delay(2000)
        return new Observable((observer) => {
          observer.next('i am testing myself')

          delay(2000).then(() => {
            observer.next('7 passed')
          }).then(() => { delay(2000)}).then(() => {
            observer.complete()
          })
        })
      }
    },
    {
      title: 'Throw error test',
      task:  async (): Promise<void> => {
        await delay(1000)
        throw new Error('Package name already exists.')
      }
    }
  ], {  })
  const ctx = await tasks.run()
  console.log(ctx)

  const tasks2 = new Listr<ListrCtx>([
    {
      title: 'Yarn is not enabled in first context.',
      task: (ctx, task): void => {
        task.title = 'Got the context variables from the first listr.'
        ctx.second = true
      }
    },
    {
      title: 'Testing second level object.',
      task: (ctx, task): void => {
        ctx.prompt.test = { somekey: 'test' }
      }
    }
  ], { ctx })
  const ctx2 = await tasks2.run()
  console.log(ctx2)
}

main()
