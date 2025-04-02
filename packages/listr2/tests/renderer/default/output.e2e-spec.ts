import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

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
          rendererOptions: { persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'oYHBlOYGg8juKRkaqigY617eyLbGMuDd')
  })

  // LGtvNwRVWZWJQuucaYcVDSrjspKwNnVF
  it('should output to output bar with all output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          rendererOptions: { outputBar: Infinity }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'LGtvNwRVWZWJQuucaYcVDSrjspKwNnVF')
  })

  // hXDsrvlxponbYraVVuHSWACjDbyUBXkb
  it('should output to output bar with last 2 output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          rendererOptions: { outputBar: 2 }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'hXDsrvlxponbYraVVuHSWACjDbyUBXkb')
  })

  // qmiOeXTUyStaFeRgDYVlGoPJMVDbRRuC
  it('should output to output bar with last output', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          rendererOptions: { outputBar: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'qmiOeXTUyStaFeRgDYVlGoPJMVDbRRuC')
  })

  // it('should clear output from output bar', async () => {
  //   await new Listr(
  //     [
  //       {
  //         title: 'This task will execute.',
  //         task: async (_, task): Promise<void> => {
  //           task.output = 'I will push an output. [0]'

  //           task.output = 'I will push an output. [1]'

  //           task.output = 'I will push an output. [2]'

  //           task.output = ''
  //         },
  //         rendererOptions: { outputBar: Infinity, persistentOutput: true }
  //       }
  //     ],
  //     {
  //       concurrent: false,
  //       rendererOptions: { lazy: true }
  //     }
  //   ).run()

  //   expectProcessOutputToMatchSnapshot(output)
  // })

  // ojurBbWZEPenKVeoFcKksBeMbaYWmbGO
  it('should output to nowhere since outputBar and bottomBar is false', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          rendererOptions: { outputBar: false, bottomBar: false }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'ojurBbWZEPenKVeoFcKksBeMbaYWmbGO')
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
          rendererOptions: { bottomBar: Infinity }
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
          rendererOptions: { bottomBar: Infinity }
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
          rendererOptions: { bottomBar: Infinity, persistentOutput: true }
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
          rendererOptions: { bottomBar: Infinity, persistentOutput: true }
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
          rendererOptions: { bottomBar: 2 }
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
          rendererOptions: { bottomBar: true, persistentOutput: false }
        },

        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          rendererOptions: { bottomBar: true, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'NpGb4ry8b6hlK7VkJ1YcXcVibx0k5Sus')
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
          rendererOptions: { persistentOutput: true }
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
          rendererOptions: { bottomBar: input, persistentOutput: true }
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
