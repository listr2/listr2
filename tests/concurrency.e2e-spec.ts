import delay from 'delay'

import { ListrTask } from '@interfaces/listr.interface'
import { Listr } from '@root/index'

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
          Array [
            Array [
              "[STARTED] 1",
            ],
            Array [
              "[STARTED] 2",
            ],
            Array [
              "[STARTED] 3",
            ],
            Array [
              "[STARTED] 4",
            ],
            Array [
              "[SUCCESS] 4",
            ],
            Array [
              "[SUCCESS] 3",
            ],
            Array [
              "[SUCCESS] 2",
            ],
            Array [
              "[SUCCESS] 1",
            ],
          ]
          `)
  })

  it('should limit the concurrency', async () => {
    await new Listr(tasks, { concurrent: 3, renderer: 'verbose' }).run()

    expect(log).toBeCalledTimes(8)
    expect(log.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "[STARTED] 1",
        ],
        Array [
          "[STARTED] 2",
        ],
        Array [
          "[STARTED] 3",
        ],
        Array [
          "[SUCCESS] 3",
        ],
        Array [
          "[STARTED] 4",
        ],
        Array [
          "[SUCCESS] 4",
        ],
        Array [
          "[SUCCESS] 2",
        ],
        Array [
          "[SUCCESS] 1",
        ],
      ]
    `)
  })

  it('should run tasks sequentially', async () => {
    await new Listr(tasks, { concurrent: false, renderer: 'verbose' }).run()

    expect(log).toBeCalledTimes(8)
    expect(log.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              "[STARTED] 1",
            ],
            Array [
              "[SUCCESS] 1",
            ],
            Array [
              "[STARTED] 2",
            ],
            Array [
              "[SUCCESS] 2",
            ],
            Array [
              "[STARTED] 3",
            ],
            Array [
              "[SUCCESS] 3",
            ],
            Array [
              "[STARTED] 4",
            ],
            Array [
              "[SUCCESS] 4",
            ],
          ]
        `)
  })
})
