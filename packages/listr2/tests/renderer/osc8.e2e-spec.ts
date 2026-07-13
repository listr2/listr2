import { Listr } from '@root'
import type { MockProcessOutput, RendererSetup } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput, RENDERER_SETUP } from '@tests/utils'
import { cleanseAnsi } from '@utils'

const ESC = '\x1b'
const BEL = '\x07'
const link = (uri: string, text: string): string => `${ESC}]8;;${uri}${BEL}${text}${ESC}]8;;${BEL}`

describe.each<RendererSetup>(RENDERER_SETUP)('%s renderer: osc-8', (renderer, rendererOptions) => {
  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  function content(): string {
    const written = output.stdout.mock.calls.map((call) => call[0] as string).join('')

    if (renderer !== 'test') {
      return written
    }

    return written
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .filter((event) => event.event === 'OUTPUT')
      .map((event) => event.data)
      .join('')
  }

  // GuVrX0HJ82h7aCSBxfdRJm3LbCJ1scU4
  it('should preserve a bell-terminated osc-8 hyperlink', async() => {
    await new Listr(
      [
        {
          title: 'This task will output a hyperlink.',
          task: async(_, task): Promise<void> => {
            task.output = link('https://listr2.kilic.dev', 'listr2')
          }
        }
      ],
      {
        renderer,
        rendererOptions
      }
    ).run()

    const written = content()

    expect(written).toContain(`${ESC}]8;;https://listr2.kilic.dev`)
    expect(written).toContain(`${ESC}]8;;${BEL}`)

    expectProcessOutputToMatchSnapshot(output, 'GuVrX0HJ82h7aCSBxfdRJm3LbCJ1scU4')
  })

  // k9Fj0ZFCmcutR9qKoIYBHDNGAzhDAjWP
  it('should preserve a hyperlink wrapped in sgr colors', async() => {
    await new Listr(
      [
        {
          title: 'This task will output a colored hyperlink.',
          task: async(_, task): Promise<void> => {
            task.output = `${ESC}[32m${link('https://listr2.kilic.dev', 'listr2')}${ESC}[39m`
          }
        }
      ],
      {
        renderer,
        rendererOptions
      }
    ).run()

    const written = content()

    expect(written).toContain(`${ESC}]8;;https://listr2.kilic.dev`)
    expect(written).toContain(`${ESC}]8;;${BEL}`)
    expect(written).toContain(`${ESC}[32m`)
    expect(written).toContain(`${ESC}[39m`)

    expectProcessOutputToMatchSnapshot(output, 'k9Fj0ZFCmcutR9qKoIYBHDNGAzhDAjWP')
  })

  // GIuPLb3vSEkIj8naBxgBbLow2xt0ZGky
  it('should strip an injected cursor code next to a hyperlink', async() => {
    await new Listr(
      [
        {
          title: 'This task will output a hyperlink next to a cursor code.',
          task: async(_, task): Promise<void> => {
            task.output = `${ESC}[2K${link('https://listr2.kilic.dev', 'listr2')}`
          }
        }
      ],
      {
        renderer,
        rendererOptions
      }
    ).run()

    const written = content()

    expect(written).toContain(`${ESC}]8;;https://listr2.kilic.dev`)
    expect(written).toContain(`${ESC}]8;;${BEL}`)

    // only the default renderer routes task.output through cleanseAnsi before printing; the others print output verbatim
    if (renderer === 'default') {
      expect(written).not.toContain(`${ESC}[2K${ESC}]8;;`)
    }

    expectProcessOutputToMatchSnapshot(output, 'GIuPLb3vSEkIj8naBxgBbLow2xt0ZGky')
  })
})

describe('cleanseAnsi', () => {
  it('preserves an esc-backslash terminated hyperlink untouched', () => {
    const input = `${ESC}]8;;https://x${ESC}\\link${ESC}]8;;${ESC}\\`

    expect(cleanseAnsi(input)).toBe(input)
  })

  it('preserves two adjacent hyperlinks', () => {
    const input = `${link('https://a', 'A')}${link('https://b', 'B')}`

    const result = cleanseAnsi(input)

    expect(result).toBe(input)
  })

  it('preserves a standalone bell', () => {
    expect(cleanseAnsi(`a${BEL}b`)).toBe(`a${BEL}b`)
  })

  it('preserves sgr codes and strips csi cursor codes', () => {
    const result = cleanseAnsi(`${ESC}[32mred${ESC}[39m${ESC}[2K`)

    expect(result).toBe(`${ESC}[32mred${ESC}[39m`)
  })
})
