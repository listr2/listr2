import { delay, Listr, ListrLogger, ProcessOutput } from 'listr2'

const logger = new ListrLogger({ processOutput: new ProcessOutput(process.stderr, process.stderr) })

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async(_, task): Promise<void> => {
        task.output = 'the live frames render on stderr'

        await delay(500)
      }
    }
  ],
  {
    forceTTY: true,
    rendererOptions: { logger },
    fallbackRendererOptions: { logger }
  }
)

await tasks.run()

process.stdout.write(JSON.stringify({ result: 'stdout stays clean and pipeable' }))
