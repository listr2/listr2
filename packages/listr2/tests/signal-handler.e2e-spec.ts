import type { MockProcessOutput } from './utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from './utils'
import { Listr, delay } from '@root'

describe('signal handlers', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // LFRhPFJHChAJcQIEadkDdOlPezdltcfe
  it('should try to cancel running tasks', async() => {
    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await delay(100)
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'LFRhPFJHChAJcQIEadkDdOlPezdltcfe')
  })

  // https://github.com/listr2/listr2/issues/709 running this double seems to mess it somehow?
  // ACxcRBILlHsqiSxYArjASFdofVqLaUyE
  it('should try to cancel running tasks', async() => {
    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {}
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await delay(100)
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'ACxcRBILlHsqiSxYArjASFdofVqLaUyE')
  })

  it('should not clear other SIGINT listeners', async() => {
    process.addListener('SIGINT', function doNotRemove() {})
    expect(process.listeners('SIGINT').map((listener) => listener.name)).toContain('doNotRemove')

    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {}
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expect(process.listeners('SIGINT').map((listener) => listener.name)).toContain('doNotRemove')
  })

  it('should remove the signal handler if checking the task fails', async() => {
    const listeners = process.listeners('SIGINT')

    await new Listr([
      {
        title: 'a task',
        task: async(): Promise<void> => {},
        enabled: (): boolean => {
          throw new Error('failed')
        }
      }
    ])
      .run()
      .catch(() => {})

    expect(process.listeners('SIGINT')).toEqual(listeners)
  })
})
