import { _ as a, W as s, X as t, a4 as n, Y as e, $ as r, a5 as o } from './framework-4c9bc095.js'
const d = {},
  i = e(
    'p',
    null,
    [
      e('a', { href: '/renderer/verbose.html', target: '_blank' }, 'VerboseRenderer'),
      r(' is the default '),
      e('code', null, 'non-TTY'),
      r(' renderer and works mostly like a logger.')
    ],
    -1
  ),
  l = o(
    '<h2 id="renderer-options" tabindex="-1"><a class="header-anchor" href="#renderer-options" aria-hidden="true">#</a> Renderer Options</h2><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/VerboseRendererOptions.md)</p></details><h2 id="renderer-task-options" tabindex="-1"><a class="header-anchor" href="#renderer-task-options" aria-hidden="true">#</a> Renderer Task Options</h2><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/VerboseRendererTaskOptions.md)</p></details>',
    4
  )
function c(h, m) {
  return s(), t('div', null, [i, n(' more '), l])
}
const _ = a(d, [
  ['render', c],
  ['__file', 'verbose.html.vue']
])
export { _ as default }
