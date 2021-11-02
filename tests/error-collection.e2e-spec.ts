import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { ListrErrorTypes } from '@interfaces/listr-error.interface'
import { Listr } from '@root/index'

describe('error collection', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

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

  it('should collect only the first error while exiting on error', async () => {
    const task = new Listr(
      [
        {
          task: (): void => {
            throw new Error('1')
          }
        },
        {
          task: (): void => {
            throw new Error('2')
          }
        }
      ],
      { renderer: 'silent', exitOnError: true }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeFalsy()
    expect(crash).toBeTruthy()
    expect(task.err.length).toBe(1)
    expect(task.err[0]).toMatchObject({ message: '1', type: ListrErrorTypes.HAS_FAILED })
  })

  it('should collect all the errors while not exiting on error', async () => {
    const task = new Listr(
      [
        {
          task: (): void => {
            throw new Error('1')
          }
        },
        {
          task: (): void => {
            throw new Error('2')
          }
        }
      ],
      { renderer: 'silent', exitOnError: false }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeTruthy()
    expect(crash).toBeFalsy()
    expect(task.err.length).toBe(2)
    expect(task.err[0]).toMatchObject({ message: '1', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR })
    expect(task.err[1]).toMatchObject({ message: '2', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR })
    expect(task.err[0].task).toBeDefined()
    expect(task.err[1].task).toBeDefined()
  })

  it('should save the context on error', async () => {
    const message = '1'
    const task = new Listr(
      [
        {
          task: (ctx): void => {
            ctx.test = true

            throw new Error(message)
          }
        }
      ],
      { renderer: 'silent', exitOnError: true }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    const ctx = { test: true }

    expect(result).toBeFalsy()
    expect(crash).toBeTruthy()
    expect(task.err.length).toBe(1)
    expect(task.ctx).toStrictEqual(ctx)
    expect(task.err[0]).toMatchObject({ message, ctx })
  })

  it('should save the context on error while having circular dependencies', async () => {
    const message = '1'
    const task = new Listr(
      [
        {
          task: (ctx): void => {
            ctx.test = true
            ctx.myself = ctx

            throw new Error(message)
          }
        }
      ],
      { renderer: 'silent', exitOnError: true }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeFalsy()
    expect(crash).toBeTruthy()
    expect(task.err.length).toBe(1)
    expect(task.err[0].message).toBe(message)
    expect(task.err[0].ctx).toMatchObject({ test: true, myself: { test: true } })
  })

  it('should collect all the errors from subtasks and fail with subtask error while subtask has exit on error', async () => {
    const task = new Listr(
      [
        {
          task: (): void => {
            throw new Error('1')
          }
        },
        {
          task: (_, task): Listr => {
            return task.newListr(
              [
                {
                  task: (): void => {
                    throw new Error('3')
                  }
                },
                {
                  task: (): void => {
                    throw new Error('4')
                  }
                }
              ],
              { exitOnError: true }
            )
          }
        },
        {
          task: (): void => {
            throw new Error('2')
          }
        }
      ],
      { renderer: 'silent', exitOnError: false }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeTruthy()
    expect(crash).toBeFalsy()
    expect(task.err.length).toBe(3)
    expect(task.err[0]).toMatchObject({ message: '1', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR })
    expect(task.err[1]).toMatchObject({ message: '3', type: ListrErrorTypes.HAS_FAILED })
    expect(task.err[2]).toMatchObject({ message: '2', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR })
  })

  it('should collect all the errors from subtasks while not exiting on error', async () => {
    const task = new Listr(
      [
        {
          task: (): void => {
            throw new Error('1')
          }
        },
        {
          task: (_, task): Listr => {
            return task.newListr(
              [
                {
                  task: (): void => {
                    throw new Error('3')
                  }
                },
                {
                  task: (): void => {
                    throw new Error('4')
                  }
                }
              ],
              { exitOnError: false }
            )
          }
        },
        {
          task: (): void => {
            throw new Error('2')
          }
        }
      ],
      { renderer: 'silent', exitOnError: false }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeTruthy()
    expect(crash).toBeFalsy()
    expect(task.err.length).toBe(4)
    expect(task.err[0]).toMatchObject({ message: '1' })
    expect(task.err[1]).toMatchObject({ message: '3' })
    expect(task.err[2]).toMatchObject({ message: '4' })
    expect(task.err[3]).toMatchObject({ message: '2' })
  })

  it('should properly record the context in the given error', async () => {
    const task = new Listr(
      [
        {
          task: (ctx): void => {
            ctx.test1 = true
            throw new Error('1')
          }
        },
        {
          task: (ctx): void => {
            ctx.test2 = true
            throw new Error('2')
          }
        },
        {
          task: (ctx): void => {
            ctx.test3 = true
            throw new Error('3')
          }
        }
      ],
      { renderer: 'silent', exitOnError: false }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeTruthy()
    expect(crash).toBeFalsy()
    expect(task.err.length).toBe(3)
    expect(task.err[0].ctx).toMatchObject({ test1: true })
    expect(task.err[1].ctx).toMatchObject({ test1: true, test2: true })
    expect(task.err[2].ctx).toMatchObject({
      test1: true,
      test2: true,
      test3: true
    })
  })

  it.each([ true, false ])('should collect errors from rollback while rollback fails is %s', async (failRollback) => {
    const task = new Listr(
      [
        {
          title: 'Something with rollback.',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  task: async (): Promise<void> => {
                    throw new Error('subtask failed.')
                  }
                }
              ],
              { exitOnError: true }
            ),
          rollback: async (): Promise<void> => {
            if (failRollback) {
              throw new Error('rollback fails.')
            }
          }
        }
      ],
      {
        concurrent: false,
        exitOnError: true,
        exitAfterRollback: true,
        renderer: 'silent'
      }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeFalsy()
    expect(crash).toBeTruthy()

    expect(task.err.length).toBe(failRollback ? 3 : 2)
    expect(task.err[0]).toMatchObject({ message: 'subtask failed.', type: ListrErrorTypes.HAS_FAILED })
    expect(task.err[1]).toMatchObject({ message: 'subtask failed.', type: ListrErrorTypes.WILL_ROLLBACK })

    if (failRollback) {
      expect(task.err[2]).toMatchObject({ message: 'rollback fails.', type: ListrErrorTypes.HAS_FAILED_TO_ROLLBACK })
    }
  })

  it('should collect errors from retries', async () => {
    const task = new Listr(
      [
        {
          task: async (): Promise<void> => {
            throw new Error('retry error')
          },
          retry: 3
        }
      ],
      {
        concurrent: false,
        exitOnError: true,
        renderer: 'silent'
      }
    )

    let result: any
    let crash: Error
    try {
      result = await task.run()
    } catch (e: any) {
      crash = e
    }

    expect(result).toBeFalsy()
    expect(crash).toBeTruthy()

    expect(task.err.length).toBe(4)
    expect(task.err[0]).toMatchObject({ message: 'retry error', type: ListrErrorTypes.WILL_RETRY })
    expect(task.err[1]).toMatchObject({ message: 'retry error', type: ListrErrorTypes.WILL_RETRY })
    expect(task.err[2]).toMatchObject({ message: 'retry error', type: ListrErrorTypes.WILL_RETRY })
    expect(task.err[3]).toMatchObject({ message: 'retry error', type: ListrErrorTypes.HAS_FAILED })
  })
})
