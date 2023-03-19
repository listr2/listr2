import { delay } from '@tests/utils'
import { Listr } from 'listr2'

interface Ctx {
  input: boolean
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<void> => {
        // Cancel the prompt after 5 seconds
        void delay(5000).then(() => task.cancelPrompt())

        ctx.input = await task.prompt({
          type: 'Input',
          message: 'Give me input before it disappears.'
        })
      }
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
