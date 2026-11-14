export interface VirtualTerminalOptions {
  columns: number
  rows: number
  /** The rows the stream reports, when they differ from the rows of the emulated terminal. */
  reportedRows?: number
  /**
   * Whether the emulated terminal reflows lines on resize. Without it, it truncates them, like classic xterm, urxvt, st, or GNU screen.
   *
   * @defaultValue `true`
   */
  reflow?: boolean
  /**
   * Whether erasing down from the top-left corner moves the rows on the screen into the scrollback first, like tmux does with its
   * default `scroll-on-clear` option.
   *
   * @defaultValue `false`
   */
  scrollOnClear?: boolean
}
