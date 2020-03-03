import { ListrContext, ListrTask, ListrOptions } from './listr.interface'

export declare class ManagerClass<Ctx = ListrContext> {
  constructor(options?: ManagerOptions)
  addInitial<Ctx>(tasks: ListrTask<Ctx>[]): void
  add<Ctx>(tasks: ListrTask<Ctx>[]): void
  addFinal<Ctx>(tasks: ListrTask<Ctx>[]): void
  runAll<Ctx>(options?: Exclude<ListrOptions<Ctx>, {concurrent}>): Promise<Ctx>
  run<Ctx>(tasks: ListrTask<Ctx>[], options?: ListrOptions): Promise<Ctx>
  getRunTime (pipetime: number): string
}

export interface ManagerInjectOptions<Ctx =ListrContext> {
  initial?: Exclude<ListrOptions<Ctx>, {concurrent}>
  parallel?: Exclude<ListrOptions<Ctx>, {concurrent}>
  final?: Exclude<ListrOptions<Ctx>, {concurrent}>
}

export interface ManagerOptions {
  showRunTime?: boolean
}