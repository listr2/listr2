import { Listr } from '#root'
import type { MockProcessOutput } from '#tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '#tests/utils'

describe('enable with context', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
  })

  describe('should be disabled', () => {
    it('with a function returning boolean', async() => {
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

      await expectProcessOutputToMatchSnapshot(output)
    })

    it('with async function returning boolean', async() => {
      await new Listr(
        [
          {
            title: 'disabled',
            enabled: async(): Promise<boolean> => Promise.resolve(false),
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run()

      await expectProcessOutputToMatchSnapshot(output)
    })
  })

  describe('should be enabled', () => {
    it('with a function returning boolean', async() => {
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

      await expectProcessOutputToMatchSnapshot(output)
    })

    it('with async function returning boolean', async() => {
      await new Listr(
        [
          {
            title: 'enabled',
            enabled: async(): Promise<boolean> => Promise.resolve(true),
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'test' }
      ).run()

      await expectProcessOutputToMatchSnapshot(output)
    })
  })

  describe('should be disabled depending on the context', () => {
    it('with an context variable', async() => {
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

      await expectProcessOutputToMatchSnapshot(output)
    })

    it('with an injected context', async() => {
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

      await expectProcessOutputToMatchSnapshot(output)
    })
  })
})
