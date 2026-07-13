import { ANSI_ESCAPE_CODES } from '@constants'
import type { MockProcessOutput } from '@tests/utils'
import { mockProcessOutput, unmockProcessOutput } from '@tests/utils'
import { ProcessOutput } from '@utils'

describe('process-output: cursor', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(() => {
    mockProcessOutput(output)
  })

  afterEach(() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should hide the cursor on demand', () => {
    new ProcessOutput().hideCursor()

    expect(output.stdout).toHaveBeenCalledWith(ANSI_ESCAPE_CODES.CURSOR_HIDE)
  })

  it('should show the cursor on demand', () => {
    new ProcessOutput().showCursor()

    expect(output.stdout).toHaveBeenCalledWith(ANSI_ESCAPE_CODES.CURSOR_SHOW)
  })

  it('should not touch the cursor when hijacking, so the owner controls visibility', () => {
    new ProcessOutput().hijack()

    expect(output.stdout).not.toHaveBeenCalledWith(ANSI_ESCAPE_CODES.CURSOR_HIDE)
    expect(output.stdout).not.toHaveBeenCalledWith(ANSI_ESCAPE_CODES.CURSOR_SHOW)
  })

  it('should restore the cursor when releasing an active hijack', () => {
    const process = new ProcessOutput()

    process.hijack()
    process.release()

    expect(output.stdout).toHaveBeenCalledWith(ANSI_ESCAPE_CODES.CURSOR_SHOW)
  })

  it('should not restore the cursor when releasing without an active hijack', () => {
    new ProcessOutput().release()

    expect(output.stdout).not.toHaveBeenCalledWith(ANSI_ESCAPE_CODES.CURSOR_SHOW)
  })
})
