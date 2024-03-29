import type { CancelablePromise, Prompt } from '@inquirer/type'
import { ListrPromptAdapter, ListrTaskEventType, ListrTaskState } from 'listr2'

export class ListrInquirerPromptAdapter extends ListrPromptAdapter {
  private prompt: CancelablePromise<any>

  /**
   * Get the current running instance of `inquirer`.
   */
  get instance (): CancelablePromise<any> {
    return this.prompt
  }

  /**
   * Create a new prompt with `inquirer`.
   */
  public async run<T extends Prompt<any, any> = Prompt<any, any>>(prompt: T, ...[ config, context ]: Parameters<T>): Promise<ReturnType<T>> {
    context ??= {}
    context.output ??= this.wrapper.stdout(ListrTaskEventType.PROMPT)

    this.reportStarted()

    this.task.on(ListrTaskEventType.STATE, (event) => {
      if (event === ListrTaskState.SKIPPED && this.prompt) {
        this.cancel()
      }
    })

    this.prompt = prompt(config, context)

    let result: ReturnType<T>

    try {
      result = await this.prompt

      this.reportCompleted()
    } catch (e) {
      this.reportFailed()

      throw e
    }

    return result
  }

  /**
   * Cancel the ongoing prompt.
   */
  public cancel (): void {
    // there's no prompt, can't cancel
    if (!this.prompt) {
      return
    }

    this.reportFailed()

    this.prompt.cancel()
  }
}
