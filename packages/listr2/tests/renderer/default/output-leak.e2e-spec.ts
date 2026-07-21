import type EventEmitter from 'node:events'

import { ListrTaskEventType } from '@constants'
import { Listr, delay } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('default renderer: output buffer listeners', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  // reaches the private emitter behind ListrTaskEventManager to count the listeners the renderer attaches to a task
  function listenerCount(task: unknown, event: ListrTaskEventType): number {
    return (task as { emitter: EventEmitter }).emitter.listenerCount(event)
  }

  beforeEach(() => {
    mockProcessOutput(output)
  })

  afterEach(() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // a finalized task used to have its output buffer re-created — and its output/state listeners re-attached — on every
  // render, leaking without bound when another task streamed to task.output at a high rate over a long run
  it('should not re-attach output listeners to a finalized task while another streams output', async() => {
    const task = new Listr(
      [
        { title: 'finalizes early', task: (): void => undefined },
        {
          title: 'streams output',
          task: async(_, subtask): Promise<void> => {
            for (let i = 0; i < 100; i++) {
              subtask.output = `output ${i}`

              await delay(0)
            }
          }
        }
      ],
      { concurrent: true, rendererOptions: { lazy: true } }
    )

    await task.run()

    const finalized = task.tasks[0]

    expect(listenerCount(finalized, ListrTaskEventType.OUTPUT)).toBeLessThanOrEqual(1)
    expect(listenerCount(finalized, ListrTaskEventType.STATE)).toBeLessThanOrEqual(1)
  })
})
