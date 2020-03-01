import { Prompt } from 'enquirer'

export interface PromptOptions {
  name?: string | (() => string)
  type?: string | (() => string)
  message: string | (() => string) | (() => Promise<string>)
  initial?: any
  required?: boolean
  skip?: ((state: object) => boolean | Promise<boolean>) | boolean
  stdin?: NodeJS.ReadStream
  stdout?: NodeJS.WriteStream
  value?: string
  disabled?: boolean | string
  enabled?: boolean | string
  min?: number
  max?: number
  float?: boolean
  round?: boolean
  major?: number
  minor?: number
  hint?: string
  drag?: boolean
  numbered?: boolean
  newline?: string
  multiline?: boolean
  choices?: string[]
  maxChoices?: number
  muliple?: boolean
  delay?: number
  separator?: boolean
  sort?: boolean
  linebreak?: boolean
  edgeLength?: number
  align?: 'left' | 'right'
  scroll?: boolean
  format?(value: string): string | Promise<string>
  result?(value: string): string | Promise<string>
  validate?(value: string): boolean | Promise<boolean> | string | Promise<string>
  onSubmit?(name: string, value: any, prompt: Prompt): boolean | Promise<boolean>
  onCancel?(name: string, value: any, prompt: Prompt): boolean | Promise<boolean>
}

export type PromptTypes =
| 'AutoComplete'
| 'BasicAuth'
| 'Confirm'
| 'Editable'
| 'Form'
| 'Input'
| 'Invisible'
| 'List'
| 'MultiSelect'
| 'Numeral'
| 'Password'
| 'Quiz'
| 'Scale'
| 'Select'
| 'Snippet'
| 'Sort'
| 'Survey'
| 'Text'
| 'Toggle'
