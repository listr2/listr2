import { ListrEnvironmentVariables, ListrTaskState } from '@constants'
import type {
  ListrBaseClassOptions,
  ListrContext,
  ListrDefaultRendererValue,
  ListrError,
  ListrFallbackRendererValue,
  ListrGetRendererClassFromValue,
  ListrGetRendererOptions,
  ListrRenderer,
  ListrRendererFactory,
  ListrRendererValue,
  ListrTask
} from '@interfaces'
import { ListrEventManager, Task, TaskWrapper } from '@lib'
import { Concurrency, getRenderer } from '@utils'

/**
 * Creates a new set of Listr2 task list.
 */
export class Listr<Ctx = ListrContext, Renderer extends ListrRendererValue = ListrDefaultRendererValue, FallbackRenderer extends ListrRendererValue = ListrFallbackRendererValue> {
  public tasks: Task<Ctx, ListrGetRendererClassFromValue<Renderer>>[] = []
  public errors: ListrError<Ctx>[] = []
  public ctx: Ctx
  public events: ListrEventManager
  public path: string[] = []
  public rendererClass: ListrRendererFactory
  public rendererClassOptions: ListrGetRendererOptions<ListrRendererFactory>

  private concurrency: number
  private renderer: ListrRenderer

  constructor (
    public task: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[],
    public options?: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>,
    public parentTask?: Task<any, any>
  ) {
    // assign over default options
    this.options = {
      concurrent: false,
      renderer: 'default',
      fallbackRenderer: 'simple',
      exitOnError: true,
      exitAfterRollback: true,
      collectErrors: false,
      registerSignalListeners: true,
      ...this.parentTask?.options ?? {},
      ...options
    } as ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>

    // define parallel options
    if (this.options.concurrent === true) {
      this.concurrency = Infinity
    } else if (typeof this.options.concurrent === 'number') {
      this.concurrency = this.options.concurrent
    } else {
      this.concurrency = 1
    }

    // Update currentPath
    if (parentTask) {
      this.path = [ ...parentTask.listr.path, parentTask.title ]
      this.errors = parentTask.listr.errors
    }

    if (this.parentTask?.listr.events instanceof ListrEventManager) {
      this.events = this.parentTask.listr.events
    } else {
      this.events = new ListrEventManager()
    }

    // get renderer class
    const renderer = getRenderer({
      renderer: this.options.renderer,
      rendererOptions: this.options.rendererOptions,
      fallbackRenderer: this.options.fallbackRenderer,
      fallbackRendererOptions: this.options.fallbackRendererOptions,
      fallbackCondition: this.options?.rendererFallback,
      silentCondition: this.options?.rendererSilent
    })

    this.rendererClass = renderer.renderer
    this.rendererClassOptions = renderer.options

    // parse and add tasks
    /* istanbul ignore next */
    this.add(task ?? [])

    // Graceful interrupt for render cleanup
    /* istanbul ignore if */
    if (this.options.registerSignalListeners) {
      process
        .once('SIGINT', () => {
          this.tasks.forEach(async (task) => {
            if (task.isPending()) {
              task.state$ = ListrTaskState.FAILED
            }
          })

          this.renderer.end(new Error('Interrupted.'))

          process.exit(127)
        })
        .setMaxListeners(0)
    }

    // disable color programatically for CI purposes
    /* istanbul ignore next */
    if (this.options?.disableColor) {
      process.env[ListrEnvironmentVariables.DISABLE_COLOR] = '1'
    } else if (this.options?.forceColor) {
      process.env[ListrEnvironmentVariables.FORCE_COLOR] = '1'
    }

    /* istanbul ignore if */
    if (this.options?.forceTTY) {
      process.stdout.isTTY = true
      process.stderr.isTTY = true
    }

    /* istanbul ignore if */
    if (this.options?.forceUnicode) {
      process.env[ListrEnvironmentVariables.FORCE_UNICODE] = '1'
    }
  }

  public add (task: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]): void {
    const tasks = Array.isArray(task) ? task : [ task ]

    tasks.forEach((task): void => {
      this.tasks.push(new Task(this, task, this.options, { ...(this.rendererClassOptions as ListrGetRendererOptions<ListrGetRendererClassFromValue<Renderer>>), ...task.options }))
    })
  }

  public async run (context?: Ctx): Promise<Ctx> {
    // start the renderer
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions, this.events)
    }

    await this.renderer.render()

    // create a new context
    this.ctx = this.options?.ctx ?? context ?? ({} as Ctx)

    // check if the items are enabled
    await Promise.all(this.tasks.map((task) => task.check(this.ctx)))

    const concurrency = new Concurrency({ concurrency: this.concurrency })

    // run tasks
    try {
      await Promise.all(
        this.tasks.map(async (task) => {
          return concurrency.add(async () => {
            return this.runTask(task, this.ctx)
          })
        })
      )

      this.renderer.end()
    } catch (err: any) {
      if (this.options.exitOnError !== false) {
        this.renderer.end(err)

        // Do not exit when explicitly set to `false`
        throw err
      }
    }

    return this.ctx
  }

  private async runTask (task: Task<Ctx, ListrGetRendererClassFromValue<Renderer>>, context: Ctx): Promise<void> {
    if (!await task.check(this.ctx)) {
      return
    }

    return new TaskWrapper(task, this.options).run(context)
  }
}
