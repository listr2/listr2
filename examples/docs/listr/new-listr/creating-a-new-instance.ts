// #region create
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    /* tasks */
  ],
  {
    /* options */
  }
)
// #endregion create

// #region run
try {
  await tasks.run()
} catch(e) {
  console.error(e)
}
// #endregion run
