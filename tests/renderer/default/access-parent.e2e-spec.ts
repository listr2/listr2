import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'
import type { MockProcessOutput } from '@tests/utils'

import { Listr } from '@root'

describe('default renderer: parent', () => {
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
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'nvFwliir81dQSzoa7xPXaq0E1lauH674')
  })
})
