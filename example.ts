import * as delay from 'delay'
import { Observable } from 'rxjs'

import { Listr } from './src'

const tasks = new Listr([
  {
    title: 'Concurrent subtasks test.',
    task: (): Listr => {
      return new Listr([
        {
          title: 'Promise with changing output. [2s]',
          task: async (ctx, task): Promise<void> => {
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
    }
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
    title: 'Context enabled test',
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
      throw new Error('Package name already exists')
    }
  }
])

async function main (): Promise<void> { try {await tasks.run()} catch (e) { console.error(e) } }

main()
