import { _ as s, W as o, X as n, Y as e, Z as d, a2 as a, a5 as r, D as i } from './framework-4c9bc095.js'
const h = {},
  c = r(
    '<h1 id="class-processoutput" tabindex="-1"><a class="header-anchor" href="#class-processoutput" aria-hidden="true">#</a> Class: ProcessOutput</h1><h2 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h2><h3 id="stream" tabindex="-1"><a class="header-anchor" href="#stream" aria-hidden="true">#</a> stream</h3><p>• <code>Readonly</code> <strong>stream</strong>: <code>Object</code></p><h4 id="type-declaration" tabindex="-1"><a class="header-anchor" href="#type-declaration" aria-hidden="true">#</a> Type declaration</h4>',
    5
  ),
  l = e('thead', null, [e('tr', null, [e('th', { style: { 'text-align': 'left' } }, 'Name'), e('th', { style: { 'text-align': 'left' } }, 'Type')])], -1),
  u = e('td', { style: { 'text-align': 'left' } }, [e('code', null, 'stdout')], -1),
  p = { style: { 'text-align': 'left' } },
  f = e('code', null, 'ProcessOutputStream', -1),
  x = e('td', { style: { 'text-align': 'left' } }, [e('code', null, 'stderr')], -1),
  b = { style: { 'text-align': 'left' } },
  g = e('code', null, 'ProcessOutputStream', -1),
  y = r(
    '<h4 id="defined-in" tabindex="-1"><a class="header-anchor" href="#defined-in" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:8</p><h2 id="constructors" tabindex="-1"><a class="header-anchor" href="#constructors" aria-hidden="true">#</a> Constructors</h2><h3 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> constructor</h3><p>• <strong>new ProcessOutput</strong>(<code>stdout?</code>, <code>stderr?</code>)</p><h4 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Default value</th></tr></thead><tbody><tr><td style="text-align:left;"><code>stdout</code></td><td style="text-align:left;"><code>WriteStream</code></td><td style="text-align:left;"><code>process.stdout</code></td></tr><tr><td style="text-align:left;"><code>stderr</code></td><td style="text-align:left;"><code>WriteStream</code></td><td style="text-align:left;"><code>process.stderr</code></td></tr></tbody></table><h4 id="defined-in-1" tabindex="-1"><a class="header-anchor" href="#defined-in-1" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:13</p><h2 id="accessors" tabindex="-1"><a class="header-anchor" href="#accessors" aria-hidden="true">#</a> Accessors</h2><h3 id="stdout" tabindex="-1"><a class="header-anchor" href="#stdout" aria-hidden="true">#</a> stdout</h3><p>• <code>get</code> <strong>stdout</strong>(): <code>WriteStream</code></p><h4 id="returns" tabindex="-1"><a class="header-anchor" href="#returns" aria-hidden="true">#</a> Returns</h4><p><code>WriteStream</code></p><h4 id="defined-in-2" tabindex="-1"><a class="header-anchor" href="#defined-in-2" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:20</p><hr><h3 id="stderr" tabindex="-1"><a class="header-anchor" href="#stderr" aria-hidden="true">#</a> stderr</h3><p>• <code>get</code> <strong>stderr</strong>(): <code>WriteStream</code></p><h4 id="returns-1" tabindex="-1"><a class="header-anchor" href="#returns-1" aria-hidden="true">#</a> Returns</h4><p><code>WriteStream</code></p><h4 id="defined-in-3" tabindex="-1"><a class="header-anchor" href="#defined-in-3" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:24</p><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><h3 id="hijack" tabindex="-1"><a class="header-anchor" href="#hijack" aria-hidden="true">#</a> hijack</h3><p>▸ <strong>hijack</strong>(): <code>void</code></p><h4 id="returns-2" tabindex="-1"><a class="header-anchor" href="#returns-2" aria-hidden="true">#</a> Returns</h4><p><code>void</code></p><h4 id="defined-in-4" tabindex="-1"><a class="header-anchor" href="#defined-in-4" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:28</p><hr><h3 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> release</h3><p>▸ <strong>release</strong>(): <code>void</code></p><h4 id="returns-3" tabindex="-1"><a class="header-anchor" href="#returns-3" aria-hidden="true">#</a> Returns</h4><p><code>void</code></p><h4 id="defined-in-5" tabindex="-1"><a class="header-anchor" href="#defined-in-5" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:33</p><hr><h3 id="tostdout" tabindex="-1"><a class="header-anchor" href="#tostdout" aria-hidden="true">#</a> toStdout</h3><p>▸ <strong>toStdout</strong>(<code>buffer</code>, <code>eol?</code>): <code>boolean</code></p><h4 id="parameters-1" tabindex="-1"><a class="header-anchor" href="#parameters-1" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Default value</th></tr></thead><tbody><tr><td style="text-align:left;"><code>buffer</code></td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;"><code>undefined</code></td></tr><tr><td style="text-align:left;"><code>eol</code></td><td style="text-align:left;"><code>boolean</code></td><td style="text-align:left;"><code>true</code></td></tr></tbody></table><h4 id="returns-4" tabindex="-1"><a class="header-anchor" href="#returns-4" aria-hidden="true">#</a> Returns</h4><p><code>boolean</code></p><h4 id="defined-in-6" tabindex="-1"><a class="header-anchor" href="#defined-in-6" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:58</p><hr><h3 id="tostderr" tabindex="-1"><a class="header-anchor" href="#tostderr" aria-hidden="true">#</a> toStderr</h3><p>▸ <strong>toStderr</strong>(<code>buffer</code>, <code>eol?</code>): <code>boolean</code></p><h4 id="parameters-2" tabindex="-1"><a class="header-anchor" href="#parameters-2" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Default value</th></tr></thead><tbody><tr><td style="text-align:left;"><code>buffer</code></td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;"><code>undefined</code></td></tr><tr><td style="text-align:left;"><code>eol</code></td><td style="text-align:left;"><code>boolean</code></td><td style="text-align:left;"><code>true</code></td></tr></tbody></table><h4 id="returns-5" tabindex="-1"><a class="header-anchor" href="#returns-5" aria-hidden="true">#</a> Returns</h4><p><code>boolean</code></p><h4 id="defined-in-7" tabindex="-1"><a class="header-anchor" href="#defined-in-7" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output.ts:66</p>',
    55
  )
function m(_, S) {
  const t = i('RouterLink')
  return (
    o(),
    n('div', null, [
      c,
      e('table', null, [
        l,
        e('tbody', null, [
          e('tr', null, [u, e('td', p, [d(t, { to: '/api/classes/ProcessOutputStream.html' }, { default: a(() => [f]), _: 1 })])]),
          e('tr', null, [x, e('td', b, [d(t, { to: '/api/classes/ProcessOutputStream.html' }, { default: a(() => [g]), _: 1 })])])
        ])
      ]),
      y
    ])
  )
}
const P = s(h, [
  ['render', m],
  ['__file', 'ProcessOutput.html.vue']
])
export { P as default }
