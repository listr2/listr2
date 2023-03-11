/* eslint-disable @typescript-eslint/no-empty-function */
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root'

describe('show task skip', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
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

    expect(mockStdout.mock.calls).toMatchSnapshot('ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F-err')
    expect(mockExit.mock.calls).toMatchSnapshot('ws7S3nDQgIm3rqk7S8Z1z9NgWUWyqx6F-exit')
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

    expect(mockStdout.mock.calls).toMatchSnapshot('8KLp76vGVlGdzoy4HztCYcYe2coxpO7e-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('8KLp76vGVlGdzoy4HztCYcYe2coxpO7e-err')
    expect(mockExit.mock.calls).toMatchSnapshot('8KLp76vGVlGdzoy4HztCYcYe2coxpO7e-exit')
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

    expect(mockStdout.mock.calls).toMatchSnapshot('7IvF8C3RevPE0cdsG7QZonUN1JS26n0N-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('7IvF8C3RevPE0cdsG7QZonUN1JS26n0N-err')
    expect(mockExit.mock.calls).toMatchSnapshot('7IvF8C3RevPE0cdsG7QZonUN1JS26n0N-exit')
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

    expect(mockStdout.mock.calls).toMatchSnapshot('BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK-err')
    expect(mockExit.mock.calls).toMatchSnapshot('BmDpgfyyKMN40Ei5uinrsuOz1b2lEqtK-exit')
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

    expect(mockStdout.mock.calls).toMatchSnapshot('omE6UjDQWFXPCa7F8rNE7ByEXsllnMAB-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('omE6UjDQWFXPCa7F8rNE7ByEXsllnMAB-err')
    expect(mockExit.mock.calls).toMatchSnapshot('omE6UjDQWFXPCa7F8rNE7ByEXsllnMAB-exit')
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

    expect(mockStdout.mock.calls).toMatchSnapshot('c4Q9Hk2x725caX6F6qXGMgyUQh36HQls-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('c4Q9Hk2x725caX6F6qXGMgyUQh36HQls-err')
    expect(mockExit.mock.calls).toMatchSnapshot('c4Q9Hk2x725caX6F6qXGMgyUQh36HQls-exit')
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

    expect(mockStdout.mock.calls).toMatchSnapshot('3n2w67J8KnAihH5KaGDGnHe2O9xawvnx-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('3n2w67J8KnAihH5KaGDGnHe2O9xawvnx-err')
    expect(mockExit.mock.calls).toMatchSnapshot('3n2w67J8KnAihH5KaGDGnHe2O9xawvnx-exit')
  })
})
