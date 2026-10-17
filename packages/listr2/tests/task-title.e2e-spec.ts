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

  it('should remove the title when it is set to undefined', async() => {
    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.title = undefined
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    const events = output.stdout.mock.calls.map(([line]) => JSON.parse(line as string))

    expect(events.find((event) => event.event === 'TITLE')).toEqual(expect.objectContaining({ task: expect.objectContaining({ hasTitle: false }) }))
    expect(events.at(-1).task).toEqual(expect.objectContaining({ hasTitle: false }))
    expect(events.at(-1).task.title).toBeUndefined()
  })

  it('should remove the title when it is set to null', async() => {
    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.title = null
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    const events = output.stdout.mock.calls.map(([line]) => JSON.parse(line as string))

    expect(events.at(-1).task).toEqual(expect.objectContaining({ hasTitle: false }))
    expect(events.at(-1).task.title).toBeUndefined()
  })

  it('should restore the title after it has been removed', async() => {
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
      { renderer: 'test' }
    ).run()

    const events = output.stdout.mock.calls.map(([line]) => JSON.parse(line as string))

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
