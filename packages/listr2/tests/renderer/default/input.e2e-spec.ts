import type * as fs from 'fs'

import type { ListrTaskWrapper } from '#root'
import { FakeStty, VirtualTerminal, hang, range } from '#tests/utils'

const stty = new FakeStty()

vi.mock('child_process', () => ({ spawnSync: stty.spawnSync }))
vi.mock('fs', async(original) => {
  const actual = await original<typeof fs>()

  return { ...actual, readFileSync: stty.readFileSync(actual.readFileSync) }
})

const { Listr, ListrLogger, ListrPromptAdapter, ListrTaskEventType, ProcessOutput, delay } = await import('#root')
const { TERMINAL_POLL_INTERVAL } = await import('../../../src/utils/process-output/process-output.constants')

describe('default renderer: input', () => {
  let vt: VirtualTerminal

  const options = (rendererOptions?: Record<string, unknown>): any => ({
    renderer: 'default',
    rendererOptions: {
      lazy: true,
      logger: new ListrLogger({ useIcons: true, processOutput: new ProcessOutput(vt as any, vt as any) }),
      ...rendererOptions
    }
  })

  beforeEach(() => {
    vt = new VirtualTerminal({ columns: 80, rows: 20 })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    stty.uninstall()
    vt.dispose()
  })

  describe('echo', () => {
    // the terminal echoes a line break to the screen directly, not through the hijacked stream
    const pressEnter = (count: number, rendererOptions?: Record<string, unknown>): InstanceType<typeof Listr> => {
      const screen = vt.write

      return new Listr(
        range(count, (index) => ({
          title: `task ${index}`,
          task: async(): Promise<void> => {
            if (stty.echo) {
              screen('\n')
            }

            await delay(0)
          }
        })),
        options(rendererOptions)
      )
    }

    it('should not duplicate lines when enter is pressed while the tasks run', async() => {
      stty.install()

      await pressEnter(5).run()

      expect(await vt.content()).toEqual(range(5, (index) => `✔ task ${index}`))
    })

    it('should duplicate lines when enter is pressed with the input lock turned off', async() => {
      stty.install()

      await pressEnter(5, { lockInput: false }).run()

      expect(await vt.content()).toEqual(range(5, (index) => [`❯ task ${index}`, `✔ task ${index}`]).flat())
      expect(stty.calls).toEqual([])
    })
  })

  describe('lock', () => {
    class Prompt extends ListrPromptAdapter {
      public echo: boolean

      public async run<T = any>(): Promise<T> {
        this.reportStarted()
        this.echo = stty.echo
        this.reportCompleted()

        return undefined as T
      }
    }

    it('should turn off the echo during the run and restore it after', async() => {
      stty.install()

      const listeners = { SIGTSTP: process.listenerCount('SIGTSTP'), SIGCONT: process.listenerCount('SIGCONT') }
      let echo: boolean

      await new Listr(
        [
          {
            title: 'task',
            task: async(): Promise<void> => {
              echo = stty.echo
            }
          }
        ],
        options()
      ).run()

      expect(echo).toBe(false)
      expect(stty.echo).toBe(true)
      // once per lock change, not once per frame
      expect(stty.calls).toEqual(['-g', '-echo', 'echo'])
      expect({ SIGTSTP: process.listenerCount('SIGTSTP'), SIGCONT: process.listenerCount('SIGCONT') }).toEqual(listeners)
    })

    it('should restore the echo after a task fails', async() => {
      stty.install()

      await expect(
        new Listr(
          [
            {
              title: 'task',
              task: async(): Promise<void> => {
                throw new Error('failed')
              }
            }
          ],
          options()
        ).run()
      ).rejects.toThrow('failed')

      expect(stty.echo).toBe(true)
    })

    it('should give the terminal to a prompt and lock it again after', async() => {
      stty.install()

      let prompt: Prompt
      let after: boolean

      await new Listr(
        [
          {
            title: 'prompt',
            task: async(_, task: ListrTaskWrapper<any, any, any>): Promise<void> => {
              prompt = task.prompt(Prompt)
              await prompt.run()
              after = stty.echo
            }
          }
        ],
        options()
      ).run()

      expect(prompt.echo).toBe(true)
      expect(after).toBe(false)
      expect(stty.echo).toBe(true)
    })

    it('should roll back and restore the echo on ctrl+c after a prompt', async() => {
      stty.install()

      const exit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
      const rollback = vi.fn()

      await new Listr(
        [
          {
            title: 'prompt',
            task: async(_, task: ListrTaskWrapper<any, any, any>): Promise<void> => {
              await task.prompt(Prompt).run()
            }
          },
          {
            title: 'interrupted',
            task: async(): Promise<void> => {
              // the terminal raises SIGINT for ctrl+c, since the lock leaves the keyboard signals on
              process.emit('SIGINT')

              await hang()
            },
            rollback: async(): Promise<void> => {
              rollback()
            }
          }
        ],
        options()
      ).run()

      expect(rollback).toHaveBeenCalledTimes(1)
      expect(exit).toHaveBeenCalledWith(127)
      expect(stty.echo).toBe(true)
    })

    it('should never erase what the shell writes when the job stops, and lock the input again and draw the live region below it when the job continues', async() => {
      stty.install()

      const kill = vi.spyOn(process, 'kill').mockImplementation(() => true)
      const screen = vt.write
      let stopped: string[]
      let continued: { echo: boolean; content: string[] }

      await new Listr(
        [
          { title: 'before', task: async(): Promise<void> => {} },
          {
            title: 'running',
            task: async(_, task): Promise<void> => {
              // under a wrapper such as pnpm, the shell can take the terminal back and report the job stopped before node handles SIGTSTP, and redraw in between
              stty.foreground = false
              screen('[1]+  Stopped\n$ ')
              task.output = 'still running'
              process.emit('SIGTSTP', 'SIGTSTP')
              stopped = await vt.content()

              // the shell takes the terminal back in its own mode while the job is stopped
              stty.echo = true
              stty.foreground = true
              screen('fg\n')

              process.emit('SIGCONT', 'SIGCONT')
              continued = { echo: stty.echo, content: await vt.content() }
            }
          }
        ],
        options()
      ).run()

      expect(kill).toHaveBeenCalledWith(process.pid, 'SIGTSTP')
      expect(stopped).toEqual(['✔ before', '❯ running', '[1]+  Stopped', '$'])
      expect(continued).toEqual({ echo: false, content: ['✔ before', '❯ running', '[1]+  Stopped', '$ fg', '❯ running', '  › still running'] })
      expect(await vt.content()).toEqual(['✔ before', '❯ running', '[1]+  Stopped', '$ fg', '✔ running'])
      expect(stty.echo).toBe(true)
    })

    it('should not show the title on the footer of a group after the job continues while its header is still on the screen', async() => {
      stty.install()
      vi.spyOn(process, 'kill').mockImplementation(() => true)

      const screen = vt.write
      let continued: string[]

      await new Listr(
        [
          {
            title: 'parent',
            task: (_, task): InstanceType<typeof Listr> =>
              task.newListr(
                [
                  { title: 'first', task: async(): Promise<void> => {} },
                  {
                    title: 'second',
                    task: async(_, task): Promise<void> => {
                      process.emit('SIGTSTP', 'SIGTSTP')
                      screen('[1]+  Stopped\n$ ')
                      stty.echo = true
                      screen('fg\n')
                      process.emit('SIGCONT', 'SIGCONT')
                      // the next frame decides the footer again
                      task.output = 'still running'
                      continued = await vt.content()
                    }
                  }
                ],
                { rendererOptions: { collapseSubtasks: false } }
              )
          }
        ],
        options()
      ).run()

      expect(continued).toEqual(['┌ parent', '│   ✔ first', '│   ❯ second', '└ ❯', '[1]+  Stopped', '$ fg', '│   ❯ second', '│     › still running', '└ ❯'])
    })

    it('should leave the terminal to the shell while the job runs in the background, and lock it again once it is back in the foreground', async() => {
      stty.install()
      vi.spyOn(process, 'kill').mockImplementation(() => true)

      let background: { echo: boolean; content: string[] }
      let foreground: boolean

      await new Listr(
        [
          {
            title: 'running',
            task: async(_, task): Promise<void> => {
              process.emit('SIGTSTP', 'SIGTSTP')
              stty.echo = true

              stty.foreground = false
              process.emit('SIGCONT', 'SIGCONT')
              task.title = 'running in the background'
              background = { echo: stty.echo, content: await vt.content() }

              // `fg` sends no SIGCONT to a job that already runs
              stty.foreground = true
              vi.spyOn(Date, 'now').mockReturnValue(Date.now() + TERMINAL_POLL_INTERVAL)
              task.title = 'running in the foreground'
              foreground = stty.echo
            }
          }
        ],
        options()
      ).run()

      expect(background).toEqual({ echo: true, content: ['❯ running'] })
      expect(foreground).toBe(false)
      expect(await vt.content()).toEqual(['❯ running', '✔ running in the foreground'])
      expect(stty.echo).toBe(true)
    })

    it.each([
      ['/proc', { proc: true }],
      ['ps where there is no /proc', { proc: false }]
    ])('should draw without locking the input while the job was started in the background, and lock it once it is in the foreground, found through %s', async(_, install) => {
      stty.install(install)
      stty.foreground = false

      let background: { echo: boolean; content: string[] }
      let foreground: boolean

      await new Listr(
        [
          {
            title: 'running',
            task: async(_, task): Promise<void> => {
              background = { echo: stty.echo, content: await vt.content() }

              stty.foreground = true
              vi.spyOn(Date, 'now').mockReturnValue(Date.now() + TERMINAL_POLL_INTERVAL)
              task.title = 'running in the foreground'
              foreground = stty.echo
            }
          }
        ],
        options()
      ).run()

      expect(background).toEqual({ echo: true, content: ['❯ running'] })
      expect(foreground).toBe(false)
      expect(await vt.content()).toEqual(['✔ running in the foreground'])
      expect(stty.echo).toBe(true)
      expect(stty.ps > 0).toBe(!install.proc)
    })

    it('should not change the mode of the terminal when the job runs in the background until the end', async() => {
      stty.install()
      stty.foreground = false

      await new Listr(
        range(3, (index) => ({ title: `task ${index}`, task: async(): Promise<void> => delay(0) })),
        options()
      ).run()

      expect(stty.calls.filter((call) => call !== '-g')).toEqual([])
      expect(await vt.content()).toEqual(range(3, (index) => `✔ task ${index}`))
    })

    it('should lock the input when the job has no controlling terminal', async() => {
      stty.install()
      stty.controlling = false

      let echo: boolean

      await new Listr(
        [
          {
            title: 'running',
            task: async(): Promise<void> => {
              echo = stty.echo
            }
          }
        ],
        options()
      ).run()

      expect(echo).toBe(false)
      expect(stty.echo).toBe(true)
    })

    it('should try to lock the input only once when stty cannot turn off the echo', async() => {
      stty.install({ fails: true })

      await new Listr(
        range(3, (index) => ({ title: `task ${index}`, task: async(): Promise<void> => delay(0) })),
        options()
      ).run()

      expect(stty.calls).toEqual(['-g', '-echo'])
      expect(await vt.content()).toEqual(range(3, (index) => `✔ task ${index}`))
    })

    it.each([
      ['stdin is not a TTY', { tty: false }],
      ['stty is missing', { missing: true }]
    ])('should run without the lock when %s', async(_, install) => {
      stty.install(install)

      await new Listr([{ title: 'task', task: async(): Promise<void> => {} }], options()).run()

      expect(stty.calls.filter((call) => call !== '-g')).toEqual([])
      expect(stty.echo).toBe(true)
      expect(await vt.content()).toEqual(['✔ task'])
    })

    it('should not lock the input on windows, which has no stty', async() => {
      stty.install()

      const platform = Object.getOwnPropertyDescriptor(process, 'platform')

      Object.defineProperty(process, 'platform', { value: 'win32' })

      try {
        await new Listr([{ title: 'task', task: async(): Promise<void> => {} }], options()).run()
      } finally {
        Object.defineProperty(process, 'platform', platform)
      }

      expect(stty.calls).toEqual([])
      expect(await vt.content()).toEqual(['✔ task'])
    })

    it.each(['completes', 'fails'])('should end the line of a prompt that %s without ending it itself with the simple renderer', async(outcome) => {
      class Question extends ListrPromptAdapter {
        public async run<T = any>(): Promise<T> {
          this.reportStarted()
          // enquirer leaves the answer like this, since the stream of a prompt reports an infinite width
          this.wrapper.stdout(ListrTaskEventType.PROMPT).write('✔ What is your name? · Ada')

          if (outcome === 'fails') {
            this.reportFailed()
          } else {
            this.reportCompleted()
          }

          return undefined as T
        }
      }

      await new Listr(
        [
          { title: 'asking', task: async(_, task): Promise<void> => task.prompt(Question).run() },
          { title: 'after', task: async(): Promise<void> => {} }
        ],
        {
          renderer: 'simple',
          rendererOptions: { logger: new ListrLogger({ processOutput: new ProcessOutput(vt as any, vt as any) }) }
        }
      ).run()

      expect(await vt.content()).toEqual(['❯ asking', '✔ What is your name? · Ada', '✔ asking', '❯ after', '✔ after'])
    })

    it('should not lock the input with the simple renderer', async() => {
      stty.install()

      await new Listr([{ title: 'task', task: async(): Promise<void> => {} }], {
        renderer: 'simple',
        rendererOptions: { logger: new ListrLogger({ processOutput: new ProcessOutput(vt as any, vt as any) }) }
      }).run()

      expect(stty.calls).toEqual([])
    })
  })
})
