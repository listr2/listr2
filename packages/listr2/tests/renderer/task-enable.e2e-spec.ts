import { Listr } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '#tests/utils'

describe('default renderer: task-enable', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should enable task with general context', async() => {
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

    await expectProcessOutputToMatchSnapshot(output, 'default')
  })

  it('should enable task with general context in subtasks', async() => {
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
              { concurrent: true }
            )
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
