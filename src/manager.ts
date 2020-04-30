import { Listr } from './listr'
import { ListrContext, ListrOptions, ListrTask } from '@interfaces/listr.interface'

export class Manager <InjectCtx = ListrContext> {
  // tasks
  public options: ListrOptions<InjectCtx>
  private tasks: ListrTask[] = []

  constructor (options?: ListrOptions<InjectCtx>) {
    this.options = Object.assign({ showSubtasks: true, collapse: false }, options)
  }

  set ctx (ctx: InjectCtx) {
    this.options.ctx = ctx
  }

  public add <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[] | ((ctx?: Ctx) => ListrTask<Ctx>[]), options?: ListrOptions<Ctx>): void {
    options = { ...this.options, ...options } as ListrOptions<Ctx>

    this.tasks = [ ...this.tasks, this.indent(tasks, options) ]
  }

  public async runAll <Ctx = InjectCtx> (options?: ListrOptions<Ctx>): Promise<Ctx> {
    options = { ...this.options, ...options } as ListrOptions<Ctx>

    const ctx = await this.run<Ctx>(this.tasks, options)
    this.tasks = []
    return ctx
  }

  public newListr <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx> {
    return new Listr<Ctx>(tasks, options)
  }

  public indent <Ctx = InjectCtx>
  (tasks: ListrTask<Ctx>[] | ((ctx?: Ctx) => ListrTask<Ctx>[]), options?: ListrOptions<Ctx>, taskOptions?: Omit<ListrTask, 'task'>): ListrTask<Ctx> {
    options = { ...this.options, ...options } as ListrOptions<Ctx>

    let newTask: ListrTask<Ctx>
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

  public run <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Promise<Ctx> {
    options = { ...this.options, ...options } as ListrOptions<Ctx>

    return this.newListr<Ctx>(tasks, options).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
