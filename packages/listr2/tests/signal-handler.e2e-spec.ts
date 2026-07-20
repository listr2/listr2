import type { MockProcessOutput } from './utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from './utils'
import { Listr, delay } from '@root'

// keeps a task in-flight until the interruption races it out, without leaving a real timer alive past the test
const hang = (): Promise<void> => new Promise<void>(() => undefined)

describe('signal handlers', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // LFRhPFJHChAJcQIEadkDdOlPezdltcfe
  it('should try to cancel running tasks', async() => {
    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await hang()
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'LFRhPFJHChAJcQIEadkDdOlPezdltcfe')
  })

  // https://github.com/listr2/listr2/issues/709 running this double seems to mess it somehow?
  // ACxcRBILlHsqiSxYArjASFdofVqLaUyE
  it('should try to cancel running tasks', async() => {
    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {}
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await hang()
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'ACxcRBILlHsqiSxYArjASFdofVqLaUyE')
  })

  // aQ9mZ2kR7wT4xB1nC6vL0pF3sD8gH5jU
  it('should run the rollback of a task when interrupted, not cancel it', async() => {
    let rolledBack = false

    const list = new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await hang()
          },
          rollback: async(): Promise<void> => {
            rolledBack = true
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    )

    await list.run()

    expect(rolledBack).toBe(true)
    expect(list.tasks[0].hasRolledBack()).toBe(true)
    expect(list.tasks[0].isCancelled()).toBe(false)
    expectProcessOutputToMatchSnapshot(output, 'aQ9mZ2kR7wT4xB1nC6vL0pF3sD8gH5jU')
  })

  // Bq7Kd2XpRn4YtM8LwZ0FsC6VjH3gA9Eu
  it('should still exit when the interrupted failure is swallowed by exitOnError false', async() => {
    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await hang()
          }
        }
      ],
      {
        concurrent: false,
        exitOnError: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expect(output.exit).toHaveBeenCalledWith(127)
    expectProcessOutputToMatchSnapshot(output, 'Bq7Kd2XpRn4YtM8LwZ0FsC6VjH3gA9Eu')
  })

  // Vw2NpT6RcX9KdL4mB1QsJ7ZfG0hY5aEi
  it('should still exit and rollback when exitAfterRollback is false', async() => {
    let rolledBack = false

    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await hang()
          },
          rollback: async(): Promise<void> => {
            rolledBack = true
          }
        }
      ],
      {
        concurrent: false,
        exitAfterRollback: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expect(rolledBack).toBe(true)
    expect(output.exit).toHaveBeenCalledWith(127)
    expectProcessOutputToMatchSnapshot(output, 'Vw2NpT6RcX9KdL4mB1QsJ7ZfG0hY5aEi')
  })

  it('should settle all concurrent sibling rollbacks before the parent rolls back', async() => {
    const order: string[] = []

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'child-a',
                  task: async(): Promise<void> => {
                    await delay(10)

                    process.emit('SIGINT')

                    await hang()
                  },
                  rollback: async(): Promise<void> => {
                    await delay(5)

                    order.push('child-a')
                  }
                },
                {
                  title: 'child-b',
                  task: async(): Promise<void> => {
                    await hang()
                  },
                  rollback: async(): Promise<void> => {
                    await delay(50)

                    order.push('child-b')
                  }
                }
              ],
              { concurrent: true }
            ),
          rollback: async(): Promise<void> => {
            order.push('parent')
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expect(order).toEqual(['child-a', 'child-b', 'parent'])
    expect(output.exit).toHaveBeenCalledWith(127)
  })

  // Fn4Ld6WpQr8YtX2mB0KsJ5ZcV7hG3aEu
  it('should mark still-pending tasks as cancelled on interrupt', async() => {
    const list = new Listr(
      [
        {
          title: 'running',
          task: async(): Promise<void> => {
            await delay(10)

            process.emit('SIGINT')

            await hang()
          }
        },
        {
          title: 'queued one',
          task: async(): Promise<void> => {
            await delay(50)
          }
        },
        {
          title: 'queued two',
          task: async(): Promise<void> => {
            await delay(50)
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    )

    await list.run()

    expect(list.tasks.every((task) => task.isCancelled() && task.hasFinalized() && !task.hasFailed())).toBe(true)
    expect(output.exit).toHaveBeenCalledWith(127)
    expectProcessOutputToMatchSnapshot(output, 'Fn4Ld6WpQr8YtX2mB0KsJ5ZcV7hG3aEu')
  })

  it('should interrupt the run programmatically with cancel()', async() => {
    let rolledBack = false

    const list = new Listr(
      [
        {
          title: 'trigger',
          task: async(_, task): Promise<void> => {
            await delay(10)

            task.cancel()

            await hang()
          }
        },
        {
          title: 'sibling',
          task: async(): Promise<void> => {
            await hang()
          },
          rollback: async(): Promise<void> => {
            rolledBack = true
          }
        }
      ],
      {
        concurrent: true,
        renderer: 'test',
        registerSignalListeners: true
      }
    )

    await list.run()

    expect(rolledBack).toBe(true)
    expect(list.tasks[0].isCancelled()).toBe(true)
    expect(list.tasks[1].hasRolledBack()).toBe(true)
    expect(output.exit).toHaveBeenCalledWith(127)
  })

  it('should abort task.signal for cooperative cancellation and share it across the tree', async() => {
    let aborted = false
    let workerSignal: AbortSignal | undefined
    let subtaskSignal: AbortSignal | undefined

    const list = new Listr(
      [
        {
          title: 'canceller',
          task: async(_, task): Promise<void> => {
            await delay(20)

            task.cancel()
          }
        },
        {
          title: 'worker',
          task: (_, task): Listr => {
            workerSignal = task.signal

            task.signal.addEventListener('abort', () => {
              aborted = true
            })

            return task.newListr([
              {
                title: 'subtask',
                task: async(_, subtask): Promise<void> => {
                  subtaskSignal = subtask.signal

                  await hang()
                }
              }
            ])
          }
        }
      ],
      {
        concurrent: true,
        renderer: 'test',
        registerSignalListeners: true
      }
    )

    await list.run()

    expect(aborted).toBe(true)
    expect(list.signal.aborted).toBe(true)
    expect(workerSignal).toBe(list.signal)
    expect(subtaskSignal).toBe(list.signal)
  })

  it('should cancel programmatically even with registerSignalListeners disabled', async() => {
    let rolledBack = false

    const list = new Listr(
      [
        {
          title: 'canceller',
          task: async(_, task): Promise<void> => {
            await delay(10)

            task.cancel()

            await hang()
          }
        },
        {
          title: 'sibling',
          task: async(): Promise<void> => {
            await hang()
          },
          rollback: async(): Promise<void> => {
            rolledBack = true
          }
        }
      ],
      {
        concurrent: true,
        renderer: 'test',
        registerSignalListeners: false
      }
    )

    await list.run()

    expect(rolledBack).toBe(true)
    expect(list.tasks[0].isCancelled()).toBe(true)
    expect(output.exit).toHaveBeenCalledWith(127)
  })

  it('should cancel the run from outside with listr.cancel()', async() => {
    let rolledBack = false

    const list = new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {
            await hang()
          },
          rollback: async(): Promise<void> => {
            rolledBack = true
          }
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    )

    const promise = list.run()

    await delay(20)

    list.cancel()

    await promise

    expect(rolledBack).toBe(true)
    expect(output.exit).toHaveBeenCalledWith(127)
  })

  it('should cancel the run from a subtask', async() => {
    let rolledBack = false

    const list = new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'subtask',
                task: async(_, subtask): Promise<void> => {
                  await delay(10)

                  subtask.cancel()

                  await hang()
                }
              }
            ])
        },
        {
          title: 'sibling',
          task: async(): Promise<void> => {
            await hang()
          },
          rollback: async(): Promise<void> => {
            rolledBack = true
          }
        }
      ],
      {
        concurrent: true,
        renderer: 'test',
        registerSignalListeners: true
      }
    )

    await list.run()

    expect(rolledBack).toBe(true)
    expect(output.exit).toHaveBeenCalledWith(127)
  })

  it('should not clear other SIGINT listeners', async() => {
    process.addListener('SIGINT', function doNotRemove() {})
    expect(process.listeners('SIGINT').map((listener) => listener.name)).toContain('doNotRemove')

    await new Listr(
      [
        {
          title: 'a task',
          task: async(): Promise<void> => {}
        }
      ],
      {
        concurrent: false,
        renderer: 'test',
        registerSignalListeners: true
      }
    ).run()

    expect(process.listeners('SIGINT').map((listener) => listener.name)).toContain('doNotRemove')
  })

  it('should remove the signal handler if checking the task fails', async() => {
    const listeners = process.listeners('SIGINT')

    await new Listr([
      {
        title: 'a task',
        task: async(): Promise<void> => {},
        enabled: (): boolean => {
          throw new Error('failed')
        }
      }
    ])
      .run()
      .catch(() => {})

    expect(process.listeners('SIGINT')).toEqual(listeners)
  })
})
