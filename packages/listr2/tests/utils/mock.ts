import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import type { MockProcessOutput } from './mock.interface'

export function mockProcessOutput(output: MockProcessOutput): void {
  output.exit = mockProcessExit()
  output.stdout = mockProcessStdout()
  output.stderr = mockProcessStderr()
}

export function unmockProcessOutput(output: MockProcessOutput): void {
  output.exit.mockRestore()
  output.stdout.mockRestore()
  output.stderr.mockRestore()
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

export function expectProcessOutputToHaveBeenCalledWith<T = any>(output: MockProcessOutput, branch: keyof MockProcessOutput, match: T): void {
  expect(output[branch]).toHaveBeenCalledWith(match)
}
