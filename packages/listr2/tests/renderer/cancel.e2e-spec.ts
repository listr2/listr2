import { delay, Listr } from '@root'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'

// keeps a task in-flight until the interruption races it out, without leaving a real timer alive past the test
const hang = (): Promise<void> => new Promise<void>(() => undefined)

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: cancel', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // Cn7xKp2RtLm4Wq8YvB0ZsJ5dF3gH9aE
  it('should render cancelled and rolled back tasks on interruption', async() => {
    await new Listr(
      [
        {
          title: 'This task will trigger the interruption.',
          task: async(_, task): Promise<void> => {
            await delay(50)

            task.cancel()

            await hang()
          }
        },
        {
          title: 'This task will roll back.',
          task: async(): Promise<void> => {
            await hang()
          },
          rollback: async(_, task): Promise<void> => {
            task.title = 'This task has rolled back.'
          }
        },
        {
          title: 'This task will be cancelled.',
          task: async(): Promise<void> => {
            await hang()
          }
        }
      ],
      {
        concurrent: true,
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'Cn7xKp2RtLm4Wq8YvB0ZsJ5dF3gH9aE')
  })

  // Nx4Jm8QrTp2WkD6cV0PbL5YfS9gH3aBz
  it('should render a cancelled subtask tree on interruption', async() => {
    await new Listr(
      [
        {
          title: 'This parent will be cancelled.',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'This subtask will trigger the interruption.',
                  task: async(_, task): Promise<void> => {
                    await delay(50)

                    task.cancel()

                    await hang()
                  }
                },
                {
                  title: 'This subtask will be cancelled.',
                  task: async(): Promise<void> => {
                    await hang()
                  }
                }
              ],
              { concurrent: true }
            )
        }
      ],
      {
        concurrent: false,
        renderer,
        rendererOptions
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'Nx4Jm8QrTp2WkD6cV0PbL5YfS9gH3aBz')
  })
})
