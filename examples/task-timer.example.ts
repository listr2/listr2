import { delay, Listr, PRESET_TIMER, ListrLogger, ListrLogLevels } from 'listr2'

const logger = new ListrLogger({ useIcons: false })

let task: Listr<any>

logger.log(ListrLogLevels.STARTED, 'Example for showing the timer per task.')

task = new Listr<any>(
  [
    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(1000)
      },
      rendererOptions: {
        timer: PRESET_TIMER
      }
    },

    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(1000)
      },
      rendererOptions: {
        timer: PRESET_TIMER
      }
    }
  ],
  { concurrent: false }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch(e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

logger.log(ListrLogLevels.STARTED, 'Example for showing the timer per listr.')

task = new Listr<any>(
  [
    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(500)
      }
    },

    {
      title: 'This task will execute.',
      task: async(_, task): Promise<void> => {
        task.title = 'Changing task title.'
        await delay(200)
      }
    }
  ],
  { concurrent: false, rendererOptions: { timer: PRESET_TIMER } }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch(e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

logger.log(ListrLogLevels.STARTED, 'Example for showing the timer per listr in verbose renderer when on fallback.')

task = new Listr<any>(
  [
    {
      title: 'This task will execute.',
      task: async(): Promise<void> => {
        await delay(500)
      }
    },

    {
      title: 'This task will execute.',
      task: async(_, task): Promise<void> => {
        task.title = 'Changing task title.'
        await delay(200)
      }
    }
  ],
  {
    concurrent: false,
    rendererOptions: { timer: PRESET_TIMER },
    fallbackRendererCondition: true,
    fallbackRendererOptions: { timer: PRESET_TIMER }
  }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, ['ctx: %o', context])
} catch(e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}
