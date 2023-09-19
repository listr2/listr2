/* eslint-disable @typescript-eslint/naming-convention */
import type Enquirer from 'enquirer'
import type { WriteStream } from 'fs'
import type { Writable } from 'stream'

type Unionize<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T]: T[P]
}[keyof T]

interface EnquirerBasePromptOptions {
  message: string | (() => string) | (() => Promise<string>)
  initial?: boolean | number | number[] | string | (() => string) | (() => Promise<string>)
  required?: boolean
  stdin?: NodeJS.ReadStream
  stdout?: NodeJS.WriteStream
  header?: string
  footer?: string
  skip?: (value: any) => boolean | Promise<boolean>
  format?: (value: any) => any | Promise<any>
  result?: (value: any) => any | Promise<any>
  validate?: (value: any, state: any) => boolean | Promise<boolean> | string | Promise<string> | Promise<string | boolean>
  onSubmit?: (name: any, value: any, prompt: Enquirer.Prompt) => boolean | Promise<boolean>
  onCancel?: (name: any, value: any, prompt: Enquirer.Prompt) => boolean | Promise<boolean>
}

interface EnquirerBasePromptOptionsWithName extends EnquirerBasePromptOptions {
  name: string | (() => string)
}

interface EnquirerArrayPromptOptions extends EnquirerBasePromptOptions {
  choices: string[] | EnquirerBasePromptOptionsWithName[]
  maxChoices?: number
  multiple?: boolean
  initial?: number | number[]
  delay?: number
  separator?: boolean
  sort?: boolean
  linebreak?: boolean
  edgeLength?: number
  align?: 'left' | 'right'
  scroll?: boolean
  hint?: string
}

interface EnquirerBooleanPromptOptions extends EnquirerBasePromptOptions {
  initial?: boolean | (() => string) | (() => Promise<string>)
}

interface EnquirerStringPromptOptions extends EnquirerBasePromptOptions {
  initial?: string
  multiline?: boolean
}

interface EnquirerScalePromptOptions extends EnquirerArrayPromptOptions {
  scale: EnquirerStringPromptOptions[]
  margin?: [number, number, number, number]
}

interface EnquirerNumberPromptOptions extends EnquirerBasePromptOptions {
  min?: number
  max?: number
  delay?: number
  float?: boolean
  round?: boolean
  major?: number
  minor?: number
  initial?: number
}

interface EnquirerSnippetPromptOptions extends EnquirerBasePromptOptions {
  newline?: string
  fields: Partial<EnquirerBasePromptOptionsWithName>[]
  template: string
}

interface EnquirerSortPromptOptions extends EnquirerBasePromptOptions {
  hint?: string
  drag?: boolean
  numbered?: boolean
}

interface EnquirerSurveyPromptOptions extends EnquirerArrayPromptOptions {
  scale: EnquirerBasePromptOptionsWithName[]
  margin: [number, number, number, number]
}

interface EnquirerQuizPromptOptions extends EnquirerArrayPromptOptions {
  correctChoice: number
}

interface EnquirerTogglePromptOptions extends EnquirerBasePromptOptions {
  enabled?: string
  disabled?: string
}

export interface EnquirerPromptCancelOptions {
  throw?: boolean
}

/** Returns all the prompt options depending on the type selected. */
export type EnquirerPromptOptions<T extends boolean = false> =
  | Unionize<{
    [K in EnquirerPromptTypes]-?: T extends true ? { type: K } & EnquirerPromptOptionsType<K> & { name: string | (() => string) } : { type: K } & EnquirerPromptOptionsType<K>
  }>
  | ({
    type: string
  } & T extends true
    ? EnquirerPromptOptionsType<string> & { name: string | (() => string) }
    : EnquirerPromptOptionsType<string>)

export type EnquirerPromptTypes =
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

export type EnquirerPromptOptionsType<T> = T extends keyof EnquirerPromptOptionsMap
  ? EnquirerPromptOptionsMap[T]
  : T extends string
    ? EnquirerBasePromptOptions & Record<PropertyKey, unknown>
    : any

export declare class EnquirerPromptOptionsMap implements Record<EnquirerPromptTypes, Record<PropertyKey, any>> {
  AutoComplete: EnquirerArrayPromptOptions
  BasicAuth: EnquirerStringPromptOptions
  Confirm: EnquirerBooleanPromptOptions
  Editable: EnquirerArrayPromptOptions
  Form: EnquirerArrayPromptOptions
  Input: EnquirerStringPromptOptions
  Invisible: EnquirerStringPromptOptions
  List: EnquirerArrayPromptOptions
  MultiSelect: EnquirerArrayPromptOptions
  Numeral: EnquirerNumberPromptOptions
  Password: EnquirerStringPromptOptions
  Quiz: EnquirerQuizPromptOptions
  Scale: EnquirerScalePromptOptions
  Select: EnquirerArrayPromptOptions
  Snippet: EnquirerSnippetPromptOptions
  Sort: EnquirerSortPromptOptions
  Survey: EnquirerSurveyPromptOptions
  Text: EnquirerStringPromptOptions
  Toggle: EnquirerTogglePromptOptions
}

export interface EnquirerPromptSettings {
  error?: boolean
  stdout?: WriteStream | Writable
  enquirer?: Enquirer
}

export interface EnquirerPromptInstance extends Omit<EnquirerBasePromptOptions, 'onCancel' | 'onSubmit'> {
  submit: () => void
  cancel: (err?: string) => void
}
