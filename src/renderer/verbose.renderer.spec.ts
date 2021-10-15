import { VerboseRenderer } from './verbose.renderer'
import { Logger } from '@utils/logger'
import { LoggerOptions } from '@utils/logger.interface'

jest.mock('@utils/logger')

interface CustomLoggerOptions extends LoggerOptions {
  loggerPath: string
}

describe('VerboseRenderer', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('logger', () => {
    it('should pass logger options to the default logger', () => {
      new VerboseRenderer([], { useIcons: true })
      expect(Logger).toHaveBeenCalledWith({ useIcons: true })
    })

    it('should pass options to a custom logger', () => {
      const CustomLogger = jest.fn()
      const options: CustomLoggerOptions = { useIcons: false, loggerPath: '/tmp/log.txt' }
      new VerboseRenderer([], { ...options, logger: CustomLogger })
      expect(CustomLogger).toHaveBeenCalledWith({ useIcons: false, loggerPath: '/tmp/log.txt' })
    })
  })
})
