/* eslint-disable @typescript-eslint/no-empty-function */
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

import { Listr } from '@root'

describe('default renderer: task-skip', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F
  it('should skip from internal function', async () => {
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
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F')
  })

  // 8KLp76vGVlGdzoy4HztCYcYe2coxpO7e
  it('should skip from context', async () => {
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
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '8KLp76vGVlGdzoy4HztCYcYe2coxpO7e')
  })

  // 7IvF8C3RevPE0cdsG7QZonUN1JS26n0N
  it('should not collapse skip message', async () => {
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

  // BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK
  it('skip from function', async () => {
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
          skip: (ctx): string | boolean => ctx.skip ? 'I will be skipped!' : false,
          task: (): void => {}
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK')
  })

  // omE6UjDQWFXPCa7F8rNE7ByEXsllnMAB
  it('should skip without a suffix', async () => {
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
  it('should show the original title of the task', async () => {
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
  it('should show the original title of the task when skipped with empty message', async () => {
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
