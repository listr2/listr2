import { Listr } from '../listr'
import { ListrContext, ListrTask, ListrOptions } from './listr.interface'

export declare class ManagerClass <InjectCtx = ListrContext> {
  constructor(options?: ManagerOptions<InjectCtx>)
  add<Ctx = InjectCtx>(tasks: ListrTask<Ctx>[]): void
  injectOptions <Ctx = InjectCtx> (options?: ManagerOptions<Ctx>): void
  runAll<Ctx = InjectCtx>(options?: ManagerOptions<Ctx>): Promise<Ctx>
  run<Ctx = InjectCtx>(tasks: ListrTask<Ctx>[], options?: ManagerOptions<Ctx>): Promise<Ctx>
  newListr<Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx>
  getRunTime (pipetime: number): string
}

export interface ManagerOptions<Ctx = ListrContext> extends ListrOptions<Ctx> {
  showRunTime?: boolean,
}