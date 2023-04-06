import { color, Listr, ListrDefaultRendererListrLogLevels } from 'listr2'

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
      loggerOptions: {
        style: {
          icon: {
            [ListrDefaultRendererListrLogLevels.COMPLETED]: 'hey completed!'
          },
          color: {
            [ListrDefaultRendererListrLogLevels.COMPLETED]: (data): string => color.bgGreen(color.black(data)),
            [ListrDefaultRendererListrLogLevels.OUTPUT]: color.cyan
          }
        }
      }
    }
  }
)

await tasks.run()
