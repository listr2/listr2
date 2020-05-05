import { ListrGetRendererClassFromValue } from './interfaces/listr.interface'
import { Listr } from './listr'
import { ListrContext, ListrOptions, ListrTask, ListrBaseClassOptions, ListrRendererValue, ListrSubClassOptions } from '@interfaces/listr.interface'

export class Manager <InjectCtx = ListrContext, Renderer extends ListrRendererValue = 'default', FallbackRenderer extends ListrRendererValue = 'verbose'> {
  private tasks: ListrTask<ListrContext, ListrGetRendererClassFromValue<Renderer>>[] = []

  constructor (public options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>) { }

  set ctx (ctx: InjectCtx) {
    this.options.ctx = ctx
  }

  public add <Ctx = InjectCtx>(
    tasks: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[] |
    ((ctx?: Ctx) => ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]),
    options?: ListrSubClassOptions<Ctx, Renderer>
  ): void {
    options = { ...this.options, ...options } as ListrSubClassOptions<Ctx, Renderer>

    this.tasks = [ ...this.tasks, this.indent<Ctx>(tasks, options) ]
  }

  public async runAll (options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>): Promise<InjectCtx> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    const ctx = await this.run<InjectCtx>(this.tasks, options)
    this.tasks = []
    return ctx
  }

  public newListr <Ctx = InjectCtx> (tasks: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[], options?: ListrBaseClassOptions<Ctx>): Listr<Ctx, any> {
    return new Listr<Ctx, any>(tasks, options)
  }

  public indent <Ctx = InjectCtx>
  (
    tasks: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[] |
    ((ctx?: Ctx) => ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>[]),
    options?: ListrOptions<Ctx>,
    taskOptions?: Omit<ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>, 'task'>): ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>> {
    options = { ...this.options, ...options } as ListrOptions<Ctx>

    let newTask: ListrTask<Ctx, ListrGetRendererClassFromValue<Renderer>>
    // type function or directly
    if (typeof tasks === 'function') {
      newTask = {
        ...taskOptions,
        task: (ctx): Listr<Ctx> => this.newListr<Ctx>(tasks(ctx), options)
      }
    } else {
      newTask = {
        ...taskOptions,
        task: (): Listr<Ctx> => this.newListr<Ctx>(tasks, options)
      }
    }

    return newTask
  }

  public run <Ctx = InjectCtx> (tasks: ListrTask<Ctx, any>[], options?: ListrBaseClassOptions<Ctx, any, any>): Promise<Ctx> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<Ctx, any, any>

    return this.newListr<Ctx>(tasks, options).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
