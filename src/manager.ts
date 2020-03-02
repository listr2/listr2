import { ListrContext, ListrOptions, ListrTask } from './interfaces/listr.interface'
import { ManagerOptions } from './interfaces/manager.interface'
import { Listr } from './listr'

export class Manager <InjectCtx = ListrContext> {
  // tasks
  private initially: ListrTask[] = []
  private tasks: ListrTask[] = []
  private finally: ListrTask[] = []

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

  public async runAll <Ctx = InjectCtx> (options?: Exclude<ListrOptions, {concurrent}>): Promise<Ctx> {
    let pipetime: number

    // run tasks in listr again, share context?
    const managerTasks: ListrTask<Ctx>[] = [
      {
        enabled: (): boolean => this.initially.length > 0,
        task: (): Listr<Ctx> => new Listr<Ctx>(this.initially)
      },
      {
        enabled: (): boolean => this.tasks.length > 0,
        task: (): Listr<Ctx> => {
          pipetime = Date.now()
          return new Listr<Ctx>(this.tasks, { concurrent: true })
        }
      },
      {
        enabled: (): boolean => this.options?.showRunTime && (this.initially.length > 0 || this.tasks.length > 0 || this.finally.length > 0),
        task: (ctx, task): void => { task.title = `Parallel tasks are finished in ${this.getRuntime(pipetime)}.` }
      },
      {
        enabled: (): boolean => this.finally.length > 0,
        task: (): Listr<Ctx> => new Listr<Ctx>(this.finally)
      },
      {
        task: (): void => {
          this.initially = []
          this.tasks = []
          this.finally = []
        }
      }
    ]

    Object.assign(options || {}, { concurrent: false })

    return this.run<Ctx>(managerTasks, options)
  }

  public run <Ctx> (tasks: ListrTask<Ctx>[], options?: ListrOptions): Promise<Ctx> {
    return new Listr(tasks, options).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
