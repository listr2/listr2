/** Stands in for `stty` and the foreground check through a mocked `spawnSync` and `readFileSync`, with a TTY `process.stdin`, so the input lock runs without a real terminal. Without `/proc`, the foreground check falls back to `ps`. */
export class FakeStty {
  public echo = true
  public foreground = true
  public controlling = true
  public calls: string[] = []
  public ps = 0
  private missing = false
  private proc = true
  private fails = false
  private stdin?: PropertyDescriptor

  public spawnSync = (command: string, args: string[]): { status: number | null; stdout: string } => {
    if (command === 'ps') {
      this.ps++

      return { status: 0, stdout: this.foreground ? 'S+\n' : 'S\n' }
    }

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

  public readFileSync =
    (original: (...args: any[]) => any) =>
      (path: string, ...args: any[]): any => {
        if (path !== '/proc/self/stat') {
          return original(path, ...args)
        }

        if (!this.proc) {
          throw Object.assign(new Error(`ENOENT: no such file or directory, open '${path}'`), { code: 'ENOENT' })
        }

        return `${process.pid} (node (a b)) S 1 100 100 34816 ${this.controlling ? (this.foreground ? 100 : 200) : -1} 0`
      }

  public install(options?: { tty?: boolean; missing?: boolean; fails?: boolean; proc?: boolean }): this {
    this.stdin = Object.getOwnPropertyDescriptor(process, 'stdin')
    this.missing = options?.missing ?? false
    this.fails = options?.fails ?? false
    this.proc = options?.proc ?? true
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
    this.foreground = true
    this.controlling = true
    this.calls = []
    this.ps = 0
    this.proc = true
  }
}
