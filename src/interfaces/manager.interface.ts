import { ListrContext, ListrTask, ListrOptions, ListrBaseClassOptions } from '@interfaces/listr.interface'
import { Listr } from '@root/index'

export declare class ManagerClass <InjectCtx = ListrContext> {
  constructor(options?: ListrBaseClassOptions<InjectCtx>)
  add<Ctx = ListrContext> (tasks: ListrTask<Ctx>[] | ((ctx?: Ctx) => ListrTask<Ctx>[]), options?: ListrOptions<Ctx>): void
  runAll<Ctx = InjectCtx>(options?: ListrOptions<Ctx>): Promise<Ctx>
  run<Ctx = InjectCtx>(tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Promise<Ctx>
  newListr<Ctx = InjectCtx> (tasks: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr<Ctx>
  indent <Ctx = ListrContext> (tasks: ListrTask<Ctx>[] | ((ctx?: Ctx) => ListrTask<Ctx>[]), options?: ListrOptions<Ctx>, taskOptions?: Omit<ListrTask, 'task'>): ListrTask<Ctx>
  getRunTime (pipetime: number): string
}
