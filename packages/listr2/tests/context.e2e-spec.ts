import { Listr } from '@root'

describe('show inject context', () => {
  it('should return the context', async() => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'This is a subtask.',
                task: async(): Promise<void> => {}
              }
            ])
        }
      ],
      {
        concurrent: false,
        renderer: 'silent',
        ctx: { test: true }
      }
    ).run()

    expect(ctx).toMatchInlineSnapshot(`
      {
        "test": true,
      }
    `)
  })

  it('should inject ctx to subtask', async() => {
    const ctx = await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (_, task): Listr =>
            task.newListr([
              {
                title: 'This is a subtask.',
                skip: (ctx): boolean => ctx.skip,
                task: async(): Promise<void> => {}
              }
            ])
        }
      ],
      {
        concurrent: false,
        renderer: 'silent',
        ctx: { skip: true }
      }
    ).run()

    expect(ctx).toMatchInlineSnapshot(`
      {
        "skip": true,
      }
    `)
  })
})
