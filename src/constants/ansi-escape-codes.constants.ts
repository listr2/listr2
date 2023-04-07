/**
 * Indicates an UNICODE characters is coming up.
 */
export const ANSI_ESCAPE = '\u001B['

/**
 * Generic ANSI escape characters for terminal based operations.
 */
export const ANSI_ESCAPE_CODES = {
  CURSOR_HIDE: ANSI_ESCAPE + '?25l',
  CURSOR_SHOW: ANSI_ESCAPE + '?25h'
}
