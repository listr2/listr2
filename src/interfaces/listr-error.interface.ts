/** The internal error handling mechanism.. */
export class ListrError extends Error {
  constructor (public message: string, public errors: Error[] = [], public context?: any) {
    super(message)
    this.name = 'ListrError'
  }
}

/** The internal error handling mechanism for prompts only. */
export class PromptError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'PromptError'
  }
}
