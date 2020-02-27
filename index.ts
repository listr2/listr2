import * as pMap from 'p-map'

import { ListrClass, ListrTask, ListrOptions, ListrContext, ListrRendererClass, ListrTaskObject, ListrRenderer } from './interfaces/listr-task.interface'

const ListrError = require('./lib/listr-error')
const renderer = require('./lib/renderer')
const Task = require('./lib/task')
const TaskWrapper = require('./lib/task-wrapper')

const runTask = (task, context, errors) => {
  if (!task.isEnabled()) {
    return Promise.resolve()
  }

  return new TaskWrapper(task, errors).run(context)
}

export class Listr implements ListrClass {
  private concurrency: number
  private renderer: ListrRenderer
  private rendererClass: ListrRendererClass<any>
  private exitOnError: boolean

  constructor (private tasks: ListrTaskObject<ListrContext>[], private options: ListrOptions) {

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
    this.rendererClass = renderer.getRenderer(this.options.renderer, this.options.nonTTYRenderer)

    // get exit on error option
    this.exitOnError = this.options.exitOnError

    // parse and add tasks
    this.add(tasks || [])
  }

  public run <Ctx> (context: Ctx): Promise<Ctx> {
    this.render()

    context = context || Object.create(null)

    const errors = []

    this.checkAll(context)

    const tasks = pMap(this.tasks, (task) => {
      this.checkAll(context)

      return runTask(task, context, errors)
    }, { concurrency: this.concurrency })

    return tasks
      .then(() => {
        if (errors.length > 0) {
          const err = new ListrError('Something went wrong')
          err.errors = errors
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

  private add <Ctx> (task: ListrTaskObject<Ctx> | ListrTaskObject<Ctx>[]): Listr {
    const tasks = Array.isArray(task) ? task : [task]

    for (const task of tasks) {
      this.tasks.push(new Task(this, task, this.options))
    }

    return this
  }

  private render (): void {
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.options)
    }

    return this.renderer.render()
  }

}
