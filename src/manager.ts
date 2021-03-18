import { Listr } from './listr'
import { ListrError } from '@interfaces/listr-error.interface'
import { ListrGetRendererClassFromValue, ListrRendererValue } from '@interfaces/listr-renderer.interface'
import { ListrBaseClassOptions, ListrContext, ListrSubClassOptions, ListrTask } from '@interfaces/listr.interface'

/**
 * Creates a new Listr2 task manager.
 *
 * Useful for creating a single instace of Listr2 with pre-set settings.
 */
export class Manager<Ctx = ListrContext, Renderer extends ListrRendererValue = 'default', FallbackRenderer extends ListrRendererValue = 'verbose'> {
  public err: ListrError[] = []
  private tasks: ListrTask<ListrContext, ListrGetRendererClassFromValue<Renderer>>[] = []

  constructor (public options?: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>) {}

  /** Sets the context before running the tasks. **/
  set ctx (ctx: Ctx) {
    this.options.ctx = ctx
  }

  /** Adds new tasks to the manager. **/
  public add<InjectCtx = Ctx>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[] | ((ctx?: InjectCtx) => ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[]),
    options?: ListrSubClassOptions<InjectCtx, Renderer>
  ): void {
    options = { ...this.options, ...options } as ListrSubClassOptions<InjectCtx, Renderer>

    this.tasks = [ ...this.tasks, this.indent<InjectCtx>(tasks, options) ]
  }

  /** Runs all the tasks in the manager and returns context. */
  public async runAll<InjectCtx = Ctx>(options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>): Promise<InjectCtx> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    const ctx = await this.run<InjectCtx>(this.tasks, options)

    // clear out queues
    this.tasks = []

    return ctx
  }

  /** Returns a new listr with the manager settings. */
  public newListr<InjectCtx, InjectRenderer extends ListrRendererValue = Renderer, InjectFallbackRenderer extends ListrRendererValue = FallbackRenderer>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<InjectRenderer>>[],
    options?: ListrBaseClassOptions<InjectCtx, InjectRenderer, InjectFallbackRenderer>
  ): Listr<InjectCtx, InjectRenderer, InjectFallbackRenderer> {
    return new Listr<InjectCtx, InjectRenderer, InjectFallbackRenderer>(tasks, options)
  }

  /** Indents tasks in to subtasks, without wrapping them in subtask. */
  public indent<InjectCtx = Ctx>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[] | ((ctx?: InjectCtx) => ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[]),
    options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>,
    taskOptions?: Omit<ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>, 'task'>
  ): ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    let newTask: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>
    // type function or directly
    if (typeof tasks === 'function') {
      newTask = {
        ...taskOptions,
        task: (ctx): Listr<InjectCtx, Renderer, FallbackRenderer> => this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks(ctx), options)
      }
    } else {
      newTask = {
        ...taskOptions,
        task: (): Listr<InjectCtx, Renderer, FallbackRenderer> => this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks, options)
      }
    }

    return newTask
  }

  /** Run a given task only. */
  public async run<InjectCtx = Ctx>(
    tasks: ListrTask<InjectCtx, ListrGetRendererClassFromValue<Renderer>>[],
    options?: ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>
  ): Promise<InjectCtx> {
    options = { ...this.options, ...options } as ListrBaseClassOptions<InjectCtx, Renderer, FallbackRenderer>

    // create task
    const task = this.newListr<InjectCtx, Renderer, FallbackRenderer>(tasks, options)
    // run task
    const ctx = await task.run()

    // reset error queue
    this.err = []

    // add errors to manager
    this.err = [ ...this.err, ...task.err ]

    return ctx
  }
}
