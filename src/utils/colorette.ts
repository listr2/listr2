import { createColors } from 'colorette'

export const colorette = createColors({ useColor: process.env?.LISTR_DISABLE_COLOR !== '1' })
