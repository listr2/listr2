/* eslint-disable @typescript-eslint/no-empty-function */
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'
import { Observable } from 'rxjs'

import { Listr } from '@root'

describe('default renderer: output', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // rMG224TBrLk3ocYtKidc1D4AyZtEHm11
  it('should yield example output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: {
            persistentOutput: false
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'rMG224TBrLk3ocYtKidc1D4AyZtEHm11')
  })

  // oYHBlOYGg8juKRkaqigY617eyLbGMuDd
  it('should have persistent output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'oYHBlOYGg8juKRkaqigY617eyLbGMuDd')
  })

  // 767BkeBTfR1lrS2ANYYH7CLWPATxqyat
  it('should output to bottom bar', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: Infinity }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '767BkeBTfR1lrS2ANYYH7CLWPATxqyat')
  })

  // JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP
  it('should output to bottom bar from task with no title', async () => {
    await new Listr(
      [
        {
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: Infinity }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'JMCRBo4OtLm7JB3XbcYoRcCdQRiKfPdP')
  })

  // iI52S3WPytorU9EZKPar2AiBrLAZTVut
  it('should output to bottom bar from task with no title persistently', async () => {
    await new Listr(
      [
        {
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'iI52S3WPytorU9EZKPar2AiBrLAZTVut')
  })

  // HhZEM7noGNW4xpgxv4ZtXsPMroPWqrEA
  it('should output to bottom bar persistently', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'HhZEM7noGNW4xpgxv4ZtXsPMroPWqrEA')
  })

  // d4wXg4yGYak09qivTqgKFZaQJ3PvDZm5
  it('should limit output to bottom bar persistently', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: 2 }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'd4wXg4yGYak09qivTqgKFZaQJ3PvDZm5')
  })

  // NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus
  it('should output to bottom bar 2 times at most and delete the prior tasks output when finished', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: true, persistentOutput: false }
        },

        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          options: { bottomBar: true, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus')
  })

  // SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT
  it('should output to from an observable', async () => {
    await new Listr(
      [
        {
          title: 'Observable test.',
          task: (): Observable<string> =>
            new Observable((observer) => {
              observer.next('test')

              observer.next('changed')

              observer.complete()
            })
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT')
  })

  // j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn
  it('should indent long multiline output with persistent output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            const start = 'This is a'
            const mid = 'long '
            const end = 'multi line output.'

            task.output = start + mid.repeat(40) + '\n' + mid.repeat(40) + '\n' + mid.repeat(40) + '\n' + mid.repeat(40) + '\n' + mid.repeat(40) + '\n' + end
          },
          options: { persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'j7BqsosH97ffW1SQSdkADSm2HnSZQ9nn')
  })

  // MjcoXTjPbNRDsgOIbGzvjt7MEaZcmasv
  it.each([ true, false ])('should have persistent output on task fail with bottom bar %s', async (input) => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'

            throw new Error('This task has failed')
          },
          options: { bottomBar: input, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true },
        exitOnError: false
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'MjcoXTjPbNRDsgOIbGzvjt7MEaZcmasv')
  })
})
