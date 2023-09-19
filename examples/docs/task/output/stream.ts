import { spawn } from 'child_process'
import { Listr } from 'listr2'
import type { Readable } from 'stream'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<Readable> => {
        return spawn('ls').stdout
      },
      rendererOptions: {
        persistentOutput: true
      }
    }
  ],
  { concurrent: false }
)

await tasks.run()
