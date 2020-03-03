import { ListrContext, ListrOptions, ListrTask } from './interfaces/listr.interface'
import { ManagerOptions, ManagerInjectOptions } from './interfaces/manager.interface'
import { Listr } from './listr'

export class Manager <InjectCtx = ListrContext> {
  // tasks
  private initially: ListrTask[] = []
  private initialOptions: Exclude<ListrOptions<InjectCtx>, {concurrent}>
  private tasks: ListrTask[] = []
  private parallelOptions: Exclude<ListrOptions<InjectCtx>, {concurrent}>
  private finally: ListrTask[] = []
  private finalOptions: Exclude<ListrOptions<InjectCtx>, {concurrent}>

  constructor (private options?: ManagerOptions) {
    this.options = Object.assign({ showRunTime: true }, this.options)
  }

  public addInitial <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[]): void {
    this.initially = [...this.initially, ...tasks]
  }

  public add <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[]): void {
    this.tasks = [...this.tasks, ...tasks]
  }

  public addFinal <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[]): void {
    this.finally = [...this.finally, ...tasks]
  }

  public injectOptions (options: ManagerInjectOptions): void {
    if (options?.initial) {
      this.initialOptions = options.initial
    }
    if (options?.parallel) {
      this.parallelOptions = options.parallel
    }
    if (options?.final) {
      this.finalOptions = options.final
    }
  }

  public async runAll <Ctx = InjectCtx> (options?: Exclude<ListrOptions, {concurrent}>): Promise<Ctx> {
    let pipetime: number

    // run tasks in listr again, share context?
    const managerTasks: ListrTask<Ctx>[] = [
      {
        enabled: (): boolean => this.initially.length > 0,
        task: (): Listr<Ctx> => new Listr<Ctx>(this.initially, this.initialOptions)
      },
      {
        enabled: (): boolean => this.tasks.length > 0,
        task: (): Listr<Ctx> => {
          pipetime = Date.now()
          return new Listr<Ctx>(this.tasks, { concurrent: true, ...this.parallelOptions })
        }
      },
      {
        enabled: (): boolean => this.options?.showRunTime && (this.tasks.length > 0),
        task: (ctx, task): void => { task.title = `Parallel tasks are finished in ${this.getRuntime(pipetime)}.` }
      },
      {
        enabled: (): boolean => this.finally.length > 0,
        task: (): Listr<Ctx> => new Listr<Ctx>(this.finally, this.finalOptions)
      },
      {
        task: (): void => {
          this.initially = []
          this.initialOptions = {}
          this.tasks = []
          this.parallelOptions = {}
          this.finally = []
          this.finalOptions = {}
        }
      }
    ]

    Object.assign(options || {}, { concurrent: false })

    return this.run<Ctx>(managerTasks, options)
  }

  public run <Ctx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Promise<Ctx> {
    return new Listr(tasks, options).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
