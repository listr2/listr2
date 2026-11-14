import type { MockInstance } from 'vitest'

export type MockProcessExit = MockInstance<typeof process.exit>

export type MockProcessOut = MockInstance<typeof process.stdout.write>

export interface MockProcessOutput {
  exit: MockProcessExit
  stdout: MockProcessOut
  stderr: MockProcessOut
}
