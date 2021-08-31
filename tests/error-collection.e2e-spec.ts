import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr, ListrError } from '@root/index'

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

  it('should create a proper listr error', async () => {
    const errors = [ new Error('1'), new Error('2') ]
    const message = '1'
    const ctx = { error: true }

    const error = new ListrError(message, errors, ctx)

    expect(error.message).toStrictEqual(message)
    expect(error.errors).toStrictEqual(errors)
    expect(error.context).toStrictEqual(ctx)
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
      { renderer: 'verbose', exitOnError: true }
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
    expect(task.err.errors.length).toBe(1)
    expect(task.err.errors).toStrictEqual([ new Error('1') ])
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
      { renderer: 'verbose', exitOnError: false }
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
    expect(task.err.errors.length).toBe(2)
    expect(task.err.message).toStrictEqual('Task failed without crashing.')
    expect(task.err.errors).toStrictEqual([ new Error('1'), new Error('2') ])
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
      { renderer: 'verbose', exitOnError: true }
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
    expect(task.err.errors.length).toBe(1)
    expect(task.ctx).toStrictEqual(ctx)
    expect(task.err.message).toStrictEqual(message)
    expect(task.err.errors).toStrictEqual([ new Error(message) ])
    expect(task.err.context).toStrictEqual(ctx)
  })

  it('should collect all the errors from subtasks and fail on first one while exit on error', async () => {
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
      { renderer: 'verbose', exitOnError: false }
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
    expect(task.err.errors.length).toBe(3)
    expect(task.err.message).toStrictEqual('Task failed without crashing.')
    expect(task.err.errors).toStrictEqual([ new Error('1'), new Error('3'), new Error('2') ])
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
      { renderer: 'verbose', exitOnError: false }
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
    expect(task.err.errors.length).toBe(4)
    expect(task.err.message).toStrictEqual('Task failed without crashing.')
    expect(task.err.errors).toStrictEqual([ new Error('1'), new Error('3'), new Error('4'), new Error('2') ])
  })
})
