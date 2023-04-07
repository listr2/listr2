import { color, Listr, ListrDefaultRendererLogLevels } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.output = 'Some data output.'
      },
      options: { persistentOutput: true }
    }
  ],
  {
    rendererOptions: {
      icon: {
        [ListrDefaultRendererLogLevels.COMPLETED]: 'hey completed!'
      },
      color: {
        [ListrDefaultRendererLogLevels.COMPLETED]: (data): string => color.bgGreen(color.black(data)),
        [ListrDefaultRendererLogLevels.OUTPUT]: color.cyan
      }
    }
  }
)

await tasks.run()
