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

  it('should be able to inject a different context to subtask', async () => {
    const tasks = new Listr([
      {
        title: 'This task will execute.',
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'This is a subtask.',
                task: async (ctx): Promise<void> => {
                  ctx.test = true
                }
              },

              {
                title: 'This is another subtask.',
                task: async (ctx): Promise<void> => {
                  expect(ctx.test).toBe(true)
                }
              }
            ],
            { ctx: {} as Record<'test', boolean> }
          )
      },
      {
        task: (ctx): void => {
          ctx.test2 = true
        }
      }
    ])

    const ctx = await tasks.run()

    expect(ctx).toStrictEqual(tasks.ctx)
    expect(ctx.test).toBe(undefined)
    expect(ctx.test2).toBe(true)
  })

  // Jest timeout does not work here as cloneObject(ctx) is eating up all cpu
  // cycles, i.e. the stack frame take a long time to complete.
  it('should not take an unreasonable amount of time to clone a large ctx object during error collection', async () => {
    const ctx = createLargeNestedObject(6, 8) // About 20Mb
    const start = Date.now()

    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: (): void => {
              throw new Error('This task failed.')
            }
          }
        ],
        {
          exitOnError: true
        }
      ).run(ctx)
    } catch (e: any) {
      // Ignore
    }
    const end = Date.now()

    expect(end - start).toBeLessThan(10000)
  })
})

function createLargeNestedObject (depth: number, branches: number): Record<PropertyKey, any> {
  const obj: Record<PropertyKey, any> = {}

  for (let i = 0; i < branches; ++i) {
    obj['k' + i] = depth === 0 ? 'v' : createLargeNestedObject(depth - 1, branches)
  }

  return obj
}
