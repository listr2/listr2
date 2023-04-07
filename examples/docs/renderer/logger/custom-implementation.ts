import type { ListrLogLevels, LoggerFormat } from 'listr2'
import { Listr, ListrLogger, PRESET_TIMESTAMP, color } from 'listr2'

class MyLogger extends ListrLogger<ListrLogLevels> {
  constructor (useIcons: boolean) {
    super({ useIcons, fields: { suffix: [ { field: 'task', format: (): LoggerFormat => color.magenta } ] } })
  }

  public wrap (message: string, options?: { format?: LoggerFormat }): string {
    message = `|${message}|`

    if (options?.format) {
      return options.format(message)
    }

    return message
  }
}

const tasks = new Listr(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {}
    },

    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {}
    },

    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {}
    }
  ],
  {
    concurrent: true,
    renderer: 'simple',
    rendererOptions: {
      timestamp: PRESET_TIMESTAMP,
      logger: new MyLogger(false)
    }
  }
)

await tasks.run()
