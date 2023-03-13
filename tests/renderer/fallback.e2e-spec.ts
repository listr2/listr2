/* eslint-disable @typescript-eslint/no-empty-function */

import type { MockProcessOutput } from '@tests/utils'
import { mockProcessOutput, unmockProcessOutput } from '@tests/utils'

import { Listr } from '@root'

describe('fallback renderer', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
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

  it('should be silent renderer with function', async () => {
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
        rendererSilent: (): boolean => 3 > 0
      }
    )

    expect(task.rendererClass.name).toMatchInlineSnapshot('"SilentRenderer"')
  })

  it('should be silent renderer with boolean', async () => {
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
        rendererSilent: true
      }
    )

    expect(task.rendererClass.name).toMatchInlineSnapshot('"SilentRenderer"')
  })
})