import{_ as r,W as d,X as u,a4 as k,Y as n,$ as s,Z as a,a2 as o,a5 as e,D as t}from"./framework-4c9bc095.js";const v={},b=e('<p>Exceptions that occur while running the <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a> will be handled internally through <a href="/api/classes/Listr.html" target="_blank">Listr</a>. You can throw errors out of the tasks to show they are unsuccessful or stop execution. This can further be customized at <a href="/api/classes/Listr.html" target="_blank">Listr</a> or <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a> level.</p><p>Errors will yield a visual output on the terminal, and will also handle the <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a> that has failed depending on the configuration. If an application needs to quit prematurely and fail a specific task just throw out an <code>Error</code>.</p><p>The default behavior is if any of the tasks have failed, it will deem itself as unsuccessful and exit. This behavior can be changed with the <code>exitOnError</code> option. If the <code>exitOnError</code> is <code>true</code>, the first error encountered will be thrown out again.</p>',3),h=n("div",{class:"hint-container warning"},[n("p",{class:"hint-container-title"},"Note"),n("p",null,[s("An "),n("code",null,"Error"),s(" should be always a real "),n("code",null,"Error"),s(" type extended from the JavaScript/Typescript "),n("code",null,"Error"),s(" class.")])],-1),m={class:"hint-container info"},f=n("p",{class:"hint-container-title"},"Example",-1),g={href:"https://github.com/cenk1cenk2/listr2/tree/master/examples/error-handling.example.ts",target:"_blank",rel:"noopener noreferrer"},w=e(`<h2 id="throwing-a-error" tabindex="-1"><a class="header-anchor" href="#throwing-a-error" aria-hidden="true">#</a> Throwing a Error</h2><p>Throwing an error will stop any further action of not yet started tasks whether it is in running with the <code>concurrent</code> flag or not.</p><div class="hint-container info"><p class="hint-container-title">Info</p><p>You don&#39;t have to catch and collect errors explicitly since they will always be collected by <a href="/api/classes/Listr.html" target="_blank">Listr</a>.</p></div><div class="hint-container warning"><p class="hint-container-title">Note</p><p>Be aware that the execution will only stop after the error is thrown out. This can kill any asynchronous action prematurely.</p></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will fail.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;This task failed after 2 seconds.&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will never execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        task<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;I will change my title if this executes.&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> concurrent<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="changing-the-behavior" tabindex="-1"><a class="header-anchor" href="#changing-the-behavior" aria-hidden="true">#</a> Changing the Behavior</h2><h3 id="per-listr" tabindex="-1"><a class="header-anchor" href="#per-listr" aria-hidden="true">#</a> Per <a href="/api/classes/Listr.html" target="_blank">Listr</a></h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will fail.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;This task failed after 2 seconds.&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        task<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;I will change my title if this executes.&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> concurrent<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> exitOnError<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="per-subtask" tabindex="-1"><a class="header-anchor" href="#per-subtask" aria-hidden="true">#</a> Per <a href="/task/subtasks.html" target="_blank">Subtask</a></h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute and not quit on errors.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> Listr <span class="token operator">=&gt;</span>
        task<span class="token punctuation">.</span><span class="token function">newListr</span><span class="token punctuation">(</span>
          <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              title<span class="token operator">:</span> <span class="token string">&#39;This is a subtask.&#39;</span><span class="token punctuation">,</span>
              task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;I have failed [0]&#39;</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              title<span class="token operator">:</span> <span class="token string">&#39;This is yet an another subtask and it will run.&#39;</span><span class="token punctuation">,</span>
              task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                task<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;I have succeeded.&#39;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span> exitOnError<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;I will exit on error since I am a direct child of parent task.&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> concurrent<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> exitOnError<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><div class="highlight-line"> </div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="per-task" tabindex="-1"><a class="header-anchor" href="#per-task" aria-hidden="true">#</a> Per <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a></h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will fail.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;This task failed after 2 seconds.&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      exitOnError<span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;This task will execute.&#39;</span><span class="token punctuation">,</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>_<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        task<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;I will change my title if this executes.&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    concurrent<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    exitOnError<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line"> </div><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="renderer" tabindex="-1"><a class="header-anchor" href="#renderer" aria-hidden="true">#</a> Renderer</h2><h3 id="defaultrenderer" tabindex="-1"><a class="header-anchor" href="#defaultrenderer" aria-hidden="true">#</a> <a href="/renderer/default.html" target="_blank">DefaultRenderer</a></h3><p>Default renderer has options where you can change how the errors are displayed.</p><details class="hint-container details"><summary>Details</summary><h3 id="showerrormessage" tabindex="-1"><a class="header-anchor" href="#showerrormessage" aria-hidden="true">#</a> showErrorMessage</h3><p>• <code>Optional</code> <strong>showErrorMessage</strong>: <code>boolean</code></p><p>shows the thrown error message or show the original title of the task, this will also disable collapseErrors mode You can disable showing the error messages, even though you passed in a message by settings this option, if you want to keep the original task title intact.</p><p><strong><code>Default</code></strong></p><p>true</p><h4 id="defined-in" tabindex="-1"><a class="header-anchor" href="#defined-in" aria-hidden="true">#</a> Defined in</h4><p>src/renderer/default/renderer.interface.ts:67</p><hr><h3 id="collapseerrors" tabindex="-1"><a class="header-anchor" href="#collapseerrors" aria-hidden="true">#</a> collapseErrors</h3><p>• <code>Optional</code> <strong>collapseErrors</strong>: <code>boolean</code></p><p>collapse error messages into a single message and overwrite the task title</p><p><strong><code>Default</code></strong></p><p>true</p><h4 id="defined-in-1" tabindex="-1"><a class="header-anchor" href="#defined-in-1" aria-hidden="true">#</a> Defined in</h4><p>src/renderer/default/renderer.interface.ts:73</p></details><h2 id="collected-errors" tabindex="-1"><a class="header-anchor" href="#collected-errors" aria-hidden="true">#</a> Collected Errors</h2><p>Errors from the <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a> are collected inside an array in the main <a href="/api/classes/Listr.html" target="_blank">Listr</a> task list as <code>tasks.error</code> where <code>tasks</code> is the <a href="/api/classes/Listr.html" target="_blank">Listr</a> class. Since there are options to ignore some errors on cases like <code>exitOnError</code>, or the ability to retry the given task through <code>task.retry</code>, encountered errors can be swallowed while the execution. To deal with those swallowed errors, all the errors that are encountered even though it does not stops the execution gets collected through this property.</p>`,18),y={id:"modes-615",tabindex:"-1"},_=n("a",{class:"header-anchor",href:"#modes-615","aria-hidden":"true"},"#",-1),x=n("a",{href:"https://github.com/cenk1cenk2/listr2/issues/615",target:"_blank"},"#615",-1),E=e('<p>Error collection now has three modes to choose from which are, <code>false</code>, <code>minimal</code> and <code>full</code>. This can be set through per <a href="/api/interfaces/ListrTask.html#properties" target="_blank">Task</a> in the <a href="/api/classes/Listr.html" target="_blank">Listr</a> options with the key <code>collectErrors</code>.</p><p>Due to potential memory leaks from cloning the context and task to the <code>ListrError</code>, default mode is <code>minimal</code>, which will only collect where the error has occurred, when it has been encountered and what the <code>error.message</code> is.</p><p>If you want to fetch the full information for debugging you can set the mode to <code>full</code>. This will also clone the current context and task to the <code>ListrError</code>.</p><p>You can disable the error collection completely by setting it to <code>false</code>.</p><h3 id="listrerror" tabindex="-1"><a class="header-anchor" href="#listrerror" aria-hidden="true">#</a> ListrError</h3>',5),T=n("code",null,"ListrError",-1),L=n("code",null,"Error",-1),O=n("h3",{id:"listrerrortypes",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#listrerrortypes","aria-hidden":"true"},"#"),s(" ListrErrorTypes")],-1),I=n("code",null,"ListrError",-1),F=n("code",null,"ListrErrorTypes",-1),D=e(`<h3 id="methodology" tabindex="-1"><a class="header-anchor" href="#methodology" aria-hidden="true">#</a> Methodology</h3><p>The order of the array <code>tasks.error</code> where <code>tasks</code> is the <a href="/api/classes/Listr.html" target="_blank">Listr</a> class, represents the order of errors that are encountered.</p><p>To keep the error collection mechanism simple and predictable, it might also process the errors coming from the subtasks as well.</p><p>For example, the following example will clear some things up about the given mindset.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Listr</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span>_<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token operator">:</span> Listr <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> task<span class="token punctuation">.</span><span class="token function">newListr</span><span class="token punctuation">(</span>
          <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              task<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;3&#39;</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              task<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;4&#39;</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span> exitOnError<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      task<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> exitOnError<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">await</span> tasks<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>errors<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),A={class:"hint-container details"},R=e(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  Error: <span class="token number">1</span>
      at Task.taskFn <span class="token punctuation">(</span>file:///home/cenk/development/listr2/examples/docs/task/error-handling/collection.ts:8:15<span class="token punctuation">)</span>
      at Task.run <span class="token punctuation">(</span>file:///home/cenk/development/listr2/src/lib/task.ts:274:35<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    error: Error: <span class="token number">1</span>
        at Task.taskFn <span class="token punctuation">(</span>file:///home/cenk/development/listr2/examples/docs/task/error-handling/collection.ts:8:15<span class="token punctuation">)</span>
        at Task.run <span class="token punctuation">(</span>file:///home/cenk/development/listr2/src/lib/task.ts:274:35<span class="token punctuation">)</span>,
    type: <span class="token string">&#39;HAS_FAILED_WITHOUT_ERROR&#39;</span>,
    task: Task <span class="token punctuation">{</span>
      emitter: <span class="token punctuation">[</span>EventEmitter<span class="token punctuation">]</span>,
      listr: <span class="token punctuation">[</span>Listr<span class="token punctuation">]</span>,
      task: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      options: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      rendererOptions: <span class="token punctuation">{</span><span class="token punctuation">}</span>,
      id: <span class="token string">&#39;9.ad307ebe93ea0.4269f841e24df.2588cd95ab791.ae567d9361f1.f27f1ef34dd6f.b24bffdcc5657.5cfa52399321c.721f69395564-6.d0e7bbfc0e292.8e7c505903a49.53799a1bc0bc5.f5f73c51ee35-49.74044ba5197fa.77674ded24f1a.4f01f298c6ef-3c.a0f40837cc841.24207ee189742.d8a97eb8f794-6.0ae10becd3eab.639b7f63a2c5d.3e8b80afee846.790c00483fa45.0d3f9c957b7cf.aa1659bc48fcf.22d6cb0bf4bc5.690d6bc39b7d1.25fdd6dc46a57.75cd06727f
3a0.2adcccf5de6bd.f7bc15515ce&#39;</span>,
      state: <span class="token string">&#39;FAILED&#39;</span>,
      subtasks: undefined,
      title: undefined,
      initialTitle: undefined,
      output: undefined,
      retry: undefined,
      message: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      rendererTaskOptions: undefined,
      prompt: undefined,
      parent: undefined,
      enabled: true,
      taskFn: <span class="token punctuation">[</span>Function: task<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>,
    path: <span class="token string">&#39;&#39;</span>,
    ctx: undefined,
    name: <span class="token string">&#39;ListrError&#39;</span>
  <span class="token punctuation">}</span>,
  Error: <span class="token number">3</span>
      at Task.taskFn <span class="token punctuation">(</span>file:///home/cenk/development/listr2/examples/docs/task/error-handling/collection.ts:17:23<span class="token punctuation">)</span>
      at Task.run <span class="token punctuation">(</span>file:///home/cenk/development/listr2/src/lib/task.ts:274:35<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    error: Error: <span class="token number">3</span>
        at Task.taskFn <span class="token punctuation">(</span>file:///home/cenk/development/listr2/examples/docs/task/error-handling/collection.ts:17:23<span class="token punctuation">)</span>
        at Task.run <span class="token punctuation">(</span>file:///home/cenk/development/listr2/src/lib/task.ts:274:35<span class="token punctuation">)</span>,
    type: <span class="token string">&#39;HAS_FAILED&#39;</span>,
    task: Task <span class="token punctuation">{</span>
      emitter: <span class="token punctuation">[</span>EventEmitter<span class="token punctuation">]</span>,
      listr: <span class="token punctuation">[</span>Listr<span class="token punctuation">]</span>,
      task: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      options: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      rendererOptions: <span class="token punctuation">{</span><span class="token punctuation">}</span>,
      id: <span class="token string">&#39;8.2a65394fa08f4.8b5e930c84961.fb2adab42e42a.935abfc6589c3.5335107681873.8962b49213f76.8c9cecad964b5.062b4007af36-a.b09d927457f53.69cc39befa64a.ae97e6ef8542b.9d95c4b595f5-4b.b9f21515e1585.12538a6c6896d.a962a60588db-33.bf484bb990fd.1475aac3b0fb9.7c35efae1eb-3.be5f2fac3ab91.c0163604f32f8.4b1f946aaf65f.d1e9ccb5c9527.af66206b276c2.e10c953f0e8e6.c74dc7124bab6.edc04597060a8.215ad017ae8c2.4c8a99002ed
16.ddcbd9603d4c4.048de12b9dd&#39;</span>,
      state: <span class="token string">&#39;FAILED&#39;</span>,
      subtasks: undefined,
      title: undefined,
      initialTitle: undefined,
      output: undefined,
      retry: undefined,
      message: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      rendererTaskOptions: undefined,
      prompt: undefined,
      parent: <span class="token punctuation">[</span>Task<span class="token punctuation">]</span>,
      enabled: true,
      taskFn: <span class="token punctuation">[</span>Function: task<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>,
    path: <span class="token string">&#39; &gt; &#39;</span>,
    ctx: undefined,
    name: <span class="token string">&#39;ListrError&#39;</span>
  <span class="token punctuation">}</span>,
  Error: <span class="token number">2</span>
      at Task.taskFn <span class="token punctuation">(</span>file:///home/cenk/development/listr2/examples/docs/task/error-handling/collection.ts:32:15<span class="token punctuation">)</span>
      at Task.run <span class="token punctuation">(</span>file:///home/cenk/development/listr2/src/lib/task.ts:274:35<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    error: Error: <span class="token number">2</span>
        at Task.taskFn <span class="token punctuation">(</span>file:///home/cenk/development/listr2/examples/docs/task/error-handling/collection.ts:32:15<span class="token punctuation">)</span>
        at Task.run <span class="token punctuation">(</span>file:///home/cenk/development/listr2/src/lib/task.ts:274:35<span class="token punctuation">)</span>,
    type: <span class="token string">&#39;HAS_FAILED_WITHOUT_ERROR&#39;</span>,
    task: Task <span class="token punctuation">{</span>
      emitter: <span class="token punctuation">[</span>EventEmitter<span class="token punctuation">]</span>,
      listr: <span class="token punctuation">[</span>Listr<span class="token punctuation">]</span>,
      task: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      options: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      rendererOptions: <span class="token punctuation">{</span><span class="token punctuation">}</span>,
      id: <span class="token string">&#39;8.f283f8da74ae3.9e94d814e9883.10e27d22f0b7c.b817dcd4d9c30.36e99f3c37d30.16db1930463b2.b0ec8521bc26e.bfb1b8330eef-b.4e022e82b22f6.167067cf82169.7597c85bc6599.3137cca5afa1-4c.a3e319ce867a8.59995b969e89d.7f58330a401c-3e.581990bbee7e6.9c13477d7bb39.161f23a4232f-8.63f0efd3f698b.12ea94ce0bc6.0d706af8d7579.07ac283060ba.1f94ca2a9e1f2.0d03822a75dd9.26b6a2684bc76.19149a65485b9.8deb6d649d966.5e3c7395889
91.aac85cf231545.277f65a71161&#39;</span>,
      state: <span class="token string">&#39;FAILED&#39;</span>,
      subtasks: undefined,
      title: undefined,
      initialTitle: undefined,
      output: undefined,
      retry: undefined,
      message: <span class="token punctuation">[</span>Object<span class="token punctuation">]</span>,
      rendererTaskOptions: undefined,
      prompt: undefined,
      parent: undefined,
      enabled: true,
      taskFn: <span class="token punctuation">[</span>Function: task<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>,
    path: <span class="token string">&#39;&#39;</span>,
    ctx: undefined,
    name: <span class="token string">&#39;ListrError&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),S={class:"hint-container details"},H=e("<ul><li>Tasks are concurrent, so we expect them to run in a synchronous fashion.</li><li>First error will be thrown from the first task. Since exitOnError is <code>false</code> on that context, <code>ListrError</code> will get collected by <code>tasks.errors</code>], and the value will be <code>{ message: &#39;1&#39;, type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR }</code>.</li><li>Then it will recurse into the second task, which has two subtasks.</li><li>The first task from the subtasks will fail and since the <code>exitOnError</code> is set to <code>true</code> in that context, that subtasks will fail and throw. The <code>ListrError</code> appended to the <code>tasks.errors</code> will be <code>{ message: &#39;3&#39;, type: ListrErrorTypes.HAS_FAILED }</code></li><li>Since the subtask has crashed, it will not execute the upcoming tasks in the subtasks.</li><li>It will return to the main task list and execute the 3rd task from that list. It will again show the same behavior with the first task, and the <code>ListrError</code> will be <code>{ message: &#39;2&#39;, type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR }</code>.</li></ul>",1);function j(P,B){const c=t("ExternalLinkIcon"),i=t("FontIcon"),l=t("Badge"),p=t("RouterLink");return d(),u("div",null,[b,k(" more "),h,n("div",m,[f,n("p",null,[s("You can find the related examples "),n("a",g,[s("here"),a(c)]),s(".")])]),w,n("h3",y,[_,s(" Modes "),a(l,{type:"warning"},{default:o(()=>[a(i,{icon:"mdi:github"}),x]),_:1})]),E,n("p",null,[a(p,{to:"/api/classes/ListrError.html"},{default:o(()=>[T]),_:1}),s(" class extends the default "),L,s(" and has some additional information like the cause of the error and where it is coming from, and the frozen context at the given time to further debug the issue while execution.")]),O,n("p",null,[s("A listr error can be caused by multiple reasons, for a better explanation of why that particular error occurred, a type property on the "),I,s(" exists in the form of enum "),a(p,{to:"/api/enums/ListrErrorTypes.html"},{default:o(()=>[F]),_:1}),s(".")]),D,n("details",A,[n("summary",null,[a(i,{icon:"ph:terminal-window-duotone"}),s(" Output")]),R]),n("details",S,[n("summary",null,[a(i,{icon:"fluent:text-description-24-filled"}),s(" Flow")]),H])])}const Y=r(v,[["render",j],["__file","error-handling.html.vue"]]);export{Y as default};
