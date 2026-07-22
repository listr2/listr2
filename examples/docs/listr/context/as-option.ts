import { Listr } from 'listr2'

interface Ctx {}

const ctx: Ctx = {}

const tasks = new Listr<Ctx>(
  [/* tasks */],
  { ctx } // [!code highlight]
)

await tasks.run()
