import { Task } from '@lib'
import type { ListrTaskFailure } from '@root'
import { ListrErrorTypes, ListrTaskState, Listr, delay } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('task retry', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.restoreAllMocks()
  })

  describe('fail', () => {
    it('should fail the task without using the remaining retries', async() => {
      const error = new Error('fatal')
      const fn = jest.fn(async(_, task) => task.fail(error))
      const listr = new Listr([{ task: fn, retry: 5 }], { renderer: 'silent', collectErrors: true })

      await expect(listr.run()).rejects.toBe(error)

      expect(fn).toHaveBeenCalledTimes(1)
      expect(listr.tasks[0].state).toBe(ListrTaskState.FAILED)
      expect(listr.tasks[0].message.error).toBe('fatal')
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.HAS_FAILED])
      expect(listr.errors[0].error).toBe(error)
    })

    it('should fail from a synchronous task', async() => {
      const error = new Error('fatal')
      const fn = jest.fn((_, task) => task.fail(error))

      await expect(new Listr([{ task: fn, retry: 5 }], { renderer: 'silent' }).run()).rejects.toBe(error)

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should still retry thrown errors before the task fails itself', async() => {
      const error = new Error('fatal')
      const fn = jest.fn(async(_, task) => {
        if (task.isRetrying().count < 2) {
          throw new Error('not yet')
        }

        return task.fail(error)
      })
      const listr = new Listr([{ task: fn, retry: 5 }], { renderer: 'silent', collectErrors: true })

      await expect(listr.run()).rejects.toBe(error)

      expect(fn).toHaveBeenCalledTimes(3)
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.WILL_RETRY, ListrErrorTypes.WILL_RETRY, ListrErrorTypes.HAS_FAILED])
    })

    it('should retry thrown errors with all the retries', async() => {
      const fn = jest.fn(async() => {
        throw new Error('not yet')
      })

      await expect(new Listr([{ task: fn, retry: 2 }], { renderer: 'silent' }).run()).rejects.toThrow('not yet')

      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('should be distinct from skipping a task', async() => {
      const listr = new Listr(
        [
          {
            task: async(_, task): Promise<void> => {
              task.skip('skipped')
            },
            retry: 2
          },
          {
            task: async(_, task): Promise<ListrTaskFailure> => task.fail(new Error('fatal')),
            retry: 2
          }
        ],
        { renderer: 'silent', exitOnError: false }
      )

      await listr.run()

      expect(listr.tasks.map((task) => task.state)).toEqual([ListrTaskState.SKIPPED, ListrTaskState.FAILED])
      expect(listr.tasks[0].message).toMatchObject({ skip: 'skipped' })
      expect(listr.tasks[1].message).toMatchObject({ error: 'fatal' })
    })

    it('should keep the concurrent siblings running when not exiting on error', async() => {
      const listr = new Listr(
        [
          {
            task: async(_, task): Promise<ListrTaskFailure> => task.fail(new Error('fatal')),
            retry: { tries: 5, delay: 5000 }
          },
          {
            task: async(): Promise<void> => {
              await delay(20)
            }
          }
        ],
        {
          renderer: 'silent',
          concurrent: true,
          exitOnError: false,
          collectErrors: true
        }
      )

      await listr.run()

      expect(listr.signal.aborted).toBe(false)
      expect(output.exit).not.toHaveBeenCalled()
      expect(listr.tasks.map((task) => task.state)).toEqual([ListrTaskState.FAILED, ListrTaskState.COMPLETED])
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR])
    })

    it('should roll back the task with the given error', async() => {
      const error = new Error('fatal')
      const fn = jest.fn(async(_, task) => task.fail(error))
      const rollback = jest.fn(async(): Promise<void> => {})
      const listr = new Listr(
        [
          {
            task: fn,
            retry: 5,
            rollback
          }
        ],
        { renderer: 'silent', collectErrors: true }
      )

      await expect(listr.run()).rejects.toBe(error)

      expect(fn).toHaveBeenCalledTimes(1)
      expect(rollback).toHaveBeenCalledTimes(1)
      expect(listr.tasks[0].state).toBe(ListrTaskState.ROLLED_BACK)
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.WILL_ROLLBACK])
    })

    it('should fail the task when task.fail is thrown', async() => {
      const error = new Error('fatal')
      const fn = jest.fn(async(_, task): Promise<void> => {
        throw task.fail(error)
      })
      const listr = new Listr([{ task: fn, retry: 5 }], { renderer: 'silent', collectErrors: true })

      await expect(listr.run()).rejects.toBe(error)

      expect(fn).toHaveBeenCalledTimes(1)
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.HAS_FAILED])
    })

    it('should not stop the retries of the parent when a subtask fails itself', async() => {
      const error = new Error('fatal')
      const child = jest.fn(async(_, task): Promise<ListrTaskFailure> => task.fail(error))
      const parent = jest.fn((_, task) => task.newListr([{ task: child, retry: 5 }]))

      await expect(new Listr([{ task: parent, retry: 2 }], { renderer: 'silent' }).run()).rejects.toBe(error)

      expect(parent).toHaveBeenCalledTimes(3)
      expect(child).toHaveBeenCalledTimes(3)
    })

    it('should treat a plain return as success', async() => {
      const listr = new Listr([{ task: async(): Promise<void> => {}, retry: 5 }], { renderer: 'silent' })

      await listr.run()

      expect(listr.tasks[0].state).toBe(ListrTaskState.COMPLETED)
    })
  })

  describe('delay', () => {
    it('should evaluate the delay callback before every retry', async() => {
      const pause = jest.spyOn(Task.prototype, 'pause')
      const ctx = { base: 1 }
      const errors = [new Error('1'), new Error('2'), new Error('3')]
      const retryDelay = jest.fn(({ count }, { base }: { base: number }) => base * 2 ** (count - 1))
      const fn = jest.fn(async(_, task) => {
        throw errors[task.isRetrying().count]
      })

      await expect(new Listr([{ task: fn, retry: { tries: 2, delay: retryDelay } }], { renderer: 'silent', ctx }).run()).rejects.toBe(errors[2])

      expect(fn).toHaveBeenCalledTimes(3)
      expect(retryDelay.mock.calls).toEqual([
        [{ count: 1, error: errors[0] }, ctx],
        [{ count: 2, error: errors[1] }, ctx]
      ])
      expect(pause.mock.calls).toEqual([[1], [2]])
    })

    it('should await an asynchronous delay callback', async() => {
      const pause = jest.spyOn(Task.prototype, 'pause')
      const fn = jest.fn(async() => {
        throw new Error('not yet')
      })

      await expect(new Listr([{ task: fn, retry: { tries: 1, delay: async(): Promise<number> => 5 } }], { renderer: 'silent' }).run()).rejects.toThrow('not yet')

      expect(fn).toHaveBeenCalledTimes(2)
      expect(pause.mock.calls).toEqual([[5]])
    })

    it('should not pause when the delay callback returns zero', async() => {
      const pause = jest.spyOn(Task.prototype, 'pause')
      const fn = jest.fn(async() => {
        throw new Error('not yet')
      })

      await expect(new Listr([{ task: fn, retry: { tries: 2, delay: (): number => 0 } }], { renderer: 'silent' }).run()).rejects.toThrow('not yet')

      expect(fn).toHaveBeenCalledTimes(3)
      expect(pause).not.toHaveBeenCalled()
    })

    it('should fail the task with the error of the delay callback', async() => {
      const error = new Error('delay')
      const fn = jest.fn(async() => {
        throw new Error('not yet')
      })
      const listr = new Listr(
        [
          {
            task: fn,
            retry: {
              tries: 5,
              delay: ({ count }): number => {
                if (count === 2) {
                  throw error
                }

                return 0
              }
            }
          }
        ],
        { renderer: 'silent', collectErrors: true }
      )

      await expect(listr.run()).rejects.toBe(error)

      expect(fn).toHaveBeenCalledTimes(2)
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.WILL_RETRY, ListrErrorTypes.HAS_FAILED])
    })

    it('should not hang on a pending delay callback when interrupted', async() => {
      const error = new Error('attempt')
      const fn = jest.fn(async(): Promise<void> => {
        throw error
      })
      const rollback = jest.fn(async(): Promise<void> => {})
      let started: () => void
      const pending = new Promise<void>((resolve) => {
        started = resolve
      })
      const listr = new Listr(
        [
          {
            task: fn,
            retry: {
              tries: 5,
              delay: (): Promise<number> => {
                started()

                return new Promise<number>(() => {})
              }
            },
            rollback
          }
        ],
        { renderer: 'silent', collectErrors: true }
      )

      const run = listr.run()

      await pending
      listr.cancel()
      await run

      expect(fn).toHaveBeenCalledTimes(1)
      expect(rollback).toHaveBeenCalledTimes(1)
      expect(output.exit).toHaveBeenCalledWith(127)
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.WILL_ROLLBACK])
      expect(listr.errors[0].error).toBe(error)
    })

    it('should not hang on a pending delay callback of a task with subtasks when interrupted', async() => {
      let started: () => void
      const pending = new Promise<void>((resolve) => {
        started = resolve
      })
      const parent = jest.fn((_, task) =>
        task.newListr([
          {
            task: async(): Promise<void> => {
              throw new Error('child')
            }
          }
        ])
      )
      const listr = new Listr(
        [
          {
            task: parent,
            retry: {
              tries: 5,
              delay: (): Promise<number> => {
                started()

                return new Promise<number>(() => {})
              }
            }
          }
        ],
        { renderer: 'silent' }
      )

      const run = listr.run()

      await pending
      listr.cancel()
      await run

      expect(parent).toHaveBeenCalledTimes(1)
      expect(output.exit).toHaveBeenCalledWith(127)
      expect(listr.tasks[0].state).toBe(ListrTaskState.CANCELLED)
    })

    it('should keep the error of the attempt when the delay callback throws after an interrupt', async() => {
      const error = new Error('attempt')
      const fn = jest.fn(async(): Promise<void> => {
        throw error
      })
      const rollback = jest.fn(async(): Promise<void> => {})
      const listr = new Listr(
        [
          {
            task: fn,
            retry: {
              tries: 5,
              delay: (): number => {
                listr.cancel()

                throw new Error('delay')
              }
            },
            rollback
          }
        ],
        { renderer: 'silent', collectErrors: true }
      )

      await listr.run()

      expect(fn).toHaveBeenCalledTimes(1)
      expect(output.exit).toHaveBeenCalledWith(127)
      expect(listr.errors.map((e) => e.type)).toEqual([ListrErrorTypes.WILL_ROLLBACK])
      expect(listr.errors[0].error).toBe(error)
    })

    it('should keep pausing with a numeric delay', async() => {
      const pause = jest.spyOn(Task.prototype, 'pause')
      const fn = jest.fn(async() => {
        throw new Error('not yet')
      })

      await expect(new Listr([{ task: fn, retry: { tries: 2, delay: 5 } }], { renderer: 'silent' }).run()).rejects.toThrow('not yet')

      expect(fn).toHaveBeenCalledTimes(3)
      expect(pause.mock.calls).toEqual([[5], [5]])
    })
  })
})
