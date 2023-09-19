import { isUnicodeSupported } from '@utils'

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

export type Figures = typeof FIGURES_MAIN

export const figures: Figures = isUnicodeSupported() ? FIGURES_MAIN : FIGURES_FALLBACK
