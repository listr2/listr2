import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'
import { Listr } from 'listr2'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: output', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // rMG224TBrLk3ocYtKidc1D4AyZtEHm11
  it('should yield example output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          }
        }
      ],
      {
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'rMG224TBrLk3ocYtKidc1D4AyZtEHm11')
  })
})
