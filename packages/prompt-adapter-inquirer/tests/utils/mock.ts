import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'
import { Readable } from 'stream'

import type { MockProcessOutput } from './mock.interface'

// jest runs with process.stdin as an empty pipe: the first readline resume() hits EOF and closes the interface, which
// on node 24+ throws ERR_USE_AFTER_CLOSE ('readline was closed') and hangs the prompt. swap in a never-ending TTY-like
// stream so 'end' never fires and the injected keystrokes always reach the open prompt.
function mockProcessStdin(): () => void {
  const original = Object.getOwnPropertyDescriptor(process, 'stdin')
  const mock = new Readable({ read(): void {} }) as unknown as NodeJS.ReadStream

  mock.isTTY = true
  ;(mock as unknown as { isRaw: boolean }).isRaw = false
  mock.setRawMode = function(mode: boolean): NodeJS.ReadStream {
    ;(this as unknown as { isRaw: boolean }).isRaw = mode

    return this
  }

  Object.defineProperty(process, 'stdin', { value: mock, configurable: true })

  return (): void => {
    Object.defineProperty(process, 'stdin', original)
  }
}

export function mockProcessOutput(output: MockProcessOutput): void {
  output.exit = mockProcessExit()
  output.stdout = mockProcessStdout()
  output.stderr = mockProcessStderr()
  output.restoreStdin = mockProcessStdin()
}

export function unmockProcessOutput(output: MockProcessOutput): void {
  output.exit.mockRestore()
  output.stdout.mockRestore()
  output.stderr.mockRestore()
  output.restoreStdin()
}

export function expectProcessOutputToMatchSnapshot(output: MockProcessOutput, name?: string): void {
  if (name) {
    expect(output.exit.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot(name + '-exit')
    expect(output.stdout.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot(name + '-stdout')
    expect(output.stderr.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot(name + '-stderr')
  } else {
    expect(output.exit.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot()
    expect(output.stdout.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot()
    expect(output.stderr.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot()
  }
}

export function expectProcessOutputToHaveBeenCalledWith(output: MockProcessOutput, branch: keyof MockProcessOutput, match: string): void {
  expect(output[branch]).toHaveBeenCalledWith(match)
}
