import { Manager } from '@root/index'

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
          "[STARTED] Task without title.",
        ],
        [
          "[STARTED] Task without title.",
        ],
        [
          "[SUCCESS] Task without title.",
        ],
        [
          "[SUCCESS] Task without title.",
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
          "[STARTED] Task without title.",
        ],
        [
          "[STARTED] Task without title.",
        ],
        [
          "[STARTED] Task without title.",
        ],
        [
          "[SUCCESS] Task without title.",
        ],
        [
          "[SUCCESS] Task without title.",
        ],
        [
          "[SUCCESS] Task without title.",
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
          "[STARTED] Task without title.",
        ],
        [
          "[STARTED] child",
        ],
        [
          "[SUCCESS] child",
        ],
        [
          "[SUCCESS] Task without title.",
        ],
      ]
    `)
  })
})
