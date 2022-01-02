import pMap from 'p-map'
import { Subject } from 'rxjs'

import { ListrTaskState } from '@constants/state.constants'
import { ListrError } from '@interfaces/listr-error.interface'
import { ListrBaseClassOptions, ListrContext, ListrTask } from '@interfaces/listr.interface'
import {
  ListrDefaultRendererValue,
  ListrFallbackRendererValue,
  ListrGetRendererClassFromValue,
  ListrGetRendererOptions,
  ListrRenderer,
  ListrRendererFactory,
  ListrRendererValue
} from '@interfaces/renderer.interface'
import { Task } from '@lib/task'
import { TaskWrapper } from '@lib/task-wrapper'
import { getRenderer } from '@utils/renderer'

/**
 * Creates a new set of Listr2 task list.
 */
export class Listr<Ctx = ListrContext, Renderer extends ListrRendererValue = ListrDefaultRendererValue, FallbackRenderer extends ListrRendererValue = ListrFallbackRendererValue> {
  public tasks: Task<Ctx, ListrGetRendererClassFromValue<Renderer>>[] = []
  public err: ListrError<Ctx>[] = []
  public ctx: Ctx
  public rendererClass: ListrRendererFactory
  public rendererClassOptions: ListrGetRendererOptions<ListrRendererFactory>
  public renderHook$: Task<any, any>['renderHook$'] = new Subject()
  private concurrency: number
  private renderer: ListrRenderer

  constructor (
    public task: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> | ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[],
    public options?: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>
  ) {
    // assign over default options
    this.options = {
      ...{
        concurrent: false,
        renderer: 'default',
        nonTTYRenderer: 'verbose',
        exitOnError: true,
        exitAfterRollback: true,
        registerSignalListeners: true
      },
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

    // get renderer class
    const renderer = getRenderer(this.options.renderer, this.options.nonTTYRenderer, this.options?.rendererFallback, this.options?.rendererSilent)
    this.rendererClass = renderer.renderer

    // depending on the result pass the given options in
    if (!renderer.nonTTY) {
      this.rendererClassOptions = this.options.rendererOptions
    } else {
      this.rendererClassOptions = this.options.nonTTYRendererOptions
    }

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
    /* istanbul ignore if */
    if (this.options?.disableColor) {
      process.env.LISTR_DISABLE_COLOR = '1'
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
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions, this.renderHook$)
    }

    this.renderer.render()

    // create a new context
    this.ctx = this.options?.ctx ?? context ?? ({} as Ctx)

    // check if the items are enabled
    await this.checkAll(this.ctx)

    // run tasks
    try {
      await pMap(
        this.tasks,
        async (task): Promise<void> => {
          // check this item is enabled, conditions may change depending on context
          await task.check(this.ctx)

          return this.runTask(task, this.ctx, this.err)
        },
        { concurrency: this.concurrency }
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

  private checkAll (context: any): Promise<void[]> {
    return Promise.all(this.tasks.map((task) => task.check(context)))
  }

  private runTask (task: Task<Ctx, ListrGetRendererClassFromValue<Renderer>>, context: Ctx, errors: ListrError<Ctx>[]): Promise<void> {
    if (!task.isEnabled()) {
      return Promise.resolve()
    }

    return new TaskWrapper(task, errors, this.options).run(context)
  }
}
