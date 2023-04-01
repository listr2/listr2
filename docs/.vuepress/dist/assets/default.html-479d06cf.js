import { _ as t, W as r, X as s, a4 as n, Y as e, $ as a, a5 as i } from './framework-4c9bc095.js'
const o = {},
  d = e(
    'p',
    null,
    [
      e('a', { href: '/renderer/default.html', target: '_blank' }, 'DefaultRenderer'),
      a(' is the main renderer of '),
      e('code', null, 'listr2'),
      a(' and has been on showcase in the entry image.')
    ],
    -1
  ),
  l = i(
    '<p><a href="/renderer/default.html" target="_blank">DefaultRenderer</a> is intended for <code>TTY</code> environments with <code>vt100</code> terminal compatibility, where it updates the current update constantly depending on the changes in <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a>. This renderer has many options for customization, these options can be changed at <a href="/api/classes/Listr.html" target="_blank">Listr</a>, <a href="/task/subtasks.html" target="_blank">Subtask</a> or <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a> level.</p><p>This renderer uses <em>ProcessOutputHook</em> to take control of the terminal.</p><h2 id="renderer-options" tabindex="-1"><a class="header-anchor" href="#renderer-options" aria-hidden="true">#</a> Renderer Options</h2><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/DefaultRendererOptions.md)</p></details><h2 id="renderer-task-options" tabindex="-1"><a class="header-anchor" href="#renderer-task-options" aria-hidden="true">#</a> Renderer Task Options</h2><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/DefaultRendererTaskOptions.md)</p></details>',
    6
  )
function c(h, p) {
  return r(), s('div', null, [d, n(' more '), l])
}
const u = t(o, [
  ['render', c],
  ['__file', 'default.html.vue']
])
export { u as default }
