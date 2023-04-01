import { _ as e, W as t, X as i, a4 as p, Y as n, $ as s, Z as o, a5 as l, D as c } from './framework-4c9bc095.js'
const r = {},
  d = n(
    'p',
    null,
    [
      s('Conditional skip is another way of enabling a '),
      n('a', { href: '/api/interfaces/ListrTask.html#properties', target: '_blank' }, 'Task'),
      s(' depending on the given context. But the main difference between '),
      n('code', null, 'enable'),
      s(' and '),
      n('code', null, 'skip'),
      s(' is '),
      n('code', null, 'skip'),
      s(' will always render the given task. When the execution time comes, and it turns out that it should be skipped, it will render or mark it as skipped.')
    ],
    -1
  ),
  u = n(
    'div',
    { class: 'hint-container warning' },
    [
      n('p', { class: 'hint-container-title' }, 'Note'),
      n('p', null, 'Please pay attention to asynchronous operation while designing a context-enabled task list since it does not wait for any variable in the context.')
    ],
    -1
  ),
  k = { class: 'hint-container info' },
  h = n('p', { class: 'hint-container-title' }, 'Example', -1),
  v = { href: 'https://github.com/cenk1cenk2/listr2/tree/master/examples/task-skip.example.ts', target: '_blank', rel: 'noopener noreferrer' },
  b = l(
    `<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><h2 id="skip-inside-a-task" tabindex="-1"><a class="header-anchor" href="#skip-inside-a-task" aria-hidden="true">#</a> Skip inside a <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a></h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        task<span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token string">&#39;I am skipping this tasks for reasons.&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> concurrent<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="skip-conditionally-defining-the-task" tabindex="-1"><a class="header-anchor" href="#skip-conditionally-defining-the-task" aria-hidden="true">#</a> Skip conditionally defining the <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a></h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>skip <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will never execute.&#39;</span><span class="token punctuation">,</span>
      skip<span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span>skip<span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> concurrent<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="renderer" tabindex="-1"><a class="header-anchor" href="#renderer" aria-hidden="true">#</a> Renderer</h2><h3 id="defaultrenderer" tabindex="-1"><a class="header-anchor" href="#defaultrenderer" aria-hidden="true">#</a> <a href="/renderer/default.html" target="_blank">DefaultRenderer</a></h3><p>The default renderer has options where you can change how the skip messages are displayed.</p><details class="hint-container details"><summary>Details</summary><p>@include(../api/interfaces/DefaultRendererOptions.md{105-152})</p></details>`,
    9
  )
function m(g, f) {
  const a = c('ExternalLinkIcon')
  return t(), i('div', null, [d, p(' more '), u, n('div', k, [h, n('p', null, [s('You can find the related examples '), n('a', v, [s('here'), o(a)]), s('.')])]), b])
}
const x = e(r, [
  ['render', m],
  ['__file', 'skip.html.vue']
])
export { x as default }
