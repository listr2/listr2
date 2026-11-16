import type { ListrBaseClassOptions, ListrTask } from 'listr2'

// The cases the renderer documentation shows in screenshots, one case per run:
// pnpm --filter @listr2/examples start examples/renderer-cases.example.ts <case>
// See examples/screenshots/README.md for how the screenshots are taken.

const name = process.argv[2]

// the figures are picked when listr2 loads, so the cases without unicode pretend to run on such a terminal first
if (name === 'ascii' || name === 'fallback') {
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

const flaky: ListrTask = {
  title: 'Calling a flaky service.',
  retry: 2,
  task: async(_, task): Promise<void> => {
    await delay(1500)

    if (task.isRetrying().count < 2) {
      throw new Error('The service did not answer.')
    }
  }
}

// a deploy that fails on its second step, and with a rollback, restores the previous release
const deploying = (rollback?: boolean): ListrTask => ({
  title: 'Deploying',
  task: (_, task) =>
    task.newListr(
      [
        { title: 'Uploading the bundles.', task: async(): Promise<void> => delay(800) },
        {
          title: 'Switching the release.',
          task: async(): Promise<void> => {
            await delay(800)

            throw new Error('The release lock is held by another deploy.')
          },
          rollback: rollback
            ? async(_, task): Promise<void> => {
              task.title = 'Restoring the previous release.'
              await delay(2400)
              task.title = 'Restored the previous release.'
            }
            : undefined
        },
        { title: 'Purging the cache.', task: async(): Promise<void> => delay(800) }
      ],
      { exitOnError: true }
    )
})

// the simple renderer, which a non-TTY environment falls back to
const logged = (tasks: ListrTask[]): Promise<unknown> => new Listr(tasks, { exitOnError: false, renderer: 'simple' }).run()

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
  failure: () => run([validating('Validating config'), deploying()]),

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
  retry: () => run([flaky]),
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

  // a subtask that rolls back once it failed, while it rolls back and once it closed
  rollback: () => run([deploying(true)]),

  // the output of a command piped to the output bar
  command: () =>
    run([
      {
        title: 'Running the test suite.',
        task: async(_, task): Promise<void> => {
          const { execa } = await import('execa')
          const child = execa('node', [
            '-e',
            '[\'parse\', \'render\', \'format\', \'logger\'].forEach((file, index) => setTimeout(() => console.log(`✓ tests/${file}.spec.ts`), 700 * (index + 1)))'
          ])

          child.stdout.pipe(task.stdout())
          await child
        },
        rendererOptions: { outputBar: Infinity }
      }
    ]),

  // a prompt, answered with its default
  prompt: () =>
    run([
      {
        title: 'Configuring the project.',
        task: async(_, task): Promise<void> => {
          const { input } = await import('@inquirer/prompts')
          const { ListrInquirerPromptAdapter } = await import('@listr2/prompt-adapter-inquirer')
          const name = await task.prompt(ListrInquirerPromptAdapter).run(input, { message: 'What is the name of the project?', default: 'my-project' })

          task.title = `Configured ${name}.`
        }
      },
      { title: 'Writing package.json.', task: async(): Promise<void> => delay(800) }
    ]),

  // a run interrupted with Ctrl+C while a task with a rollback runs
  interruption: () =>
    run([
      {
        title: 'Deploying',
        task: (_, task) =>
          task.newListr([
            { title: 'Uploading the bundles.', task: async(): Promise<void> => delay(800) },
            {
              title: 'Switching the release.',
              task: async(): Promise<void> => delay(10000),
              rollback: async(_, task): Promise<void> => {
                task.title = 'Restoring the previous release.'
                await delay(1200)
                task.title = 'Restored the previous release.'
              }
            },
            { title: 'Purging the cache.', task: async(): Promise<void> => delay(800) }
          ])
      },
      { title: 'Notifying the team.', task: async(): Promise<void> => delay(800) }
    ]),

  // a task that writes to the console while the list runs
  'process-output': () =>
    run([
      {
        title: 'Building the bundles.',
        task: async(): Promise<void> => {
          for (const bundle of ['main', 'vendor', 'styles']) {
            await delay(700)
            console.log(`Wrote dist/${bundle}.js.`)
          }

          await delay(1500)
        }
      },
      { title: 'Publishing to npm.', task: async(): Promise<void> => delay(800) }
    ]),

  // the fallback figures of a terminal without unicode, without the bracket
  fallback: () => run([validating('Validating config'), skipping('Publishing')]),

  // the same features with the simple renderer
  'rollback-simple': () => logged([deploying(true)]),
  'failure-simple': () => logged([validating('Validating config'), deploying()]),
  'retry-simple': () => logged([flaky]),
  'skip-simple': () => logged([skipping('Publishing')]),
  'output-simple': () => logged(reporting),

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
