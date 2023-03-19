import{_ as a,W as o,X as c,Y as e,$ as t,Z as s,a2 as n,a5 as d,D as i}from"./framework-4c9bc095.js";const h={},l=d('<h1 id="class-processoutputhook" tabindex="-1"><a class="header-anchor" href="#class-processoutputhook" aria-hidden="true">#</a> Class: ProcessOutputHook</h1><h2 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h2><h3 id="method" tabindex="-1"><a class="header-anchor" href="#method" aria-hidden="true">#</a> method</h3><p>• <code>Private</code> <code>Readonly</code> <strong>method</strong>: (<code>buffer</code>: <code>string</code> | <code>Uint8Array</code>, <code>cb?</code>: (<code>err?</code>: <code>Error</code>) =&gt; <code>void</code>) =&gt; <code>boolean</code>(<code>str</code>: <code>string</code> | <code>Uint8Array</code>, <code>encoding?</code>: <code>BufferEncoding</code>, <code>cb?</code>: (<code>err?</code>: <code>Error</code>) =&gt; <code>void</code>) =&gt; <code>boolean</code></p><h4 id="type-declaration" tabindex="-1"><a class="header-anchor" href="#type-declaration" aria-hidden="true">#</a> Type declaration</h4><p>▸ (<code>buffer</code>, <code>cb?</code>): <code>boolean</code></p><p>Sends data on the socket. The second parameter specifies the encoding in the case of a string. It defaults to UTF8 encoding.</p><p>Returns <code>true</code> if the entire data was flushed successfully to the kernel buffer. Returns <code>false</code> if all or part of the data was queued in user memory.<code>&#39;drain&#39;</code> will be emitted when the buffer is again free.</p><p>The optional <code>callback</code> parameter will be executed when the data is finally written out, which may not be immediately.</p><p>See <code>Writable</code> stream <code>write()</code> method for more information.</p><p><strong><code>Since</code></strong></p><p>v0.1.90</p><h5 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h5><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>buffer</code></td><td style="text-align:left;"><code>string</code> | <code>Uint8Array</code></td></tr><tr><td style="text-align:left;"><code>cb?</code></td><td style="text-align:left;">(<code>err?</code>: <code>Error</code>) =&gt; <code>void</code></td></tr></tbody></table><h5 id="returns" tabindex="-1"><a class="header-anchor" href="#returns" aria-hidden="true">#</a> Returns</h5><p><code>boolean</code></p><p>▸ (<code>str</code>, <code>encoding?</code>, <code>cb?</code>): <code>boolean</code></p><h5 id="parameters-1" tabindex="-1"><a class="header-anchor" href="#parameters-1" aria-hidden="true">#</a> Parameters</h5><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>str</code></td><td style="text-align:left;"><code>string</code> | <code>Uint8Array</code></td></tr><tr><td style="text-align:left;"><code>encoding?</code></td><td style="text-align:left;"><code>BufferEncoding</code></td></tr><tr><td style="text-align:left;"><code>cb?</code></td><td style="text-align:left;">(<code>err?</code>: <code>Error</code>) =&gt; <code>void</code></td></tr></tbody></table><h5 id="returns-1" tabindex="-1"><a class="header-anchor" href="#returns-1" aria-hidden="true">#</a> Returns</h5><p><code>boolean</code></p><h4 id="defined-in" tabindex="-1"><a class="header-anchor" href="#defined-in" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:9</p><hr><h3 id="buffer" tabindex="-1"><a class="header-anchor" href="#buffer" aria-hidden="true">#</a> buffer</h3>',25),u=e("code",null,"Private",-1),p=e("strong",null,"buffer",-1),f=e("code",null,"ProcessOutputBuffer",-1),b=d('<h4 id="defined-in-1" tabindex="-1"><a class="header-anchor" href="#defined-in-1" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:10</p><hr><h3 id="stream" tabindex="-1"><a class="header-anchor" href="#stream" aria-hidden="true">#</a> stream</h3><p>• <code>Private</code> <strong>stream</strong>: <code>WriteStream</code></p><h4 id="defined-in-2" tabindex="-1"><a class="header-anchor" href="#defined-in-2" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:12</p><h2 id="constructors" tabindex="-1"><a class="header-anchor" href="#constructors" aria-hidden="true">#</a> Constructors</h2><h3 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> constructor</h3><p>• <strong>new ProcessOutputHook</strong>(<code>stream</code>)</p><h4 id="parameters-2" tabindex="-1"><a class="header-anchor" href="#parameters-2" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>stream</code></td><td style="text-align:left;"><code>WriteStream</code></td></tr></tbody></table><h4 id="defined-in-3" tabindex="-1"><a class="header-anchor" href="#defined-in-3" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:12</p><h2 id="accessors" tabindex="-1"><a class="header-anchor" href="#accessors" aria-hidden="true">#</a> Accessors</h2><h3 id="out" tabindex="-1"><a class="header-anchor" href="#out" aria-hidden="true">#</a> out</h3><p>• <code>get</code> <strong>out</strong>(): <code>WriteStream</code></p><h4 id="returns-2" tabindex="-1"><a class="header-anchor" href="#returns-2" aria-hidden="true">#</a> Returns</h4><p><code>WriteStream</code></p><h4 id="defined-in-4" tabindex="-1"><a class="header-anchor" href="#defined-in-4" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:16</p><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><h3 id="hijack" tabindex="-1"><a class="header-anchor" href="#hijack" aria-hidden="true">#</a> hijack</h3><p>▸ <strong>hijack</strong>(): <code>void</code></p><h4 id="returns-3" tabindex="-1"><a class="header-anchor" href="#returns-3" aria-hidden="true">#</a> Returns</h4><p><code>void</code></p><h4 id="defined-in-5" tabindex="-1"><a class="header-anchor" href="#defined-in-5" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:22</p><hr><h3 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> release</h3><p>▸ <strong>release</strong>(): <code>void</code></p><h4 id="returns-4" tabindex="-1"><a class="header-anchor" href="#returns-4" aria-hidden="true">#</a> Returns</h4><p><code>void</code></p><h4 id="defined-in-6" tabindex="-1"><a class="header-anchor" href="#defined-in-6" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:26</p><hr><h3 id="write" tabindex="-1"><a class="header-anchor" href="#write" aria-hidden="true">#</a> write</h3><p>▸ <strong>write</strong>(<code>...args</code>): <code>boolean</code></p><h4 id="parameters-3" tabindex="-1"><a class="header-anchor" href="#parameters-3" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>...args</code></td><td style="text-align:left;">[str: string | Uint8Array, encoding?: BufferEncoding, cb?: Function]</td></tr></tbody></table><h4 id="returns-5" tabindex="-1"><a class="header-anchor" href="#returns-5" aria-hidden="true">#</a> Returns</h4><p><code>boolean</code></p><h4 id="defined-in-7" tabindex="-1"><a class="header-anchor" href="#defined-in-7" aria-hidden="true">#</a> Defined in</h4><p>src/utils/process-output/process-output-hook.ts:40</p>',44);function g(x,m){const r=i("RouterLink");return o(),c("div",null,[l,e("p",null,[t("• "),u,t(),p,t(": "),s(r,{to:"/api/classes/ProcessOutputBuffer.html"},{default:n(()=>[f]),_:1})]),b])}const k=a(h,[["render",g],["__file","ProcessOutputHook.html.vue"]]);export{k as default};
