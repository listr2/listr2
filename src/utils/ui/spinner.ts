import { isUnicodeSupported } from '@utils/environment'

export class Spinner {
  private readonly spinner: string[] = !isUnicodeSupported() ? [ '-', '\\', '|', '/' ] : [ '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ]

  private spinnerPosition = 0

  public spin (): void {
    this.spinnerPosition = ++this.spinnerPosition % this.spinner.length
  }

  public fetch (): string {
    return this.spinner[this.spinnerPosition]
  }
}
