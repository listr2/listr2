import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'
import { Observable } from 'rxjs'

import { Listr } from '@root/index'

describe('show output from task', () => {
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

  // test-e2e-JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR
  it('should create a set of subtasks', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr => task.newListr([
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            },

            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            }
          ])
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-JQYWVb3x1scokQK2IzhwA4F0qxWbYzXR-exit')
  })

  // test-e2e-3ygUxrTkCDLDfDrXzF1ocWR6626jaL0kA
  it('should be able to change concurrency setting in subtask, second subtask should finish first', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr => task.newListr([
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            },

            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(20)
              }
            }
          ], { concurrent: true })
        }

      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-3ygUxrTkCDLDfDrXzF1ocWR6626jaL0k-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-3ygUxrTkCDLDfDrXzF1ocWR6626jaL0k-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-3ygUxrTkCDLDfDrXzF1ocWR6626jaL0k-exit')
  })

  // test-e2e-8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ
  it('should be able to change collapse settings', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr => task.newListr([
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            },

            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(20)
              }
            }
          ])
        },

        {
          title: 'This task will execute.',
          task: (ctx, task): Listr => task.newListr([
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            },

            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(20)
              }
            }
          ], { rendererOptions: { collapse: false } })
        }

      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true, collapse: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-8TNRrm8bI9ndz4jrhYC492luGNhtMTmZ-exit')
  })

})
