import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('default renderer: show subtasks', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // 8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ
  it('should be able to change collapse settings', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'This is a subtask.',
                task: async (): Promise<void> => {}
              },

              {
                title: 'This is an another subtask.',
                task: async (): Promise<void> => {}
              }
            ])
        },

        {
          title: 'This task will execute.',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'This is a subtask.',
                  task: async (): Promise<void> => {}
                },

                {
                  title: 'This is an another subtask.',
                  task: async (): Promise<void> => {}
                }
              ],
              { rendererOptions: { collapse: false } }
            )
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true, collapse: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ')
  })
})
