import { Observable, Subject } from 'rxjs'

import { ListrError } from '../interfaces/listr-error'
import { ListrContext, ListrOptions, ListrTask, ListrTaskObject, ListrTaskResult, ListrTaskWrapper } from '../interfaces/listr-task.interface'
import { getRenderer } from '../utils/renderer'
import { stateConstants } from '../utils/state'
import { Listr } from './../index'
import { TaskType } from './task.constants'

const streamToObservable = require('@samverschueren/stream-to-observable')
const isPromise = require('is-promise')

const utils = require('../../lib/utils')

export class Task extends Subject<ListrContext> implements ListrTaskObject<ListrContext> {
  public title: string
  public output?: string
  public task: (ListrContext: ListrContext, task: ListrTaskWrapper<ListrContext>) => void |ListrTaskResult<ListrContext>
  public skip: (ListrContext?: ListrContext) => void | boolean | string | Promise<boolean>
  public subtasks: ListrTaskObject<ListrContext>[]
  public state: string
  public enabled: boolean
  public enabledFn: (ctx: ListrContext) => boolean | Promise<boolean> | Observable<boolean>

  constructor (public listr: Listr, public tasks: ListrTask, public options: ListrOptions) {

    super()

    this.title = this.tasks.title
    this.task = this.tasks.task

    this.skip = this.tasks?.skip || ((): boolean => false)
    this.enabledFn = this.tasks.enabled || ((): boolean => true)

  }

  set state$ (state) {
    this.state = state

    this.next({
      type: TaskType.STATE
    })
  }

  check (ctx: ListrContext): void {
    // Check if a task is enabled or disabled
    if (this.state === undefined && this.enabledFn) {
      const isEnabled = this.enabledFn(ctx)

      if (this.enabled !== isEnabled) {
        this.enabled = isEnabled as boolean

        this.next({
          type: TaskType.ENABLED,
          data: this.enabled
        })
      }
    }
  }

  hasSubtasks (): boolean {
    return this.subtasks?.length > 0
  }

  isPending (): boolean {
    return this.state === stateConstants.PENDING
  }

  isSkipped (): boolean {
    return this.state === stateConstants.SKIPPED
  }

  isCompleted (): boolean {
    return this.state === stateConstants.COMPLETED
  }

  hasFailed (): boolean {
    return this.state === stateConstants.FAILED
  }

  isEnabled (): boolean {
    return this.enabled
  }

  run (context: ListrContext, wrapper: ListrTaskWrapper<ListrContext>): Promise<void> {
    const handleResult = (result): Promise<void> => {
      // Detect the subtask
      if (result instanceof Listr) {
        // assign subtask options
        result.options = Object.assign(this.options, result.options)

        // assign exit on error
        result.exitOnError = result.options.exitOnError

        // switch to silent renderer since already rendering
        result.rendererClass = getRenderer('silent')

        // assign subtasks
        this.subtasks = result.tasks

        this.next({
          type: TaskType.SUBTASK
        })

        return result.run(context)
      }

      // Detect stream
      if (utils.isStream(result)) {
        result = streamToObservable(result)
      }

      // Detect Observable
      if (utils.isObservable(result)) {
        result = new Promise((resolve, reject) => {
          result.subscribe({
            next: (data) => {
              this.output = data

              this.next({
                type: TaskType.DATA,
                data
              })
            },
            error: reject,
            complete: resolve
          })
        })
      }

      // Detect promise
      if (isPromise(result)) {
        return result.then(handleResult)
      }

      return result
    }

    return Promise.resolve()
      .then(() => {
        this.state$ = stateConstants.PENDING
        return this.skip(context)
      })
      .then((skipped) => {
        if (skipped) {
          if (typeof skipped === 'string') {
            this.output = skipped
          }
          this.state$ = stateConstants.SKIPPED
          return
        }

        return handleResult(this.task(context, wrapper))
      })
      .then(() => {
        if (this.isPending()) {
          this.state$ = stateConstants.COMPLETED
        }
      })
      .catch((error) => {
        this.state$ = stateConstants.FAILED

        if (error instanceof ListrError) {
          // if (typeof error === 'string') {
          //   this.title = error
          // }

          wrapper.report(error)
          return
        }

        if (!this.hasSubtasks()) {
          // Do not show the message if we have subtasks as the error is already shown in the subtask
          this.output = error.message
        }

        this.next({
          type: TaskType.DATA,
          data: error.message
        })

        wrapper.report(error)

        if (this.options.exitOnError !== false) {
          // Do not exit when explicitely set to `false`
          throw error
        }
      })
      .then(() => {
        // Mark the Observable as completed
        this.complete()
      })
  }
}
