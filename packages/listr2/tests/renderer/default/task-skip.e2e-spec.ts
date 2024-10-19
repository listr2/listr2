import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('default renderer: task-skip', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // 7IvF8C3RevPE0cdsG7QZonUN1JS26n0N
  it('should not collapse skip message', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx): void => {
            ctx.skip = true
          }
        },

        {
          title: 'This task will never execute.',
          skip: (ctx): boolean => ctx.skip,
          task: (): void => {}
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true, collapseSkips: false }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '7IvF8C3RevPE0cdsG7QZonUN1JS26n0N')
  })

  // omE6UjDQWFXPCa7F8rNE7ByEXsllnMAB
  it('should skip without a suffix', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): void => {
            task.skip('I am skipping this tasks for reasons.')
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true, suffixSkips: false }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'omE6UjDQWFXPCa7F8rNE7ByEXsllnMAB')
  })

  // c4Q9Hk2x725caX6F6qXGMgyUQh36HQls
  it('should show the original title of the task', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): void => {
            task.skip('I am skipping this tasks for reasons.')
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true, showSkipMessage: false }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'c4Q9Hk2x725caX6F6qXGMgyUQh36HQls')
  })

  // 3n2w67J8KnAihH5KaGDGnHe2O9xawvnx
  it('should show the original title of the task when skipped with empty message', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): void => {
            task.skip()
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true, showSkipMessage: false }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '3n2w67J8KnAihH5KaGDGnHe2O9xawvnx')
  })
})
