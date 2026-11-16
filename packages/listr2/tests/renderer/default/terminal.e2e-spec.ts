import { stripVTControlCharacters } from 'node:util'

import type { ListrTask } from '#root'
import { ANSI_ESCAPE_CODES, Listr, ListrLogger, PRESET_TIMER, ProcessOutput, delay } from '#root'
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
    vi.restoreAllMocks()
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
    expect(seen[5]).toEqual([...range(5, (index) => `✔ task ${index}`), '❯ task 5', ...range(7, (index) => `◼ task ${index + 6}`), '… 17'])
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

    expect(await vt.content()).toEqual(range(3, (parent) => [`┌ parent ${parent}`, ...range(10, (index) => `│   ✔ task ${parent}.${index}`), '└ ✔']).flat())
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

  it('should render the live region again for the new size of the terminal on a resize', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'a subtask with a title that wraps on a narrow terminal',
                task: async(): Promise<void> => {
                  // no task event follows the resize before the screen is read
                  await vt.resize(32, 10)
                  seen = await vt.screen()
                }
              }
            ])
        }
      ],
      options()
    ).run()

    expect(seen.filter((line) => line !== '')).toEqual(['┌ ❯ parent', '│   ❯ a subtask with a title', '│     that wraps on a narrow', '└     terminal'])
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

    expect(seen).toEqual(['┌ ❯ parent', '│   ↑ 8', '│   ✔ task 8', '│   ✔ task 9', '│   ❯ task 10', ...range(3, (index) => `│   ◼ task ${index + 11}`), '└   ◼ task 14'])
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

    expect(seen).toEqual(['┌ parent', ...range(10, (index) => `│   ✔ task ${index}`), '│   ❯ task 10', ...range(4, (index) => `│   ◼ task ${index + 11}`), '└ ❯ parent', '◼ after'])
    expect(await vt.content()).toEqual(['┌ parent', ...range(15, (index) => `│   ✔ task ${index}`), '└ ✔ parent', '✔ after'])
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

    expect(seen).toEqual(['┌ outer', '│   ✔ first', '│   ┌ inner', '│   │   ✔ inner first', '│   │   ❯ inner second', '│   │     › some output', '│   └ ❯', '│   ◼ last', '└ ❯'])
    expect(await vt.content()).toEqual([
      '┌ outer',
      '│   ✔ first',
      '│   ┌ inner',
      '│   │   ✔ inner first',
      '│   │   ✔ inner second',
      '│   │     › some output',
      '│   └ ✔',
      '│   ✔ last',
      '└ ✔'
    ])
  })

  it('should keep the wrapping of subtask titles under a connector', async() => {
    vt = new VirtualTerminal({ columns: 32, rows: 10 })

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
    expect(await vt.content()).toEqual(['┌ parent', '│   ✔ first', '│   ✔ a subtask with a title', '│     that wraps over the rows', '│     of this terminal', '└ ✔'])
  })

  it('should wrap the header and the footer of a bracket inside the bracket', async() => {
    vt = new VirtualTerminal({ columns: 30, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'a parent with a title that wraps over the rows',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'first',
                task: async(): Promise<void> => {
                  seen = await vt.content()
                }
              }
            ])
        }
      ],
      options({ collapseSubtasks: false })
    ).run()

    expect(seen).toEqual(['┌ ❯ a parent with a title', '│   that wraps over the rows', '└   ❯ first'])
    expect(await vt.content()).toEqual(['┌ a parent with a title that', '│  wraps over the rows', '│   ✔ first', '└ ✔'])
  })

  it('should close a bracket with only the status of its parent, and its timer when it has one', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const group = (title: string, timer: boolean): ListrTask => ({
      title,
      task: (_, task): Listr => task.newListr([{ title: `${title} subtask`, task: async(): Promise<void> => {} }], { rendererOptions: { collapseSubtasks: false } }),
      rendererOptions: {
        timer: {
          ...PRESET_TIMER,
          condition: timer,
          field: (): string => '1s'
        }
      }
    })

    await new Listr([group('plain', false), group('timed', true)], options()).run()

    expect(await vt.content()).toEqual(['┌ plain', '│   ✔ plain subtask', '└ ✔', '┌ timed', '│   ✔ timed subtask', '└ ✔ [1s]'])
  })

  it('should close a bracket with the title of its parent when it changed after the header was persisted', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'Compiling packages',
          task: (_, task): Listr =>
            task.newListr(
              [
                { title: 'first', task: async(): Promise<void> => {} },
                {
                  title: 'second',
                  task: async(): Promise<void> => {
                    task.title = 'Compiled 2 packages.'
                    seen = await vt.content()
                  }
                }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options()
    ).run()

    // the header is in the scrollback, so only the live footer shows the new title while the group runs
    expect(seen).toEqual(['┌ Compiling packages', '│   ✔ first', '│   ❯ second', '└ ❯ Compiled 2 packages.'])
    expect(await vt.content()).toEqual(['┌ Compiling packages', '│   ✔ first', '│   ✔ second', '└ ✔ Compiled 2 packages.'])
  })

  it('should update the header of a bracket in place when the title changes before the header is persisted', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'Compiling packages',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'first',
                  task: async(): Promise<void> => {
                    task.title = 'Compiled 1 package.'
                    seen = await vt.content()
                  }
                }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options()
    ).run()

    expect(seen).toEqual(['┌ ❯ Compiled 1 package.', '└   ❯ first'])
    expect(await vt.content()).toEqual(['┌ Compiled 1 package.', '│   ✔ first', '└ ✔'])
  })

  it('should close the bracket of a concurrent group once its last subtask finishes', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'slow',
                  task: async(): Promise<void> => {
                    await delay(50)

                    seen = await vt.content()
                  }
                },
                { title: 'fast', task: async(): Promise<void> => {} }
              ],
              { concurrent: true }
            )
        }
      ],
      options({ collapseSubtasks: false })
    ).run()

    expect(seen).toEqual(['┌ parent', '│   ✔ fast', '│   ❯ slow', '└ ❯'])
    expect(await vt.content()).toEqual(['┌ parent', '│   ✔ fast', '│   ✔ slow', '└ ✔'])
  })

  it('should close the bracket of a failed group with the status of its parent', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              { title: 'first', task: async(): Promise<void> => {} },
              {
                title: 'second',
                task: async(): Promise<void> => {
                  throw new Error('second failed')
                }
              },
              { title: 'never runs', task: async(): Promise<void> => {} }
            ])
        }
      ],
      { ...options({ collapseSubtasks: false }), exitOnError: true }
    )
      .run()
      .catch(() => {})

    expect(await vt.content()).toEqual(['┌ parent', '│   ✔ first', '│   ✖ second failed', '│   ◼ never runs', '└ ✖'])
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

    expect(seen).toEqual(['┌ parent', ...range(5, (index) => `│   ✔ task ${index}`), '│   ❯ task 5', ...range(6, (index) => `│   ◼ task ${index + 6}`), '│   … 8', '└ ❯ parent'])
  })

  it('should draw the connector when the output is cleared', async() => {
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

    expect(seen).toEqual(['┌ ❯ parent', '│   ✔ task 0', '│   ❯ task 1', '└   ◼ task 2'])
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
    expect(seen).toEqual(['┌ ❯ parent', '│   ✔ task 0', '│   ❯ task 1', '│   ◼ task 2', '│   ◼ task 3', '└   … 2', '◼ after 0', '◼ after 1', '… 8'])
  })

  it('should draw the connector with the fallback figure when unicode is not supported', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const small = new VirtualTerminal({ columns: 80, rows: 5 })
    let seen: string[]

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

      await new listr2.Listr(
        range(10, (index) => ({
          title: `task ${index}`,
          task: async(): Promise<void> => {
            if (index === 0) {
              seen = await small.content()
            }
          }
        })),
        {
          renderer: 'default',
          rendererOptions: {
            lazy: true,
            logger: new listr2.ListrLogger({ useIcons: true, processOutput: new listr2.ProcessOutput(small as any, small as any) })
          }
        }
      ).run()
    } finally {
      Object.defineProperty(process, 'platform', platform)
      process.env = env
      small.dispose()
    }

    expect(await vt.content()).toEqual(['. parent', '|   √ first', '|   √ second', '` √'])
    expect(seen).toEqual(['> task 0', '■ task 1', '■ task 2', '+ 7'])
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
    expect(seen).toEqual({ scrollback: [], screen: ['┌ ❯ parent'] })
    expect(await vt.content()).toEqual(['┌ ⚠ parent', '│   ✔ first', '│   ✖ second failed', '└   ✔ third'])
  })

  it('should draw no connector when markIndentation is disabled', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'collapsing',
          task: (_, task): Listr =>
            task.newListr(
              [
                {
                  title: 'first',
                  task: async(): Promise<void> => {
                    seen = await vt.content()
                  }
                },
                {
                  title: 'second',
                  task: async(): Promise<void> => {
                    throw new Error('second failed')
                  }
                }
              ],
              { exitOnError: false }
            )
        },
        {
          title: 'staying',
          task: (_, task): Listr =>
            task.newListr(
              [
                { title: 'third', task: async(): Promise<void> => {} },
                { title: 'fourth', task: async(): Promise<void> => {} }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options({ markIndentation: false })
    ).run()

    expect(seen).toEqual(['❯ collapsing', '  ❯ first', '  ◼ second', '◼ staying'])
    expect(await vt.content()).toEqual(['⚠ collapsing', '  ✔ first', '  ✖ second failed', '❯ staying', '  ✔ third', '  ✔ fourth', '✔ staying'])
  })

  it.each([
    // without a column to draw into, a parent with a title persists its title before its subtasks and closes on its title after them
    [
      'the indentation is 0',
      {
        title: 'parent',
        options: { indentation: 0 },
        seen: ['❯ parent', '✔ first', '❯ second'],
        final: ['❯ parent', '✔ first', '✔ second', '✔ parent']
      }
    ],
    [
      'the parent has no title',
      {
        title: undefined,
        options: {},
        seen: ['✔ first', '❯ second'],
        final: ['✔ first', '✔ second']
      }
    ]
  ])('should draw no bracket when %s', async(_, { title, options: rendererOptions, ...expected }) => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title,
          task: (_, task): Listr =>
            task.newListr(
              [
                { title: 'first', task: async(): Promise<void> => {} },
                {
                  title: 'second',
                  task: async(): Promise<void> => {
                    seen = await vt.content()
                  }
                }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options(rendererOptions)
    ).run()

    expect({ seen, final: await vt.content() }).toEqual(expected)
  })

  it('should draw the bracket and the summaries with the icons given in the options', async() => {
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
      options({ icon: { CONNECTOR_START: '╭', SUMMARY_WAITING: '~' } })
    ).run()

    expect(seen).toEqual(['╭ ❯ parent', '│   ✔ task 0', '│   ❯ task 1', '│   ◼ task 2', '│   ◼ task 3', '└   ~ 2', '◼ after 0', '◼ after 1', '~ 8'])
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

  it('should show the retry count on the header of a retrying group', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    const seen: string[][] = []

    await new Listr(
      [
        {
          title: 'retry',
          retry: 1,
          task: (_, parent): Listr =>
            parent.newListr(
              [
                {
                  title: 'subtask',
                  task: async(): Promise<void> => {
                    seen.push(await vt.content())

                    if (!parent.isRetrying()?.count) {
                      throw new Error('not yet')
                    }
                  }
                }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options()
    ).run()

    expect(seen.at(-1)).toEqual(['┌ ⚠ retry [RETRY:1]', '└   ❯ subtask'])
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

  it('should show the status of a group that rolls back on its header, next to the title it rolls back with', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await expect(
      new Listr(
        [
          {
            title: 'parent',
            task: (_, task): Listr =>
              task.newListr([
                {
                  title: 'fails',
                  task: async(): Promise<void> => {
                    throw new Error('failed')
                  }
                },
                { title: 'never runs', task: async(): Promise<void> => {} }
              ]),
            rollback: async(_, task): Promise<void> => {
              task.title = 'rolling back'
              seen = await vt.content()
              task.title = 'rolled back'
            }
          }
        ],
        options()
      ).run()
    ).rejects.toThrow('failed')

    expect(seen).toEqual(['┌ ⚠ rolling back', '│   ✖ failed', '└   ◼ never runs'])
    expect(await vt.content()).toEqual(['┌ ← rolled back', '│   ✖ failed', '└   ◼ never runs'])
  })

  it('should show the status of a failed group written in one go on its header', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    await expect(
      new Listr(
        [
          {
            title: 'parent',
            task: (_, task): Listr =>
              task.newListr([
                { title: 'first', task: async(): Promise<void> => {} },
                {
                  title: 'second',
                  task: async(): Promise<void> => {
                    throw new Error('second failed')
                  }
                }
              ])
          }
        ],
        options()
      ).run()
    ).rejects.toThrow('second failed')

    expect(await vt.content()).toEqual(['┌ ✖ parent', '│   ✔ first', '└   ✖ second failed'])
  })

  it('should show the title of a non-collapsing group on exactly one line of the screen in every frame', async() => {
    vt = new VirtualTerminal({
      columns: 80,
      rows: 10,
      frames: true
    })

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(5, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  // the captured lines push the header up a row more with every subtask
                  vt.write(`output ${index}\n`)
                  await delay(10)
                }
              })),
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options()
    ).run()

    await vt.flush()

    const shown = vt.frames.filter((screen) => screen.some((line) => /^[┌│└]/.test(line)))
    const brackets = shown.map((screen) => screen.filter((line) => /^[┌└]/.test(line)))

    // the live header carries the status, then the footer once the header is persisted, with the title once the header scrolled off
    expect(brackets[0][0]).toEqual('┌ ❯ parent')
    expect(brackets).toContainEqual(['┌ parent', '└ ❯'])
    expect(brackets).toContainEqual(['└ ❯ parent'])
    expect(brackets.at(-1)).toEqual(['└ ✔ parent'])
    expect(shown.filter((screen) => screen.filter((line) => /^[┌└] (\S )?parent$/.test(line)).length !== 1)).toEqual([])
  })

  it('should show the title on the footer once captured output pushed the header off the screen', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 8 })

    let seen: string[]

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
                    range(6, (index) => vt.write(`line ${index}\n`))
                    await delay(10)
                    seen = await vt.screen()
                  }
                }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options()
    ).run()

    // only the rows of the group itself would still fit, so the captured lines are what moved the header off the screen
    expect(seen).toEqual(['│   ✔ first', ...range(6, (index) => `line ${index}`), '│   ❯ second', '└ ❯ parent', ''].slice(-8))
    expect(await vt.content()).toEqual(['┌ parent', '│   ✔ first', ...range(6, (index) => `line ${index}`), '│   ✔ second', '└ ✔ parent'])
  })

  it('should end a line that shows only an icon with a space', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              [
                { title: 'first', task: async(): Promise<void> => {} },
                { title: 'second', task: async(): Promise<void> => delay(10) }
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ],
      options()
    ).run()

    // the screen trims the end of a line, so check the writes, where a symbol that ends the line is drawn narrower by some terminals
    const lines = stripVTControlCharacters(vt.writes.join('')).split(/\r?\n/)

    expect(lines).toContain('└ ❯ ')
    expect(lines).toContain('└ ✔ ')
    expect(lines.filter((line) => /^└ \S$/.test(line))).toEqual([])
  })

  it('should close a bracket without a footer on the output bar of its last subtask', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 10 })

    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr([
              { title: 'first', task: async(): Promise<void> => {} },
              {
                title: 'second',
                task: async(_, task): Promise<void> => {
                  task.output = 'some output'
                  seen = await vt.content()
                }
              }
            ])
        }
      ],
      options()
    ).run()

    expect(seen).toEqual(['┌ ❯ parent', '│   ✔ first', '│   ❯ second', '└     › some output'])
  })

  it('should close a bracket without a footer on the closing line of a nested bracket', async() => {
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
                    {
                      title: 'last',
                      task: async(): Promise<void> => {
                        seen = await vt.content()
                      }
                    }
                  ])
              }
            ])
        }
      ],
      options()
    ).run()

    expect(seen).toEqual(['┌ ❯ outer', '│   ✔ first', '│   ┌ ❯ inner', '└   └   ❯ last'])
  })

  it('should show the status of a live header that does not fit on the terminal on a footer, and write the group without it', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 6 })

    let release: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    let seen: string[]

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(8, (index) => ({
                title: `task ${index}`,
                task: async(): Promise<void> => {
                  if (index === 7) {
                    await delay(10)
                    seen = await vt.screen()
                    release()
                  }

                  await gate

                  if (index === 0) {
                    throw new Error('task 0 failed')
                  }
                }
              })),
              { concurrent: true, exitOnError: false }
            )
        }
      ],
      options()
    ).run()

    // every subtask runs, so nothing can be summarized and the header is clipped from the live region
    expect(seen).toEqual([...range(4, (index) => `│   ❯ task ${index + 4}`), '└ ❯ parent', ''])
    expect(await vt.content()).toEqual(['┌ ⚠ parent', '│   ✖ task 0 failed', ...range(6, (index) => `│   ✔ task ${index + 1}`), '└   ✔ task 7'])
  })

  it.each([
    {
      indentation: 2,
      header: ['┌ ⚠ header', '│   ✔ first', '└   ✖ second failed'],
      footer: ['┌ footer', '│   ✔ first', '│   ✔ second', '└ ✔'],
      nested: ['┌ outer', '│   ✔ first', '│   ┌ ⚠ inner', '│   │   ✔ inner first', '│   └   ✖ second failed', '│   ✔ last', '└ ✔']
    },
    {
      indentation: 4,
      header: ['┌   ⚠ header', '│       ✔ first', '└       ✖ second failed'],
      footer: ['┌ footer', '│       ✔ first', '│       ✔ second', '└   ✔'],
      nested: [
        '┌ outer',
        '│       ✔ first',
        '│       ┌   ⚠ inner',
        '│       │       ✔ inner first',
        '│       └       ✖ second failed',
        '│       ✔ last',
        '└   ✔'
      ]
    }
  ])('should put the rows of a bracket one level deeper than its status icon with indentation $indentation', async({ indentation, header, footer, nested }) => {
    const fails: ListrTask = {
      title: 'second',
      task: async(): Promise<void> => {
        throw new Error('second failed')
      }
    }
    const passes = (title: string): ListrTask => ({ title, task: async(): Promise<void> => {} })
    const run = async(tasks: ListrTask[]): Promise<string[]> => {
      vt?.dispose()
      vt = new VirtualTerminal({ columns: 80, rows: 20 })

      await new Listr(tasks, { ...options({ indentation }), exitOnError: false }).run()

      return vt.content()
    }

    // the status on the header, with the corner on the last row
    expect(await run([{ title: 'header', task: (_, task): Listr => task.newListr([passes('first'), fails], { exitOnError: false }) }])).toEqual(header)
    // the status on the footer, in the column of the icon of the header
    expect(
      await run([{ title: 'footer', task: (_, task): Listr => task.newListr([passes('first'), passes('second')], { rendererOptions: { collapseSubtasks: false } }) }])
    ).toEqual(footer)
    // a bracket with its status on the header inside one with its status on the footer
    expect(
      await run([
        {
          title: 'outer',
          task: (_, task): Listr =>
            task.newListr(
              [
                passes('first'),
                {
                  title: 'inner',
                  task: (_, task): Listr => task.newListr([passes('inner first'), fails], { exitOnError: false, rendererOptions: { collapseSubtasks: true } })
                },
                passes('last')
              ],
              { rendererOptions: { collapseSubtasks: false } }
            )
        }
      ])
    ).toEqual(nested)
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
    expect(await vt.content()).toEqual(['✔ before', '┌ ⊘ parent', '│   ⊘ interrupted', '└   ⊘ never started', '⊘ after'])
    // a terminal left in a synchronized update would show nothing anymore
    expect(vt.writes.at(-1)).toBe(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)
  })

  it('should write every frame as one synchronized update', async() => {
    vt = new VirtualTerminal({ columns: 80, rows: 6 })

    await new Listr(
      [
        {
          title: 'parent',
          task: (_, task): Listr =>
            task.newListr(
              range(8, (index) => ({
                title: `task ${index}`,
                task: async(_, subtask): Promise<void> => {
                  subtask.output = `output ${index}`
                  await delay(5)
                }
              })),
              { rendererOptions: { collapseSubtasks: false } }
            )
        },
        { title: 'after', task: async(): Promise<void> => {} }
      ],
      options()
    ).run()

    const writes = vt.writes.slice(1, -1)

    expect(vt.writes[0]).toBe(ANSI_ESCAPE_CODES.CURSOR_HIDE)
    expect(writes.length).toBeGreaterThan(5)
    writes.forEach((write) => {
      expect(write.startsWith(ANSI_ESCAPE_CODES.SYNC_START)).toBe(true)
      expect(write.endsWith(ANSI_ESCAPE_CODES.SYNC_END)).toBe(true)
      expect(write.split(ANSI_ESCAPE_CODES.SYNC_START)).toHaveLength(2)
    })
    expect(vt.writes.at(-1)).toBe(ANSI_ESCAPE_CODES.SYNC_END + ANSI_ESCAPE_CODES.CURSOR_SHOW)
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

    expect(await vt.content()).toEqual([1, 2].flatMap((index) => ['┌ parent', `│   ✔ subtask finished (run ${index})`, '└ ✔', `✔ second (run ${index})`]))
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
    expect(await vt.content()).toEqual(['┌ ✔ parent', '│   ✔ first (attempt 2)', '└   ✔ second (attempt 2)'])
  })
})
