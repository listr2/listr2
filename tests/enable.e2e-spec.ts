import { Listr } from '@root/index'

describe('enable with context', () => {
  let log: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    log = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('should not run a disabled task', () => {
    it('with a function returning boolean', async () => {
      await new Listr(
        [
          {
            title: 'disabled',
            enabled: (): boolean => false,
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'verbose' }
      ).run()

      expect(log).toBeCalledTimes(1)
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
        { renderer: 'verbose' }
      ).run()

      expect(log).toBeCalledTimes(0)
    })
  })

  describe('should run with enabled task', () => {
    it('with a function returning boolean', async () => {
      await new Listr(
        [
          {
            title: 'enabled',
            enabled: (): boolean => true,
            task: (): Promise<void> => Promise.resolve()
          }
        ],
        { renderer: 'verbose' }
      ).run()

      expect(log).toBeCalledTimes(2)
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
        { renderer: 'verbose' }
      ).run()

      expect(log).toBeCalledTimes(2)
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
        { renderer: 'verbose', concurrent: true }
      ).run()

      expect(log).toBeCalledTimes(2)
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
        { renderer: 'verbose' }
      ).run(ctx)

      expect(log).toBeCalledTimes(0)
    })
  })
})
