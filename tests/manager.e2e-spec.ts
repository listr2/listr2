import { Manager } from '@root'
import { TASK_WITHOUT_TITLE } from '@root/constants/listr.constants'

describe('skip a task', () => {
  let manager: Manager<any, 'verbose'>
  let log: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    manager = new Manager<any, 'verbose'>({ renderer: 'verbose' })

    log = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should add tasks to the manager', async () => {
    manager.add([
      {
        task: (): Promise<void> => Promise.resolve()
      }
    ])

    await manager.runAll()

    expect(log.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[STARTED] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[STARTED] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[SUCCESS] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[SUCCESS] ${TASK_WITHOUT_TITLE}",
        ],
      ]
    `)
  })

  it('should indent the task in manager', async () => {
    manager.add([
      {
        ...manager.indent([
          {
            task: (): Promise<void> => Promise.resolve()
          }
        ])
      }
    ])

    await manager.runAll()

    expect(log.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[STARTED] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[STARTED] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[STARTED] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[SUCCESS] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[SUCCESS] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[SUCCESS] ${TASK_WITHOUT_TITLE}",
        ],
      ]
    `)
  })

  it('should change the context in manager', async () => {
    manager.ctx = {
      test: true
    }

    manager.add([
      {
        title: 'child',
        enabled: (ctx): boolean => ctx.test,
        task: (): Promise<void> => Promise.resolve()
      }
    ])

    await manager.runAll()

    expect(log.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[STARTED] ${TASK_WITHOUT_TITLE}",
        ],
        [
          "[STARTED] child",
        ],
        [
          "[SUCCESS] child",
        ],
        [
          "[SUCCESS] ${TASK_WITHOUT_TITLE}",
        ],
      ]
    `)
  })
})
