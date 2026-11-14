import { Listr } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '#tests/utils'

describe('default renderer: error handling', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should throw out an error in the data field with collapse errors false', async() => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async(): Promise<void> => {
              throw new Error('This task failed after 2 seconds.')
            }
          },
          {
            title: 'This task will never execute.',
            task: (_, task): void => {
              task.title = 'I will change my title if this executes.'
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true, collapseErrors: false }
        }
      ).run()
    } catch(e: any) {
      err = e
    }

    expect(err).toBeTruthy()
    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should show the default task title when failed with showErrorMessage of', async() => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'This task will fail.',
            task: async(): Promise<void> => {
              throw new Error('This task failed after 2 seconds.')
            }
          },
          {
            title: 'This task will never execute.',
            task: (_, task): void => {
              task.title = 'I will change my title if this executes.'
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true, showErrorMessage: false }
        }
      ).run()
    } catch(e: any) {
      err = e
    }

    expect(err).toBeTruthy()
    await expectProcessOutputToMatchSnapshot(output, 'default')
  })
})
