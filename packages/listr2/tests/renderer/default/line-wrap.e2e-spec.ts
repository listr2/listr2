import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('default renderer: option: line wrap', () => {
  const message =
    'THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE THIS IS A LONG LONG MESSAGE'

  const messageWithNewLines =
    'THIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE'

  const messageWithEmptyLines =
    'THIS IS A LONG LONG MESSAGE\n\n\nAGE\nTHIS ISESSAGE\nTHIS IG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE\nTHIS IS A LONG LONG MESSAGE'

  process.stdout.isTTY = true
  process.stdout.columns = 80

  const output: MockProcessOutput = {} as MockProcessOutput

  process.stdout.isTTY = true

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it.each([
    ['truncate', message],
    ['wrap', message],
    ['truncate', messageWithNewLines],
    ['wrap', messageWithNewLines]
  ])('should %s long strings', async(format, m) => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: `This task will with formating the output with ${format} output.`,
            task: async(_, task): Promise<void> => {
              task.output = m
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true, formatOutput: format as any }
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    expect(err).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, '31Xbkp3zzsfDqlG3p8uAIotvBXNr92hA')
  })

  it.each([
    ['truncate', message],
    ['wrap', message],
    ['truncate', messageWithNewLines],
    ['wrap', messageWithNewLines]
  ])('should %s long titles', async(format, m) => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: m,
            task: async(_, task): Promise<void> => {
              task.output = `This task will with formating the title with ${format} output.`
            }
          }
        ],
        {
          concurrent: false,
          exitOnError: true,
          rendererOptions: { lazy: true, formatOutput: format as any }
        }
      ).run()
    } catch (e: any) {
      err = e
    }

    expect(err).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, 'effxCyY3v0UwCvij5FA2kc2XllnFtU4B')
  })

  it.each([
    [true, 'truncate', messageWithEmptyLines],
    [false, 'truncate', messageWithEmptyLines]
  ])('should skip empty lines %s', async(rel, format, m) => {
    let err: Error

    try {
      await new Listr(
        [
          {
            title: `This will skip empty lines on output: ${rel}`,
            task: async(_, task): Promise<void> => {
              task.output = m
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
    } catch (e: any) {
      err = e
    }

    expect(err).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, 'lEAjB2T3MtNUO3ufIOFMvwZ6eLpeIfhx')
  })
})
