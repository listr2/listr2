import type { MockProcessOutput } from './mock.interface'

export function mockProcessOutput(output: MockProcessOutput): void {
  output.exit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
  output.stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
  output.stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true)
}

export function unmockProcessOutput(output: MockProcessOutput): void {
  output.exit.mockRestore()
  output.stdout.mockRestore()
  output.stderr.mockRestore()
}

export function expectProcessOutputToMatchSnapshot(output: MockProcessOutput): void {
  expect(output.exit.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot('exit')
  expect(output.stdout.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot('stdout')
  expect(output.stderr.mock.calls?.map((calls) => calls.shift())).toMatchSnapshot('stderr')
}
