import { ListrTaskEventType } from '@constants'
import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('task: title', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = false

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should change title on function', async() => {
    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.title = 'changed'
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output)
  })

  it('should change title on async function', async() => {
    await new Listr(
      [
        {
          title: 'test',
          task: async(_, task): Promise<void> => {
            task.title = 'changed'
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output)
  })

  it('should reset the title when it is set to undefined', async() => {
    const title = jest.fn()
    const reset = jest.fn()

    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.task.on(ListrTaskEventType.TITLE, title)
            task.task.on(ListrTaskEventType.TITLE_RESET, reset)

            task.title = undefined
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    const lines = output.stdout.mock.calls.map(([line]) => line as string)
    const events = lines.map((line) => JSON.parse(line))

    expect(reset).toHaveBeenCalledTimes(1)
    expect(title).not.toHaveBeenCalled()
    expect(events.some((event) => event.event === ListrTaskEventType.TITLE)).toBe(false)
    expect(events.at(-1).task).toEqual(expect.objectContaining({ hasTitle: false }))
    expect(events.at(-1).task.title).toBeUndefined()
    expect(lines.join('')).not.toContain('undefined')
  })

  it('should reset the title when it is set to null', async() => {
    const title = jest.fn()
    const reset = jest.fn()

    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.task.on(ListrTaskEventType.TITLE, title)
            task.task.on(ListrTaskEventType.TITLE_RESET, reset)

            task.title = null
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    const events = output.stdout.mock.calls.map(([line]) => JSON.parse(line as string))

    expect(reset).toHaveBeenCalledTimes(1)
    expect(title).not.toHaveBeenCalled()
    expect(events.at(-1).task).toEqual(expect.objectContaining({ hasTitle: false }))
    expect(events.at(-1).task.title).toBeUndefined()
  })

  it('should restore the title after it has been reset', async() => {
    const title = jest.fn()
    const reset = jest.fn()

    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.task.on(ListrTaskEventType.TITLE, title)
            task.task.on(ListrTaskEventType.TITLE_RESET, reset)

            task.title = undefined

            task.title = 'restored'
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    const events = output.stdout.mock.calls.map(([line]) => JSON.parse(line as string))

    expect(reset).toHaveBeenCalledTimes(1)
    expect(title).toHaveBeenCalledTimes(1)
    expect(title).toHaveBeenCalledWith('restored')
    expect(events.filter((event) => event.event === ListrTaskEventType.TITLE).map((event) => event.data)).toEqual(['restored'])
    expect(events.at(-1).task).toEqual(expect.objectContaining({ title: 'restored', hasTitle: true }))
  })

  it('should not log a removed title with the verbose renderer', async() => {
    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.title = undefined

            task.title = 'restored'
          }
        }
      ],
      { renderer: 'verbose', rendererOptions: { logTitleChange: true } }
    ).run()

    const stdout = output.stdout.mock.calls.map(([line]) => line).join('')

    expect(stdout).not.toContain('undefined')
    expect(stdout).toContain('restored')
  })
})
