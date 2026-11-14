import type { MockProcessOut, MockProcessOutput } from './mock.interface'
import { VirtualTerminal } from './virtual-terminal'
import type { ListrRendererValue } from '#interfaces'

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

/**
 * Snapshots what the process wrote. The default renderer redraws its live region with escape sequences, so its output is replayed
 * on a terminal and snapshotted as the screens a user sees after each write.
 */
export async function expectProcessOutputToMatchSnapshot(output: MockProcessOutput, renderer?: ListrRendererValue): Promise<void> {
  expect(output.exit.mock.calls.map(([code]) => code)).toMatchSnapshot('exit')

  if (renderer === 'default') {
    expect(await screens(output.stdout)).toMatchSnapshot('screen')
  } else {
    expect(output.stdout.mock.calls.map(([chunk]) => chunk)).toMatchSnapshot('stdout')
  }

  expect(output.stderr.mock.calls.map(([chunk]) => chunk)).toMatchSnapshot('stderr')
}

async function screens(stdout: MockProcessOut): Promise<string[]> {
  const terminal = new VirtualTerminal({ columns: process.stdout.columns ?? 80, rows: 1000 })
  const frames: string[] = []

  for (const [chunk] of stdout.mock.calls) {
    terminal.write(chunk)

    const frame = (await terminal.content()).join('\n')

    if (frame !== (frames.at(-1) ?? '')) {
      frames.push(frame)
    }
  }

  terminal.dispose()

  return frames
}
