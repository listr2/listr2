import { Manager } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('skip a task', () => {
  let manager: Manager<any, 'test'>

  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async() => {
    manager = new Manager<any, 'test'>({ renderer: 'test' })

    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should add tasks to the manager', async() => {
    manager.add([
      {
        task: (): Promise<void> => Promise.resolve()
      }
    ])

    await manager.runAll()

    expectProcessOutputToMatchSnapshot(output, 'GFB8X86ruFomKEgjsONBJpAyKOAF3NXP')
  })

  it('should indent the task in manager', async() => {
    manager.add([
      {
        ...manager.indent([
          {
            task: (): Promise<void> => Promise.resolve()
          }
        ])
      }
    ])

    await manager.runAll()

    expectProcessOutputToMatchSnapshot(output, 'iKVBsenKiZgkkgSQSW6OEluZqkppF7j8')
  })

  it('should change the context in manager', async() => {
    manager.ctx = {
      test: true
    }

    manager.add([
      {
        title: 'child',
        enabled: (ctx): boolean => ctx.test,
        task: (): Promise<void> => Promise.resolve()
      }
    ])

    await manager.runAll()

    expectProcessOutputToMatchSnapshot(output, '5DzFgF4pfTuE12WN84l3ogCgRJPb6t9L')
  })
})
