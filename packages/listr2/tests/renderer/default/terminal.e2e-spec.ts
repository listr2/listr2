import type { ListrTask } from '#root'
import { Listr, ListrLogger, ProcessOutput, delay } from '#root'
import { VirtualTerminal, hang, range } from '#tests/utils'

describe('default renderer: terminal', () => {
  let vt: VirtualTerminal

  const options = (rendererOptions?: Record<string, unknown>): any => ({
    renderer: 'default',
    rendererOptions: {
      lazy: true,
      logger: new ListrLogger({ useIcons: true, processOutput: new ProcessOutput(vt as any, vt as any) }),
      ...rendererOptions
    }
  })

  afterEach(() => {
    vt.dispose()
  })

  it('should persist finished tasks of a list taller than the terminal', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const seen: Record<number, string[]> = {}

    await new Listr(
      range(30, (index) => ({
        title: `task ${index}`,
        task: async(): Promise<void> => {
          if (index === 5 || index === 25) {
            seen[index] = await vt.content()
          }
        }
      })),
      options()
    ).run()

    // the live region is taller than the terminal, so the tasks that have not started and do not fit are summarized
    expect(seen[5]).toEqual([...range(5, (index) => `✔ task ${index}`), '❯ task 5', ...range(7, (index) => `◼ task ${index + 6}`), '◼ 17 waiting'])
    expect(seen[25]).toEqual([...range(25, (index) => `✔ task ${index}`), '❯ task 25', ...range(4, (index) => `◼ task ${index + 26}`)])
    expect(await vt.content()).toEqual(range(30, (index) => `✔ task ${index}`))
  })

  it('should not duplicate lines when the terminal reports more rows than it has', async() => {
    vt = new VirtualTerminal({
      columns: 80,
      rows: 15,
      reportedRows: 100
    })

    await new Listr(
      range(3, (parent) => ({
        title: `parent ${parent}`,
        task: (_, task): Listr =>
          task.newListr(
            range(10, (index) => ({
              title: `task ${parent}.${index}`,
              task: async(): Promise<void> => {}
            }))
          )
      })),
      options({ collapseSubtasks: false })
    ).run()

    expect(await vt.content()).toEqual(range(3, (parent) => [`❯ parent ${parent}`, ...range(10, (index) => `│ ✔ task ${parent}.${index}`), `✔ parent ${parent}`]).flat())
  })

  it('should recover when the terminal gets narrower and wider mid-run', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 30 })

    const title = (index: number): string => `task ${index}: ${'a long title that wraps on a narrow terminal '.repeat(2).trim()}`

    await new Listr(
      range(8, (index) => ({
        title: title(index),
        task: async(): Promise<void> => {
          if (index === 2) {
            await vt.resize(40, 30)
          } else if (index === 5) {
            await vt.resize(120, 12)
          }
        }
      })),
      options()
    ).run()

    const content = (await vt.content()).join('\n')

    // every task shows up once with its final state, the lines persisted while the terminal was narrow stay wrapped
    for (let index = 0; index < 8; index++) {
      expect(content.split(`task ${index}: `).length - 1).toBe(1)
      expect(content).toContain(`✔ task ${index}: `)
    }

    expect(content).not.toMatch(/[◼❯]/)
    expect(content.split('\n').at(-1)).toBe(`✔ ${title(7)}`)
  })

  it('should summarize the finished subtasks of a collapsing parent taller than the terminal', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(15, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  if (index === 10) {
                    seen = await vt.content()
                  }
                }
              }))
            )
        }
      ],
      options()
    ).run()

    expect(seen).toEqual(['❯ parent', '  ✔ 8 completed', '  ✔ task 8', '  ✔ task 9', '  ❯ task 10', ...range(4, (index) => `  ◼ task ${index + 11}`)])
    expect(await vt.content()).toEqual(['✔ parent'])
  })

  it('should persist the subtasks of a non-collapsing parent as they finish', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(15, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  if (index === 10) {
                    seen = await vt.content()
                  }
                }
              }))
            )
        },
        { title: 'after', task: async(): Promise<void> => {} }
      ],
      options({ collapseSubtasks: false })
    ).run()

    expect(seen).toEqual(['❯ parent', ...range(10, (index) => `│ ✔ task ${index}`), '│ ❯ task 10', ...range(4, (index) => `│ ◼ task ${index + 11}`), '◼ after'])
    expect(await vt.content()).toEqual(['❯ parent', ...range(15, (index) => `│ ✔ task ${index}`), '✔ parent', '✔ after'])
  })

  it('should draw a connector for each open non-collapsing parent', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'outer',
          task: (_, task): Listr =>
            task.newListr([
              { title: 'first', task: async(): Promise<void> => {} },
              {
                title: 'inner',
                task: (_, task): Listr =>
                  task.newListr([
                    { title: 'inner first', task: async(): Promise<void> => {} },
                    {
                      title: 'inner second',
                      task: async(_, task): Promise<void> => {
                        task.output = 'some output'
                        seen = await vt.content()
                      },
                      rendererOptions: { persistentOutput: true }
                    }
                  ])
              },
              { title: 'last', task: async(): Promise<void> => {} }
            ])
        }
      ],
      options({ collapseSubtasks: false })
    ).run()

    expect(seen).toEqual(['❯ outer', '│ ✔ first', '│ ❯ inner', '│ │ ✔ inner first', '│ │ ❯ inner second', '│ │   › some output', '│ ◼ last'])
    expect(await vt.content()).toEqual([
      '❯ outer',
      '│ ✔ first',
      '│ ❯ inner',
      '│ │ ✔ inner first',
      '│ │ ✔ inner second',
      '│ │   › some output',
      '│ ✔ inner',
      '│ ✔ last',
      '✔ outer'
    ])
  })

  it('should keep the wrapping of subtask titles under a connector', async() => {
    vt = new VirtualTerminal({ columns: 30, rows: 10 })

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              { title: 'first', task: async(): Promise<void> => {} },
              { title: 'a subtask with a title that wraps over the rows of this terminal', task: async(): Promise<void> => {} }
            ])
        }
      ],
      options({ collapseSubtasks: false })
    ).run()

    // the icon and title wrap at 30 - 1 * 2 - 2 = 26 columns, then the continuation rows are indented once more
    expect(await vt.content()).toEqual(['❯ parent', '│ ✔ first', '│ ✔ a subtask with a title', '│   that wraps over the rows', '│   of this terminal', '✔ parent'])
  })

  it('should keep the connector on the summaries of an open non-collapsing parent taller than the terminal', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(20, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  if (index === 5) {
                    seen = await vt.content()
                  }
                }
              }))
            )
        }
      ],
      options({ collapseSubtasks: false })
    ).run()

    expect(seen).toEqual(['❯ parent', ...range(5, (index) => `│ ✔ task ${index}`), '│ ❯ task 5', ...range(7, (index) => `│ ◼ task ${index + 6}`), '│ ◼ 7 waiting'])
  })

  it('should draw no connector when the output is cleared, since nothing is persisted above the subtasks', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(3, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  if (index === 1) {
                    seen = await vt.content()
                  }
                }
              }))
            )
        }
      ],
      options({ collapseSubtasks: false, clearOutput: true })
    ).run()

    expect(seen).toEqual(['❯ parent', '  ✔ task 0', '  ❯ task 1', '  ◼ task 2'])
    expect(await vt.content()).toEqual([])
  })

  it('should show the finished subtasks that fit next to the waiting summaries', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(6, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  if (index === 1) {
                    seen = await vt.content()
                  }
                }
              }))
            )
        },
        ...range(10, (index) => ({ title: `after ${index}`, task: async(): Promise<void> => {} }))
      ],
      options()
    ).run()

    // a summary of one finished subtask takes the same row as the subtask itself
    expect(seen).toEqual(['❯ parent', '  ✔ task 0', '  ❯ task 1', '  ◼ task 2', '  ◼ task 3', '  ◼ 2 waiting', '◼ after 0', '◼ after 1', '◼ 8 waiting'])
  })

  it('should draw the connector with the fallback figure when unicode is not supported', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const platform = Object.getOwnPropertyDescriptor(process, 'platform')
    const env = { ...process.env }

    // the figures are picked when the module loads
    vi.resetModules()
    Object.defineProperty(process, 'platform', { value: 'win32' })

    for (const name of ['LISTR_FORCE_UNICODE', 'CI', 'WT_SESSION', 'TERM_PROGRAM']) {
      delete process.env[name]
    }

    process.env.TERM = 'dumb'

    try {
      const listr2 = await import('#root')

      await new listr2.Listr(
        [
          {
            title: 'parent',
            task: (_, task): any =>
              task.newListr([
                { title: 'first', task: async(): Promise<void> => {} },
                { title: 'second', task: async(): Promise<void> => {} }
              ])
          }
        ],
        {
          renderer: 'default',
          rendererOptions: {
            lazy: true,
            collapseSubtasks: false,
            logger: new listr2.ListrLogger({ useIcons: true, processOutput: new listr2.ProcessOutput(vt as any, vt as any) })
          }
        }
      ).run()
    } finally {
      Object.defineProperty(process, 'platform', platform)
      process.env = env
    }

    expect(await vt.content()).toEqual(['> parent', '| √ first', '| √ second', '√ parent'])
  })

  it('should keep a collapsing parent live and persist it expanded when a subtask fails', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: { scrollback: string[]; screen: string[] }

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              [
                { title: 'first', task: async(): Promise<void> => {} },
                {
                  title: 'second',
                  task: async(): Promise<void> => {
                    throw new Error('second failed')
                  }
                },
                {
                  title: 'third',
                  task: async(): Promise<void> => {
                    seen = { scrollback: await vt.scrollback(), screen: (await vt.content()).slice(0, 1) }
                  }
                }
              ],
              { exitOnError: false }
            )
        }
      ],
      options()
    ).run()

    // nothing of the subtree is persisted while the parent runs
    expect(seen).toEqual({ scrollback: [], screen: ['❯ parent'] })
    expect(await vt.content()).toEqual(['⚠ parent', '  ✔ first', '  ✖ second failed', '  ✔ third'])
  })

  it('should persist the tasks of a concurrent list in the order they finish', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]
    let finished = 0

    const fast = (index: number): ListrTask => ({
      title: `fast ${index}`,
      task: async(): Promise<void> => {
        await delay(10 * (3 - index))
        finished++
      }
    })

    await new Listr(
      [
        {
          title: 'slow',
          task: async(): Promise<void> => {
            while (finished < 3) {
              await delay(10)
            }

            seen = await vt.content()
          }
        },
        fast(0),
        fast(1),
        fast(2)
      ],
      { ...options(), concurrent: true }
    ).run()

    expect(seen).toEqual(['✔ fast 2', '✔ fast 1', '✔ fast 0', '❯ slow'])
    expect(await vt.content()).toEqual(['✔ fast 2', '✔ fast 1', '✔ fast 0', '✔ slow'])
  })

  it('should keep a retrying task live until it finishes', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const seen: string[][] = []

    await new Listr(
      [
        { title: 'before', task: async(): Promise<void> => {} },
        {
          title: 'retry',
          retry: 2,
          task: async(_, task): Promise<void> => {
            seen.push(await vt.content())

            if (!task.isRetrying()?.count || task.isRetrying().count < 2) {
              throw new Error('not yet')
            }
          }
        }
      ],
      options()
    ).run()

    expect(seen).toEqual([
      ['✔ before', '❯ retry'],
      ['✔ before', '⚠ retry [RETRY:1]'],
      ['✔ before', '⚠ retry [RETRY:2]']
    ])
    expect(await vt.content()).toEqual(['✔ before', '✔ retry'])
  })

  it('should persist a task once its rollback has finished', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await expect(
      new Listr(
        [
          {
            title: 'rollback',
            task: async(): Promise<void> => {
              throw new Error('failed')
            },
            rollback: async(_, task): Promise<void> => {
              seen = await vt.content()
              task.title = 'rolled back'
            }
          },
          { title: 'never runs', task: async(): Promise<void> => {} }
        ],
        options()
      ).run()
    ).rejects.toThrow('failed')

    expect(seen).toEqual(['⚠ rollback', '◼ never runs'])
    expect(await vt.content()).toEqual(['← rolled back', '◼ never runs'])
  })

  it('should persist the whole list as cancelled on SIGINT', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const exit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)

    await new Listr(
      [
        { title: 'before', task: async(): Promise<void> => {} },
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'interrupted',
                task: async(): Promise<void> => {
                  await delay(10)

                  process.emit('SIGINT')

                  await hang()
                }
              },
              { title: 'never started', task: async(): Promise<void> => {} }
            ])
        },
        { title: 'after', task: async(): Promise<void> => {} }
      ],
      { ...options(), registerSignalListeners: true }
    ).run()

    expect(exit).toHaveBeenCalledWith(127)
    expect(await vt.content()).toEqual(['✔ before', '⊘ parent', '  ⊘ interrupted', '  ⊘ never started', '⊘ after'])

    exit.mockRestore()
  })

  it('should write stray output above the live region as it arrives', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        { title: 'before', task: async(): Promise<void> => {} },
        {
          title: 'writes',
          task: async(): Promise<void> => {
            vt.write('stray line\n')
            seen = await vt.content()
          }
        }
      ],
      options()
    ).run()

    expect(seen).toEqual(['✔ before', 'stray line', '❯ writes'])
    expect(await vt.content()).toEqual(['✔ before', 'stray line', '✔ writes'])
  })

  it('should leave nothing when the output is cleared', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    await new Listr(
      range(20, (index) => ({ title: `task ${index}`, task: async(): Promise<void> => {} })),
      options({ clearOutput: true })
    ).run()

    expect(await vt.content()).toEqual([])
  })

  it('should show the second run of the same list', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let run = 0

    const list = new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr => {
            run++

            return task.newListr([
              {
                title: `subtask (run ${run})`,
                task: async(_, subtask): Promise<void> => {
                  subtask.title = `subtask finished (run ${run})`
                }
              }
            ])
          }
        },
        {
          title: 'second',
          task: async(_, task): Promise<void> => {
            task.title = `second (run ${run})`
          }
        }
      ],
      options({ collapseSubtasks: false })
    )

    await list.run()
    await list.run()

    expect(await vt.content()).toEqual([1, 2].flatMap((index) => ['❯ parent', `│ ✔ subtask finished (run ${index})`, '✔ parent', `✔ second (run ${index})`]))
  })

  it('should persist a non-collapsing parent that retries once it has finished', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let attempt = 0

    await new Listr(
      [
        {
          title: 'parent',
          retry: 1,
          task: (_, task): Listr => {
            attempt++

            return task.newListr([
              { title: `first (attempt ${attempt})`, task: async(): Promise<void> => {} },
              {
                title: `second (attempt ${attempt})`,
                task: async(): Promise<void> => {
                  if (attempt === 1) {
                    throw new Error('failed')
                  }
                }
              }
            ])
          }
        }
      ],
      options({ collapseSubtasks: false })
    ).run()

    // nothing of the first attempt is persisted
    expect(await vt.content()).toEqual(['✔ parent', '  ✔ first (attempt 2)', '  ✔ second (attempt 2)'])
  })
})
