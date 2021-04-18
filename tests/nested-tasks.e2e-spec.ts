import delay from 'delay'

import { ListrTask } from '@interfaces/listr.interface'
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
    }, [] as ListrTask<any, any>[])
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
          "[STARTED] subtask",
        ],
        Array [
          "[STARTED] sub1",
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
        Array [
          "[SUCCESS] sub1",
        ],
        Array [
          "[STARTED] sub2",
        ],
        Array [
          "[SUCCESS] sub2",
        ],
        Array [
          "[STARTED] sub3",
        ],
        Array [
          "[SUCCESS] sub3",
        ],
        Array [
          "[STARTED] sub4",
        ],
        Array [
          "[SUCCESS] sub4",
        ],
        Array [
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
            Array [
              "[STARTED] subtask",
            ],
            Array [
              "[STARTED] sub1",
            ],
            Array [
              "[STARTED] sub2",
            ],
            Array [
              "[STARTED] sub3",
            ],
            Array [
              "[STARTED] sub4",
            ],
            Array [
              "[SUCCESS] sub4",
            ],
            Array [
              "[SUCCESS] sub3",
            ],
            Array [
              "[SUCCESS] sub2",
            ],
            Array [
              "[SUCCESS] sub1",
            ],
            Array [
              "[SUCCESS] subtask",
            ],
          ]
        `)
  })
})
