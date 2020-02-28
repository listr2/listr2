import * as pMap from 'p-map'

import { ListrError } from './interfaces/listr-error'
import { ListrClass, ListrContext, ListrOptions, ListrRenderer, ListrTaskObject, ListrTask, ListrRendererClass } from './interfaces/listr-task.interface'
import { Task } from './lib/task'
import { TaskWrapper } from './lib/task-wrapper'
import { getRenderer } from './utils/renderer'

export class Listr implements ListrClass {
  public tasks: ListrTaskObject<ListrContext>[] = []
  public err: ListrError[] = []
  public exitOnError: boolean
  public rendererClass: ListrRendererClass<ListrContext>
  private concurrency: number
  private renderer: ListrRenderer

  constructor (public task: ListrTask[], public options?: ListrOptions) {
    // initiate observable subjectfrom rxjs

    // assign over default options
    this.options = Object.assign({
      showSubtasks: true,
      concurrent: false,
      renderer: 'default',
      nonTTYRenderer: 'verbose'
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

    // parse and add tasks
    this.add(task || [])
  }

  public add <Ctx> (task: ListrTask | ListrTask[]): void {
    const tasks = Array.isArray(task) ? task : [task]

    for (const task of tasks) {
      this.tasks.push(new Task(this, task, this.options))
    }
  }

  public run <Ctx> (context?: Ctx): Promise<Ctx> {
    // start the renderer
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.options)
    }
    this.renderer.render()

    // create a new context
    context = context || Object.create(null)

    // create new error queue
    const errors = []

    // check if the items are enabled
    this.checkAll(context)

    // create a new promise map
    const tasks = pMap(this.tasks, (task) => {
      this.checkAll(context)

      return this.runTask(task, context, errors)
    }, { concurrency: this.concurrency })

    // run tasks
    return tasks
      .then(() => {
        if (errors.length > 0) {
          const err = new ListrError('Something went wrong')
          this.err = errors
          throw err
        }

        this.renderer.end()

        return context
      })
      .catch((error) => {
        error.context = context
        this.renderer.end(error)
        throw error
      })
  }

  private checkAll (context): void {
    for (const task of this.tasks) {
      task.check(context)
    }
  }

  private runTask (task, context, errors): Promise<void> {
    if (!task.isEnabled()) {
      return Promise.resolve()
    }

    return new TaskWrapper(task, errors).run(context)
  }

}
