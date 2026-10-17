import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('default renderer: title', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // Qm3vT8xKp1LwZr6YcN0bHd4FsJ7gEa2U
  it('should hide the task when its title and output are removed', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output.'

            task.title = undefined
            task.output = null
          },
          rendererOptions: { outputBar: Infinity, persistentOutput: true }
        },
        {
          title: 'This task keeps its title.',
          task: async(): Promise<void> => {}
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expect(output.stdout.mock.calls.map(([line]) => line).join('')).not.toContain('undefined')
    expectProcessOutputToMatchSnapshot(output, 'Qm3vT8xKp1LwZr6YcN0bHd4FsJ7gEa2U')
  })

  // Hs5nB9wRk2PeX7tUq4ZyLm0VcG8dJf3A
  it('should render the title again after it has been removed', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.title = undefined

            task.title = 'This title is restored.'
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expect(output.stdout.mock.calls.map(([line]) => line).join('')).not.toContain('undefined')
    expectProcessOutputToMatchSnapshot(output, 'Hs5nB9wRk2PeX7tUq4ZyLm0VcG8dJf3A')
  })
})
