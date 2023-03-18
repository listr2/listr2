import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (ctx): Promise<void> => {
        // perform some operations
      }
    }
  ],
  {
    /* options */
  }
)

try {
  await tasks.run()
} catch (e) {
  console.error(e)
}
