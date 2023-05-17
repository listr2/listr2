import { Listr } from './listr'
import type {
  ListrBaseClassOptions,
  ListrContext,
  ListrError,
  ListrGetRendererClassFromValue,
  ListrPrimaryRendererValue,
  ListrRendererValue,
  ListrSecondaryRendererValue,
  ListrSubClassOptions,
  ListrTask
} from '@interfaces'

/**
 * Creates a new Listr2 task manager.
 *
 * Useful for creating a single instance of Listr2 with pre-set settings.
 *
 * @see {@link https://listr2.kilic.dev/listr/manager.html}
 */
export class Manager<
  Ctx = ListrContext,
  Renderer extends ListrRendererValue = ListrPrimaryRendererValue,
  FallbackRenderer extends ListrRendererValue = ListrSecondaryRendererValue
> {
  public errors: ListrError[] = []
  public tasks: ListrTask<ListrContext, ListrGetRendererClassFromValue<Renderer>>[] = []

  constructor (public options?: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>) {}

  get ctx (): Ctx {
    return this.options.ctx
  }

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

    const tasks = [ ...this.tasks ]

    // clear out queues
    this.tasks = []

    const ctx = await this.run<InjectCtx>(tasks, options)

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

    // type function or directly
    if (typeof tasks === 'function') {
      return {
        ...taskOptions,
        task: (ctx): Listr<InjectCtx, Renderer, FallbackRenderer> => this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks(ctx), options)
      }
    }

    return {
      ...taskOptions,
      task: (): Listr<InjectCtx, Renderer, FallbackRenderer> => this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks, options)
    }
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
    this.errors.push(...task.errors)

    return ctx
  }
}
