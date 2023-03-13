/* eslint-disable @typescript-eslint/no-empty-function */
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

import { Listr } from '@root'

describe('default renderer: process output', () => {
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
  it('should hook in to stdout/stderr and log everything after', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (_, task): Promise<void> => {
            process.stdout.write('this should be logged after [0]')
            task.output = 'I will push an output. [0]'

            process.stdout.write('this should be logged after [1]')
            task.output = 'I will push an output. [1]'

            process.stdout.write('this should be logged after [2]')
            task.output = 'I will push an output. [2]'
          }
        }
      ],
      {
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'qI0M3xvUnGRj5hNg9NhHYq5lezkNGlRK')
  })

  it('should hook in to stdout/stderr and log everything after even though there is an error', async () => {
    try {
      await new Listr(
        [
          {
            title: 'This task will execute.',
            task: async (_, task): Promise<void> => {
              process.stdout.write('this should be logged after [0]')
              task.output = 'I will push an output. [0]'

              process.stdout.write('this should be logged after [1]')
              task.output = 'I will push an output. [1]'

              process.stdout.write('this should be logged after [2]')
              task.output = 'I will push an output. [2]'

              throw new Error('yattara')
            }
          }
        ],
        {
          rendererOptions: { lazy: true }
        }
      ).run()
    } catch (e) {
      expect(e).toBeTruthy()
    }

    expectProcessOutputToMatchSnapshot(output, '77ddpC6bJ1Tj5Mz0JNjCqjq9pkwN7Gxh')
  })
})
