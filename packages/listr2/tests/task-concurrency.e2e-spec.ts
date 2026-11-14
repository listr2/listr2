import type { ListrTask } from '#root'
import { Listr, delay } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, range, unmockProcessOutput } from '#tests/utils'

describe('concurrency', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  const tasks: ListrTask<any, any>[] = [
    {
      title: '1',
      task: async(): Promise<void> => {
        await delay(50)
      }
    },

    {
      title: '2',
      task: async(): Promise<void> => {
        await delay(19)
      }
    },

    {
      title: '3',
      task: async(): Promise<void> => {
        await delay(9)
      }
    },

    {
      title: '4',
      task: async(): Promise<void> => {
        await delay(0)
      }
    }
  ]

  it('should run tasks in parallel', async() => {
    await new Listr(tasks, { concurrent: true, renderer: 'test' }).run()

    await expectProcessOutputToMatchSnapshot(output)
  })

  it.each([1, 2, 3, 4])('should limit the concurrency: %d', async(concurrent) => {
    let running = 0
    let peak = 0

    await new Listr(
      range(8, () => ({
        task: async(): Promise<void> => {
          peak = Math.max(peak, ++running)
          await delay(10)
          running--
        }
      })),
      { concurrent, renderer: 'silent' }
    ).run()

    expect(peak).toBe(concurrent)
  })

  it('should run tasks sequentially', async() => {
    await new Listr(tasks, { concurrent: false, renderer: 'test' }).run()

    await expectProcessOutputToMatchSnapshot(output)
  })
})
