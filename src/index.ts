import * as pMap from 'p-map'

import { ListrError } from './interfaces/listr-error'
import { ListrClass, ListrContext, ListrOptions, ListrRenderer, ListrRendererClass, ListrTask } from './interfaces/listr-task.interface'
import { Task } from './lib/task'
import { TaskWrapper } from './lib/task-wrapper'
import { getRenderer } from './utils/renderer'

export class Listr<Ctx = ListrContext> implements ListrClass {
  public tasks: ListrClass['tasks'] = []
  public err: ListrError[] = []
  public exitOnError: ListrOptions['exitOnError']
  public rendererClass: ListrRendererClass<Ctx>
  public context: Ctx
  private concurrency: number
  private renderer: ListrRenderer

  constructor (public task: ListrTask<Ctx>[], public options?: ListrOptions) {
    // initiate observable subjectfrom rxjs

    // assign over default options
    this.options = Object.assign({
      showSubtasks: true,
      concurrent: false,
      renderer: 'default',
      nonTTYRenderer: 'verbose',
      exitOnError: false,
      collapse: true
    }, options)

    // define parallel options
    this.concurrency = 1
    if (this.options.concurrent === true) {
      this.concurrency = Infinity
    } else if (typeof this.options.concurrent === 'number') {
      this.concurrency = this.options.concurrent
    }

    // get renderer class
    this.rendererClass = getRenderer(this.options.renderer, this.options.nonTTYRenderer)

    // get exit on error option
    this.exitOnError = this.options.exitOnError

    // inject context
    this.context = this.options.ctx

    // parse and add tasks
    this.add(task || [])
  }

  public add (task: ListrTask | ListrTask[]): void {
    const tasks = Array.isArray(task) ? task : [task]

    tasks.forEach((task): void => {
      this.tasks.push(new Task(this, task, this.options))
    })
  }

  public async run (context?: Ctx): Promise<Ctx> {
    // start the renderer
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.options)
    }
    this.renderer.render()

    // create a new context
    context = context || this.context || Object.create(null)

    // create new error queue
    const errors = []

    // check if the items are enabled
    await this.checkAll(context)

    // create a new promise map
    const tasks = pMap(this.tasks, async (task): Promise<void> => {
      await this.checkAll(context)

      return this.runTask(task, context, errors)
    }, { concurrency: this.concurrency })

    // run tasks
    try {
      await tasks
      if (errors.length > 0) {
        const err = new ListrError('Something went wrong')
        this.err = errors
        throw err
      }

      this.renderer.end()

      return context
    } catch (error) {
      error.context = context
      this.renderer.end(error)
      throw error
    }
  }

  private checkAll (context): Promise<void[]> {
    return Promise.all(this.tasks.map((task) => {
      task.check(context)
    }))
  }

  private runTask (task: any, context: Ctx, errors: ListrError[]): Promise<void> {
    if (!task.isEnabled()) {
      return Promise.resolve()
    }

    return new TaskWrapper(task, errors).run(context)
  }

}
