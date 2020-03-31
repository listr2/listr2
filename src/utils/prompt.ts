import { Prompt } from 'enquirer'
import {
  AutoComplete, BasicAuth, Confirm, Editable, Form, Input, Invisible, List, MultiSelect, Numeral, Password, Quiz, Scale, Select, Snippet, Sort, Survey, Text, Toggle
} from 'enquirer/lib/prompts'

import { ListrError, PromptError } from '../interfaces/listr.interface'
import { TaskWrapper } from '../lib/task-wrapper'
import { PromptOptionsType, PromptSettings, PromptTypes } from './prompt.interface'

export function newPrompt <T extends PromptTypes> (type: T, options: PromptOptionsType<T>): Prompt {
  let prompt: Prompt
  switch (type.toString().toLocaleLowerCase()) {
  case 'autocomplete':
    prompt = new AutoComplete(options)
    break
  case 'basicauth':
    prompt = new BasicAuth(options)
    break
  case 'confirm':
    prompt = new Confirm(options)
    break
  case 'editable':
    prompt = new Editable(options)
    break
  case 'form':
    prompt = new Form(options)
    break
  case 'input':
    prompt = new Input(options)
    break
  case 'invisible':
    prompt = new Invisible(options)
    break
  case 'list':
    prompt = new List(options)
    break
  case 'multiselect':
    prompt = new MultiSelect(options)
    break
  case 'numeral':
    prompt = new Numeral(options)
    break
  case 'password':
    prompt = new Password(options)
    break
  case 'quiz':
    prompt = new Quiz(options)
    break
  case 'scale':
    prompt = new Scale(options)
    break
  case 'select':
    prompt = new Select(options)
    break
  case 'snippet':
    prompt = new Snippet(options)
    break
  case 'sort':
    prompt = new Sort(options)
    break
  case 'survey':
    prompt = new Survey(options)
    break
  case 'text':
    prompt = new Text(options)
    break
  case 'toggle':
    prompt = new Toggle(options)
    break
  default:
    throw new ListrError('No prompt type this was not supposed to happen.')
  }
  return prompt
}

type PromptClass = new(options: any) => Prompt
function isPromptClass (SomeClass: any): SomeClass is PromptClass {
  try {
    new SomeClass({})
    return true
  } catch {
    return false
  }
}

export function createPrompt <T extends PromptTypes> (type: T | PromptClass, options: PromptOptionsType<T>, settings?: PromptSettings): Promise<any> {
  // override cancel callback
  let cancelCallback: PromptSettings['cancelCallback']
  if (settings?.cancelCallback) {
    cancelCallback = settings.cancelCallback
  } else {
    cancelCallback = defaultCancelCallback
  }

  // if this is a custom prompt
  if (isPromptClass(type)) {
    return new type(options).on('cancel', cancelCallback.bind(this)).run()
  } else {
    return newPrompt(type, options).on('cancel', cancelCallback.bind(this)).run()
  }

}

function defaultCancelCallback (settings: PromptSettings): string | Error | PromptError {
  const errorMsg = 'Cancelled prompt.'
  if (settings?.error === true) {
    throw new PromptError(errorMsg)

  } else if (this instanceof TaskWrapper) {
    this.task.prompt = new PromptError(errorMsg)

  } else {
    return errorMsg

  }
}