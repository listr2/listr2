import delay from 'delay'

import type { ListrTask } from '@interfaces/listr.interface'
import { Listr } from '@root'

describe('concurrent execution', () => {
  let tasks: ListrTask<any, any>[]
  let log: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    log = jest.spyOn(console, 'log').mockImplementation()

    tasks = [
      {
        title: '1',
        task: async (): Promise<void> => {
          await delay(28)
        }
      },

      {
        title: '2',
        task: async (): Promise<void> => {
          await delay(16)
        }
      },

      {
        title: '3',
        task: async (): Promise<void> => {
          await delay(9)
        }
      },

      {
        title: '4',
        task: async (): Promise<void> => {
          await delay(0)
        }
      }
    ]
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should run tasks in parallel', async () => {
    await new Listr(tasks, { concurrent: true, renderer: 'verbose' }).run()

    expect(log).toBeCalledTimes(8)
    expect(log.mock.calls).toMatchInlineSnapshot(`
          [
            [
              "[STARTED] 1",
            ],
            [
              "[STARTED] 2",
            ],
            [
              "[STARTED] 3",
            ],
            [
              "[STARTED] 4",
            ],
            [
              "[SUCCESS] 4",
            ],
            [
              "[SUCCESS] 3",
            ],
            [
              "[SUCCESS] 2",
            ],
            [
              "[SUCCESS] 1",
            ],
          ]
          `)
  })

  it('should limit the concurrency', async () => {
    await new Listr(tasks, { concurrent: 1, renderer: 'verbose' }).run()

    expect(log).toBeCalledTimes(8)
    expect(log.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[STARTED] 1",
        ],
        [
          "[SUCCESS] 1",
        ],
        [
          "[STARTED] 2",
        ],
        [
          "[SUCCESS] 2",
        ],
        [
          "[STARTED] 3",
        ],
        [
          "[SUCCESS] 3",
        ],
        [
          "[STARTED] 4",
        ],
        [
          "[SUCCESS] 4",
        ],
      ]
    `)
  })

  it('should run tasks sequentially', async () => {
    await new Listr(tasks, { concurrent: false, renderer: 'verbose' }).run()

    expect(log).toBeCalledTimes(8)
    expect(log.mock.calls).toMatchInlineSnapshot(`
          [
            [
              "[STARTED] 1",
            ],
            [
              "[SUCCESS] 1",
            ],
            [
              "[STARTED] 2",
            ],
            [
              "[SUCCESS] 2",
            ],
            [
              "[STARTED] 3",
            ],
            [
              "[SUCCESS] 3",
            ],
            [
              "[STARTED] 4",
            ],
            [
              "[SUCCESS] 4",
            ],
          ]
        `)
  })
})
