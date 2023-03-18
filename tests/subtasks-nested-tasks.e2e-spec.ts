import type { MockProcessOutput } from './utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from './utils'
import type { ListrTask } from '@root'
import { Listr } from '@root'

describe('subtask nested handling', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  const tasks: ListrTask<any, any>[] = [
    {
      title: '1',
      task: async (): Promise<void> => {}
    },

    {
      title: '2',
      task: async (): Promise<void> => {}
    },

    {
      title: '3',
      task: async (): Promise<void> => {}
    },

    {
      title: '4',
      task: async (): Promise<void> => {}
    }
  ]

  const subtasks: ListrTask<any, any>[] = tasks.reduce((o, task) => {
    const subtask = {
      ...task,
      title: 'sub' + task.title
    }

    return [ ...o, subtask ]
  }, [])

  it('should run concurrent on parent, serial on child', async () => {
    await new Listr(
      [
        ...tasks,
        {
          title: 'subtask',
          task: (_, task): Listr => task.newListr(subtasks, { concurrent: false })
        }
      ],
      { concurrent: true, renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'JGkuFCkPH1hvpem4paRkCU0aYRKcyFAX')
  })

  it('should run serial on parent, concurrent on child', async () => {
    await new Listr(
      [
        ...tasks,
        {
          title: 'subtask',
          task: (_, task): Listr => task.newListr(subtasks, { concurrent: true })
        }
      ],
      { concurrent: false, renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'zFdEUbIjy1pWE2Me1Zk9EVxEcAcCVw5G')
  })
})
