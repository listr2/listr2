import { Listr } from '@root'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: error handling', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // vxSr6uKuGeO4iX7r2j2Uo9SYlXRhz6nf
  it('should throw out an error', async () => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              throw new Error('This task failed after 2 seconds.')
            }
          },
          {
            title: 'This task will never execute.',
            task: (_, task): void => {
              task.title = 'I will change my title if this executes.'
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
      err = e
    }

    expect(err).toBeTruthy()
    expectProcessOutputToMatchSnapshot(output, 'vxSr6uKuGeO4iX7r2j2Uo9SYlXRhz6nf')
  })

  // OgQG0pbo8qgn5ZD8TLdlzM3HnnnYoozl
  it('should not throw out an error when exitonerror is disabled', async () => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              throw new Error('This task failed after 2 seconds.')
            }
          },
          {
            title: 'This task will execute.',
            task: (_, task): void => {
              task.title = 'I will change my title if this executes.'
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: false,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    expect(err).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, 'OgQG0pbo8qgn5ZD8TLdlzM3HnnnYoozl')
  })

  // HUHzWgxW8O1FGgEisITyBb2eDKzmyhUO
  it('should change exit on error per subtask', async () => {
    let err: Error

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
              throw new Error('I will exit on error since I am a direct child of parent task.')
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
      err = e
    }

    expect(err).toBeTruthy()
    expectProcessOutputToMatchSnapshot(output, 'HUHzWgxW8O1FGgEisITyBb2eDKzmyhUO')
  })

  // H2KTg7q5F1kWMtrPFdOERVSZc3UT2IsM
  it('should contain errors from failed tasks', async () => {
    let err: Error
    const task: Listr<any, any, any> = new Listr(
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
            throw new Error('I will exit on error since I am a direct child of parent task.')
          }
        }
      ],
      {
        concurrent: false,
        exitOnError: true,
        renderer,
        rendererOptions
      }
    )

    try {
      await task.run()
    } catch (e: any) {
      err = e
    }

    expect(err).toBeTruthy()
    expect(task.errors).toMatchSnapshot('H2KTg7q5F1kWMtrPFdOERVSZc3UT2IsM')
  })

  it.each([ true, false ])('should disable exitOnError from task level while: %s', async (exitOnError) => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              throw new Error('This task failed after 2 seconds.')
            },
            exitOnError
          },
          {
            title: 'This task will maybe execute.',
            task: (_, task): void => {
              task.title = 'I will change my title if this executes.'
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
      err = e
    }

    if (exitOnError) {
      expect(err).toBeTruthy()
    } else {
      expect(err).toBeFalsy()
    }

    expectProcessOutputToMatchSnapshot(output, 'Y9ADBbD3GX6P6HIKGTdeHybvNK4OPw37')
  })
})
