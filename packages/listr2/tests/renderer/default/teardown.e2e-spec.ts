import { ListrEventType } from '@constants'
import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('default renderer: teardown', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(() => {
    mockProcessOutput(output)
  })

  afterEach(() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should not repaint a frame when a refresh fires after the run has ended', async() => {
    const task = new Listr([{ title: 'test', task: (): void => undefined }], { renderer: 'default', rendererOptions: { lazy: true } })

    await task.run()

    // once end() has torn down the updater a stray refresh must be a no-op — otherwise it repaints a duplicate frame
    // below the persisted output (log-update treats a call after clear() as a fresh first frame)
    const writes = output.stdout.mock.calls.length

    task.events.emit(ListrEventType.SHOULD_REFRESH_RENDER)

    expect(output.stdout.mock.calls.length).toBe(writes)
  })
})
