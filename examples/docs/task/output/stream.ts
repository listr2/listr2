import { spawn } from 'child_process'
import type { Readable } from 'stream'

import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<Readable> => {
        return spawn('ls').stdout
      },
      options: {
        persistentOutput: true
      }
    }
  ],
  { concurrent: false }
)

await tasks.run()
