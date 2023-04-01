import { _ as a, W as t, X as n, a4 as i, Y as e, $ as r, a5 as s } from './framework-4c9bc095.js'
const o = {},
  d = e(
    'p',
    null,
    [
      e('a', { href: '/renderer/simple.html', target: '_blank' }, 'SimpleRenderer'),
      r(' is an alternative to '),
      e('a', { href: '/renderer/default.html', target: '_blank' }, 'DefaultRenderer'),
      r(', which does not directly update the terminal but works more in a logger-like manner.')
    ],
    -1
  ),
  l = s(
    '<p><a href="/renderer/simple.html" target="_blank">SimpleRenderer</a> still requires <code>vt100</code> terminal compatibility if you are using prompts, but can work in <code>non-TTY</code> environments other than that.</p><h2 id="renderer-options" tabindex="-1"><a class="header-anchor" href="#renderer-options" aria-hidden="true">#</a> Renderer Options</h2><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/SimpleRendererOptions.md)</p></details><h2 id="renderer-task-options" tabindex="-1"><a class="header-anchor" href="#renderer-task-options" aria-hidden="true">#</a> Renderer Task Options</h2><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/SimpleRendererTaskOptions.md)</p></details>',
    5
  )
function c(m, p) {
  return t(), n('div', null, [d, i(' more '), l])
}
const u = a(o, [
  ['render', c],
  ['__file', 'simple.html.vue']
])
export { u as default }
