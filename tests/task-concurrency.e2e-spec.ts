import type { ListrTask } from '@root'
import { Listr, delay } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('concurrency', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  const tasks: ListrTask<any, any>[] = [
    {
      title: '1',
      task: async (): Promise<void> => {
        await delay(50)
      }
    },

    {
      title: '2',
      task: async (): Promise<void> => {
        await delay(19)
      }
    },

    {
      title: '3',
      task: async (): Promise<void> => {
        await delay(9)
      }
    },

    {
      title: '4',
      task: async (): Promise<void> => {
        await delay(0)
      }
    }
  ]

  it('should run tasks in parallel', async () => {
    await new Listr(tasks, { concurrent: true, renderer: 'test' }).run()

    expectProcessOutputToMatchSnapshot(output, 'WKPv1yKZBa2LY7IStPAL9emHNpaTSsQQ')
  })

  it.each([ 1, 2, 3, 4 ])('should limit the concurrency: %d', async (concurrent) => {
    await new Listr(tasks, { concurrent, renderer: 'test' }).run()
  })

  it('should run tasks sequentially', async () => {
    await new Listr(tasks, { concurrent: false, renderer: 'test' }).run()

    expectProcessOutputToMatchSnapshot(output, 'wqpFCLvXmbjnc3DNDBL76AWAK8uxEHlo')
  })
})
