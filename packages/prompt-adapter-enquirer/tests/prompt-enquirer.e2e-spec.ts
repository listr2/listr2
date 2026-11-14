import Enquirer from 'enquirer'
import { Listr, PromptError, delay } from 'listr2'

import { ListrEnquirerPromptAdapter } from '@root'
import { expectProcessOutputToMatchSnapshot, KEYS, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: prompt -> enquirer', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should render a prompt', async() => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(ctx, task): Promise<void> => {
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
    expectProcessOutputToMatchSnapshot(output)
  })

  it('should render multiple prompt', async() => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(ctx, task): Promise<void> => {
            const enquirer = new Enquirer()

            const started = (name: string): Promise<void> =>
              new Promise((resolve) => {
                const listener = (prompt: { name: string; once: (event: string, listener: () => void) => void }): void => {
                  if (prompt.name === name) {
                    enquirer.off('start', listener)
                    prompt.once('run', resolve)
                  }
                }

                enquirer.on('start', listener)
              })

            const first = started('first')
            const second = started('second')

            const output = task.prompt(ListrEnquirerPromptAdapter).run(
              [
                {
                  name: 'first',
                  type: 'Input',
                  message: 'Give me some input.'
                },

                {
                  name: 'second',
                  type: 'Select',
                  message: 'Give me more input.',
                  choices: ['test1', 'test2']
                }
              ],
              { enquirer }
            )

            await first

            process.stdin.emit('data', Buffer.from(`test${KEYS.ENTER}`))

            await second

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
    expectProcessOutputToMatchSnapshot(output)
  })

  it.skip('should run cancel callback', async() => {
    const ctx = new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(ctx, task): Promise<void> => {
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
    } catch(e: any) {
      err = e
    }

    expect(err).toStrictEqual(new PromptError('Cancelled prompt.'))
    expectProcessOutputToMatchSnapshot(output)
  })

  it('should use the passed in enquirer', async() => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(ctx, task): Promise<void> => {
            const output = task.prompt(ListrEnquirerPromptAdapter).run(
              {
                type: 'Input',
                message: 'Give me some input.'
              },
              { enquirer: new Enquirer() }
            )

            await delay(10)

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

    expect(ctx).toStrictEqual({ output: 'test' })
    expectProcessOutputToMatchSnapshot(output)
  })

  it('should use skip enquirer', async() => {
    const listr = new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(ctx, task): Promise<void> => {
            const result = task.prompt(ListrEnquirerPromptAdapter).run({
              type: 'Input',
              message: 'Give me some input.'
            })

            await delay(100)

            task.skip()

            ctx.output = await result
          }
        },

        {
          title: 'Another task.',
          task: async(): Promise<void> => {
            await delay(10)
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    )

    const ctx = await listr.run()

    // nothing answers the prompt, so it resolves only when skipping the task cancels it without throwing
    expect(ctx).toStrictEqual({ output: '' })
  })
})
