import { Readable } from 'stream'

import type { MockProcessOutput } from './mock.interface'

// the test runner runs with process.stdin as an empty pipe: the first readline resume() hits EOF and closes the interface, which
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
  output.exit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
  output.stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
  output.stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true)
  output.restoreStdin = mockProcessStdin()
}

export function unmockProcessOutput(output: MockProcessOutput): void {
  output.exit.mockRestore()
  output.stdout.mockRestore()
  output.stderr.mockRestore()
  output.restoreStdin()
}

export function expectProcessOutputToMatchSnapshot(output: MockProcessOutput): void {
  expect(output.exit.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot('exit')
  expect(output.stdout.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot('stdout')
  expect(output.stderr.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot('stderr')
}
