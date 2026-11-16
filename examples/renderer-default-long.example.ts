import type { ListrTask } from 'listr2'
import { delay, Listr } from 'listr2'

// A task list far taller than any terminal that runs for about a minute, to scroll and resize the terminal while it runs.

const steps = (count: number, title: (index: number) => string, time: (index: number) => number): ListrTask[] =>
  Array.from({ length: count }, (_, index) => ({
    title: title(index),
    task: async(): Promise<void> => {
      await delay(time(index))
    }
  }))

try {
  await new Listr(
    [
      ...steps(
        30,
        (index) => `Preparing the workspace, step ${index + 1} of 30.`,
        () => 150
      ),

      {
        title: 'Installing packages, which collapse once they are all installed.',
        task: (_, task): Listr =>
          task.newListr(
            steps(
              60,
              (index) => `Installing package-${index + 1}.`,
              () => 150
            )
          )
      },

      {
        title: 'Running migrations, which stay on the screen.',
        task: (_, task): Listr =>
          task.newListr(
            steps(
              20,
              (index) => `Running migration ${String(index + 1).padStart(3, '0')}.`,
              () => 250
            ),
            { rendererOptions: { collapseSubtasks: false } }
          )
      },

      {
        title: 'Downloading assets at the same time, which finish in their own order.',
        task: (_, task): Listr =>
          task.newListr(
            steps(
              12,
              (index) => `Downloading asset-${index + 1}.`,
              // uneven delays, so the downloads finish out of order
              (index) => 800 + ((index * 1700) % 5000)
            ),
            { concurrent: true, rendererOptions: { collapseSubtasks: false } }
          )
      },

      {
        title: 'Building the bundles.',
        task: (_, task): Listr =>
          task.newListr(
            Array.from({ length: 6 }, (_, bundle) => ({
              title: `Building bundle-${bundle + 1}.`,
              task: async(_, task): Promise<void> => {
                for (let module = 1; module <= 10; module++) {
                  task.output = `Compiled module ${module} of 10.`
                  await delay(150)
                }
              },
              rendererOptions: { outputBar: 2 }
            }))
          )
      },

      {
        title: 'Calling a flaky service.',
        task: async(_, task): Promise<void> => {
          task.output = 'Sending the request...'
          await delay(1000)

          if (!task.isRetrying().count) {
            throw new Error('The service did not answer in time.')
          }

          task.output = 'The service answered.'
          await delay(1000)
        },
        retry: 1
      },

      {
        title: 'Writing to the console in the middle of the run.',
        task: async(): Promise<void> => {
          await delay(500)
          console.log('This line was written with console.log while the task list was running.')
          await delay(500)
        }
      },

      {
        title: 'Publishing the release, which rolls back when it fails.',
        task: (_, task): Listr =>
          task.newListr([
            {
              title: 'Uploading the artifacts.',
              task: async(): Promise<void> => {
                await delay(1500)
                throw new Error('The upload failed after 1.5 seconds.')
              }
            },
            { title: 'Tagging the release.', task: async(): Promise<void> => delay(500) }
          ]),
        rollback: async(_, task): Promise<void> => {
          task.title = 'Rolling back the release, the upload failed.'
          await delay(1000)
          task.title = 'Removing the uploaded artifacts.'
          await delay(1000)
          task.title = 'Rolled back the release.'
        }
      },

      {
        title: 'Deploying, which retries the whole group once.',
        task: (_, task): Listr =>
          task.newListr([
            { title: 'Starting the containers.', task: async(): Promise<void> => delay(700) },
            {
              title: 'Checking the health of the containers.',
              task: async(): Promise<void> => {
                await delay(800)

                if (!task.isRetrying().count) {
                  throw new Error('The containers did not become healthy.')
                }
              }
            }
          ]),
        retry: 1
      },

      {
        title: 'Running the test shards at the same time, more than a short terminal shows.',
        task: (_, task): Listr =>
          task.newListr(
            Array.from({ length: 24 }, (_, index) => ({
              title: `Running test shard ${index + 1} of 24.`,
              task: async(): Promise<void> => {
                // uneven delays, so the shards finish out of order and the finished ones fold into a summary
                await delay(1000 + ((index * 700) % 3000))

                if (index === 9) {
                  throw new Error('Test shard 10 of 24 failed.')
                }
              }
            })),
            { concurrent: true, exitOnError: false }
          )
      },

      ...steps(
        30,
        (index) => `Cleaning up, step ${index + 1} of 30.`,
        () => 150
      )
    ],
    // the release rolls back and the run carries on
    { renderer: 'default', exitAfterRollback: false }
  ).run()
} catch(e: any) {
  console.error(e)
}
