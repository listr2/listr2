import delay from 'delay'

import { ListrTask } from '@interfaces/listr.interface'
import { Listr } from '@root/index'

describe('concurrent execution', () => {

  let tasks: ListrTask[]
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

  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should run tasks in parallel', async () => {
    await new Listr(tasks, { concurrent: true, renderer: 'test' }).run()
    const calls = log.mock.calls.flat()

    expect(log).toBeCalledTimes(8)
    expect(calls).toMatchInlineSnapshot(`
      Array [
        "[STARTED] 1",
        "[STARTED] 2",
        "[STARTED] 3",
        "[STARTED] 4",
        "[SUCCESS] 4",
        "[SUCCESS] 3",
        "[SUCCESS] 2",
        "[SUCCESS] 1",
      ]
      `)
  })

  it('should limit the concurrency', async () => {
    await new Listr(tasks, { concurrent: 2, renderer: 'test' }).run()
    const calls = log.mock.calls.flat()

    expect(log).toBeCalledTimes(8)
    expect(calls).toMatchInlineSnapshot(`
    Array [
      "[STARTED] 1",
      "[STARTED] 2",
      "[SUCCESS] 2",
      "[STARTED] 3",
      "[SUCCESS] 1",
      "[STARTED] 4",
      "[SUCCESS] 4",
      "[SUCCESS] 3",
    ]
    `)
  })

  it('should run tasks sequentially', async () => {
    await new Listr(tasks, { concurrent: false, renderer: 'test' }).run()
    const calls = log.mock.calls.flat()

    expect(log).toBeCalledTimes(8)
    expect(calls).toMatchInlineSnapshot(`
    Array [
      "[STARTED] 1",
      "[SUCCESS] 1",
      "[STARTED] 2",
      "[SUCCESS] 2",
      "[STARTED] 3",
      "[SUCCESS] 3",
      "[STARTED] 4",
      "[SUCCESS] 4",
    ]
    `)
  })

})