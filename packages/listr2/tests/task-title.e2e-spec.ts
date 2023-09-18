import { Listr } from 'listr2'

import type { MockProcessOutput } from './utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from './utils'

describe('task: title', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = false

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should change title on function', async () => {
    await new Listr(
      [
        {
          title: 'test',
          task: (_, task): void => {
            task.title = 'changed'
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output)
  })

  it('should change title on async function', async () => {
    await new Listr(
      [
        {
          title: 'test',
          task: async (_, task): Promise<void> => {
            task.title = 'changed'
          }
        }
      ],
      { renderer: 'test' }
    ).run()

    expectProcessOutputToMatchSnapshot(output)
  })
})
