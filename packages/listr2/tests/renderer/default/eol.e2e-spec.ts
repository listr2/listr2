import type * as os from 'os'

import { VirtualTerminal, range } from '#tests/utils'

vi.mock('os', async(original) => ({ ...(await original<typeof os>()), EOL: '\r\n' }))

const { Listr, ListrLogger, ProcessOutput } = await import('#root')

describe('default renderer: windows line endings', () => {
  let vt: VirtualTerminal

  afterEach(() => {
    vt.dispose()
  })

  it('should count each wrapped row when the line ending is \\r\\n', async() => {
    vt = new VirtualTerminal({ columns: 40, rows: 10 })

    let seen: string[]
    let release: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })

    await new Listr(
      range(12, (index) => ({
        title: `task ${index} with a title long enough to wrap onto a second row`,
        task: async(): Promise<void> => {
          if (index === 11) {
            seen = await vt.screen()
            release()
          }

          await gate
        }
      })),
      {
        concurrent: true,
        renderer: 'default',
        rendererOptions: { lazy: true, logger: new ListrLogger({ useIcons: true, processOutput: new ProcessOutput(vt as any, vt as any) }) }
      }
    ).run()

    expect(seen).toEqual([
      ...range(4, (index) => [`❯ task ${index} with a title long enough to`, '  wrap onto a second row']).flat(),
      '… 8',
      ''
    ])
  })
})
