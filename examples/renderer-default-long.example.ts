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
        () => 300
      ),

      {
        title: 'Installing packages, which collapse once they are all installed.',
        task: (_, task): Listr =>
          task.newListr(
            steps(
              60,
              (index) => `Installing package-${index + 1}.`,
              () => 250
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
              () => 300
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

      ...steps(
        30,
        (index) => `Cleaning up, step ${index + 1} of 30.`,
        () => 300
      )
    ],
    { renderer: 'default' }
  ).run()
} catch(e: any) {
  console.error(e)
}
