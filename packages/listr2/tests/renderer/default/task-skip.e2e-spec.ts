import { Listr } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '#tests/utils'

describe('default renderer: task-skip', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })
})
