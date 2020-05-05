import pMap from 'p-map'

import { stateConstants } from '@constants/state.constants'
import {
  ListrGetRendererOptions,
  ListrGetRendererClassFromValue,
  ListrDefaultRendererValue,
  ListrFallbackRendererValue,
  ListrBaseClassOptions,
  ListrClass,
  ListrContext,
  ListrError,
  ListrRenderer,
  ListrRendererFactory,
  ListrRendererValue,
  ListrTask
} from '@interfaces/listr.interface'
import { Task } from '@lib/task'
import { TaskWrapper } from '@lib/task-wrapper'
import { getRenderer } from '@utils/renderer'

export class Listr
<Ctx = ListrContext, Renderer extends ListrRendererValue = ListrDefaultRendererValue, FallbackRenderer extends ListrRendererValue = ListrFallbackRendererValue>
implements ListrClass<Ctx, Renderer, FallbackRenderer> {
  public tasks: Task<Ctx, ListrGetRendererClassFromValue<Renderer>>[] = []
  public err: ListrError[] = []
  public rendererClass: ListrRendererFactory
  public rendererClassOptions: ListrGetRendererOptions<ListrRendererFactory>
  private concurrency: number
  private renderer: ListrRenderer

  constructor (
    public task: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[],
    public options?: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>
  ) {
    // assign over default options
    this.options = Object.assign({
      showSubtasks: true,
      concurrent: false,
      renderer: 'default',
      nonTTYRenderer: 'verbose',
      exitOnError: true,
      collapse: true,
      collapseSkips: true,
      clearOutput: false,
      registerSignalListeners: true
    }, options)

    // define parallel options
    this.concurrency = 1
    if (this.options.concurrent === true) {
      this.concurrency = Infinity
    } else if (typeof this.options.concurrent === 'number') {
      this.concurrency = this.options.concurrent
    }

    // get renderer class
    const renderer = getRenderer(this.options.renderer, this.options.nonTTYRenderer)
    this.rendererClass = renderer.renderer

    // depending on the result pass the given options in
    if (!renderer.nonTTY) {
      this.rendererClassOptions = this.options.rendererOptions
    } else {
      this.rendererClassOptions = this.options.nonTTYRendererOptions
    }

    // parse and add tasks
    this.add(task || [])

    // Graceful interrupt for render cleanup
    if (this.options.registerSignalListeners === true) {

      process.on('SIGINT', async () => {
        await Promise.all(this.tasks.map(async (task) => {
          if (task.isPending()) {
            task.state$ = stateConstants.FAILED
          }
        }))
        this.renderer.end(new Error('Interrupted.'))
        process.exit(127)
      }).setMaxListeners(0)

    }
  }

  public add (task: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]): void {
    const tasks = Array.isArray(task) ? task : [ task ]

    tasks.forEach((task): void => {
      this.tasks.push(new Task(
        this,
        task,
        this.options,
        { ...this.rendererClassOptions as ListrGetRendererOptions<ListrGetRendererClassFromValue<Renderer>>, ...task.options })
      )
    })
  }

  public async run (context?: Ctx): Promise<Ctx> {

    // start the renderer
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions)
    }

    this.renderer.render()

    // create a new context
    context = context || this.options?.ctx || Object.create({})

    // create new error queue
    const errors = []

    // check if the items are enabled
    await this.checkAll(context)

    // run tasks
    try {
      await pMap(this.tasks, async (task): Promise<void> => {
        await this.checkAll(context)

        return this.runTask(task, context, errors)
      }, { concurrency: this.concurrency })

      if (errors.length > 0) {
        const err = new ListrError('Something went wrong')
        err.errors = errors
        throw err
      }

      this.renderer.end()

    } catch (error) {
      error.context = context
      this.renderer.end(error)

      if (this.options.exitOnError !== false) {
        // Do not exit when explicitely set to `false`
        throw error
      }
    }
    return context
  }

  private checkAll (context): Promise<void[]> {
    return Promise.all(this.tasks.map((task) => {
      task.check(context)
    }))
  }

  private runTask (task: Task<Ctx, ListrGetRendererClassFromValue<Renderer>>, context: Ctx, errors: ListrError[]): Promise<void> {
    if (!task.isEnabled()) {
      return Promise.resolve()
    }

    return new TaskWrapper(task, errors).run(context)
  }

}
