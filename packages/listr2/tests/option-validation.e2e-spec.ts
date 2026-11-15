import type { ListrTask } from '#root'
import { Listr, ListrLogger, ProcessOutput, delay } from '#root'
import { VirtualTerminal } from '#tests/utils'

describe('option validation', () => {
  let order: string[]

  const tasks = (): ListrTask[] => [
    {
      title: 'first',
      task: async(): Promise<void> => {
        order.push('first')
        await delay(10)
      }
    },
    {
      title: 'second',
      task: async(): Promise<void> => {
        order.push('second')
      }
    }
  ]

  beforeEach(() => {
    order = []
  })

  describe('concurrent', () => {
    it.each([0, -1, NaN])('should throw when a list is created with concurrent: %s', (concurrent) => {
      expect(() => new Listr(tasks(), { concurrent, renderer: 'silent' })).toThrow(
        new RangeError(`The concurrent option must be true, false or a number greater than 0, but it is ${concurrent}.`)
      )
    })

    it.each([0, -1, NaN])('should fail the parent when a subtask list is created with concurrent: %s', { timeout: 2000 }, async(concurrent) => {
      const run = new Listr([{ title: 'parent', task: (_, task): Listr => task.newListr(tasks(), { concurrent }) }], { renderer: 'silent' }).run()

      await expect(run).rejects.toThrow(RangeError)
      expect(order).toEqual([])
    })

    it.each([true, false, Infinity, 0.5, 1, 1.5, 2])('should still run the tasks with concurrent: %s', { timeout: 2000 }, async(concurrent) => {
      await new Listr(tasks(), { concurrent, renderer: 'silent' }).run()

      expect(order).toEqual(['first', 'second'])
    })
  })

  describe('retry', () => {
    it.each([
      ['retry', 1.5],
      ['retry', 0.5],
      ['retry.tries', 1.5]
    ])('should throw when a task is created with %s: %s', (name, tries) => {
      const retry = name === 'retry' ? tries : { tries }

      expect(
        () =>
          new Listr(
            [
              {
                title: 'task',
                retry,
                task: async(): Promise<void> => {}
              }
            ],
            { renderer: 'silent' }
          )
      ).toThrow(new RangeError(`The ${name} option must be a whole number, but it is ${tries}.`))
    })

    it.each([0, -1, NaN, 2, { tries: 1 }, { tries: -1 }])('should still retry a failing task with retry: %j', async(retry) => {
      const tries = Math.max(typeof retry === 'number' ? retry : retry.tries, 0) || 0

      await expect(
        new Listr(
          [
            {
              title: 'task',
              retry,
              task: async(): Promise<void> => {
                order.push('try')

                throw new Error('fails')
              }
            }
          ],
          { renderer: 'silent' }
        ).run()
      ).rejects.toThrow('fails')

      expect(order).toHaveLength(tries + 1)
    })
  })

  describe('default renderer', () => {
    let vt: VirtualTerminal

    const options = (rendererOptions?: Record<string, unknown>): any => ({
      renderer: 'default',
      rendererOptions: {
        lazy: true,
        logger: new ListrLogger({ useIcons: true, processOutput: new ProcessOutput(vt as any, vt as any) }),
        ...rendererOptions
      }
    })

    beforeEach(() => {
      vt = new VirtualTerminal({ columns: 80, rows: 10 })
    })

    afterEach(() => {
      vt.dispose()
    })

    it.each([
      ['indentation', -1, 'must be a number of 0 or more, but it is -1'],
      ['indentation', NaN, 'must be a number of 0 or more, but it is NaN'],
      ['formatOutput', 'cut', 'must be \'truncate\' or \'wrap\', but it is \'cut\''],
      ['outputBar', -1, 'must be a boolean or a number of 0 or more, but it is -1'],
      ['bottomBar', NaN, 'must be a boolean or a number of 0 or more, but it is NaN']
    ])('should throw when a list is created with %s: %s', (name, value, message) => {
      expect(() => new Listr(tasks(), options({ [name]: value }))).toThrow(new RangeError(`The ${name} option ${message}.`))
      expect(vt.writes).toEqual([])
    })

    it.each([
      ['outputBar', -1],
      ['bottomBar', NaN]
    ])('should throw when a task is created with %s: %s', (name, value) => {
      expect(
        () =>
          new Listr(
            [
              {
                title: 'task',
                task: (): void => {},
                rendererOptions: { [name]: value }
              }
            ],
            options()
          )
      ).toThrow(RangeError)
    })

    it('should still render with the edge values that are valid', { timeout: 2000 }, async() => {
      await new Listr(
        [
          {
            title: 'first',
            task: (_, task): void => {
              order.push('first')
              task.output = 'out'
            },
            rendererOptions: {
              outputBar: 0,
              bottomBar: Infinity,
              persistentOutput: true
            }
          },
          {
            title: 'second',
            task: (): void => {
              order.push('second')
            }
          }
        ],
        options({ indentation: 0, formatOutput: 'truncate' })
      ).run()

      expect(order).toEqual(['first', 'second'])
      expect(await vt.content()).toContain('✔ second')
    })
  })
})
