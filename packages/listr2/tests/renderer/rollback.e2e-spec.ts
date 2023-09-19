import { Listr } from '@root'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: rollback', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // 4SIhMkI14b8s2hW1esiORoa1UINGHwAr
  it('should rollback the main task if any of the subtasks fail', async () => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      throw new Error('This task failed after 2 seconds.')
                    }
                  },
                  {
                    title: 'This task will execute.',
                    task: (_, task): void => {
                      task.title = 'I will change my title if this executes.'
                    }
                  }
                ],
                { exitOnError: true }
              ),
            rollback: async (_, task): Promise<void> => {
              task.title = 'I am trying to rollback stuff, previous action failed.'

              task.title = 'Some actions required rollback stuff.'
            }
          },

          {
            title: 'This task will never execute.',
            task: async (_, task): Promise<void> => {
              task.title = 'This task executed unlike expected.'
            }
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
    expectProcessOutputToMatchSnapshot(output, '4SIhMkI14b8s2hW1esiORoa1UINGHwAr')
  })

  // vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx
  it('should rollback the subtask if the subtask itself fails', async () => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      throw new Error('This task failed after 2 seconds.')
                    },
                    rollback: async (_, task): Promise<void> => {
                      task.title = 'I am trying to rollback stuff, previous action failed.'

                      task.title = 'Some actions required rollback stuff.'
                    }
                  },
                  {
                    title: 'This task will execute.',
                    task: (_, task): void => {
                      task.title = 'I will change my title if this executes.'
                    }
                  }
                ],
                { exitOnError: true }
              )
          },
          {
            title: 'This task will never execute.',
            task: async (_, task): Promise<void> => {
              task.title = 'This task executed unlike expected.'
            }
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
    expectProcessOutputToMatchSnapshot(output, 'vnT6mmZ5GtNqgXaPHqXxTIpDm5sltAZx')
  })

  // 0IT1rYAGLTZ6UNfsxrJCFMik9UrnEd7A
  it.each([ true, false ])('should both stop the execution with exitOnError %s since exitAfterRollback is independent', async (cases) => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      throw new Error('This task failed after 2 seconds.')
                    }
                  },
                  {
                    title: 'This task will execute.',
                    task: (_, task): void => {
                      task.title = 'I will change my title if this executes.'
                    }
                  }
                ],
                { exitOnError: true, concurrent: false }
              ),
            rollback: async (_, task): Promise<void> => {
              task.title = 'I am trying to rollback stuff, previous action failed.'

              task.title = 'Some actions required rollback stuff.'
            }
          },
          {
            title: 'This task will maybe execute.',
            task: async (_, task): Promise<void> => {
              task.title = 'This task is executed unlike expected.'
            }
          }
        ],
        {
          concurrent: false,
          exitAfterRollback: true,
          exitOnError: cases,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    if (cases) {
      expect(err).toBeTruthy()
    } else {
      expect(err).toBeFalsy()
    }
    expectProcessOutputToMatchSnapshot(output, '0IT1rYAGLTZ6UNfsxrJCFMik9UrnEd7A')
  })

  // 1cj9pfWF3xjiEk2FW1Rt13qVcfSY9sR8
  it.each([ true, false ])('should contunie execution or stop there with exitAfterRollback: %s', async (cases) => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: 'Something with rollback.',
            task: (_, task): Listr =>
              task.newListr(
                [
                  {
                    title: 'This task will fail.',
                    task: async (): Promise<void> => {
                      throw new Error('This task failed after 2 seconds.')
                    }
                  },
                  {
                    title: 'This task will execute.',
                    task: (_, task): void => {
                      task.title = 'I will change my title if this executes.'
                    }
                  }
                ],
                { exitOnError: true }
              ),
            rollback: async (_, task): Promise<void> => {
              task.title = 'I am trying to rollback stuff, previous action failed.'

              task.title = 'Some actions required rollback stuff.'
            }
          },
          {
            title: 'This task will maybe execute.',
            task: async (): Promise<void> => {}
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          exitAfterRollback: cases,
          renderer,
          rendererOptions
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    if (cases) {
      expect(err).toBeTruthy()
    } else {
      expect(err).toBeFalsy()
    }

    expectProcessOutputToMatchSnapshot(output, '1cj9pfWF3xjiEk2FW1Rt13qVcfSY9sR8')
  })
})
