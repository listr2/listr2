/* eslint-disable @typescript-eslint/no-empty-function */
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('show output from task', () => {
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

  it('should add a single task', async () => {
    const ctx = await new Listr({
      title: 'This task will execute.',
      task: (_, task): Listr =>
        task.newListr([
          {
            title: 'This is a subtask.',
            task: async (): Promise<void> => {}
          }
        ])
    }).run()

    expect(ctx).toBeTruthy()
  })

  it('should be able to return the context on task', async () => {
    const tasks = new Listr([
      {
        title: 'This task will execute.',
        task: (_, task): Listr =>
          task.newListr([
            {
              title: 'This is a subtask.',
              task: async (ctx): Promise<void> => {
                ctx.test = true
              }
            }
          ])
      },
      {
        task: (ctx): void => {
          ctx.test2 = true
        }
      }
    ])

    const ctx = await tasks.run()

    expect(ctx).toStrictEqual(tasks.ctx)
    expect(ctx.test).toBe(true)
    expect(ctx.test2).toBe(true)
  })
})
