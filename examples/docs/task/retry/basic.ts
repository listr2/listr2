import { delay } from '@tests/utils'
import { Listr } from 'listr2'

interface Ctx {
  output: string
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'Some type errors',
      task: async (_, task): Promise<void> => {
        await delay(1000)
        task.output = 'test'

        await delay(1000)
        throw new Error('This type can not be assigned to type with, oh noes')
      },
      retry: 3
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

const context = await tasks.run()
