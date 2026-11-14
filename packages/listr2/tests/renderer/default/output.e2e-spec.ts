import { Listr } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '#tests/utils'

describe('default renderer: output', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should have persistent output', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to output bar with all output', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to output bar with last 2 output', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to output bar with last output', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to nowhere since outputBar and bottomBar is false', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to bottom bar', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to bottom bar from task with no title', async() => {
    await new Listr(
      [
        {
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to bottom bar from task with no title persistently', async() => {
    await new Listr(
      [
        {
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to bottom bar persistently', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should limit output to bottom bar persistently', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should output to bottom bar 2 times at most and delete the prior tasks output when finished', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'
          },
          rendererOptions: { bottomBar: true, persistentOutput: false }
        },

        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should indent long multiline output with persistent output', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it.each([true, false])('should have persistent output on task fail with bottom bar %s', async(input) => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should clear the output bar when output is set to null', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = null
          },
          rendererOptions: { outputBar: true, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should clear all lines from the output bar with outputBar as Infinity when output is set to null', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'

            task.output = null
          },
          rendererOptions: { outputBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should clear all lines from the output bar with outputBar as a number when output is set to null', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'

            task.output = null
          },
          rendererOptions: { outputBar: 3, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should clear the bottom bar when output is set to null', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = 'I will push an output. [1]'

            task.output = 'I will push an output. [2]'

            task.output = null
          },
          rendererOptions: { bottomBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should stream new output again after being cleared with null', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            task.output = null

            task.output = 'I will push an output. [1]'
          },
          rendererOptions: { outputBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should be a no-op when output is cleared before any output is streamed', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = null
          },
          rendererOptions: { outputBar: Infinity, persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should be a no-op when output is cleared after the task has finalized', async() => {
    let finalized: any

    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            task.output = 'I will push an output. [0]'

            finalized = task
          },
          rendererOptions: { outputBar: Infinity, persistentOutput: true }
        },

        {
          title: 'This task will execute.',
          task: async(): Promise<void> => {
            finalized.output = null
          }
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })
})
