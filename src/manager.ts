import { ListrContext, ListrOptions, ListrTask } from './interfaces/listr.interface'
import { Listr } from './listr'

export class Manager <InjectCtx = ListrContext> {
  // tasks
  private tasks: ListrTask[] = []

  public add <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): void {
    this.tasks = [...this.tasks, this.indent(tasks, options)]
  }

  public async runAll <Ctx = InjectCtx> (options?: ListrOptions<Ctx>): Promise<Ctx> {
    const ctx = await this.run<Ctx>(this.tasks, options)
    this.tasks = []
    return ctx
  }

  public newListr <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx> {
    return new Listr<Ctx>(tasks, options)
  }

  public indent <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): ListrTask<Ctx> {
    const newTask: ListrTask<Ctx> = {
      task: (): Listr<Ctx> => this.newListr<Ctx>(tasks,options)
    }

    return newTask
  }

  public run <Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Promise<Ctx> {
    return this.newListr<Ctx>(tasks, options).run()
  }

  // general utils
  public getRuntime (pipetime: number): string {
    return `${Math.round(Date.now() - pipetime) / 1000}s`
  }
}
