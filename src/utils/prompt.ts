import { Prompt } from 'enquirer'
import { AutoComplete,
  BasicAuth,
  Confirm,
  Editable,
  Form,
  Input,
  Invisible,
  List,
  MultiSelect,
  Numeral,
  Password,
  Quiz,
  Scale,
  Select,
  Snippet,
  Sort,
  Survey,
  Text,
  Toggle } from 'enquirer/lib/prompts'

import { ListrError } from '../interfaces/listr.interface'
import { PromptOptionsType, PromptTypes } from './prompt.interface'

export function createPrompt <T extends PromptTypes> (type: T, options: PromptOptionsType<T>): Promise<any> {
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
  return prompt.on('cancel', () => {
    return 'Cancelled prompt.'
  }).run()
}
