import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'
import { Listr } from 'listr2'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: retry', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // R34CKurUXSpq65S8ebD6jpUrwmIiYrKa
  it('should retry the main task if any of the subtasks fail', async () => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'Some type errors',
            task: async (_, task): Promise<void> => {
              task.output = 'test'

              const retry = task.isRetrying()

              if (retry.count > 0) {
                task.output = `I am self aware that I am retrying for the ${retry.count}th time.`
              }

              throw new Error('This type can not be assigned to type with, oh noes')
            },
            retry: 3
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    expect(err).toBeTruthy()
    expectProcessOutputToMatchSnapshot(output, 'R34CKurUXSpq65S8ebD6jpUrwmIiYrKa')
  })

  it('should stop retrying if the task succeeds afterwards', async () => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'Some type errors',
            task: async (_, task): Promise<void> => {
              const retry = task.isRetrying()

              if (retry?.count === 3) {
                task.title = 'Successed at 3th try.'
              } else {
                throw new Error('not enough')
              }
            },
            retry: 3
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    expect(err).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, 'oZPNYsORzcG758b1BLdR91GcErmLlQsw')
  })
})
