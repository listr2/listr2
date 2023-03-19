import{_ as i,W as o,X as p,a4 as c,Y as s,$ as n,Z as t,a2 as e,a5 as l,D as r}from"./framework-4c9bc095.js";const u={},d=s("p",null,[s("code",null,"listr2"),n(" is a collection of tasks that are housed in a single instance as we have just created. Therefore the task is the smallest building block of your task list.")],-1),k=s("h2",{id:"task",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#task","aria-hidden":"true"},"#"),n(" Task")],-1),v=s("code",null,"task",-1),b=l(`<p>A task can be in the form of, which is ensured by the typings:</p><ul><li><code>Function</code>/<code>Promise</code></li><li><a href="/api/classes/Listr.html" target="_blank">Listr</a> <sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></li><li><code>Stream</code></li><li><code>Observable</code></li></ul><h2 id="creating-your-first-task" tabindex="-1"><a class="header-anchor" href="#creating-your-first-task" aria-hidden="true">#</a> Creating Your First Task</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Listr <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;listr2&#39;</span>

<span class="token keyword">interface</span> <span class="token class-name">Ctx</span> <span class="token punctuation">{</span>
  <span class="token comment">/* some variables for internal use */</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr<span class="token operator">&lt;</span>Ctx<span class="token operator">&gt;</span></span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// perform some operations</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/* options */</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="append-to-existing-listr" tabindex="-1"><a class="header-anchor" href="#append-to-existing-listr" aria-hidden="true">#</a> Append To Existing <a href="/api/classes/Listr.html" target="_blank">Listr</a></h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Listr <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;listr2&#39;</span>

<span class="token keyword">interface</span> <span class="token class-name">Ctx</span> <span class="token punctuation">{</span>
  <span class="token comment">/* some variables for internal use */</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr<span class="token operator">&lt;</span>Ctx<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">/* options */</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

tasks<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
    task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// perform some operations</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

tasks<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
    task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// perform some operations</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr class="footnotes-sep">`,7),m={class:"footnotes"},h={class:"footnotes-list"},f={id:"footnote1",class:"footnote-item"},g=s("code",null,"task.newListr",-1),w=s("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1);function y(_,x){const a=r("RouterLink");return o(),p("div",null,[d,c(" more "),k,s("p",null,[n("A single task is an object with the "),t(a,{to:"/api/interfaces/ListrTask.html#properties"},{default:e(()=>[n("given properties")]),_:1}),n(", where the "),v,n(" is the main attraction that the desired function gets executed.")]),b,s("section",m,[s("ol",h,[s("li",f,[s("p",null,[n("A subtask must be created through the helper function of "),g,n(" since there are injections of singleton instances of parent task performed while creating a subtask. Please check out the "),t(a,{to:"/task/subtasks.html"},{default:e(()=>[n("related section")]),_:1}),n(". "),w])])])])])}const T=i(u,[["render",y],["__file","task.html.vue"]]);export{T as default};
