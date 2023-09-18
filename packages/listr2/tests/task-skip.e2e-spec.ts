import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'
import { Listr } from 'listr2'

describe('skip a task', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should skip the task from internal call', async () => {
    await new Listr(
      [
        {
          task: async (_, task): Promise<void> => {
            task.skip('skipped')
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'xbUV7hvMZiVL4dEYDyiXKFhpTNo9ASiA')
  })

  it('should skip the task from skip method', async () => {
    await new Listr(
      [
        {
          skip (): string {
            return 'skipped'
          },
          task: async (): Promise<void> => {}
        }
      ],
      { renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'uOy7d3bwwmW4LXWPY3HDh4k25LDwa5RZ')
  })

  it('skip to enable by context will work properly in serial', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            ctx.test = true
            task.skip('skipped')
          }
        },
        {
          enabled: (ctx): boolean => ctx.test,
          task: async (_, task): Promise<void> => {
            task.output = 'enabled'
          }
        }
      ],
      { renderer: 'test', concurrent: false }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'CR5tEdrMVapfqwMjIa4nP1CgEYZu3tfc')
  })

  it('skip to enable by context will not work properly in concurrent', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            ctx.test = true
            task.skip('skipped')
          }
        },
        {
          enabled: (ctx): boolean => ctx.test,
          task: async (_, task): Promise<void> => {
            task.output = 'enabled'
          }
        }
      ],
      { renderer: 'test', concurrent: true }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'WKhUc2IR0U5Hc7hKFuvFUq36ovxjyPy6')
  })

  it.each<[boolean | string, string]>([ [ true, 'Skipped task without a title.' ] ])(
    'should skip the task from async skip method returning either boolean or string',
    async (skip) => {
      await new Listr(
        [
          {
            skip: async (): Promise<boolean | string> => {
              return skip
            },
            task: async (_, task): Promise<void> => {
              task.output = 'This will never execute.'
            }
          }
        ],
        { renderer: 'test' }
      ).run()

      expectProcessOutputToMatchSnapshot(output, 'dKEmraxPfJH3cEj4bHeTsieEALbqcFIR')
    }
  )
})
