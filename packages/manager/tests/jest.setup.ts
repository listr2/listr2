import { jest } from '@jest/globals'

process.stdout.isTTY = true
process.stdout.hasColors = (): boolean => false

global.jest = jest as any

jest.setTimeout(60000)
