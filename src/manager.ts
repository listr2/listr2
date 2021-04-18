import { Listr } from './listr'
import { ListrError } from '@interfaces/listr-error.interface'
import { ListrBaseClassOptions, ListrContext, ListrSubClassOptions, ListrTask } from '@interfaces/listr.interface'
import { ListrGetRendererClassFromValue, ListrRendererValue } from '@interfaces/renderer.interface'

/**
 * Creates a new Listr2 task manager.
 *
 * Useful for creating a single instace of Listr2 with pre-set settings.
 */
export class Manager<Ctx = ListrContext, Renderer extends ListrRendererValue = 'default', FallbackRenderer extends ListrRendererValue = 'verbose'> {
  public err: ListrError[] = []
  private tasks: ListrTask<ListrContext, ListrGetRendererClassFromValue<Renderer>>[] = []

  constructor (public options: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer> = {}) {}

  set ctx (ctx: Ctx) {
    this.options.ctx = ctx
  }

  public add<InjectCtx = Ctx>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[] | ((ctx?: InjectCtx) => ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[]),
    options?: ListrSubClassOptions<InjectCtx, Renderer>
  ): void {
    options = { ...this.options, ...options } as ListrSubClassOptions<InjectCtx, Renderer>

    this.tasks = [ ...this.tasks, this.indent<InjectCtx>(tasks, options) ]
  }

  public async runAll<InjectCtx = Ctx>(options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>): Promise<InjectCtx> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    const ctx = await this.run<InjectCtx>(this.tasks, options)

    // clear out queues
    this.tasks = []

    return ctx
  }

  public newListr<InjectCtx, InjectRenderer extends ListrRendererValue = Renderer, InjectFallbackRenderer extends ListrRendererValue = FallbackRenderer>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<InjectRenderer>>[],
    options?: ListrBaseClassOptions<InjectCtx, InjectRenderer, InjectFallbackRenderer>
  ): Listr<InjectCtx, InjectRenderer, InjectFallbackRenderer> {
    return new Listr<InjectCtx, InjectRenderer, InjectFallbackRenderer>(tasks, options)
  }

  public indent<InjectCtx = Ctx>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[] | ((ctx?: InjectCtx) => ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[]),
    options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>,
    taskOptions?: Omit<ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>, 'task'>
  ): ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    let newTask: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>
    // type function or directly
    if (typeof tasks === 'function') {
      newTask = {
        ...taskOptions,
        task: (ctx): Listr<InjectCtx, Renderer, FallbackRenderer> => this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks(ctx), options)
      }
    } else {
      newTask = {
        ...taskOptions,
        task: (): Listr<InjectCtx, Renderer, FallbackRenderer> => this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks, options)
      }
    }

    return newTask
  }

  public async run<InjectCtx = Ctx>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[],
    options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>
  ): Promise<InjectCtx> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    // create task
    const task = this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks, options)
    // run task
    const ctx = await task.run()

    // reset error queue
    this.err = []

    // add errors to manager
    this.err = [ ...this.err, ...task.err ]

    return ctx
  }

  // general utils
  /* istanbul ignore next */
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
