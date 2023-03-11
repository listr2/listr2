import delay from 'delay'

import type { ListrTask } from '@interfaces/listr.interface'
import { Listr } from '@root/index'

describe('skip a task', () => {
  let tasks: ListrTask<any, any>[]
  let subtasks: ListrTask<any, any>[]
  let log: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    log = jest.spyOn(console, 'log').mockImplementation()

    tasks = [
      {
        title: '1',
        task: async (): Promise<void> => {
          await delay(20)
        }
      },

      {
        title: '2',
        task: async (): Promise<void> => {
          await delay(15)
        }
      },

      {
        title: '3',
        task: async (): Promise<void> => {
          await delay(10)
        }
      },

      {
        title: '4',
        task: async (): Promise<void> => {
          await delay(1)
        }
      }
    ]

    subtasks = tasks.reduce((o, task) => {
      const subtask = {
        ...task,
        title: 'sub' + task.title
      }

      return [ ...o, subtask ]
    }, [])
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should run concurrent on parent, serial on child', async () => {
    await new Listr(
      [
        ...tasks,
        {
          title: 'subtask',
          task: (): Listr => new Listr(subtasks, { concurrent: false })
        }
      ],
      { concurrent: true, renderer: 'verbose' }
    ).run()

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
          "[STARTED] subtask",
        ],
        [
          "[STARTED] sub1",
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
        [
          "[SUCCESS] sub1",
        ],
        [
          "[STARTED] sub2",
        ],
        [
          "[SUCCESS] sub2",
        ],
        [
          "[STARTED] sub3",
        ],
        [
          "[SUCCESS] sub3",
        ],
        [
          "[STARTED] sub4",
        ],
        [
          "[SUCCESS] sub4",
        ],
        [
          "[SUCCESS] subtask",
        ],
      ]
    `)
  })

  it('should run serial on parent, concurrent on child', async () => {
    await new Listr(
      [
        ...tasks,
        {
          title: 'subtask',
          task: (): Listr => new Listr(subtasks, { concurrent: true })
        }
      ],
      { concurrent: false, renderer: 'verbose' }
    ).run()

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
            [
              "[STARTED] subtask",
            ],
            [
              "[STARTED] sub1",
            ],
            [
              "[STARTED] sub2",
            ],
            [
              "[STARTED] sub3",
            ],
            [
              "[STARTED] sub4",
            ],
            [
              "[SUCCESS] sub4",
            ],
            [
              "[SUCCESS] sub3",
            ],
            [
              "[SUCCESS] sub2",
            ],
            [
              "[SUCCESS] sub1",
            ],
            [
              "[SUCCESS] subtask",
            ],
          ]
        `)
  })
})
