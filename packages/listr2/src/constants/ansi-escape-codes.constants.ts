/**
 * Indicates an UNICODE characters is coming up.
 */
export const ANSI_ESCAPE = '\u001B['

/**
 * Generic ANSI escape characters for terminal based operations.
 */
export const ANSI_ESCAPE_CODES = {
  CURSOR_HIDE: ANSI_ESCAPE + '?25l',
  CURSOR_SHOW: ANSI_ESCAPE + '?25h',
  CURSOR_UP: ANSI_ESCAPE + '1A',
  CURSOR_LEFT: ANSI_ESCAPE + 'G',
  ERASE_LINE: ANSI_ESCAPE + '2K',
  /** Starts a synchronized update: the terminal shows nothing written after it until `SYNC_END`. */
  SYNC_START: ANSI_ESCAPE + '?2026h',
  /** Ends a synchronized update, and shows everything written since `SYNC_START` at once. */
  SYNC_END: ANSI_ESCAPE + '?2026l'
}
