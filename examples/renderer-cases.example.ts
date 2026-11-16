import type { ListrBaseClassOptions, ListrTask } from 'listr2'

// The cases the renderer documentation shows in screenshots, one case per run:
// pnpm --filter @listr2/examples start examples/renderer-cases.example.ts <case>
// See examples/screenshots/README.md for how the screenshots are taken.

const name = process.argv[2]

// the figures are picked when listr2 loads, so the ascii case pretends to run on a terminal without unicode first
if (name === 'ascii') {
  Object.defineProperty(process, 'platform', { value: 'win32' })
}

const { delay, Listr, ListrDefaultRendererLogLevels, PRESET_TIMER, PRESET_TIMESTAMP } = await import('listr2')

const steps = (titles: string[], time: (index: number) => number = (): number => 800): ListrTask[] =>
  titles.map((title, index) => ({
    title,
    task: async(): Promise<void> => {
      await delay(time(index))
    }
  }))

const numbered = <T>(count: number, map: (index: number) => T): T[] => Array.from({ length: count }, (_, index) => map(index + 1))

const run = (tasks: ListrTask[], options?: ListrBaseClassOptions): Promise<unknown> => new Listr(tasks, { exitOnError: false, ...options }).run()

const migrations: ListrTask = {
  title: 'Running migrations',
  task: (_, task) => task.newListr(steps(numbered(4, (index) => `Running migration 00${index}.`)), { rendererOptions: { collapseSubtasks: false } })
}

const installing: ListrTask = {
  title: 'Installing packages',
  task: (_, task) => task.newListr(steps(['Installing react.', 'Installing typescript.', 'Installing vitest.', 'Installing eslint.']))
}

const validating = (title: string, rendererOptions: Record<string, unknown> = {}): ListrTask => ({
  title,
  task: (_, task) =>
    task.newListr(
      [
        { title: 'Validating package.json.', task: async(): Promise<void> => delay(800) },
        {
          title: 'Validating tsconfig.json.',
          task: async(): Promise<void> => {
            await delay(800)

            throw new Error('compilerOptions.target is missing.')
          }
        },
        { title: 'Validating .npmrc.', task: async(): Promise<void> => delay(800) }
      ],
      { exitOnError: false, rendererOptions }
    )
})

const skipping = (title: string, rendererOptions: Record<string, unknown> = {}): ListrTask => ({
  title,
  task: (_, task) =>
    task.newListr(
      [
        { title: 'Publishing to npm.', task: async(): Promise<void> => delay(800) },
        {
          title: 'Publishing to the GitHub registry.',
          task: async(_, task): Promise<void> => {
            await delay(800)
            task.skip('No token for the GitHub registry.')
          }
        }
      ],
      { rendererOptions: { collapseSubtasks: false, ...rendererOptions } }
    )
})

const reporting: ListrTask[] = [
  {
    title: 'Collecting data.',
    task: async(_, task): Promise<void> => {
      for (let index = 1; index <= 6; index++) {
        task.output = `Reading chunk ${index} of 6.`
        await delay(400)
      }
    },
    rendererOptions: { outputBar: 3 }
  },
  {
    title: 'Writing the report.',
    task: async(_, task): Promise<void> => {
      for (const line of ['Wrote summary.md.', 'Wrote details.md.', 'Wrote charts.svg.']) {
        task.output = line
        await delay(600)
      }
    },
    rendererOptions: { bottomBar: 3, persistentOutput: true }
  }
]

const building: ListrTask = {
  title: 'Building',
  task: (_, task) =>
    task.newListr(
      [
        { title: 'Cleaning dist.', task: async(): Promise<void> => delay(800) },
        {
          title: 'Compiling packages',
          task: (_, task) => task.newListr(steps(numbered(3, (index) => `Compiling package-${index}.`)), { rendererOptions: { collapseSubtasks: false } })
        },
        { title: 'Writing types.', task: async(): Promise<void> => delay(800) }
      ],
      { rendererOptions: { collapseSubtasks: false } }
    )
}

