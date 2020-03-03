import { ListrContext, ListrOptions, ListrTask } from './interfaces/listr.interface'
import { ManagerOptions } from './interfaces/manager.interface'
import { Listr } from './listr'

export class Manager <InjectCtx = ListrContext> {
  // tasks
  private tasks: ListrTask[] = []
  private showRunTime: boolean

  constructor (private options?: ManagerOptions) {
    this.injectOptions<InjectCtx>(options)
  }

  public add <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[]): void {
    this.tasks = [...this.tasks, ...tasks]
  }

  public injectOptions <Ctx = InjectCtx> (options?: ManagerOptions<Ctx>): void {
    options = Object.assign({ showRunTime: true }, options )
    const { showRunTime, ...listrOptions } = options
    this.showRunTime = showRunTime
    this.options = listrOptions
  }

  public async runAll <Ctx> (options?: ManagerOptions): Promise<Ctx> {
    const ctx = await this.run<Ctx>(this.tasks, options)
    this.tasks = []
    return ctx
  }

  public newListr <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx> {
    return new Listr<Ctx>(tasks, options)
  }

  public run <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ManagerOptions): Promise<Ctx> {
    const pipetime: number = Date.now()

    options = Object.assign({ showRunTime: this.showRunTime }, options)

    const { showRunTime, ...listrOptions } = options

    const allOptions = Object.assign(this.options || {}, listrOptions)

    return this.newListr<Ctx>([
      {
        enabled: (): boolean => tasks.length > 0,
        task: (): Listr<Ctx> => {
          return new Listr<Ctx>(tasks, listrOptions )
        }
      },
      {
        enabled: (): boolean => showRunTime && (tasks.length > 0),
        task: (ctx, task): void => { task.title = `Tasks are finished in ${this.getRuntime(pipetime)}.` }
      }
    ], allOptions).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
