import { createColors } from 'colorette'

export const color = createColors({ useColor: process.env?.LISTR_DISABLE_COLOR !== '1' })
