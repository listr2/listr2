import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([], {
  /* options */
})

tasks.add([
  {
    title: 'This task will execute.',
    task: async (ctx): Promise<void> => {
      // perform some operations
    }
  }
])

tasks.add([
  {
    title: 'This task will execute.',
    task: async (ctx): Promise<void> => {
      // perform some operations
    }
  }
])

try {
  await tasks.run()
} catch (e) {
  console.error(e)
}
