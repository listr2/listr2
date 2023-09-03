import { jest } from '@jest/globals'

process.env.LISTR_DISABLE_COLOR = '1'

global.jest = jest as any

jest.setTimeout(15000)
