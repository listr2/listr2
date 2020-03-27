import { Observable } from 'rxjs'
import { Readable } from 'stream'

import { stateConstants } from '../constants/state.constants'
import { Task } from '../lib/task'
import { Listr } from '../listr'
import { PromptOptionsType, PromptTypes } from '../utils/prompt.interface'

export type ListrContext = any

export declare class ListrClass<Ctx = ListrContext> {
  tasks: Task<Ctx>[]
  constructor(task?: readonly ListrTask<Ctx>[], options?: ListrOptions<Ctx>)
  public run(ctx?: Ctx): Promise<Ctx>
  public add(tasks: ListrTask<Ctx> | readonly ListrTask<Ctx>[]): void
}

export interface ListrTaskObject<Ctx> extends Observable<ListrEvent> {
  id: string
  title?: string
  output?: string
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx>) => void | ListrTaskResult<Ctx>
  skip: (ctx: Ctx) => void | boolean | string | Promise<boolean>
  subtasks: ListrTaskObject<Ctx>[]
  state: string
  check: (ctx: Ctx) => void
  run: (ctx: Ctx, wrapper: ListrTaskWrapper<Ctx>) => Promise<void>
  showSubtasks?: boolean
  collapse?: boolean
  collapseSkips?: boolean
  bottomBar: boolean | number
  spinner?: () => string
  hasSubtasks(): boolean
  isPending(): boolean
  isSkipped(): boolean
  isCompleted(): boolean
  isEnabled(): boolean
  isBottomBar(): boolean
  haspersistentOutput(): boolean
  isPrompt(): boolean
  hasFailed(): boolean
  hasTitle(): boolean
}

export interface ListrTask<Ctx = ListrContext> {
  title?: string
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx>) => void | ListrTaskResult<Ctx>
  skip?: (ctx: Ctx) => void | boolean | string | Promise<boolean>
  enabled?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  bottomBar?: boolean | number
  persistentOutput?: boolean
}

export interface ListrTaskWrapper<Ctx = ListrContext> {
  title: string
  output: string
  newListr<Ctx = ListrContext>(task: ListrTask<Ctx>[], options?: ListrOptions<Ctx>): Listr
  report(error: Error): void
  skip(message: string): void
  run(ctx?: Ctx, task?: ListrTaskWrapper<Ctx>): Promise<void>
  prompt <T = any, P extends PromptTypes = PromptTypes> (type: P, options: PromptOptionsType<P>): Promise<T>
}

export type ListrTaskResult<Ctx> = string | Promise<any> | ListrClass<Ctx> | Readable | Observable<any>

export interface ListrOptions<Ctx = ListrContext> {
  concurrent?: boolean | number
  exitOnError?: boolean
  renderer?: ListrRendererValue<Ctx>
  nonTTYRenderer?: ListrRendererValue<Ctx>
  showSubtasks?: boolean
  collapse?: boolean
  collapseSkips?: boolean
  clearOutput?: boolean
  ctx?: Ctx
}

export interface ListrEvent {
  type: ListrEventTypes
  data?: string | boolean
}

export interface ListrRenderer {
  render(): void
  end(err?: Error): void
}

export class ListrError extends Error {
  public errors?: ListrError[]
  constructor (message) {
    super(message)
    this.name = 'ListrError'
  }
}

export interface ListrRendererClass<Ctx> {
  nonTTY: boolean
  new(tasks: readonly ListrTaskObject<Ctx>[], options: ListrOptions<Ctx>): ListrRenderer
}

export type ListrEventTypes = 'TITLE' | 'STATE' | 'ENABLED' | 'SUBTASK' | 'DATA'

export type StateConstants = stateConstants

export type ListrRendererValue<Ctx> = 'silent' | 'default' | 'verbose' | ListrRendererClass<Ctx>
