/* eslint-disable @typescript-eslint/no-empty-function */
import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('fallback renderer', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  const message =
    // eslint-disable-next-line max-len
    'THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE'

  const messageWithNewLines =
    // eslint-disable-next-line max-len
    'THIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE'

  const messageWithEmptyLines =
    // eslint-disable-next-line max-len
    'THIS IS A LONG LONG MESSAGE\n\n\nAGE\nTHIS ISESSAGE\nTHIS IG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE'

  process.stdout.isTTY = true
  process.stdout.columns = 80

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
    jest.clearAllMocks()
  })

  it.each([
    [ 'truncate', message ],
    [ 'wrap', message ],
    [ 'truncate', messageWithNewLines ],
    [ 'wrap', messageWithNewLines ]
  ])('should %s long strings', async (format, m) => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: `This task will with formating the output with ${format} output.`,
            task: async (_, task): Promise<void> => {
              task.output = m
              await delay(20)
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true, formatOutput: format as any }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeFalsy()
    expect(mockStdout.mock.calls).toMatchSnapshot()
    expect(mockStderr.mock.calls).toMatchSnapshot()
    expect(mockExit.mock.calls).toMatchSnapshot()
  })

  it.each([
    [ 'truncate', message ],
    [ 'wrap', message ],
    [ 'truncate', messageWithNewLines ],
    [ 'wrap', messageWithNewLines ]
  ])('should %s long titles', async (format, m) => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: m,
            task: async (_, task): Promise<void> => {
              task.output = `This task will with formating the title with ${format} output.`
              await delay(20)
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true, formatOutput: format as any }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeFalsy()
    expect(mockStdout.mock.calls).toMatchSnapshot()
    expect(mockStderr.mock.calls).toMatchSnapshot()
    expect(mockExit.mock.calls).toMatchSnapshot()
  })

  it.each([
    [ true, 'truncate', messageWithEmptyLines ],
    [ false, 'truncate', messageWithEmptyLines ]
  ])('should skip empty lines %s', async (rel, format, m) => {
    let err: Error | undefined
    try {
      await new Listr(
        [
          {
            title: `This will skip empty lines on output: ${rel}`,
            task: async (_, task): Promise<void> => {
              task.output = m
              await delay(20)
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: {
            lazy: true,
            formatOutput: format as any,
            removeEmptyLines: rel
          }
        }
      ).run()
    } catch (e) {
      err = e
    }

    expect(err).toBeFalsy()
    expect(mockStdout.mock.calls).toMatchSnapshot()
    expect(mockStderr.mock.calls).toMatchSnapshot()
    expect(mockExit.mock.calls).toMatchSnapshot()
  })
})
