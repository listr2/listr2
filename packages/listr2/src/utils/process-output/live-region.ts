import wrapAnsi from 'wrap-ansi'

import { ANSI_ESCAPE_CODES } from '#constants'

/**
 * The lines at the bottom of a stream that are drawn again in place. It only builds the escape sequences, the caller writes them.
 */
export class LiveRegion {
  private lines: string[] = []
  private columns?: number

  constructor(private readonly stream: NodeJS.WriteStream) {}

  /** Turns what is drawn into the text, and leaves the cursor on the row below it. An empty text erases what is drawn. */
  public paint(text: string): string {
    const columns = this.stream.columns ?? 80
    const lines = text === '' ? [] : this.fit(text, columns)
    // the rows that the terminal laid out again cannot be compared with the lines they were drawn from
    let start = 0

    if (columns === this.columns) {
      while (start < lines.length && lines[start] === this.lines[start]) {
        start++
      }

      if (start === lines.length && lines.length === this.lines.length) {
        return ''
      }
    }

    const output = this.erase(start) + lines.slice(start).map((line) => line + '\n').join('')

    this.lines = lines
    this.columns = columns

    return output
  }

  /** Leaves what is drawn on the screen, so the next text is drawn below it. */
  public reset(): void {
    this.lines = []
  }

  /** Erases the rows from the given line to the cursor, from the bottom up, since tmux scrolls a screen that is erased downwards into its scrollback. */
  private erase(from: number): string {
    if (this.lines.length === 0) {
      return ''
    }

    return ANSI_ESCAPE_CODES.ERASE_LINE + (ANSI_ESCAPE_CODES.CURSOR_UP + ANSI_ESCAPE_CODES.ERASE_LINE).repeat(this.height() - from) + ANSI_ESCAPE_CODES.CURSOR_LEFT
  }

  /** The rows that the lines take now, which is more than the lines once the terminal got narrower and reflowed them. */
  private height(): number {
    const columns = this.stream.columns ?? 80

    if (columns === this.columns || !this.reflows()) {
      return this.lines.length
    }

    return this.lines.reduce((height, line) => height + this.wrap(line, columns).length, 0)
  }

  /** The rows that scrolled off the top cannot be erased, so the lines that do not fit above the cursor are dropped from the top. */
  private fit(text: string, columns: number): string[] {
    const lines = this.wrap(text.replace(/\r?\n$/, ''), columns)

    return lines.slice(Math.max(lines.length - (this.stream.rows ?? 24) + 1, 0))
  }

  // wrap-ansi turns every line break into \n, also where EOL is \r\n
  private wrap(text: string, columns: number): string[] {
    return wrapAnsi(text, columns, {
      hard: true,
      trim: false,
      wordWrap: false
    }).split('\n')
  }

  private reflows(): boolean {
    // tmux reflows, and its panes inherit the environment of the terminal it was started from
    if (process.env.TMUX) {
      return true
    }

    // these terminals truncate lines instead of reflowing them
    if (process.env.XTERM_VERSION || process.env.STY) {
      return false
    }

    const term = process.env.TERM ?? ''

    return term !== 'linux' && !/^(rxvt|st|screen)/.test(term)
  }
}
