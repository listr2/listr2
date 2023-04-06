import type Enquirer from 'enquirer'

import type { PromptInstance, PromptOptions, PromptSettings } from './prompt.interface'
import { ListrTaskEventType, ListrTaskState } from '@constants'
import { PromptError } from '@interfaces'
import { TaskWrapper } from '@lib'

/**
 * Create a new prompt with Enquirer externally.
 * This extends enquirer so you dont have to give a name to single prompts and such so it is also
 * useful to use externally.
 * @param this
 * @param options
 * @param settings
 */
export async function createPrompt (this: any, options: PromptOptions | PromptOptions<true>[], settings?: PromptSettings): Promise<any> {
  settings = {
    ...settings
  }

  // assign default if there is single prompt
  /* istanbul ignore next */
  if (!Array.isArray(options)) {
    options = [ { ...options, name: 'default' } ]
  } else if (options.length === 1) {
    options = options.map((option) => {
      return { ...option, name: 'default' }
    })
  }

  // assign default enquirer options
  options = options.map((option) => {
    return {
      onCancel: (): boolean => {
        const error = new PromptError('Cancelled prompt.')

        if (this instanceof TaskWrapper) {
          this.task.prompt = error
        } else {
          throw error
        }

        return true
      },
      ...option,
      // this is for outside calls, if it is not called from taskwrapper with bind
      stdout: (this instanceof TaskWrapper ? settings?.stdout ?? this.stdout(ListrTaskEventType.PROMPT) : process.stdout) as NodeJS.WriteStream
    }
  })

  let enquirer: Enquirer

  /* istanbul ignore next */
  if (settings?.enquirer) {
    // injected enquirer
    enquirer = settings.enquirer
  } else {
    try {
      enquirer = await import('enquirer').then((imported) => imported.default ? new imported.default() : new (imported as unknown as new () => Enquirer)())
    } catch (e) {
      if (this instanceof TaskWrapper) {
        this.task.prompt = new PromptError('Enquirer is a peer dependency that must be installed separately.')
      }

      throw e
    }
  }

  // i use this externally as well, this is a bandaid
  let state: ListrTaskState

  if (this instanceof TaskWrapper) {
    state = this.task.state

    this.task.state$ = ListrTaskState.PROMPT

    enquirer.on('prompt', (prompt: PromptInstance) => this.task.prompt = prompt).on('submit', () => this.task.prompt = undefined)

    this.task.on(ListrTaskEventType.STATE, (event) => {
      if ([ ListrTaskState.SKIPPED ].includes(event) && this.task.prompt && !(this.task.prompt instanceof PromptError)) {
        this.task.prompt.submit()
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
