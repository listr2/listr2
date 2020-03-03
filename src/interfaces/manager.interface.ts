import { Listr } from '../listr'
import { ListrContext, ListrTask, ListrOptions } from './listr.interface'

export declare class ManagerClass <InjectCtx = ListrContext> {
  constructor(options?: ListrOptions<InjectCtx>)
  add<Ctx = InjectCtx>(tasks: ListrTask<Ctx>[]): void
  injectOptions <Ctx = InjectCtx> (options?: ListrOptions<Ctx>): void
  runAll<Ctx = InjectCtx>(options?: ListrOptions<Ctx>): Promise<Ctx>
  run<Ctx = InjectCtx>(tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Promise<Ctx>
  newListr<Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx>
  getRunTime (pipetime: number): string
}
