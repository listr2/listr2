/* eslint-disable @typescript-eslint/no-empty-function */
import type { MockProcessOutput } from '@tests/utils'
import { delay, expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'
import type { RendererSetup } from '@tests/utils/renderer-map.constants'
import { RENDERER_SETUP } from '@tests/utils/renderer-map.constants'

import { Listr } from '@root'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: show subtasks', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR
  it('should create a set of subtasks', async () => {
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
                title: 'This is a subtask.',
                task: async (): Promise<void> => {}
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

    expectProcessOutputToMatchSnapshot(output, 'JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR')
  })

  // 3ygUxrTkCDLDfDrXzF1ocWR6626jaL0k
  it('should be able to change concurrency setting in subtask, second subtask should finish first', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'This is a subtask.',
                  task: async (): Promise<void> => {
                    await delay(10)
                  }
                },

                {
                  title: 'This is an another subtask.',
                  task: async (): Promise<void> => {}
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

    expectProcessOutputToMatchSnapshot(output, '3ygUxrTkCDLDfDrXzF1ocWR6626jaL0k')
  })

  // 12ttDlnth5pr1YuJEnfXm3I2CzRbcFlY
  it('should be able to change exit on error', async () => {
    try {
      await new Listr(
        [
          {
            title: 'This task will execute and not quit on errors.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This is a subtask.',
                    task: async (): Promise<void> => {
                      throw new Error('I have failed [0]')
                    }
                  },
                  {
                    title: 'This is an another subtask.',
                    task: async (): Promise<void> => {
                      throw new Error('I have failed [1]')
                    }
                  },
                  {
                    title: 'This is yet an another subtask.',
                    task: async (_, task): Promise<void> => {
                      task.title = 'I have succeeded.'
                    }
                  }
                ],
                { exitOnError: false }
              )
          },
          {
            title: 'This task will execute.',
            task: (): void => {
              throw new Error('exit')
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e: any) {
      expect(e).toBeTruthy()
    }

    expectProcessOutputToMatchSnapshot(output, '12ttDlnth5pr1YuJEnfXm3I2CzRbcFlY')
  })
})
