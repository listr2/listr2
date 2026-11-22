/** Stands in for `stty` through a mocked `spawnSync`, with a TTY `process.stdin`, so the input lock runs without a real terminal. */
export class FakeStty {
  public echo = true
  public calls: string[] = []
  private missing = false
  private fails = false
  private stdin?: PropertyDescriptor

  public spawnSync = (command: string, args: string[]): { status: number | null; stdout: string } => {
    if (command !== 'stty' || this.missing) {
      return { status: null, stdout: null }
    }

    this.calls.push(args.join(' '))

    if (args[0] === '-g') {
      return { status: 0, stdout: this.echo ? 'echo\n' : '-echo\n' }
    }

    if (this.fails) {
      return { status: 1, stdout: '' }
    }

    this.echo = args[0] === 'echo'

    return { status: 0, stdout: '' }
  }

  public install(options?: { tty?: boolean; missing?: boolean; fails?: boolean }): this {
    this.stdin = Object.getOwnPropertyDescriptor(process, 'stdin')
    this.missing = options?.missing ?? false
    this.fails = options?.fails ?? false
    Object.defineProperty(process, 'stdin', { value: { isTTY: options?.tty ?? true }, configurable: true })

    return this
  }

  public uninstall(): void {
    // a test that never installed it has nothing to put back
    if (!this.stdin) {
      return
    }

    Object.defineProperty(process, 'stdin', this.stdin)
    this.stdin = undefined
    this.echo = true
    this.calls = []
  }
}
