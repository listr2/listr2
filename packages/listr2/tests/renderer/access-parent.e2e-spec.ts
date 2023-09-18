import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'
import { Listr } from 'listr2'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: parent task access', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // nvFwliir81dQSzoa7xPXaq0E1lauH674
  it('should be able to change the title of parent from subtask', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): Listr =>
            task.newListr((parent) => [
              {
                title: 'This is a subtask.',
                task: async (): Promise<void> => {
                  parent.title = 'Title changed from subtask.'
                }
              },

              {
                title: 'This is a subtask.',
                task: async (): Promise<void> => Promise.resolve()
              }
            ])
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'nvFwliir81dQSzoa7xPXaq0E1lauH674')
  })
})
