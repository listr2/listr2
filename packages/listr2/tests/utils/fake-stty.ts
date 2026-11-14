/** Stands in for `stty` and the foreground check through a mocked `spawnSync` and `readFileSync`, with a TTY `process.stdin`, so the input lock runs without a real terminal. */
export class FakeStty {
  public echo = true
  public foreground = true
  public controlling = true
  public calls: string[] = []
  private missing = false
  private fails = false
  private stdin?: PropertyDescriptor

  public spawnSync = (command: string, args: string[]): { status: number | null; stdout: string } => {
    if (command === 'ps') {
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

        return `${process.pid} (node (a b)) S 1 100 100 34816 ${this.controlling ? (this.foreground ? 100 : 200) : -1} 0`
      }

  public install(options?: { tty?: boolean; missing?: boolean; fails?: boolean }): this {
    this.stdin = Object.getOwnPropertyDescriptor(process, 'stdin')
    this.missing = options?.missing ?? false
    this.fails = options?.fails ?? false
    Object.defineProperty(process, 'stdin', { value: { isTTY: options?.tty ?? true }, configurable: true })

    return this
  }

  public uninstall(): void {
    Object.defineProperty(process, 'stdin', this.stdin!)
    this.echo = true
    this.foreground = true
    this.controlling = true
    this.calls = []
  }
}