const cases: Record<string, () => Promise<unknown>> = {
  // a group with collapseSubtasks: false, while it runs and once it closed
  group: () => run([migrations]),

  // the same groups drawn as brackets
  bracket: () => run([migrations], { rendererOptions: { markIndentation: true } }),
  'bracket-nested': () => run([building], { rendererOptions: { markIndentation: true } }),

  // a group that collapses once all of its subtasks finished
  collapse: () => run([installing, { title: 'Building the bundles.', task: async(): Promise<void> => delay(800) }]),

  // a group inside a group
  nested: () => run([building]),

  // a concurrent list, whose tasks are persisted in the order they finish
  concurrent: () =>
    run(
      steps(
        numbered(4, (index) => `Downloading asset-${index}.`),
        (index) => [3200, 1000, 2200, 600][index]
      ),
      { concurrent: true }
    ),

  // groups that would collapse, but stay expanded because a subtask failed: one carries on past the failure, the other fails with it
  failure: () =>
    run([
      validating('Validating config'),
      {
        title: 'Deploying',
        task: (_, task) =>
          task.newListr([
            { title: 'Uploading the bundles.', task: async(): Promise<void> => delay(800) },
            {
              title: 'Switching the release.',
              task: async(): Promise<void> => {
                await delay(800)

                throw new Error('The release lock is held by another deploy.')
              }
            },
            { title: 'Purging the cache.', task: async(): Promise<void> => delay(800) }
          ], { exitOnError: true })
      }
    ]),

  // a list taller than the terminal, shortened with the summary lines while it runs
  summary: () =>
    run([
      {
        title: 'Installing packages',
        task: (_, task) => task.newListr(steps(numbered(24, (index) => `Installing package-${index}.`), () => 400))
      },
      ...steps(numbered(8, (index) => `Cleaning up, step ${index} of 8.`), () => 400)
    ]),

  // a group that changes its title while it runs, and a group with a timer
  title: () =>
    run([
      {
        title: 'Compiling packages',
        task: (_, parent) =>
          parent.newListr(
            numbered(3, (index) => index).map((index) => ({
              title: `Compiling package-${index}.`,
              task: async(): Promise<void> => {
                await delay(800)

                if (index === 3) {
                  parent.title = 'Compiled 3 packages.'
                  await delay(800)
                }
              }
            })),
            { rendererOptions: { collapseSubtasks: false } }
          )
      },
      { ...migrations, rendererOptions: { timer: PRESET_TIMER } }
    ]),

  // the fallback figures of a terminal without unicode
  ascii: () => run([migrations], { rendererOptions: { markIndentation: true } }),

  // the renderer options that change how a task looks, each next to its default
  'show-subtasks': () => run([installing], { rendererOptions: { showSubtasks: false } }),
  'collapse-errors': () => run([validating('collapseErrors: true, the default'), validating('collapseErrors: false', { collapseErrors: false })]),
  'collapse-skips': () => run([skipping('collapseSkips: true, the default'), skipping('collapseSkips: false', { collapseSkips: false })]),
  retry: () =>
    run([
      {
        title: 'Calling a flaky service.',
        retry: 2,
        task: async(_, task): Promise<void> => {
          await delay(1500)

          if (task.isRetrying().count < 2) {
            throw new Error('The service did not answer.')
          }
        }
      }
    ]),
  truncate: () =>
    run(steps(['Generating the changelog from every conventional commit since the last release tag, grouped by scope and type.']), {
      rendererOptions: { formatOutput: 'truncate' }
    }),
  indentation: () =>
    run(
      [
        {
          title: 'Building',
          task: (_, task) =>
            task.newListr([migrations, { title: 'Writing types.', task: async(): Promise<void> => delay(800) }], { rendererOptions: { collapseSubtasks: false } })
        }
      ],
      { rendererOptions: { indentation: 4 } }
    ),
  output: () => run(reporting),
  icons: () =>
    run([migrations], {
      rendererOptions: {
        markIndentation: true,
        icon: {
          [ListrDefaultRendererLogLevels.CONNECTOR_START]: '╭',
          [ListrDefaultRendererLogLevels.CONNECTOR_END]: '╰',
          [ListrDefaultRendererLogLevels.COMPLETED]: '✓'
        }
      }
    }),

  // the simple and the verbose renderer
  simple: () =>
    new Listr([installing, migrations, ...reporting], {
      exitOnError: false,
      renderer: 'simple',
      rendererOptions: {
        timer: PRESET_TIMER,
        timestamp: PRESET_TIMESTAMP
      }
    }).run(),
  verbose: () =>
    new Listr(
      [
        {
          title: 'Compiling packages',
          task: async(_, task): Promise<void> => {
            await delay(800)
            task.output = 'Compiled package-1.'
            await delay(800)
            task.title = 'Compiled 1 package.'
          }
        },
        ...reporting
      ],
      {
        exitOnError: false,
        renderer: 'verbose',
        rendererOptions: {
          logTitleChange: true,
          timer: PRESET_TIMER,
          timestamp: PRESET_TIMESTAMP
        }
      }
    ).run()
}

if (!cases[name]) {
  console.error(`Pass one of the cases as an argument: ${Object.keys(cases).join(', ')}`)
  process.exit(1)
}

await cases[name]()
