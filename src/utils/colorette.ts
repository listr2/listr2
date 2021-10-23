import { createColors } from 'colorette'

export default createColors({ useColor: process.env?.LISTR_DISABLE_COLOR !== '1' })
