import { Listr } from '@root/index'

describe('skip a task', () => {
  jest.spyOn(console, 'log').mockImplementation()
  let info: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    info = jest.spyOn(console, 'info').mockImplementation()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should change title on function', async () => {
    await new Listr(
      [
        {
          title: 'test',
          task: (ctx, task): void => {
            task.title = 'changed'
          }
        }
      ],
      { renderer: 'verbose' }
    ).run()

    expect(info.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "[TITLE] changed",
        ],
      ]
    `)
  })

  it('should change title on async function', async () => {
    await new Listr(
      [
        {
          title: 'test',
          task: async (ctx, task): Promise<void> => {
            task.title = 'changed'
          }
        }
      ],
      { renderer: 'verbose' }
    ).run()

    expect(info.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "[TITLE] changed",
        ],
      ]
    `)
  })
})
