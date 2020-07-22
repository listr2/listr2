import chalkDefault from 'chalk'

let chalk: chalkDefault.Chalk

if (process.env?.NODE_ENV !== 'test' && chalkDefault.supportsColor) {
  chalk = new chalkDefault.Instance()
} else {
  chalk = new chalkDefault.Instance({ level: 0 })
}

export default chalk
