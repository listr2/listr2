import { Listr } from 'listr2'

interface Ctx {}

const ctx: Ctx = {}

const tasks = new Listr<Ctx>([
  /* tasks */
])

await tasks.run({ ctx })
