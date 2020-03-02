import { ListrContext, ListrTask, ListrOptions } from './listr.interface'

export declare class ManagerClass<Ctx = ListrContext> {
  private initially: ListrTask[]
  private tasks: ListrTask[]
  private finally: ListrTask[]
  constructor(options?: ManagerOptions)
  addInitial<Ctx>(tasks: ListrTask<Ctx>[]): void
  add<Ctx>(tasks: ListrTask<Ctx>[]): void
  addFinal<Ctx>(tasks: ListrTask<Ctx>[]): void
  runAll<Ctx>(options?: Exclude<ListrOptions, {concurrent}>): Promise<Ctx>
  run<Ctx>(tasks: ListrTask<Ctx>[], options?: ListrOptions): Promise<Ctx>
  getRunTime (pipetime: number): string
}

export interface ManagerOptions {
  showRunTime?: boolean
}