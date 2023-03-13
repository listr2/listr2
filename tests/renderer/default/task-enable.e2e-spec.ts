/* eslint-disable @typescript-eslint/no-empty-function */
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

import { Listr } from '@root'

describe('default renderer: task-enable', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU
  it('should enable task with general context', async () => {
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
          enabled: (ctx): boolean => !ctx.skip,
          task: (): void => {}
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU')
  })

  // 2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB
  it('should enable task with general context in subtasks', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx): void => {
            ctx.skip = true
          }
        },

        {
          title: 'This task will show subtasks.',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'This task will execute.',
                  task: (): void => {}
                },

                {
                  title: 'This task will never execute.',
                  enabled: (ctx): boolean => !ctx.skip,
                  task: (): void => {}
                }
              ],
              { rendererOptions: { collapse: false }, concurrent: true }
            )
        }
      ],
      {
        concurrent: false,
        rendererOptions: { lazy: true }
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, '2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB')
  })
})
