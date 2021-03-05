import delay from 'delay'

import { Listr } from '@root/index'

async function main (): Promise<void> {
  await new Listr(
    [
      {
        title: 'Some type errors',
        task: async (_, task): Promise<void> => {
          await delay(1000)
          task.output = 'test'

          await delay(1000)
          if (typeof task.isRetrying() === 'number') {
            task.output = `I am self aware that I am retrying for the ${task.isRetrying()}th time.`
          }

          await delay(1000)
          throw new Error('This type can not be assigned to type with, oh noes')
        },
        retry: 3
      }
    ],
    { exitOnError: false }
  ).run()
}

main()
