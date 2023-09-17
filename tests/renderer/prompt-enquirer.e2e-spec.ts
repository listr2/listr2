import Enquirer from 'enquirer'

import { Listr, ListrEnquirerPromptAdapter, PromptError, delay } from '@root'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, KEYS, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: prompt -> enquirer', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // WdiO5CUfBLf5hMlp9sPct5973YhRlnLz
  it('should render a prompt', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt(ListrEnquirerPromptAdapter).run({
              type: 'Input',
              message: 'Give me some input.'
            })

            await delay(50)

            process.stdin.emit('data', Buffer.from(`test${KEYS.ENTER}`))

            ctx.output = await output
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expect(ctx.output).toBe('test')
    expectProcessOutputToMatchSnapshot(output, 'WdiO5CUfBLf5hMlp9sPct5973YhRlnLz')
  })

  // ZyUB9J2StmYMasXkHsMgjyszR4n0vvi9
  it('should render multiple prompt', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt(ListrEnquirerPromptAdapter).run([
              {
                name: 'first',
                type: 'Input',
                message: 'Give me some input.'
              },

              {
                name: 'second',
                type: 'Select',
                message: 'Give me more input.',
                choices: [ 'test1', 'test2' ]
              }
            ])

            await delay(50)

            process.stdin.emit('data', Buffer.from(`test${KEYS.ENTER}`))

            await delay(50)

            process.stdin.emit('data', Buffer.from(KEYS.ENTER))

            ctx.output = await output
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expect(ctx.output).toStrictEqual({ first: 'test', second: 'test1' })
    expectProcessOutputToMatchSnapshot(output, 'ZyUB9J2StmYMasXkHsMgjyszR4n0vvi9')
  })

  // HaNF6mQO2FvhOQe4bPQRBRhk9MS9lx9w
  it('should run cancel callback', async () => {
    const ctx = new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt(ListrEnquirerPromptAdapter).run({
              type: 'Input',
              message: 'Give me some input.'
            })

            await delay(10)

            process.stdin.emit('data', Buffer.from(KEYS.CTRL_C))

            ctx.output = await output
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    )

    let err: Error

    try {
      await ctx.run()
    } catch (e: any) {
      err = e
    }

    expect(err).toStrictEqual(new PromptError('Cancelled prompt.'))
    expectProcessOutputToMatchSnapshot(output, 'HaNF6mQO2FvhOQe4bPQRBRhk9MS9lx9w')
  })

  // it('should run passed in cancel callback', async () => {
  //   expect(
  //     Promise.all([
  //       createPrompt({
  //         type: 'Input',
  //         message: 'Give me some input.'
  //       }, {
  //         cancelCallback: () => {
  //           throw new Error('test')
  //         },
  //         stdout: process.stdout
  //       }),
  //       delay(10).then(() => { process.stdin.emit('data', Buffer.from(KEYS.CTRL_C)) })
  //     ])
  //   ).rejects.toThrowError('test')
  // })

  // it('should run throw error from prompt', async () => {
  //   expect(
  //     Promise.all([
  //       createPrompt({
  //         type: 'Input',
  //         message: 'Give me some input.'
  //       }, {
  //         error: true,
  //         stdout: process.stdout
  //       }),
  //       delay(10).then(() => { process.stdin.emit('data', Buffer.from(KEYS.CTRL_C)) })
  //     ])
  //   ).rejects.toThrowError('Cancelled prompt.')
  // })

  // t3VXfqT0crsCYRzqYYWZGllN6oNARZcn
  it('should use the passed in enquirer', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt(ListrEnquirerPromptAdapter).run({
              type: 'Input',
              message: 'Give me some input.'
            })

            await delay(10)

            process.stdin.emit('data', Buffer.from(`test${KEYS.ENTER}`))

            ctx.output = await output
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions,
        injectWrapper: { enquirer: new Enquirer() }
      }
    ).run()

    expect(ctx).toStrictEqual({ output: 'test' })
    expectProcessOutputToMatchSnapshot(output, 't3VXfqT0crsCYRzqYYWZGllN6oNARZcn')
  })

  // 8QRF9bQEdSKkH62yUKbteKnrpevTbGan
  it('should use skip enquirer', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            delay(10)
              .then(() => task.skip())
              .catch(() => {})

            ctx.output = await task.prompt(ListrEnquirerPromptAdapter).run({
              type: 'Input',
              message: 'Give me some input.'
            })
          }
        },

        {
          title: 'Another task.',
          task: async (): Promise<void> => {
            await delay(10)
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expect(ctx).toStrictEqual({ output: '' })
    expectProcessOutputToMatchSnapshot(output, '8QRF9bQEdSKkH62yUKbteKnrpevTbGan')
  })
})
