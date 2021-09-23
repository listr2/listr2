import { isUnicodeSupported } from './is-unicode-supported'

const FIGURES_MAIN = {
  warning: '⚠',
  cross: '✖',
  arrowDown: '↓',
  tick: '✔',
  arrowRight: '→',
  pointer: '❯',
  checkboxOn: '☒',
  arrowLeft: '←',
  squareSmallFilled: '◼',
  pointerSmall: '›'
}

const FIGURES_FALLBACK = {
  ...FIGURES_MAIN,
  warning: '‼',
  cross: '×',
  tick: '√',
  pointer: '>',
  checkboxOn: '[×]',
  squareSmallFilled: '■'
}

export const figures = isUnicodeSupported() ? FIGURES_MAIN : FIGURES_FALLBACK
