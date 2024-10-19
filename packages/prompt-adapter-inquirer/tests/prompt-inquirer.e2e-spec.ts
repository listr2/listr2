import { AbortPromptError } from '@inquirer/core'
import { input } from '@inquirer/prompts'
import { Listr, delay } from 'listr2'

import { ListrInquirerPromptAdapter } from '@root'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { KEYS, RENDERER_SETUP, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: prompt -> inquirer', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should render a prompt', async() => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(ctx, task): Promise<void> => {
            const output = task.prompt(ListrInquirerPromptAdapter).run(input, {
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
    // expectProcessOutputToMatchSnapshot(output, 'zTXlHkwllFGUiGXlWztXAeZMvIleiEFF')
  })

  it('should be able to cancel a prompt', async() => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'This task will execute.',
            task: async(_, task): Promise<void> => {
              const prompt = task.prompt(ListrInquirerPromptAdapter)

              void delay(50).then(() => prompt.cancel())

              await prompt.run(input, {
                message: 'Give me some input.'
              })
            }
          }
        ],
        {
          concurrent: false,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e) {
      err = e as Error
    }

    expect(err).toEqual(new AbortPromptError({ cause: 'Prompt was canceled' }))
    // expectProcessOutputToMatchSnapshot(output, 'AABZsFFYgZITgdWMQdLGmxABwlBaXdiv')
  })
})
