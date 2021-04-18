import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('show rollback', () => {
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

  // 4SIhMkI14b8s2hW1esiORoa1UINGHwAr
  it('should rollback the main task if any of the subtasks fail', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      await delay(10)
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
                { exitOnError: true }
              ),
            rollback: async (_, task): Promise<void> => {
              task.title = 'I am trying to rollback stuff, previous action failed.'

              await delay(10)

              task.title = 'Some actions required rollback stuff.'
            }
          },

          {
            title: 'This task will never execute.',
            task: async (_, task): Promise<void> => {
              await delay(10)

              task.title = 'This task executed unlike expected.'
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
    expect(mockStdout.mock.calls).toMatchSnapshot('4SIhMkI14b8s2hW1esiORoa1UINGHwAr-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('4SIhMkI14b8s2hW1esiORoa1UINGHwAr-err')
    expect(mockExit.mock.calls).toMatchSnapshot('4SIhMkI14b8s2hW1esiORoa1UINGHwAr-exit')
  })

  // vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx
  it('should rollback the subtask if the subtask itself fails', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      await delay(10)
                      throw new Error('This task failed after 2 seconds.')
                    },
                    rollback: async (_, task): Promise<void> => {
                      task.title = 'I am trying to rollback stuff, previous action failed.'

                      await delay(10)

                      task.title = 'Some actions required rollback stuff.'
                    }
                  },
                  {
                    title: 'This task will execute.',
                    task: (_, task): void => {
                      task.title = 'I will change my title if this executes.'
                    }
                  }
                ],
                { exitOnError: true }
              )
          },
          {
            title: 'This task will never execute.',
            task: async (_, task): Promise<void> => {
              await delay(10)

              task.title = 'This task executed unlike expected.'
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
    expect(mockStdout.mock.calls).toMatchSnapshot('vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx-err')
    expect(mockExit.mock.calls).toMatchSnapshot('vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx-exit')
  })

  // 0IT1rYAGLTZ6UNfsxrJCFMik9UrnEd7A
  it.each([ true, false ])('should both stop the execution with exitOnError %s since exitAfterRollback is independent', async (cases) => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      await delay(10)
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
                { exitOnError: true, concurrent: false }
              ),
            rollback: async (_, task): Promise<void> => {
              task.title = 'I am trying to rollback stuff, previous action failed.'

              await delay(10)

              task.title = 'Some actions required rollback stuff.'
            }
          },
          {
            title: 'This task will maybe execute.',
            task: async (_, task): Promise<void> => {
              await delay(10)

              task.title = 'This task is executed unlike expected.'
            }
          }
        ],
        {
          concurrent: false,
          exitAfterRollback: true,
          exitOnError: cases,
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      err = e
    }

    if (cases) {
      expect(err).toBeTruthy()
    } else {
      expect(err).toBeFalsy()
    }
    expect(mockStdout.mock.calls).toMatchSnapshot('0IT1rYAGLTZ6UNfsxrJCFMik9UrnEd7A-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('0IT1rYAGLTZ6UNfsxrJCFMik9UrnEd7A-err')
    expect(mockExit.mock.calls).toMatchSnapshot('0IT1rYAGLTZ6UNfsxrJCFMik9UrnEd7A-exit')
  })

  // 1cj9pfWF3xjiEk2FW1Rt13qVcfSY9sR8
  it.each([ true, false ])('should contunie execution or stop there with exitAfterRollback: %s', async (cases) => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      await delay(10)
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
                { exitOnError: true }
              ),
            rollback: async (_, task): Promise<void> => {
              task.title = 'I am trying to rollback stuff, previous action failed.'

              await delay(10)

              task.title = 'Some actions required rollback stuff.'
            }
          },
          {
            title: 'This task will maybe execute.',
            task: async (): Promise<void> => {
              await delay(10)
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          exitAfterRollback: cases,
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      err = e
    }

    if (cases) {
      expect(err).toBeTruthy()
    } else {
      expect(err).toBeFalsy()
    }
    expect(mockStdout.mock.calls).toMatchSnapshot('1cj9pfWF3xjiEk2FW1Rt13qVcfSY9sR8-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('1cj9pfWF3xjiEk2FW1Rt13qVcfSY9sR8-err')
    expect(mockExit.mock.calls).toMatchSnapshot('1cj9pfWF3xjiEk2FW1Rt13qVcfSY9sR8-exit')
  })
})
