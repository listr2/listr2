import { Observable } from 'rxjs'
import { Readable } from 'stream'

export type ListrContext = any

export type ListrTaskResult<Ctx> = string | Promise<any> | ListrClass<Ctx> | Readable | Observable<any>

export type ListrRendererValue<Ctx> = 'silent' | 'default' | 'verbose' | ListrRendererClass<Ctx>

export interface ListrTaskObject<Ctx> extends Observable<ListrEvent> {
  title: string
  output?: string
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx>) => void | ListrTaskResult<Ctx>
  skip: (ctx: Ctx) => void | boolean | string | Promise<boolean>
  enabled: boolean | ((ctx: ListrContext) => boolean | Promise<boolean> | Observable<boolean>)
  subtasks: ListrTaskObject<Ctx>[]
  state: string
  check: (ctx: Ctx) => void
  run: (ctx: Ctx, wrapper: ListrTaskWrapper<Ctx>) => Promise<void>
  hasSubtasks(): boolean
  isPending(): boolean
  isSkipped(): boolean
  isCompleted(): boolean
  isEnabled(): boolean
  hasFailed(): boolean
}

export interface ListrEvent {
  type: string
  data?: string | boolean
}

export interface ListrRendererClass<Ctx> {
  nonTTY: boolean
  new(tasks: readonly ListrTaskObject<Ctx>[], options: ListrOptions<Ctx>): ListrRenderer
}

export interface ListrRenderer {
  render(): void
  end(err?: Error): void
}

export interface ListrTask<Ctx = ListrContext> {
  title: string
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx>) => void | ListrTaskResult<Ctx>
  skip?: (ctx: Ctx) => void | boolean | string | Promise<boolean>
  enabled?: (ctx: Ctx) => boolean | Promise<boolean> | Observable<boolean>
}

export interface ListrTaskWrapper<Ctx = ListrContext> {
  title: string
  output: string
  report(error: Error): void
  skip(message: string): void
  run(ctx?: Ctx): Promise<void>
}

export interface ListrOptions<Ctx = ListrContext> {
  concurrent?: boolean | number
  exitOnError?: boolean
  renderer?: ListrRendererValue<Ctx>
  nonTTYRenderer?: ListrRendererValue<Ctx>
  showSubtasks?: boolean
  collapse?: boolean
}

export declare class ListrClass<Ctx = ListrContext> {
  tasks: ListrTaskObject<Ctx>[]
  constructor(options?: ListrOptions<Ctx>)
  constructor(tasks?: readonly ListrTask<Ctx>[], options?: ListrOptions<Ctx>)
  public run(ctx?: Ctx): Promise<Ctx>
  public add(tasks: ListrTask<Ctx> | readonly ListrTask<Ctx>[]): void
}