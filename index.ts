import * as pMap from 'p-map'

import { ListrClass, ListrTask, ListrOptions, ListrContext } from './interfaces/listr-task.interface'

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

  constructor (tasks: readonly ListrTask<ListrContext>[], opts: ListrOptions) {

    if (tasks && !Array.isArray(tasks) && typeof tasks === 'object') {
      if (typeof tasks.task === 'function') {
        throw new TypeError('Expected an array of tasks or an options object, got a task object.')
      }

      opts = tasks
      tasks = []
    }

    if (tasks && !Array.isArray(tasks)) {
      throw new TypeError('Expected an array of tasks.')
    }

    this.options = Object.assign({
      showSubtasks: true,
      concurrent: false,
      renderer: 'default',
      nonTTYRenderer: 'verbose'
    }, opts)
    this.tasks = []

    this.concurrency = 1
    if (this.options.concurrent === true) {
      this.concurrency = Infinity
    } else if (typeof this.options.concurrent === 'number') {
      this.concurrency = this.options.concurrent
    }

    this.rendererClass = renderer.getRenderer(this.options.renderer, this.options.nonTTYRenderer)

    this.exitOnError = this.options.exitOnError

    this.add(tasks || [])
  }

  _checkAll (context) {
    for (const task of this.tasks) {
      task.check(context)
    }
  }

  get tasks () {
    return this.tasks
  }

  setRenderer (value) {
    this.rendererClass = renderer.getRenderer(value)
  }

  add (task) {
    const tasks = Array.isArray(task) ? task : [task]

    for (const task of tasks) {
      this.tasks.push(new Task(this, task, this.options))
    }

    return this
  }

  render () {
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.options)
    }

    return this.renderer.render()
  }

  run (context) {
    this.render()

    context = context || Object.create(null)

    const errors = []

    this._checkAll(context)

    const tasks = pMap(this.tasks, (task) => {
      this._checkAll(context)
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
}

module.exports = Listr
