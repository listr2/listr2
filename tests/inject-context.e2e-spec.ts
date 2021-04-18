/* eslint-disable @typescript-eslint/no-empty-function */
import { Listr } from '@root/index'

describe('show inject context', () => {
  let info: jest.SpyInstance<void, string[][]>
  let log: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    info = jest.spyOn(console, 'info').mockImplementation()
    log = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(async () => {
    info.mockClear()
    log.mockClear()
    jest.clearAllMocks()
  })

  it('should return the context', async () => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr =>
            task.newListr([
              {
                title: 'This is a subtask.',
                task: async (): Promise<void> => {}
              }
            ])
        }
      ],
      {
        concurrent: false,
        renderer: 'verbose',
        ctx: { test: true }
      }
    ).run()

    expect(ctx).toMatchInlineSnapshot(`
      Object {
        "test": true,
      }
    `)
  })

  it('should inject ctx to subtask', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr =>
            task.newListr([
              {
                title: 'This is a subtask.',
                skip: (ctx): boolean => ctx!.skip,
                task: async (): Promise<void> => {}
              }
            ])
        }
      ],
      {
        concurrent: false,
        renderer: 'verbose',
        ctx: { skip: true }
      }
    ).run()

    expect(info).toBeCalledTimes(1)
  })
})
