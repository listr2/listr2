/* eslint-disable @typescript-eslint/no-empty-function */
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('fallback renderer', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
    jest.clearAllMocks()
  })

  it('should fallback renderer with function', async () => {
    const task = new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (): Promise<void> => {},
          options: { persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        renderer: 'default',
        nonTTYRenderer: 'verbose',
        ctx: { test: true },
        rendererFallback: (): boolean => 3 > 0
      }
    )

    expect(task.rendererClass.name).toMatchInlineSnapshot('"VerboseRenderer"')
  })

  it('should fallback renderer with boolean', async () => {
    const task = new Listr(
      [
        {
          title: 'This task will execute.',
          task: async (): Promise<void> => {},
          options: { persistentOutput: true }
        }
      ],
      {
        concurrent: false,
        renderer: 'default',
        nonTTYRenderer: 'verbose',
        ctx: { test: true },
        rendererFallback: true
      }
    )

    expect(task.rendererClass.name).toMatchInlineSnapshot('"VerboseRenderer"')
  })
})
