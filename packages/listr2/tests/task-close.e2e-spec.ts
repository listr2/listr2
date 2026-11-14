import { ListrTaskEventType, ListrTaskState } from '#constants'
import { Listr, delay } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { mockProcessOutput, unmockProcessOutput, hang } from '#tests/utils'

describe('close a task', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  it('should close tasks that complete, fail, or are skipped through the skip option', async() => {
    const list = new Listr(
      [
        { title: 'completes', task: async(): Promise<void> => {} },
        {
          title: 'skipped',
          skip: true,
          task: async(): Promise<void> => {}
        },
        {
          title: 'fails',
          task: async(): Promise<void> => {
            throw new Error('fails')
          }
        },
        {
          title: 'never runs',
          enabled: false,
          task: async(): Promise<void> => {}
        }
      ],
      { renderer: 'test', exitOnError: false }
    )

    await list.run()

    expect(list.tasks.map((task) => task.isClosed())).toEqual([true, true, true, false])
  })

  it('should reopen every task before the list runs again', async() => {
    const closed: boolean[][] = []

    const list = new Listr(
      [
        {
          title: 'first',
          task: async(): Promise<void> => {
            closed.push(list.tasks.map((task) => task.isClosed()))
          }
        },
        { title: 'second', task: async(): Promise<void> => {} }
      ],
      { renderer: 'test' }
    )

    await list.run()
    await list.run()

    // the second task has not run yet in either run, so it is still open
    expect(closed).toEqual([
      [false, false],
      [false, false]
    ])
    expect(list.tasks.map((task) => task.isClosed())).toEqual([true, true])
  })

  it('should cancel the unstarted subtasks before their interrupted parent closes', async() => {
    const states: ListrTaskState[] = []

    const list = new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'interrupted',
                task: async(): Promise<void> => {
                  await delay(10)

                  process.emit('SIGINT')

                  await hang()
                }
              },
              { title: 'never started', task: async(): Promise<void> => {} }
            ])
        }
      ],
      { renderer: 'test' }
    )

    list.tasks[0].on(ListrTaskEventType.CLOSED, () => {
      states.push(...list.tasks[0].subtasks.map((subtask) => subtask.state))
    })

    await list.run()

    expect(states).toEqual([ListrTaskState.CANCELLED, ListrTaskState.CANCELLED])
  })
})
