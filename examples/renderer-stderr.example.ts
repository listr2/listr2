import { delay, Listr, ListrLogger, ProcessOutput } from 'listr2'

try {
  await new Listr(
    [
      {
        title: 'This task will execute.',
        task: async (_, task): Promise<void> => {
          task.output = 'I will push an output. [0]'
          await delay(500)

          task.output = 'I will push an output. [1]'
          await delay(500)

          task.output = 'I will push an output. [2]'
          await delay(500)
        }
      }
    ],
    { renderer: 'default', rendererOptions: { logger: new ListrLogger({ processOutput: new ProcessOutput(process.stderr, process.stderr) }) } }
  ).run()
} catch (e: any) {
  // eslint-disable-next-line no-console
  console.error(e)
}
