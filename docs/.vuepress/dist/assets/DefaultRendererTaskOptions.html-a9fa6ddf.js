import{_ as o,W as d,X as s,Y as e,Z as a,a2 as n,$ as t,a5 as i,D as l}from"./framework-4c9bc095.js";const h={},c=e("h1",{id:"interface-defaultrenderertaskoptions",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#interface-defaultrenderertaskoptions","aria-hidden":"true"},"#"),t(" Interface: DefaultRendererTaskOptions")],-1),p=e("h2",{id:"hierarchy",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#hierarchy","aria-hidden":"true"},"#"),t(" Hierarchy")],-1),u=e("code",null,"RendererPresetTimer",-1),f=e("p",null,[t("↳ "),e("strong",null,[e("code",null,"DefaultRendererTaskOptions")])],-1),_=e("h2",{id:"properties",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#properties","aria-hidden":"true"},"#"),t(" Properties")],-1),m=e("h3",{id:"timer",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#timer","aria-hidden":"true"},"#"),t(" timer")],-1),b=e("code",null,"Optional",-1),k=e("strong",null,"timer",-1),g=e("code",null,"PresetTimer",-1),x=e("p",null,"show duration for all tasks",-1),T=e("p",null,[e("strong",null,[e("code",null,"Default")])],-1),D=e("p",null,"false",-1),R=e("p",null,[e("strong",null,[e("code",null,"Global")])],-1),y=e("p",null,"global option that can not be temperated with subtasks",-1),O=e("h4",{id:"inherited-from",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#inherited-from","aria-hidden":"true"},"#"),t(" Inherited from")],-1),P=i('<h4 id="defined-in" tabindex="-1"><a class="header-anchor" href="#defined-in" aria-hidden="true">#</a> Defined in</h4><p>src/presets/timer/preset.interface.ts:12</p><hr><h3 id="bottombar" tabindex="-1"><a class="header-anchor" href="#bottombar" aria-hidden="true">#</a> bottomBar</h3><p>• <code>Optional</code> <strong>bottomBar</strong>: <code>number</code> | <code>boolean</code></p><p>write task output to the bottom bar instead of the gap under the task title itself. useful for a stream of data.</p><p><strong><code>Default</code></strong></p><p>false</p><p><code>true</code> only keep 1 line of the latest data outputted by the task. <code>false</code> only keep 1 line of the latest data outputted by the task. <code>number</code> will keep designated data of the latest data outputted by the task.</p><h4 id="defined-in-1" tabindex="-1"><a class="header-anchor" href="#defined-in-1" aria-hidden="true">#</a> Defined in</h4><p>src/renderer/default/renderer.interface.ts:123</p><hr><h3 id="persistentoutput" tabindex="-1"><a class="header-anchor" href="#persistentoutput" aria-hidden="true">#</a> persistentOutput</h3><p>• <code>Optional</code> <strong>persistentOutput</strong>: <code>boolean</code></p><p>keep output after task finishes</p><p><strong><code>Default</code></strong></p><p>false</p><p>works both for the bottom bar and the default behavior</p><h4 id="defined-in-2" tabindex="-1"><a class="header-anchor" href="#defined-in-2" aria-hidden="true">#</a> Defined in</h4><p>src/renderer/default/renderer.interface.ts:130</p>',20);function w(B,v){const r=l("RouterLink");return d(),s("div",null,[c,p,e("ul",null,[e("li",null,[e("p",null,[a(r,{to:"/api/interfaces/RendererPresetTimer.html"},{default:n(()=>[u]),_:1})]),f])]),_,m,e("p",null,[t("• "),b,t(),k,t(": "),a(r,{to:"/api/types/PresetTimer.html"},{default:n(()=>[g]),_:1})]),x,T,D,R,y,O,e("p",null,[a(r,{to:"/api/interfaces/RendererPresetTimer.html"},{default:n(()=>[t("RendererPresetTimer")]),_:1}),t("."),a(r,{to:"/api/interfaces/RendererPresetTimer.html#timer"},{default:n(()=>[t("timer")]),_:1})]),P])}const V=o(h,[["render",w],["__file","DefaultRendererTaskOptions.html.vue"]]);export{V as default};