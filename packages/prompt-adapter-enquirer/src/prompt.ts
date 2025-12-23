import type Enquirer from 'enquirer'
import { ListrPromptAdapter, ListrTaskEventType, ListrTaskState, PromptError } from 'listr2'

import type { EnquirerPromptCancelOptions, EnquirerPromptInstance, EnquirerPromptOptions, EnquirerPromptSettings } from './prompt.interface'

export class ListrEnquirerPromptAdapter extends ListrPromptAdapter {
  public error: PromptError
  private prompt: EnquirerPromptInstance

  /**
   * Get the current running instance of `enquirer`.
   */
  get instance(): EnquirerPromptInstance {
    return this.prompt
  }

  /**
   * Create a new prompt with `enquirer`.
   *
   * `enquirer` is a peer dependency that must be installed separately.
   */
  public async run<T = any>(options: EnquirerPromptOptions | EnquirerPromptOptions<true>[], settings?: EnquirerPromptSettings): Promise<T> {
    // assign default if there is single prompt
    /* istanbul ignore next */
    if (!Array.isArray(options)) {
      options = [{ ...options, name: 'default' }]
    } else if (options.length === 1) {
      options = options.map((option) => {
        return { ...option, name: 'default' }
      })
    }

    // assign default enquirer options
    options = options.map((option) => {
      return {
        onCancel: (): boolean => {
          // since this is event based we can not throw this directly else listr will never cleanup
          this.error = new PromptError('Cancelled prompt.')

          return true
        },
        ...option,
        stdout: (settings?.stdout ?? this.wrapper.stdout(ListrTaskEventType.PROMPT)) as NodeJS.WriteStream
      }
    })

    let enquirer: Enquirer

    /* istanbul ignore next */
    if (settings?.enquirer) {
      // injected enquirer
      enquirer = settings.enquirer
    } else {
      try {
        enquirer = await import('enquirer').then((imported) => (imported.default ? new imported.default() : new (imported as unknown as new () => Enquirer)()))
      } catch {
        this.reportFailed()

        throw new PromptError('Enquirer is a optional peer dependency that must be installed separately.')
      }
    }

    this.reportStarted()

    this.task.on(ListrTaskEventType.STATE, (event) => {
      if (event === ListrTaskState.SKIPPED && this.prompt && !this.error) {
        this.cancel({ throw: false })
      }
    })

    let response: Record<PropertyKey, any>

    try {
      response = (await enquirer.once('prompt', (prompt: EnquirerPromptInstance) => (this.prompt = prompt)).prompt(options as any)) as Record<PropertyKey, any>
    } catch(e: any) {
      this.reportFailed()

      // suppress "readline was closed" errors from enquirer in node.js 22+
      // this happens when the prompt is cancelled and readline is closed during cleanup
      if (e?.message?.includes('readline was closed') && this.error) {
        throw this.error
      }

      if (this.error) {
        throw this.error
      }

      throw e
    }

    this.reportCompleted()

    // return default name if it is single prompt
    if (options.length === 1) {
      return response.default
    } else {
      return response
    }
  }

  /**
   * Cancel the ongoing prompt.
   */
  public cancel(options?: EnquirerPromptCancelOptions): void {
    // there's no prompt, can't cancel
    if (!this.prompt || this.error) {
      return
    }

    try {
      if (options?.throw) {
        this.prompt.cancel()
      } else {
        this.prompt.submit()
      }
    } catch(error: any) {
      // Suppress "readline was closed" errors from enquirer in Node.js 22+
      // This is a known issue with enquirer and newer Node.js versions
      if (!error?.message?.includes('readline was closed')) {
        throw error
      }
    }

    this.reportFailed()
  }
}
