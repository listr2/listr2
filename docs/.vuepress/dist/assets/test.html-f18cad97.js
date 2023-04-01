import { _ as r, W as s, X as a, Y as e, $ as t, Z as o, a2 as i, a4 as d, D as l } from './framework-4c9bc095.js'
const c = {},
  h = e(
    'p',
    null,
    [
      e('a', { href: '/renderer/test.html', target: '_blank' }, 'TestRenderer'),
      t(' is intended to use in tests and provides a per-line JSON format output, that is configurable through the renderer options.')
    ],
    -1
  ),
  u = e('h2', { id: 'renderer-options', tabindex: '-1' }, [e('a', { class: 'header-anchor', href: '#renderer-options', 'aria-hidden': 'true' }, '#'), t(' Renderer Options')], -1),
  _ = e('details', { class: 'hint-container details' }, [e('summary', null, 'Details'), e('p', null, '@include(../api/interfaces/TestRendererOptions.md)')], -1)
function p(m, f) {
  const n = l('RouterLink')
  return (
    s(),
    a('div', null, [
      h,
      e('p', null, [
        t('This JSON format specific can be seen '),
        o(n, { to: '/api/classes/TestRendererEvent.html' }, { default: i(() => [t('here')]), _: 1 }),
        t(', but needs a better understanding of internal workings of this library.')
      ]),
      d(' more '),
      u,
      _
    ])
  )
}
const k = r(c, [
  ['render', p],
  ['__file', 'test.html.vue']
])
export { k as default }
