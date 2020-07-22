import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'
import { Observable } from 'rxjs'

import { Listr } from '@root/index'

describe('show output from task', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

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

  // test-e2e-rMG224TBrLk3ocYtKidc1D4AyZtEHm11
  it('should yield example output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-rMG224TBrLk3ocYtKidc1D4AyZtEHm11-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-rMG224TBrLk3ocYtKidc1D4AyZtEHm11-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-rMG224TBrLk3ocYtKidc1D4AyZtEHm11-exit')
  })

  // test-e2e-oYHBlOYGg8juKRkaqigY617eyLbGMuDd
  it('should have persistent output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { persistentOutput: true }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-oYHBlOYGg8juKRkaqigY617eyLbGMuDd-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-oYHBlOYGg8juKRkaqigY617eyLbGMuDd-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-oYHBlOYGg8juKRkaqigY617eyLbGMuDd-exit')
  })

  // test-e2e-767BkeBTfR1lrS2ANYYH7CLWPATxqyat
  it('should output to bottom bar', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: Infinity }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-767BkeBTfR1lrS2ANYYH7CLWPATxqyat-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-767BkeBTfR1lrS2ANYYH7CLWPATxqyat-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-767BkeBTfR1lrS2ANYYH7CLWPATxqyat-exit')
  })

  // test-e2e-JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP
  it('should output to bottom bar from task with no title', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: Infinity }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP-exit')
  })

  // test-e2e-iI52S3WPytorU9EZKPar2AiBrLAZTVut
  it('should output to bottom bar from task with no title persistently', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-iI52S3WPytorU9EZKPar2AiBrLAZTVut-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-iI52S3WPytorU9EZKPar2AiBrLAZTVut-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-iI52S3WPytorU9EZKPar2AiBrLAZTVut-exit')
  })

  // test-e2e-HhZEM7noGNW4xpgxv4ZtXsPMroPWqrEA
  it('should output to bottom bar persistently', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-HhZEM7noGNW4xpgxv4ZtXsPMroPWqrEA-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-HhZEM7noGNW4xpgxv4ZtXsPMroPWqrEA-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-HhZEM7noGNW4xpgxv4ZtXsPMroPWqrEA-exit')
  })

  // test-e2e-d4wXg4yGYak09qivTqgKFZaQJ3PvDZm5
  it('should limit output to bottom bar persistently', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: 2 }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-d4wXg4yGYak09qivTqgKFZaQJ3PvDZm5-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-d4wXg4yGYak09qivTqgKFZaQJ3PvDZm5-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-d4wXg4yGYak09qivTqgKFZaQJ3PvDZm5-exit')
  })

  // test-e2e-NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus
  it('should output to bottom bar 2 times at most and delete the prior tasks output when finished', async () => {
    await new Listr(
      [
        {
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: true, persistentOutput: false }
        },

        {
          task: async (ctx, task): Promise<void> => {
            task.output = 'I will push an output. [0]'
            await delay(5)

            task.output = 'I will push an output. [1]'
            await delay(5)

            task.output = 'I will push an output. [2]'
            await delay(5)
          },
          options: { bottomBar: true, persistentOutput: true }
        }
      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus-exit')
  })

  // test-e2e-SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT
  it('should output to from an observable', async () => {
    await new Listr(
      [
        {
          title: 'Observable test.',
          task: (): Observable<string> =>
            new Observable((observer) => {
              observer.next('test')

              delay(5)
                .then(() => {
                  observer.next('changed')
                  return delay(5)
                })
                .then(() => {
                  observer.complete()
                })
            })
        }

      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT-exit')
  })

  // test-e2e-j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn
  it('should indent long multiline output with persistent output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (ctx, task): Promise<void> => {
            const start = 'This is a'
            const mid = 'long '
            const end = 'multi line output.'
            task.output = start + mid.repeat(40) + '\n'+ mid.repeat(40) + '\n'+ mid.repeat(40) + '\n'+ mid.repeat(40) + '\n'+ mid.repeat(40) + '\n' + end
            await delay(500)
          },
          options: { persistentOutput: true }
        }

      ],
      {
        concurrent: false, nonTTYRenderer: 'default', nonTTYRendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('test-e2e-j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('test-e2e-j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn-err')
    expect(mockExit.mock.calls).toMatchSnapshot('test-e2e-j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn-exit')
  })

})
