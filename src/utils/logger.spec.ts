import { Logger } from './logger'

function testForAllExcept (
  instances: jest.SpyInstance<void, string[][]>[],
  one: jest.SpyInstance<void, string[][]>,
  times: number,
  callback?: { onOne?: () => void, onRest?: () => void }
): void {
  instances.splice(instances.indexOf(one), 1)

  expect(one).toBeCalledTimes(times)

  if (callback?.onOne) {
    callback.onOne()
  }

  instances.forEach((item) => {
    expect(item).toBeCalledTimes(0)
    if (callback?.onRest) {
      callback.onRest()
    }
  })
}

describe('logger', () => {
  let log: jest.SpyInstance<void, string[][]>
  let error: jest.SpyInstance<void, string[][]>
  let warn: jest.SpyInstance<void, string[][]>
  let info: jest.SpyInstance<void, string[][]>
  let instances: jest.SpyInstance<void, string[][]>[]
  let logger: Logger

  beforeEach(async () => {
    log = jest.spyOn(console, 'log').mockImplementation()
    error = jest.spyOn(console, 'error').mockImplementation()
    warn = jest.spyOn(console, 'warn').mockImplementation()
    info = jest.spyOn(console, 'info').mockImplementation()
    instances = [ log, error, warn, info ]
    logger = new Logger()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  // it('should log a error fail message', async () => {
  //   logger.fail('test message')

  //   testForAllExcept(instances, error, 1, {
  //     onOne: () => {
  //       expect(error.mock.calls).toMatchInlineSnapshot(`
  //       Array [
  //         Array [
  //           "[31m✖ test message[39m",
  //         ],
  //       ]
  //       `)
  //     }
  //   })
  // })

  it('should log a verbose error fail message', async () => {
    logger = new Logger({ useIcons: false })

    logger.fail('test message')

    testForAllExcept(instances, error, 1, {
      onOne: () => {
        expect(error.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[FAILED] test message",
          ],
        ]
        `)
      }
    })
  })

  // it('should log a warn skip message', async () => {
  //   logger.skip('test message')

  //   testForAllExcept(instances, warn, 1, {
  //     onOne: () => {
  //       expect(warn.mock.calls).toMatchInlineSnapshot(`
  //       Array [
  //         Array [
  //           "[33m↓ test message[39m",
  //         ],
  //       ]
  //       `)
  //     }
  //   })
  // })

  it('should log a verbose warn skip message', async () => {
    logger = new Logger({ useIcons: false })

    logger.skip('test message')

    testForAllExcept(instances, warn, 1, {
      onOne: () => {
        expect(warn.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[SKIPPED] test message",
          ],
        ]
        `)
      }
    })
  })

  // it('should log a log success message', async () => {
  //   logger.success('test message')

  //   testForAllExcept(instances, log, 1, {
  //     onOne: () => {
  //       expect(log.mock.calls).toMatchInlineSnapshot(`
  //       Array [
  //         Array [
  //           "[32m✔ test message[39m",
  //         ],
  //       ]
  //       `)
  //     }
  //   })
  // })

  it('should log a verbose log success message', async () => {
    logger = new Logger({ useIcons: false })

    logger.success('test message')

    testForAllExcept(instances, log, 1, {
      onOne: () => {
        expect(log.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[SUCCESS] test message",
          ],
        ]
        `)
      }
    })
  })

  // it('should log a info data message', async () => {
  //   logger.data('test message')

  //   testForAllExcept(instances, info, 1, {
  //     onOne: () => {
  //       expect(info.mock.calls).toMatchInlineSnapshot(`
  //       Array [
  //         Array [
  //           "→ test message",
  //         ],
  //       ]
  //       `)
  //     }
  //   })
  // })

  it('should log a verbose info data message', async () => {
    logger = new Logger({ useIcons: false })

    logger.data('test message')

    testForAllExcept(instances, info, 1, {
      onOne: () => {
        expect(info.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[DATA] test message",
          ],
        ]
        `)
      }
    })
  })

  // it('should log a log start message', async () => {
  //   logger.start('test message')

  //   testForAllExcept(instances, log, 1, {
  //     onOne: () => {
  //       expect(log.mock.calls).toMatchInlineSnapshot(`
  //       Array [
  //         Array [
  //           "❯ test message",
  //         ],
  //       ]
  //       `)
  //     }
  //   })
  // })

  it('should log a verbose log start message', async () => {
    logger = new Logger({ useIcons: false })

    logger.start('test message')

    testForAllExcept(instances, log, 1, {
      onOne: () => {
        expect(log.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[STARTED] test message",
          ],
        ]
        `)
      }
    })
  })

  // it('should log a info title message', async () => {
  //   logger.title('test message')

  //   testForAllExcept(instances, info, 1, {
  //     onOne: () => {
  //       expect(info.mock.calls).toMatchInlineSnapshot(`
  //       Array [
  //         Array [
  //           "☒ test message",
  //         ],
  //       ]
  //       `)
  //     }
  //   })
  // })

  it('should log a verbose info title message', async () => {
    logger = new Logger({ useIcons: false })

    logger.title('test message')

    testForAllExcept(instances, info, 1, {
      onOne: () => {
        expect(info.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[TITLE] test message",
          ],
        ]
        `)
      }
    })
  })

  it('should log a multiline message without problems', async () => {
    logger = new Logger({ useIcons: false })

    // eslint-disable-next-line max-len
    logger.data(
      // eslint-disable-next-line max-len
      'THIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE'
    )

    testForAllExcept(instances, info, 1, {
      onOne: () => {
        expect(info.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE
        [DATA] THIS IS A LONG LONG MESSAGE",
          ],
        ]
        `)
      }
    })
  })
})
