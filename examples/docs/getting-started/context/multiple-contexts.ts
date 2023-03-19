import { Listr } from 'listr2'

interface Ctx {
  subtask?: boolean
}

interface SubtaskCtx {
  operation?: boolean
}

const subtaskContext: SubtaskCtx = {}

const tasks = new Listr<Ctx>(
  [
    {
      task: (ctx, task): Listr =>
        task.newListr<SubtaskCtx>(
          [
            {
              title: 'This is a subtask.',
              task: async (subCtx, task): Promise<void> => {
                subCtx.operation = true
              }
            },

            {
              title: 'This is a subtask.',
              skip: (subCtx) => !subCtx.operation,
              task: async (subCtx, task): Promise<void> => {
                ctx.subtask = true
              }
            }
          ],
          { ctx: subtaskContext }
        )
    }
  ],
  {}
)

const ctx = await tasks.run()
