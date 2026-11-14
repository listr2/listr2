import { Listr } from '#root'
import type { MockProcessOutput, RendererSetup } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '#tests/utils'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: task-skip', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should skip from internal function', async() => {
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

    await expectProcessOutputToMatchSnapshot(output, renderer)
  })

  it('should skip from context', async() => {
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

    await expectProcessOutputToMatchSnapshot(output, renderer)
  })

  it('skip from function', async() => {
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
          skip: (ctx): string | boolean => (ctx.skip ? 'I will be skipped!' : false),
          task: (): void => {}
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, renderer)
  })
})
