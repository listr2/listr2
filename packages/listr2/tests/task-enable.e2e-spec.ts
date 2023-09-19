import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('enable with context', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  describe('should be disabled', () => {
    it('with a function returning boolean', async () => {
      await new Listr(
        [
          {
            title: 'disabled',
            enabled: (): boolean => false,
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run()

      expectProcessOutputToMatchSnapshot(output, 'aJWDY40NUyBBGenLqPWsXO6NOncHTUSU')
    })

    it('with async function returning boolean', async () => {
      await new Listr(
        [
          {
            title: 'disabled',
            enabled: async (): Promise<boolean> => Promise.resolve(false),
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run()

      expectProcessOutputToMatchSnapshot(output, 'QeoNcUfm5iAfZkWwttrc3l5dAB5LRvNx')
    })
  })

  describe('should be enabled', () => {
    it('with a function returning boolean', async () => {
      await new Listr(
        [
          {
            title: 'enabled',
            enabled: (): boolean => true,
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run()

      expectProcessOutputToMatchSnapshot(output, 'AebhVo1EK6MRCWEubovgNXHDo093g8YV')
    })

    it('with async function returning boolean', async () => {
      await new Listr(
        [
          {
            title: 'enabled',
            enabled: async (): Promise<boolean> => Promise.resolve(true),
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run()

      expectProcessOutputToMatchSnapshot(output, 've1QT0lP54yGe3x0e6yPYfb2SVEDulCE')
    })
  })

  describe('should be disabled depending on the context', () => {
    it('with an context variable', async () => {
      await new Listr(
        [
          {
            title: 'pre-task',
            task: (ctx): void => {
              ctx.enable = false
            }
          },
          {
            title: 'disabled',
            enabled: (ctx): boolean => ctx.enable,
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test', concurrent: true }
      ).run()

      expectProcessOutputToMatchSnapshot(output, 'jbyappoYDm16wG6ARf5qOnS8CgSjhd7S')
    })

    it('with an injected context', async () => {
      const ctx = { enable: false }

      await new Listr(
        [
          {
            title: 'disabled',
            enabled: (ctx): boolean => ctx.enable,
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run(ctx)

      expectProcessOutputToMatchSnapshot(output, 'TkhbH3NQuuZN39gvRmwhH6iB6ZrNrxDX')
    })
  })
})
