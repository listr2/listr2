import { PassThrough } from 'stream'

import { Listr, ListrLogger, ProcessOutput } from '@root'

describe('default renderer: wrap width from configured stream', () => {
  const message = 'THIS IS A LONG LONG MESSAGE '.repeat(12).trim()

  it('should derive the wrap width from the logger stream instead of process.stdout', async() => {
    const columns = process.stdout.columns

    process.stdout.columns = 80

    const stream = new PassThrough() as unknown as NodeJS.WriteStream

    stream.columns = 200

    const chunks: string[] = []

    stream.on('data', (chunk) => chunks.push(chunk.toString()))

    const logger = new ListrLogger({ processOutput: new ProcessOutput(stream, stream) })

    await new Listr(
      [
        {
          title: 'This task will wrap its output.',
          task: async(_, task): Promise<void> => {
            task.output = message
          }
        }
      ],
      {
        forceTTY: true,
        rendererOptions: {
          lazy: true,
          formatOutput: 'wrap',
          logger
        },
        fallbackRendererOptions: { logger }
      }
    ).run()

    process.stdout.columns = columns

    const widest = chunks
      .join('')
      // eslint-disable-next-line no-control-regex
      .replace(/\[[0-9;]*[A-Za-z]/g, '')
      .split('\n')
      .reduce((max, line) => Math.max(max, line.length), 0)

    expect(widest).toBeGreaterThan(80)
  })
})
