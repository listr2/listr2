import { FakeStty, VirtualTerminal, range } from '#tests/utils'

const exitHandlers: (() => void)[] = []
const stty = new FakeStty()

vi.mock('child_process', () => ({ spawnSync: stty.spawnSync }))

// signal-exit would exit the test process, so capture what runs on exit instead
vi.mock('signal-exit', () => ({
  onExit: (handler: () => void): (() => void) => {
    exitHandlers.push(handler)

    return (): void => {
      exitHandlers.splice(exitHandlers.indexOf(handler), 1)
    }
  }
}))

const { ANSI_ESCAPE_CODES, ProcessInputLock, ProcessOutput, ProcessOutputEventType } = await import('#root')

describe('process output', () => {
  let vt: VirtualTerminal

  afterEach(() => {
    vi.restoreAllMocks()
    stty.uninstall()
    Reflect.set(ProcessOutput, 'suspended', false)
    vt.dispose()
  })

  describe('captured writes', () => {
    it('should write captured output above the live region as it arrives', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      // stderr is a separate stream that shares the screen, like process.stderr in a terminal
      const screen = vt.write
      const stderr = { isTTY: true, write: (data: string): boolean => screen(data) }
      const output = new ProcessOutput(vt as any, stderr as any)

      output.hijack()
      output.update('live 1\nlive 2')

      vt.write('\u001B[31mfrom stdout\u001B[39m\n')
      await Promise.resolve()
      stderr.write('from stderr\n')

      expect(await vt.content()).toEqual(['from stdout', 'from stderr', 'live 1', 'live 2'])

      output.update('live 3')
      output.release()

      expect(await vt.content()).toEqual(['from stdout', 'from stderr', 'live 3'])
      expect(vt.listenerCount('resize')).toBe(0)
    })

    it('should write the output captured in the same tick at once', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const output = new ProcessOutput(vt as any, vt as any)

      output.hijack()
      output.update('live')

      const before = vt.writes.length

      vt.write('first\n')
      vt.write('second\n')
      vt.write('third\n')

      expect(await vt.content()).toEqual(['first', 'second', 'third', 'live'])
      expect(vt.writes.slice(before).filter((write) => write.includes('live'))).toHaveLength(1)

      output.release()
    })

    it('should write the captured output in the order it arrived on release when no live region is drawn', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const screen = vt.write
      const stderr = { isTTY: true, write: (data: string): boolean => screen(data) }
      const output = new ProcessOutput(vt as any, stderr as any)

      output.hijack()
      output.toStdout('own output')
      vt.write('first')
      stderr.write('second')
      vt.write('third')

      expect(await vt.content()).toEqual(['own output'])

      output.release()

      expect(await vt.content()).toEqual(['own output', 'first', 'second', 'third'])
    })

    it('should drop captured output of streams that are not dumped', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const screen = vt.write
      const stderr = { isTTY: true, write: (data: string): boolean => screen(data) }
      const output = new ProcessOutput(vt as any, stderr as any, { dump: ['stdout'] })

      output.hijack()
      output.update('live')
      stderr.write('dropped\n')
      output.release()

      expect(await vt.content()).toEqual(['live'])
    })
  })

  describe('live region', () => {
    it('should not copy a live region that fills the screen into the scrollback of tmux', async() => {
      // tmux moves the screen into its scrollback when it is erased down from the top-left corner, where a live region that fills
      // the screen starts
      vt = new VirtualTerminal({
        columns: 40,
        rows: 10,
        scrollOnClear: true
      })

      const output = new ProcessOutput(vt as any, vt as any)

      output.hijack()

      for (let frame = 0; frame < 5; frame++) {
        output.update(range(30, (index) => `frame ${frame} line ${index}`).join('\n'))
      }

      output.persist('persisted', range(9, (index) => `live ${index}`).join('\n'))
      output.update(range(9, (index) => `live ${index + 1}`).join('\n'))

      expect(await vt.content()).toEqual(['persisted', ...range(9, (index) => `live ${index + 1}`)])

      output.clear()
      output.release()

      expect(await vt.content()).toEqual(['persisted'])
    })

    it('should show the cursor again when the process exits while the output is hijacked', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const output = new ProcessOutput(vt as any, vt as any)

      output.hijack()
      output.update('live')

      expect(vt.writes[0]).toBe(ANSI_ESCAPE_CODES.CURSOR_HIDE)

      exitHandlers.forEach((handler) => handler())

      expect(vt.writes.at(-1)).toBe(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)

      output.release()

      expect(exitHandlers).toHaveLength(0)
    })

    it('should restore the echo when the process exits while the input is locked', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      stty.install()
      const output = new ProcessOutput(vt as any, vt as any)

      output.hijack()
      new ProcessInputLock(output).lock()

      expect(stty.echo).toBe(false)

      exitHandlers.forEach((handler) => handler())

      expect(stty.echo).toBe(true)

      output.release()
    })
  })

  describe('input lock', () => {
    it('should restore the echo when the output is released while the input is locked', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      stty.install()
      const output = new ProcessOutput(vt as any, vt as any)

      output.hijack()
      new ProcessInputLock(output).lock()
      output.release()

      expect(stty.echo).toBe(true)
      expect(stty.calls).toEqual(['-g', '-echo', 'echo'])
    })

    it('should not lock the input before the output is hijacked', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      stty.install()
      new ProcessInputLock(new ProcessOutput(vt as any, vt as any)).lock()

      expect(stty.calls).toEqual([])
    })
  })

  describe('job control', () => {
    const listeners = (): Record<string, number> => ({ SIGTSTP: process.listenerCount('SIGTSTP'), SIGCONT: process.listenerCount('SIGCONT') })

    it('should report the stop and the continue, and stop the job once, without an input lock', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const kill = vi.spyOn(process, 'kill').mockImplementation(() => true)
      const before = listeners()
      const output = new ProcessOutput(vt as any, vt as any)
      const events: string[] = []

      output.events.on(ProcessOutputEventType.STOP, () => events.push('stop'))
      output.events.on(ProcessOutputEventType.CONTINUE, () => events.push('continue'))
      output.hijack()
      output.update('live')

      process.emit('SIGTSTP', 'SIGTSTP')

      expect(vt.writes.at(-1)).toBe(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)

      vt.write('[1]+  Stopped\n$ fg\n')
      process.emit('SIGCONT', 'SIGCONT')

      expect(events).toEqual(['stop', 'continue'])
      expect(kill).toHaveBeenCalledTimes(1)
      expect(output.suspended).toBe(true)
      expect(await vt.content()).toEqual(['live', '[1]+  Stopped', '$ fg', 'live'])

      output.release()

      expect(listeners()).toEqual(before)
    })

    it('should still show the cursor and stop the job when a listener of the stop throws', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const kill = vi.spyOn(process, 'kill').mockImplementation(() => true)
      const output = new ProcessOutput(vt as any, vt as any)

      output.events.on(ProcessOutputEventType.STOP, () => {
        throw new Error('listener')
      })
      output.hijack()
      output.update('live')

      expect(() => process.emit('SIGTSTP', 'SIGTSTP')).toThrow('listener')
      expect(vt.writes.at(-1)).toBe(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)
      expect(kill).toHaveBeenCalledWith(process.pid, 'SIGTSTP')

      output.release()
    })

    it('should not handle the stop when stdout is not a terminal', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const before = listeners()
      const output = new ProcessOutput({
        ...vt, isTTY: false, write: vt.write, on: vt.on.bind(vt), off: vt.off.bind(vt)
      } as any, vt as any)

      output.hijack()

      expect(listeners()).toEqual(before)

      output.release()
    })
  })

  describe('synchronized output', () => {
    it('should write a persist and the redraw below it as one synchronized update', async() => {
      vt = new VirtualTerminal({ columns: 40, rows: 10 })

      const output = new ProcessOutput(vt as any, vt as any)

      output.hijack()
      output.update('live 1\nlive 2')

      const before = vt.writes.length

      output.persist('done', 'live 3')

      const frames = vt.writes.slice(before)

      expect(frames).toHaveLength(1)
      expect(frames[0].startsWith(ANSI_ESCAPE_CODES.SYNC_START)).toBe(true)
      expect(frames[0].endsWith(ANSI_ESCAPE_CODES.SYNC_END)).toBe(true)
      expect(frames[0].split(ANSI_ESCAPE_CODES.SYNC_START)).toHaveLength(2)
      expect(await vt.content()).toEqual(['done', 'live 3'])

      output.release()

      expect(vt.writes.at(-1)).toBe(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)
    })
  })

  describe('resize', () => {
    const keys = ['TERM', 'XTERM_VERSION', 'STY', 'TMUX'] as const
    let saved: Partial<Record<(typeof keys)[number], string>>

    beforeEach(() => {
      saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
      keys.forEach((key) => delete process.env[key])
    })

    afterEach(() => {
      keys.forEach((key) => (saved[key] === undefined ? delete process.env[key] : (process.env[key] = saved[key])))
    })

    it.each<[Record<string, string>, boolean]>([
      [{ TERM: 'xterm-256color' }, true],
      [{ TERM: 'tmux-256color', TMUX: '/tmp/tmux-1000/default,1,0' }, true],
      [{ TERM: 'screen-256color', TMUX: '/tmp/tmux-1000/default,1,0' }, true],
      [{ TERM: 'xterm', XTERM_VERSION: 'XTerm(390)' }, false],
      [{
        TERM: 'tmux-256color', TMUX: '/tmp/tmux-1000/default,1,0', XTERM_VERSION: 'XTerm(390)'
      }, true],
      [{ TERM: 'linux' }, false],
      [{ TERM: 'rxvt-unicode-256color' }, false],
      [{ TERM: 'st-256color' }, false],
      [{ TERM: 'screen-256color' }, false],
      [{ TERM: 'xterm-256color', STY: '1234.pts-0.host' }, false]
    ])('should keep the persisted lines when %j gets narrower, which reflows: %s', async(env, reflow) => {
      Object.assign(process.env, env)

      vt = new VirtualTerminal({
        columns: 40,
        rows: 12,
        reflow
      })

      const output = new ProcessOutput(vt as any, vt as any)
      const frozen = range(4, (index) => `frozen ${index}`)

      output.hijack()
      output.persist(frozen.join('\n'), 'live A ' + 'x'.repeat(30) + '\nlive B short')

      await vt.resize(25, 12)

      // the live region is redrawn at the new width right away, also where the terminal truncated it
      expect(await vt.content()).toEqual([...frozen, 'live A ' + 'x'.repeat(18), 'x'.repeat(12), 'live B short'])

      output.update('live')
      output.release()

      expect(await vt.content()).toEqual([...frozen, 'live'])
    })
  })
})
