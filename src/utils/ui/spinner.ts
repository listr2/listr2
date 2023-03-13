import { isUnicodeSupported } from '@utils/environment'

/* istanbul ignore next */
export class Spinner {
  private id?: NodeJS.Timeout
  private readonly spinner: string[] = !isUnicodeSupported() ? [ '-', '\\', '|', '/' ] : [ '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ]

  private spinnerPosition = 0

  public spin (): void {
    this.spinnerPosition = ++this.spinnerPosition % this.spinner.length
  }

  public fetch (): string {
    return this.spinner[this.spinnerPosition]
  }

  public isRunning (): boolean {
    return !!this.id
  }

  public start (cb?: () => void): void {
    this.id = setInterval(() => {
      this.spin()

      if (cb) {
        cb()
      }
    }, 100)
  }

  public stop (): void {
    clearInterval(this.id)

    if (this.id) {
      this.id = undefined
    }
  }
}
