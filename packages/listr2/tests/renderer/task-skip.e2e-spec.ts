import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'
import { Listr } from 'listr2'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: task-skip', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F
  it('should skip from internal function', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): void => {
            task.skip('I am skipping this tasks for reasons.')
          }
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F')
  })

  // 8KLp76vGVlGdzoy4HztCYcYe2coxpO7e
  it('should skip from context', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx): void => {
            ctx.skip = true
          }
        },

        {
          title: 'This task will never execute.',
          skip: (ctx): boolean => ctx.skip,
          task: (): void => {}
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '8KLp76vGVlGdzoy4HztCYcYe2coxpO7e')
  })

  // BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK
  it('skip from function', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx): void => {
            ctx.skip = true
          }
        },

        {
          title: 'This task will never execute.',
          skip: (ctx): string | boolean => ctx.skip ? 'I will be skipped!' : false,
          task: (): void => {}
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK')
  })
})
