/* eslint-disable @typescript-eslint/no-empty-function */
import type { MockProcessOutput } from '@tests/utils'
import { delay, expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

import { Listr } from '@root'

describe('show subtasks', () => {
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
        rendererOptions: { lazy: true }
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
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '3ygUxrTkCDLDfDrXzF1ocWR6626jaL0k')
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
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e: any) {
      expect(e).toBeTruthy()
    }

    expectProcessOutputToMatchSnapshot(output, '12ttDlnth5pr1YuJEnfXm3I2CzRbcFlY')
  })

  // 9VMxFnaAKNjetcT1a9gLgN0dnasB7BRc
  it('should be able to render subtasks with no title with correct indentation', async () => {
    try {
      await new Listr(
        [
          {
            title: 'This task will execute.',
            task: (_, task): void => {
              task.output = 'output'
              task.output = 'some more output'
              task.output = 'even more output'
            },
            options: {
              bottomBar: Infinity,
              persistentOutput: true
            }
          },

          {
            title: 'This task will execute a task without titles.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    task: async (): Promise<void> => {}
                  },
                  {
                    task: async (): Promise<void> => {}
                  },
                  {
                    task: async (): Promise<void> => {}
                  }
                ],
                { exitOnError: false }
              )
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e: any) {
      expect(e).toBeTruthy()
    }

    expectProcessOutputToMatchSnapshot(output, '9VMxFnaAKNjetcT1a9gLgN0dnasB7BRc')
  })

  // oGL7rWlMEOEDNqOOFgj2R9ilvahlLAuR
  it.each([ [ true, false ] ])('should output the task error in parent task with collapseErrors: %s and show subtasks: false', async (cases) => {
    try {
      await new Listr(
        [
          {
            title: 'This task will execute.',
            task: (_, task): Listr =>
              task.newListr([
                {
                  title: 'This is a subtask.',
                  task: async (): Promise<void> => {
                    throw new Error('bye')
                  }
                },

                {
                  title: 'This is a subtask.',
                  task: async (): Promise<void> => {}
                }
              ])
          }
        ],
        {
          concurrent: true,
          exitOnError: true,
          rendererOptions: {
            lazy: true,
            showSubtasks: false,
            collapseErrors: cases
          }
        }
      ).run()
    } catch (e: any) {
      expect(e).toBeTruthy()
    }

    expectProcessOutputToMatchSnapshot(output, 'oGL7rWlMEOEDNqOOFgj2R9ilvahlLAuR')
  })

  // bcaTpU40igebiNC4Koho5ObSuJxhYPsJ
  it.each([ true, false ])('should output the task error in parent task with: collapseErrors: %s showsubtasks: true', async (cases) => {
    try {
      await new Listr(
        [
          {
            title: 'This task will execute.',
            task: (_, task): Listr =>
              task.newListr([
                {
                  title: 'This is a subtask.',
                  task: async (): Promise<void> => {
                    throw new Error('bye')
                  }
                },

                {
                  title: 'This is a subtask.',
                  task: async (): Promise<void> => {}
                }
              ])
          }
        ],
        {
          concurrent: true,
          exitOnError: true,
          rendererOptions: {
            lazy: true,
            showSubtasks: true,
            collapseErrors: cases
          }
        }
      ).run()
    } catch (e: any) {
      expect(e).toBeTruthy()
    }

    expectProcessOutputToMatchSnapshot(output, 'bcaTpU40igebiNC4Koho5ObSuJxhYPsJ')
  })
})
