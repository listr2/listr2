import { PromptOptions, PromptSettings } from './prompt.interface'
import { PromptError } from '@interfaces/listr.interface'
import { TaskWrapper } from '@root/lib/task-wrapper'

export async function createPrompt (options: PromptOptions | PromptOptions[], settings?: PromptSettings): Promise<any> {
  // override cancel callback
  let cancelCallback: PromptSettings['cancelCallback']
  if (settings?.cancelCallback) {
    cancelCallback = settings.cancelCallback
  } else {
    cancelCallback = defaultCancelCallback
  }

  if (!Array.isArray(options)) {
    options = options = [ { ...options, name: 'default' } ]
  } else if (options.length === 1) {
    options = options.reduce((o, option) => {
      return [ ...o, Object.assign(option, { name: 'default' }) ]
    }, [])
  }

  options = options.reduce((o, option) => {
    return [ ...o, Object.assign(option, { stdout: this.stdout(), onCancel: cancelCallback.bind(this, settings) }) ]
  }, [])

  try {
    const { prompt } = ((await import('enquirer')) as any).default
    // if this is a custom prompt
    return prompt(options as any)
  } catch (e) {
    this.task.prompt = new PromptError('Enquirer is a peer dependency that must be installed seperately.')
  }
}

function defaultCancelCallback (settings: PromptSettings): string | Error | PromptError | void {
  const errorMsg = 'Cancelled prompt.'

  if (settings?.error === true) {
    throw new Error(errorMsg)
  } else if (this instanceof TaskWrapper) {
    this.task.prompt = new PromptError(errorMsg)
  } else {
    return errorMsg
  }
}
