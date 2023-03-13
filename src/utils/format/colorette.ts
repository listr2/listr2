import { createColors } from 'colorette'

import { ListrEnvironmentVariables } from '@constants'

export const color = createColors({ useColor: !process.env[ListrEnvironmentVariables.DISABLE_COLOR] })
