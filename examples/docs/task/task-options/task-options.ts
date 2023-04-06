import { Listr, PRESET_TIMER } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (_, task): Listr<Ctx> =>
        task.newListr(
          [
            {
              title: 'This task will execute.',
              task: async (ctx): Promise<void> => {
                // perform some operations
              }
            },

            {
              title: 'This task will execute.',
              task: async (ctx): Promise<void> => {
                // perform some operations
              },
              exitOnError: false,
              options: { timer: PRESET_TIMER }
            }
          ],
          {
            concurrent: true,
            collectErrors: false,
            rendererOptions: { collapseSubtasks: false }
          }
        )
    }
  ],
  {
    exitOnError: true,
    concurrent: false
  }
)

try {
  await tasks.run()
} catch (e) {
  console.error(e)
}
