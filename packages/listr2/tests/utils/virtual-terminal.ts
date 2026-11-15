import xterm from '@xterm/headless'
import EventEmitter from 'node:events'

import type { VirtualTerminalOptions } from './virtual-terminal.interface'

const ERASE_DOWN = '\u001B[J'

/**
 * A TTY write stream backed by a headless xterm.js emulator, to assert on what a user would see on the screen and in the
 * scrollback.
 */
export class VirtualTerminal extends EventEmitter {
  public readonly isTTY = true
  public columns: number
  public rows: number
  public readonly writes: string[] = []
  public readonly emulator: InstanceType<typeof xterm.Terminal>
  private pending: Promise<void> = Promise.resolve()
  private readonly scrollOnClear: boolean

  constructor(options: VirtualTerminalOptions) {
    super()

    this.scrollOnClear = options.scrollOnClear ?? false

    this.columns = options.columns
    this.rows = options.reportedRows ?? options.rows

    // convertEol emulates the tty line discipline, which turns every line feed into a carriage return and a line feed
    // windowsMode turns off the reflow in xterm.js
    this.emulator = new xterm.Terminal({
      cols: options.columns,
      rows: options.rows,
      scrollback: 10000,
      allowProposedApi: true,
      convertEol: true,
      windowsMode: options.reflow === false
    })
  }

  public write = (data: string | Uint8Array): boolean => {
    const chunk = typeof data === 'string' ? data : Buffer.from(data).toString()

    this.writes.push(chunk)
    this.pending = this.pending.then(async() => {
      // xterm.js only scrolls on clear for erasing the whole display, so split the writes at every erase down to emulate tmux
      const parts = this.scrollOnClear ? chunk.split(ERASE_DOWN) : [chunk]

      for (const [index, part] of parts.entries()) {
        if (index > 0) {
          await this.scrollScreenIntoScrollback()
          await new Promise<void>((resolve) => this.emulator.write(ERASE_DOWN, resolve))
        }

        await new Promise<void>((resolve) => this.emulator.write(part, resolve))
      }
    })

    return true
  }

  /** Resizes the emulated terminal, which reflows its content, then signals the resize to the stream listeners. */
  public async resize(columns: number, rows: number, reportedRows = rows): Promise<void> {
    await this.flush()

    this.emulator.resize(columns, rows)
    this.columns = columns
    this.rows = reportedRows

    this.emit('resize')
  }

  /** Waits until every write so far, including the writes that the earlier writes caused, has reached the emulator. */
  public async flush(): Promise<void> {
    let pending: Promise<void>

    do {
      pending = this.pending
      await pending
    } while (pending !== this.pending)
  }

  /** The visible rows, with trailing whitespace removed. */
  public async screen(): Promise<string[]> {
    await this.flush()

    const buffer = this.emulator.buffer.active

    return this.read(buffer.baseY, buffer.baseY + this.emulator.rows)
  }

  /** The rows that scrolled off the top of the screen. */
  public async scrollback(): Promise<string[]> {
    await this.flush()

    return this.read(0, this.emulator.buffer.active.baseY)
  }

  /** The scrollback followed by the screen, without the empty rows at the bottom of the screen. */
  public async content(): Promise<string[]> {
    const lines = [...(await this.scrollback()), ...(await this.screen())]

    while (lines.length > 0 && lines.at(-1) === '') {
      lines.pop()
    }

    return lines
  }

  public dispose(): void {
    this.emulator.dispose()
  }

  /** Moves the rows of the screen up to the last one that is not empty into the scrollback, when the cursor is at the top-left corner. */
  private async scrollScreenIntoScrollback(): Promise<void> {
    const buffer = this.emulator.buffer.active

    if (buffer.cursorX !== 0 || buffer.cursorY !== 0) {
      return
    }

    const screen = this.read(buffer.baseY, buffer.baseY + this.emulator.rows)
    const used = screen.findLastIndex((line) => line !== '') + 1

    if (used === 0) {
      return
    }

    // line feeds on the bottom row scroll the screen up, then the cursor goes back to the top-left corner
    await new Promise<void>((resolve) => this.emulator.write(`\u001B[${this.emulator.rows};1H` + '\n'.repeat(used) + '\u001B[H', resolve))
  }

  private read(from: number, to: number): string[] {
    const buffer = this.emulator.buffer.active
    const lines: string[] = []

    for (let index = from; index < to; index++) {
      // a truncating terminal keeps the cells past the right edge, which are not visible
      lines.push(buffer.getLine(index)?.translateToString(true, 0, this.emulator.cols).trimEnd() ?? '')
    }

    return lines
  }
}
