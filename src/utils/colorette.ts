import * as colorette from 'colorette'

/* istanbul ignore if */
if (process.env?.LISTR_DISABLE_COLOR === '1') {
  // disable coloring completely
  colorette.options.enabled = false
}

export default colorette
