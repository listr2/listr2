import{_ as i,W as n,X as o,Y as e,$ as t,Z as d,a5 as r,D as c}from"./framework-4c9bc095.js";const h={},s=r('<h1 id="class-prompterror" tabindex="-1"><a class="header-anchor" href="#class-prompterror" aria-hidden="true">#</a> Class: PromptError</h1><p>The internal error handling mechanism for prompts only.</p><h2 id="hierarchy" tabindex="-1"><a class="header-anchor" href="#hierarchy" aria-hidden="true">#</a> Hierarchy</h2><ul><li><p><code>Error</code></p><p>↳ <strong><code>PromptError</code></strong></p></li></ul><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><h3 id="capturestacktrace" tabindex="-1"><a class="header-anchor" href="#capturestacktrace" aria-hidden="true">#</a> captureStackTrace</h3><p>▸ <code>Static</code> <strong>captureStackTrace</strong>(<code>targetObject</code>, <code>constructorOpt?</code>): <code>void</code></p><p>Create .stack property on a target object</p><h4 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>targetObject</code></td><td style="text-align:left;"><code>object</code></td></tr><tr><td style="text-align:left;"><code>constructorOpt?</code></td><td style="text-align:left;"><code>Function</code></td></tr></tbody></table><h4 id="returns" tabindex="-1"><a class="header-anchor" href="#returns" aria-hidden="true">#</a> Returns</h4><p><code>void</code></p><h4 id="inherited-from" tabindex="-1"><a class="header-anchor" href="#inherited-from" aria-hidden="true">#</a> Inherited from</h4><p>Error.captureStackTrace</p><h4 id="defined-in" tabindex="-1"><a class="header-anchor" href="#defined-in" aria-hidden="true">#</a> Defined in</h4><p>node_modules/@types/node/globals.d.ts:4</p><h2 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h2><h3 id="preparestacktrace" tabindex="-1"><a class="header-anchor" href="#preparestacktrace" aria-hidden="true">#</a> prepareStackTrace</h3><p>▪ <code>Static</code> <code>Optional</code> <strong>prepareStackTrace</strong>: (<code>err</code>: <code>Error</code>, <code>stackTraces</code>: <code>CallSite</code>[]) =&gt; <code>any</code></p><h4 id="type-declaration" tabindex="-1"><a class="header-anchor" href="#type-declaration" aria-hidden="true">#</a> Type declaration</h4><p>▸ (<code>err</code>, <code>stackTraces</code>): <code>any</code></p><p>Optional override for formatting stack traces</p><p><strong><code>See</code></strong></p>',23),l={href:"https://v8.dev/docs/stack-trace-api#customizing-stack-traces",target:"_blank",rel:"noopener noreferrer"},p=r('<h5 id="parameters-1" tabindex="-1"><a class="header-anchor" href="#parameters-1" aria-hidden="true">#</a> Parameters</h5><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>err</code></td><td style="text-align:left;"><code>Error</code></td></tr><tr><td style="text-align:left;"><code>stackTraces</code></td><td style="text-align:left;"><code>CallSite</code>[]</td></tr></tbody></table><h5 id="returns-1" tabindex="-1"><a class="header-anchor" href="#returns-1" aria-hidden="true">#</a> Returns</h5><p><code>any</code></p><h4 id="inherited-from-1" tabindex="-1"><a class="header-anchor" href="#inherited-from-1" aria-hidden="true">#</a> Inherited from</h4><p>Error.prepareStackTrace</p><h4 id="defined-in-1" tabindex="-1"><a class="header-anchor" href="#defined-in-1" aria-hidden="true">#</a> Defined in</h4><p>node_modules/@types/node/globals.d.ts:11</p><hr><h3 id="stacktracelimit" tabindex="-1"><a class="header-anchor" href="#stacktracelimit" aria-hidden="true">#</a> stackTraceLimit</h3><p>▪ <code>Static</code> <strong>stackTraceLimit</strong>: <code>number</code></p><h4 id="inherited-from-2" tabindex="-1"><a class="header-anchor" href="#inherited-from-2" aria-hidden="true">#</a> Inherited from</h4><p>Error.stackTraceLimit</p><h4 id="defined-in-2" tabindex="-1"><a class="header-anchor" href="#defined-in-2" aria-hidden="true">#</a> Defined in</h4><p>node_modules/@types/node/globals.d.ts:13</p><hr><h3 id="name" tabindex="-1"><a class="header-anchor" href="#name" aria-hidden="true">#</a> name</h3><p>• <strong>name</strong>: <code>string</code></p><h4 id="inherited-from-3" tabindex="-1"><a class="header-anchor" href="#inherited-from-3" aria-hidden="true">#</a> Inherited from</h4>',19),f={href:"http://Error.name",target:"_blank",rel:"noopener noreferrer"},m=r('<h4 id="defined-in-3" tabindex="-1"><a class="header-anchor" href="#defined-in-3" aria-hidden="true">#</a> Defined in</h4><p>node_modules/typescript/lib/lib.es5.d.ts:1054</p><hr><h3 id="message" tabindex="-1"><a class="header-anchor" href="#message" aria-hidden="true">#</a> message</h3><p>• <strong>message</strong>: <code>string</code></p><h4 id="inherited-from-4" tabindex="-1"><a class="header-anchor" href="#inherited-from-4" aria-hidden="true">#</a> Inherited from</h4><p>Error.message</p><h4 id="defined-in-4" tabindex="-1"><a class="header-anchor" href="#defined-in-4" aria-hidden="true">#</a> Defined in</h4><p>node_modules/typescript/lib/lib.es5.d.ts:1055</p><hr><h3 id="stack" tabindex="-1"><a class="header-anchor" href="#stack" aria-hidden="true">#</a> stack</h3><p>• <code>Optional</code> <strong>stack</strong>: <code>string</code></p><h4 id="inherited-from-5" tabindex="-1"><a class="header-anchor" href="#inherited-from-5" aria-hidden="true">#</a> Inherited from</h4><p>Error.stack</p><h4 id="defined-in-5" tabindex="-1"><a class="header-anchor" href="#defined-in-5" aria-hidden="true">#</a> Defined in</h4><p>node_modules/typescript/lib/lib.es5.d.ts:1056</p><h2 id="constructors" tabindex="-1"><a class="header-anchor" href="#constructors" aria-hidden="true">#</a> Constructors</h2><h3 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> constructor</h3><p>• <strong>new PromptError</strong>(<code>message</code>)</p><h4 id="parameters-2" tabindex="-1"><a class="header-anchor" href="#parameters-2" aria-hidden="true">#</a> Parameters</h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>message</code></td><td style="text-align:left;"><code>string</code></td></tr></tbody></table><h4 id="overrides" tabindex="-1"><a class="header-anchor" href="#overrides" aria-hidden="true">#</a> Overrides</h4><p>Error.constructor</p><h4 id="defined-in-6" tabindex="-1"><a class="header-anchor" href="#defined-in-6" aria-hidden="true">#</a> Defined in</h4><p>src/interfaces/listr-error.interface.ts:46</p>',25);function u(b,g){const a=c("ExternalLinkIcon");return n(),o("div",null,[s,e("p",null,[e("a",l,[t("https://v8.dev/docs/stack-trace-api#customizing-stack-traces"),d(a)])]),p,e("p",null,[e("a",f,[t("Error.name"),d(a)])]),m])}const y=i(h,[["render",u],["__file","PromptError.html.vue"]]);export{y as default};