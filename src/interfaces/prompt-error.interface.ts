/**
 * Internal error handling mechanism for Listr prompts to identify the failing cause is coming from a prompt.
 *
 * @see {@link https://listr2.kilic.dev/task/prompts.html}
 */
export class PromptError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'PromptError'
  }
}
