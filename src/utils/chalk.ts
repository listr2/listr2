import chalkDefault from 'chalk'

let chalk: chalkDefault.Chalk

/* istanbul ignore if */
if (process.env?.LISTR_DISABLE_COLOR !== '1' && chalkDefault.supportsColor) {
  chalk = new chalkDefault.Instance()
} else {
  chalk = new chalkDefault.Instance({ level: 0 })
}

/** A custom chalk instance to disable coloring compeletely. */
export default chalk
