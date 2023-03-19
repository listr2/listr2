import type Enquirer from 'enquirer'

import type { PromptInstance, PromptOptions, PromptSettings } from './prompt.interface'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import { PromptError } from '@interfaces'
import { TaskWrapper } from '@lib'

function defaultCancelCallback (this: any, settings: PromptSettings): string | Error | PromptError | void {
  const errorMsg = 'Cancelled prompt.'

  /* istanbul ignore next */
  if (this instanceof TaskWrapper) {
    this.task.prompt = new PromptError(errorMsg)
  } else if (settings?.error !== false) {
    throw new Error(errorMsg)
  } else {
    return errorMsg
  }
}

/**
 * Create a new prompt with Enquirer externally.
 * This extends enquirer so you dont have to give a name to single prompts and such so it is also
 * useful to use externally.
 * @param this
 * @param options
 * @param settings
 */
export async function createPrompt (this: any, options: PromptOptions | PromptOptions<true>[], settings?: PromptSettings): Promise<any> {
  // override cancel callback
  let cancelCallback: PromptSettings['cancelCallback']

  /* istanbul ignore next */
  if (settings?.cancelCallback) {
    cancelCallback = settings.cancelCallback
  } else {
    cancelCallback = defaultCancelCallback
  }

  // assign default if there is single prompt
  /* istanbul ignore next */
  if (!Array.isArray(options)) {
    options = [ { ...options, name: 'default' } ]
  } else if (options.length === 1) {
    options = options.reduce((o, option) => {
      return [ ...o, Object.assign(option, { name: 'default' }) ]
    }, [])
  }

  // assign default enquirer options
  options = options.reduce((o, option) => {
    return [
      ...o,
      Object.assign(option, {
        // this is for outside calls, if it is not called from taskwrapper with bind
        stdout: this instanceof TaskWrapper ? settings?.stdout ?? this.stdout(ListrTaskEventType.PROMPT) : process.stdout,
        onCancel: cancelCallback.bind(this, settings)
      })
    ]
  }, [])

  let enquirer: Enquirer

  /* istanbul ignore next */
  if (settings?.enquirer) {
    // injected enquirer
    enquirer = settings.enquirer
  } else {
    try {
      const imported = await import('enquirer')

      // should fix the import problem for esm since there is no default imports there
      enquirer = imported.default ? new imported.default() : new (imported as unknown as new () => Enquirer)()
    } catch (e: any) {
      if (this instanceof TaskWrapper) {
        this.task.prompt = new PromptError('Enquirer is a peer dependency that must be installed separately.')
      }

      throw new Error(e)
    }
  }

  // i use this externally as well, this is a bandaid
  let state: ListrTaskState

  if (this instanceof TaskWrapper) {
    state = this.task.state

    this.task.state$ = ListrTaskState.PROMPT

    // Capture the prompt instance so we can use it later
    enquirer.on('prompt', (prompt: PromptInstance) => this.task.prompt = prompt)

    // Clear the prompt instance once it's submitted
    // Can't use on cancel, since that might hold a PromptError object
    enquirer.on('submit', () => this.task.prompt = undefined)

    this.task.on(ListrTaskEventType.STATE, (event) => {
      if (event === ListrTaskState.SKIPPED) {
        if (this.task.prompt && !(this.task.prompt instanceof PromptError)) {
          this.task.prompt.submit()
        }
      }
    })
  }

  const response = (await enquirer.prompt(options as any)) as any

  if (this instanceof TaskWrapper) {
    this.task.state$ = ListrTaskState.PROMPT_COMPLETED
    // without pushing it through the subscriptions again, just set the state back to original
    this.task.state = state
  }

  // return default name if it is single prompt
  if (options.length === 1) {
    return response.default
  } else {
    return response
  }
}