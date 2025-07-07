import { ListrEnvironmentVariables } from '@constants'

export function isUnicodeSupported(): boolean {
  /* istanbul ignore next */
  return (
    !!process.env[ListrEnvironmentVariables.FORCE_UNICODE] ||
    process.platform !== 'win32' ||
    !!process.env.CI ||
    !!process.env.WT_SESSION ||
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERM === 'xterm-256color' ||
    process.env.TERM === 'alacritty'
  )
}
