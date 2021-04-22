import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('show throw error', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
    jest.clearAllMocks()
  })

  // vxSr6uKuGeO4iX7r2j2Uo9SYlXRhz6nf
  it('should throw out an error', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              await delay(20)
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
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeTruthy()
    expect(mockStdout.mock.calls).toMatchSnapshot('vxSr6uKuGeO4iX7r2j2Uo9SYlXRhz6nf-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('vxSr6uKuGeO4iX7r2j2Uo9SYlXRhz6nf-err')
    expect(mockExit.mock.calls).toMatchSnapshot('vxSr6uKuGeO4iX7r2j2Uo9SYlXRhz6nf-exit')
  })

  // OgQG0pbo8qgn5ZD8TLdlzM3HnnnYoozl
  it('should not throw out an error when exitonerror is disabled', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              await delay(20)
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
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeFalsy()
    expect(mockStdout.mock.calls).toMatchSnapshot('OgQG0pbo8qgn5ZD8TLdlzM3HnnnYoozl-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('OgQG0pbo8qgn5ZD8TLdlzM3HnnnYoozl-err')
    expect(mockExit.mock.calls).toMatchSnapshot('OgQG0pbo8qgn5ZD8TLdlzM3HnnnYoozl-exit')
  })

  // HUHzWgxW8O1FGgEisITyBb2eDKzmyhUO
  it('should change exit on error per subtask', async () => {
    let err: Error | undefined
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
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeTruthy()
    expect(mockStdout.mock.calls).toMatchSnapshot('HUHzWgxW8O1FGgEisITyBb2eDKzmyhUO-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('HUHzWgxW8O1FGgEisITyBb2eDKzmyhUO-err')
    expect(mockExit.mock.calls).toMatchSnapshot('HUHzWgxW8O1FGgEisITyBb2eDKzmyhUO-exit')
  })

  // H2KTg7q5F1kWMtrPFdOERVSZc3UT2IsM
  it('should contain errors from failed tasks', async () => {
    let err: Error | undefined
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
        rendererOptions: { lazy: true }
      }
    )

    try {
      await task.run()
    } catch (e) {
      err = e
    }

    expect(err).toBeTruthy()
    expect(task.err).toMatchSnapshot('H2KTg7q5F1kWMtrPFdOERVSZc3UT2IsM')
  })

  // 03IyrStkPGQBIcbYM0HQXoYQxDEVZu8H
  it('should throw out an error in the data field with collapse errors false', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              await delay(20)
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
          rendererOptions: { lazy: true, collapseErrors: false }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeTruthy()
    expect(mockStdout.mock.calls).toMatchSnapshot('03IyrStkPGQBIcbYM0HQXoYQxDEVZu8H-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('03IyrStkPGQBIcbYM0HQXoYQxDEVZu8H-err')
    expect(mockExit.mock.calls).toMatchSnapshot('03IyrStkPGQBIcbYM0HQXoYQxDEVZu8H-exit')
  })

  // lnjpjmnHOxRSKy9J6YCMtqSAsVkHC3mH
  it('should show the default task title when failed with showErrorMessage of', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              await delay(20)
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
          rendererOptions: { lazy: true, showErrorMessage: false }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeTruthy()
    expect(mockStdout.mock.calls).toMatchSnapshot('lnjpjmnHOxRSKy9J6YCMtqSAsVkHC3mH-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('lnjpjmnHOxRSKy9J6YCMtqSAsVkHC3mH-err')
    expect(mockExit.mock.calls).toMatchSnapshot('lnjpjmnHOxRSKy9J6YCMtqSAsVkHC3mH-exit')
  })

  it.each([ true, false ])('should disable exitOnError from task level while: %s', async (exitOnError) => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async (): Promise<void> => {
              await delay(20)
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
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      err = e
    }

    if (exitOnError) {
      expect(err).toBeTruthy()
    } else {
      expect(err).toBeFalsy()
    }

    expect(mockStdout.mock.calls).toMatchSnapshot('Y9ADBbD3GX6P6HIKGTdeHybvNK4OPw37-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('Y9ADBbD3GX6P6HIKGTdeHybvNK4OPw37-err')
    expect(mockExit.mock.calls).toMatchSnapshot('Y9ADBbD3GX6P6HIKGTdeHybvNK4OPw37-exit')
  })
})
