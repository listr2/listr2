import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, delay, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

import type { ListrTask } from '@root'
import { Listr } from '@root'

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
        await delay(35)
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

  it('should limit the concurrency to 2', async () => {
    await new Listr(tasks, { concurrent: 2, renderer: 'test' }).run()

    expectProcessOutputToMatchSnapshot(output, '2pZ6rwMSxvmHpaVE3btDMTePhnvK0a3s')
  })

  it('should run tasks sequentially', async () => {
    await new Listr(tasks, { concurrent: false, renderer: 'test' }).run()

    expectProcessOutputToMatchSnapshot(output, 'wqpFCLvXmbjnc3DNDBL76AWAK8uxEHlo')
  })
})
