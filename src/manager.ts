import { ListrContext, ListrOptions, ListrTask } from './interfaces/listr.interface'
import { ManagerOptions } from './interfaces/manager.interface'
import { Listr } from './listr'

export class Manager <InjectCtx = ListrContext> {
  // tasks
  private tasks: ListrTask[] = []

  constructor (private options?: ManagerOptions, private listrOptions?: ListrOptions<InjectCtx>) {}

  public add <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[]): void {
    this.tasks = [...this.tasks, ...tasks]
  }

  public injectOptions <Ctx = InjectCtx> (options?: ManagerOptions, ListrOptions?: ListrOptions<Ctx>): void {
    if (options) {
      this.options = options
    }
    if (this.listrOptions) {
      this.listrOptions = ListrOptions as InjectCtx
    }
  }

  public async runAll <Ctx> (options?: ListrOptions<Ctx> & { showRunTime?: boolean }): Promise<Ctx> {
    const pipetime: number = Date.now()

    options = Object.assign({ showRuntime: true }, options)

    const { showRunTime, ...listrOptions } = options

    const allOptions = Object.assign(this.options || {}, listrOptions)

    return new Listr<Ctx>([{
      enabled: (): boolean => this.tasks.length > 0,
      task: (): Listr<Ctx> => {
        return new Listr<Ctx>(this.tasks, listrOptions )
      }
    },
    {
      enabled: (): boolean => showRunTime && (this.tasks.length > 0),
      task: (ctx, task): void => { task.title = `Parallel tasks are finished in ${this.getRuntime(pipetime)}.` }
    }], allOptions).run()
  }

  public newListr <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx> {
    return new Listr(tasks, options)
  }

  public run <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Promise<Ctx> {
    return this.newListr(tasks, options).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
