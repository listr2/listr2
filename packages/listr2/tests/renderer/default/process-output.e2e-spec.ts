import { Listr } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '#tests/utils'

describe('default renderer: process output', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should hook in to stdout/stderr and write everything above the task list as it arrives', async() => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async(_, task): Promise<void> => {
            process.stdout.write('this should be written above [0]')
            task.output = 'I will push an output. [0]'

            process.stdout.write('this should be written above [1]')
            task.output = 'I will push an output. [1]'

            process.stdout.write('this should be written above [2]')
            task.output = 'I will push an output. [2]'
          }
        }
      ],
      {
        rendererOptions: { lazy: true }
      }
    ).run()

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should hook in to stdout/stderr and write everything above the task list even though there is an error', async() => {
    try {
      await new Listr(
        [
          {
            title: 'This task will execute.',
            task: async(_, task): Promise<void> => {
              process.stdout.write('this should be written above [0]')
              task.output = 'I will push an output. [0]'

              process.stdout.write('this should be written above [1]')
              task.output = 'I will push an output. [1]'

              process.stdout.write('this should be written above [2]')
              task.output = 'I will push an output. [2]'

              throw new Error('yattara')
            }
          }
        ],
        {
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch(e) {
      expect(e).toBeTruthy()
    }

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })
})
