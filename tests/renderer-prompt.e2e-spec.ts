/* eslint-disable no-empty */
import delay from 'delay'
import * as Enquirer from 'enquirer'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

enum KEYS {
  ENTER = '\x0D',
  CTRL_C = '\x03'
}

describe('show output from task', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
    jest.clearAllMocks()
  })

  // WdiO5CUfBLf5hMlp9sPct5973YhRlnLz
  it('should render a prompt', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt({
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
        rendererOptions: { lazy: true }
      }
    ).run()

    expect(ctx.output).toBe('test')
    expect(mockStdout.mock.calls).toMatchSnapshot('WdiO5CUfBLf5hMlp9sPct5973YhRlnLz-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('WdiO5CUfBLf5hMlp9sPct5973YhRlnLz-err')
    expect(mockExit.mock.calls).toMatchSnapshot('WdiO5CUfBLf5hMlp9sPct5973YhRlnLz-exit')
  })

  // ZyUB9J2StmYMasXkHsMgjyszR4n0vvi9
  it('should render multiple prompt', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt([
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

            await delay(10)

            process.stdin.emit('data', Buffer.from(`test${KEYS.ENTER}`))

            await delay(10)

            process.stdin.emit('data', Buffer.from(KEYS.ENTER))

            ctx.output = await output
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expect(ctx.output).toStrictEqual({ first: 'test', second: 'test1' })
    expect(mockStdout.mock.calls).toMatchSnapshot('ZyUB9J2StmYMasXkHsMgjyszR4n0vvi9-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('ZyUB9J2StmYMasXkHsMgjyszR4n0vvi9-err')
    expect(mockExit.mock.calls).toMatchSnapshot('ZyUB9J2StmYMasXkHsMgjyszR4n0vvi9-exit')
  })

  // HaNF6mQO2FvhOQe4bPQRBRhk9MS9lx9w
  it('should run cancel callback', async () => {
    const ctx = new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const output = task.prompt({
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
        rendererOptions: { lazy: true }
      }
    )

    let err: Error | undefined
    try {
      await ctx.run()
    } catch (e) {
      err = e
    }

    expect(err).toStrictEqual(new Error('Cancelled prompt.'))
    expect(mockStdout.mock.calls).toMatchSnapshot('HaNF6mQO2FvhOQe4bPQRBRhk9MS9lx9w-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('HaNF6mQO2FvhOQe4bPQRBRhk9MS9lx9w-err')
    expect(mockExit.mock.calls).toMatchSnapshot('HaNF6mQO2FvhOQe4bPQRBRhk9MS9lx9w-exit')
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
            const output = task.prompt({
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
        rendererOptions: { lazy: true },
        injectWrapper: { enquirer: new Enquirer() }
      }
    ).run()

    expect(ctx).toStrictEqual({ output: 'test' })
    expect(mockStdout.mock.calls).toMatchSnapshot('t3VXfqT0crsCYRzqYYWZGllN6oNARZcn-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('t3VXfqT0crsCYRzqYYWZGllN6oNARZcn-err')
    expect(mockExit.mock.calls).toMatchSnapshot('t3VXfqT0crsCYRzqYYWZGllN6oNARZcn-exit')
  })

  // 8QRF9bQEdSKkH62yUKbteKnrpevTbGan
  it('should use skip enquirer', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            delay(10).then(() => task.skip())
            ctx.output = await task.prompt({
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
        rendererOptions: { lazy: true }
      }
    ).run()

    expect(ctx).toStrictEqual({ output: '' })
    expect(mockStdout.mock.calls).toMatchSnapshot('8QRF9bQEdSKkH62yUKbteKnrpevTbGan-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('8QRF9bQEdSKkH62yUKbteKnrpevTbGan-err')
    expect(mockExit.mock.calls).toMatchSnapshot('8QRF9bQEdSKkH62yUKbteKnrpevTbGan-exit')
  })
})
