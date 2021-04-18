import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('show retry', () => {
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

  // R34CKurUXSpq65S8ebD6jpUrwmIiYrKa
  it('should retry the main task if any of the subtasks fail', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'Some type errors',
            task: async (_, task): Promise<void> => {
              await delay(10)
              task.output = 'test'

              await delay(10)
              const retry = task.isRetrying()!
              if (retry.count > 0) {
                task.output = `I am self aware that I am retrying for the ${retry.count}th time.`
              }

              await delay(10)
              throw new Error('This type can not be assigned to type with, oh noes')
            },
            retry: 3
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
    expect(mockStdout.mock.calls).toMatchSnapshot('R34CKurUXSpq65S8ebD6jpUrwmIiYrKa-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('R34CKurUXSpq65S8ebD6jpUrwmIiYrKa-err')
    expect(mockExit.mock.calls).toMatchSnapshot('R34CKurUXSpq65S8ebD6jpUrwmIiYrKa-exit')
  })

  it('should stop retrying if the task succeeds afterwards', async () => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: 'Some type errors',
            task: async (_, task): Promise<void> => {
              const retry = task.isRetrying()

              if (retry?.count === 3) {
                task.title = 'Successed at 3th try.'
              } else {
                throw Error('not enough')
              }
            },
            retry: 3
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

    expect(err).toBeFalsy()
    expect(mockStdout.mock.calls).toMatchSnapshot()
    expect(mockStderr.mock.calls).toMatchSnapshot()
    expect(mockExit.mock.calls).toMatchSnapshot()
  })
})
