import {
  d as v,
  r as O,
  a as _t,
  b as sn,
  c as y,
  i as z,
  e as ft,
  f as ln,
  g as cn,
  o as F,
  h,
  j as n,
  k as ke,
  l as Ea,
  m as ae,
  n as He,
  p as zt,
  q as un,
  s as we,
  u as pn,
  t as dn,
  w as C,
  v as ht,
  x as vn,
  y as mn,
  z as _n,
  A as fn,
  T as Le,
  B as K,
  C as hn,
  R as te,
  D as q,
  E as je,
  F as J,
  G as La,
  H as gt,
  I as gn,
  J as bn,
  K as Ne,
  L as ya,
  M as En,
  N as bt,
  O as Ln,
  P as yn,
  S as Tn,
  Q as Rn,
  U as On,
  V as In
} from './framework-4c9bc095.js'
const Pn = 'modulepreload',
  An = function (e) {
    return '/' + e
  },
  Ht = {},
  i = function (t, a, r) {
    if (!a || a.length === 0) return t()
    const o = document.getElementsByTagName('link')
    return Promise.all(
      a.map((s) => {
        if (((s = An(s)), s in Ht)) return
        Ht[s] = !0
        const l = s.endsWith('.css'),
          c = l ? '[rel="stylesheet"]' : ''
        if (!!r)
          for (let d = o.length - 1; d >= 0; d--) {
            const m = o[d]
            if (m.href === s && (!l || m.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${s}"]${c}`)) return
        const u = document.createElement('link')
        if (((u.rel = l ? 'stylesheet' : Pn), l || ((u.as = 'script'), (u.crossOrigin = '')), (u.href = s), document.head.appendChild(u), l))
          return new Promise((d, m) => {
            u.addEventListener('load', d), u.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${s}`)))
          })
      })
    ).then(() => t())
  },
  Dn = {
    'v-8daa1a0e': () => i(() => import('./index.html-e36f76dd.js'), []).then(({ data: e }) => e),
    'v-744497ce': () => i(() => import('./index.html-9d8887bc.js'), []).then(({ data: e }) => e),
    'v-5dfe5c8c': () => i(() => import('./context.html-bbd96443.js'), []).then(({ data: e }) => e),
    'v-d8664854': () => i(() => import('./environment.html-dc31edf7.js'), []).then(({ data: e }) => e),
    'v-0d2bff00': () => i(() => import('./examples.html-7e1c64f5.js'), []).then(({ data: e }) => e),
    'v-4e8563af': () => i(() => import('./installation.html-f13bccaf.js'), []).then(({ data: e }) => e),
    'v-0b947d42': () => i(() => import('./new-listr.html-ec32bdde.js'), []).then(({ data: e }) => e),
    'v-5e13a913': () => i(() => import('./task-options.html-1ee3ef3f.js'), []).then(({ data: e }) => e),
    'v-9f6f9978': () => i(() => import('./task.html-1518d899.js'), []).then(({ data: e }) => e),
    'v-43fc5fca': () => i(() => import('./index.html-a2a31aa6.js'), []).then(({ data: e }) => e),
    'v-d5137982': () => i(() => import('./v6.html-c661dac3.js'), []).then(({ data: e }) => e),
    'v-6c1b2cf3': () => i(() => import('./index.html-071efd05.js'), []).then(({ data: e }) => e),
    'v-2332fd96': () => i(() => import('./custom.html-0902ee39.js'), []).then(({ data: e }) => e),
    'v-44c2f8aa': () => i(() => import('./default.html-4cf45af8.js'), []).then(({ data: e }) => e),
    'v-daf836d4': () => i(() => import('./fallback-condition.html-5fc81f00.js'), []).then(({ data: e }) => e),
    'v-03c79b94': () => i(() => import('./simple.html-3bc4a665.js'), []).then(({ data: e }) => e),
    'v-3a5dbbf4': () => i(() => import('./test.html-b1edb3ce.js'), []).then(({ data: e }) => e),
    'v-593dc10a': () => i(() => import('./verbose.html-a40ec0e5.js'), []).then(({ data: e }) => e),
    'v-4a96075e': () => i(() => import('./changelog.html-2f4da8ef.js'), []).then(({ data: e }) => e),
    'v-48755a3c': () => i(() => import('./contributions.html-c2c1cd07.js'), []).then(({ data: e }) => e),
    'v-7d2304c7': () => i(() => import('./foreword.html-9be4fb17.js'), []).then(({ data: e }) => e),
    'v-99296e84': () => i(() => import('./release.html-cf04e2f7.js'), []).then(({ data: e }) => e),
    'v-acc72eb6': () => i(() => import('./enable.html-fd2de4da.js'), []).then(({ data: e }) => e),
    'v-080ff07e': () => i(() => import('./error-handling.html-ec385c61.js'), []).then(({ data: e }) => e),
    'v-64ba1832': () => i(() => import('./output.html-798cf612.js'), []).then(({ data: e }) => e),
    'v-18a4691b': () => i(() => import('./prompts.html-8ff3c90e.js'), []).then(({ data: e }) => e),
    'v-df8eec3c': () => i(() => import('./retry.html-a4cd610b.js'), []).then(({ data: e }) => e),
    'v-53eb2424': () => i(() => import('./rollback.html-c29d9ac2.js'), []).then(({ data: e }) => e),
    'v-16a7542e': () => i(() => import('./skip.html-e4f199b2.js'), []).then(({ data: e }) => e),
    'v-9f44200c': () => i(() => import('./subtasks.html-de8c99b6.js'), []).then(({ data: e }) => e),
    'v-6a56d832': () => i(() => import('./title.html-42c59847.js'), []).then(({ data: e }) => e),
    'v-5dad3ee2': () => i(() => import('./BaseEventMap.html-05436327.js'), []).then(({ data: e }) => e),
    'v-7bc5bc46': () => i(() => import('./Concurrency.html-7314759d.js'), []).then(({ data: e }) => e),
    'v-42a4066c': () => i(() => import('./DefaultRenderer.html-134aca6b.js'), []).then(({ data: e }) => e),
    'v-2e8161a2': () => i(() => import('./EventManager.html-76e7a528.js'), []).then(({ data: e }) => e),
    'v-64a97bbc': () => i(() => import('./Listr.html-f45c104c.js'), []).then(({ data: e }) => e),
    'v-2119c4e8': () => i(() => import('./ListrBaseRenderer.html-a634e9f9.js'), []).then(({ data: e }) => e),
    'v-b3bf2a24': () => i(() => import('./ListrError.html-44e580b9.js'), []).then(({ data: e }) => e),
    'v-79c6396e': () => i(() => import('./ListrEventManager.html-7cdae066.js'), []).then(({ data: e }) => e),
    'v-3192097a': () => i(() => import('./ListrEventMap.html-03871f9f.js'), []).then(({ data: e }) => e),
    'v-767931cc': () => i(() => import('./ListrLogger.html-814a38cc.js'), []).then(({ data: e }) => e),
    'v-b1b64c8e': () => i(() => import('./ListrRenderer.html-6c47e789.js'), []).then(({ data: e }) => e),
    'v-d931a278': () => i(() => import('./ListrTaskEventManager.html-b17ada92.js'), []).then(({ data: e }) => e),
    'v-baa96b16': () => i(() => import('./ListrTaskEventMap.html-abf9fd48.js'), []).then(({ data: e }) => e),
    'v-0eeffd38': () => i(() => import('./ListrTaskObject.html-a665f1f0.js'), []).then(({ data: e }) => e),
    'v-7def10b0': () => i(() => import('./ListrTaskWrapper.html-2f0f122b.js'), []).then(({ data: e }) => e),
    'v-6e3fd583': () => i(() => import('./Manager.html-410c7122.js'), []).then(({ data: e }) => e),
    'v-271fb980': () => i(() => import('./ProcessOutput.html-191aed5f.js'), []).then(({ data: e }) => e),
    'v-51771be0': () => i(() => import('./ProcessOutputBuffer.html-80d0222a.js'), []).then(({ data: e }) => e),
    'v-20df2ec0': () => i(() => import('./ProcessOutputStream.html-c7ab348a.js'), []).then(({ data: e }) => e),
    'v-1f53290c': () => i(() => import('./PromptError.html-b1cea369.js'), []).then(({ data: e }) => e),
    'v-637e5960': () => i(() => import('./PromptOptionsMap.html-a7157f92.js'), []).then(({ data: e }) => e),
    'v-6cb9d38a': () => i(() => import('./SilentRenderer.html-b89b471c.js'), []).then(({ data: e }) => e),
    'v-7ef2954d': () => i(() => import('./SimpleRenderer.html-1fbd3c86.js'), []).then(({ data: e }) => e),
    'v-21fa52d2': () => i(() => import('./Spinner.html-5ee52326.js'), []).then(({ data: e }) => e),
    'v-9617d6a6': () => i(() => import('./TestRenderer.html-12c8db2d.js'), []).then(({ data: e }) => e),
    'v-6dcaa96a': () => i(() => import('./TestRendererEvent.html-736f5cec.js'), []).then(({ data: e }) => e),
    'v-031b74cb': () => i(() => import('./VerboseRenderer.html-5806eb84.js'), []).then(({ data: e }) => e),
    'v-7a4696fe': () => i(() => import('./ListrDefaultRendererLogLevels.html-c94c1341.js'), []).then(({ data: e }) => e),
    'v-e53e06e8': () => i(() => import('./ListrEnvironmentVariables.html-dc8f681c.js'), []).then(({ data: e }) => e),
    'v-492026bf': () => i(() => import('./ListrErrorTypes.html-0c4dca7f.js'), []).then(({ data: e }) => e),
    'v-4c294a24': () => i(() => import('./ListrEventType.html-e9a96634.js'), []).then(({ data: e }) => e),
    'v-3a79395a': () => i(() => import('./ListrTaskEventType.html-284980b5.js'), []).then(({ data: e }) => e),
    'v-53c698d6': () => i(() => import('./ListrTaskState.html-31cbb5b3.js'), []).then(({ data: e }) => e),
    'v-5c809bf1': () => i(() => import('./LogLevels.html-b71a6ef1.js'), []).then(({ data: e }) => e),
    'v-52ddb36c': () => i(() => import('./assertFunctionOrSelf.html-f26894ae.js'), []).then(({ data: e }) => e),
    'v-1418b4c6': () => i(() => import('./cleanseAnsi.html-5861576e.js'), []).then(({ data: e }) => e),
    'v-a1253cc2': () => i(() => import('./cloneObject.html-b8255b4f.js'), []).then(({ data: e }) => e),
    'v-57ce2d52': () => i(() => import('./createPrompt.html-488765aa.js'), []).then(({ data: e }) => e),
    'v-9bc6bbb2': () => i(() => import('./generateUUID.html-8774608d.js'), []).then(({ data: e }) => e),
    'v-6914d6fc': () => i(() => import('./getRenderer.html-c308ed0b.js'), []).then(({ data: e }) => e),
    'v-722f2c78': () => i(() => import('./getRendererClass.html-a4514190.js'), []).then(({ data: e }) => e),
    'v-1bb1a42b': () => i(() => import('./indent.html-08fdf64c.js'), []).then(({ data: e }) => e),
    'v-27e2fe2c': () => i(() => import('./isObservable.html-c6416ce2.js'), []).then(({ data: e }) => e),
    'v-4617a59c': () => i(() => import('./isUnicodeSupported.html-4b0d2404.js'), []).then(({ data: e }) => e),
    'v-9bfe6d76': () => i(() => import('./parseTimer.html-0e5969d7.js'), []).then(({ data: e }) => e),
    'v-049b1cd8': () => i(() => import('./parseTimestamp.html-77a4965c.js'), []).then(({ data: e }) => e),
    'v-fddf488e': () => i(() => import('./splat.html-da854e4e.js'), []).then(({ data: e }) => e),
    'v-55699790': () => i(() => import('./DefaultRendererOptions.html-478d85b2.js'), []).then(({ data: e }) => e),
    'v-2b37b7dd': () => i(() => import('./DefaultRendererTaskOptions.html-5fdda4e9.js'), []).then(({ data: e }) => e),
    'v-489ecb16': () => i(() => import('./ListrBaseClassOptions.html-1d7d32f9.js'), []).then(({ data: e }) => e),
    'v-303d04d8': () => i(() => import('./ListrLoggerOptions.html-5bb3b910.js'), []).then(({ data: e }) => e),
    'v-5b4cf8e8': () => i(() => import('./ListrOptions.html-c5f17dba.js'), []).then(({ data: e }) => e),
    'v-29f21ef3': () => i(() => import('./ListrPrimaryRendererOptions.html-61c633e4.js'), []).then(({ data: e }) => e),
    'v-342bf6b6': () => i(() => import('./ListrSecondaryRendererOptions.html-806a93ee.js'), []).then(({ data: e }) => e),
    'v-4e820f20': () => i(() => import('./ListrSubClassOptions.html-50f86a0c.js'), []).then(({ data: e }) => e),
    'v-d7078cb2': () => i(() => import('./ListrTask.html-720094df.js'), []).then(({ data: e }) => e),
    'v-75d8b678': () => i(() => import('./ListrTaskMessage.html-ec867789.js'), []).then(({ data: e }) => e),
    'v-0db2897a': () => i(() => import('./ListrTaskRetry.html-33edb5cb.js'), []).then(({ data: e }) => e),
    'v-6a6ebd64': () => i(() => import('./LoggerFieldFn.html-6007fce6.js'), []).then(({ data: e }) => e),
    'v-01c9ca44': () => i(() => import('./LoggerFieldOptions.html-e1858530.js'), []).then(({ data: e }) => e),
    'v-2d6dd616': () => i(() => import('./LoggerRendererOptions.html-5af11d80.js'), []).then(({ data: e }) => e),
    'v-4511e5a0': () => i(() => import('./ProcessOutputBufferEntry.html-a227cc15.js'), []).then(({ data: e }) => e),
    'v-54336778': () => i(() => import('./ProcessOutputBufferOptions.html-8781ae83.js'), []).then(({ data: e }) => e),
    'v-462793f2': () => i(() => import('./ProcessOutputRendererOptions.html-2a551d04.js'), []).then(({ data: e }) => e),
    'v-2108b8c0': () => i(() => import('./PromptCancelOptions.html-cd2228db.js'), []).then(({ data: e }) => e),
    'v-6504bb4e': () => i(() => import('./PromptInstance.html-19de8055.js'), []).then(({ data: e }) => e),
    'v-083bf8ea': () => i(() => import('./PromptSettings.html-0a17800b.js'), []).then(({ data: e }) => e),
    'v-64717b7d': () => i(() => import('./RendererPresetTimer.html-ba7203f4.js'), []).then(({ data: e }) => e),
    'v-70e17068': () => i(() => import('./RendererPresetTimestamp.html-7b27e0ac.js'), []).then(({ data: e }) => e),
    'v-60656784': () => i(() => import('./RendererStyleMap.html-8027ff55.js'), []).then(({ data: e }) => e),
    'v-6ac3ec17': () => i(() => import('./SimpleRendererOptions.html-0d453134.js'), []).then(({ data: e }) => e),
    'v-63c3683c': () => i(() => import('./SimpleRendererTaskOptions.html-ae9d599a.js'), []).then(({ data: e }) => e),
    'v-ac12dd62': () => i(() => import('./SupportedRenderer.html-333cab15.js'), []).then(({ data: e }) => e),
    'v-70281cb7': () => i(() => import('./TestRendererOptions.html-3192b485.js'), []).then(({ data: e }) => e),
    'v-3ecbacf9': () => i(() => import('./VerboseRendererOptions.html-5d243df0.js'), []).then(({ data: e }) => e),
    'v-7a5be81e': () => i(() => import('./VerboseRendererTaskOptions.html-a59637a6.js'), []).then(({ data: e }) => e),
    'v-86e6018e': () => i(() => import('./EventData.html-6c586062.js'), []).then(({ data: e }) => e),
    'v-55f7001a': () => i(() => import('./EventMap.html-6f97928d.js'), []).then(({ data: e }) => e),
    'v-21c35a6e': () => i(() => import('./Figures.html-de821a69.js'), []).then(({ data: e }) => e),
    'v-164beb0c': () => i(() => import('./ListrContext.html-fa2aac12.js'), []).then(({ data: e }) => e),
    'v-af53b1b6': () => i(() => import('./ListrDefaultRenderer.html-d1ab362b.js'), []).then(({ data: e }) => e),
    'v-6c65a562': () => i(() => import('./ListrDefaultRendererOptions.html-625e2a14.js'), []).then(({ data: e }) => e),
    'v-ab61599c': () => i(() => import('./ListrDefaultRendererOptionsStyle.html-624eddd9.js'), []).then(({ data: e }) => e),
    'v-5b92d35f': () => i(() => import('./ListrDefaultRendererTasks.html-43c5c802.js'), []).then(({ data: e }) => e),
    'v-6617f35c': () => i(() => import('./ListrDefaultRendererValue.html-df498907.js'), []).then(({ data: e }) => e),
    'v-2350a378': () => i(() => import('./ListrFallbackRenderer.html-94cb714b.js'), []).then(({ data: e }) => e),
    'v-4bd9079d': () => i(() => import('./ListrFallbackRendererValue.html-cdf90b3f.js'), []).then(({ data: e }) => e),
    'v-3e2bcbe1': () => i(() => import('./ListrGetRendererClassFromValue.html-1511cb81.js'), []).then(({ data: e }) => e),
    'v-699f11e4': () => i(() => import('./ListrGetRendererOptions.html-a1d38ea3.js'), []).then(({ data: e }) => e),
    'v-dc6640ee': () => i(() => import('./ListrGetRendererTaskOptions.html-79a5622b.js'), []).then(({ data: e }) => e),
    'v-5636bf1a': () => i(() => import('./ListrGetRendererValueFromClass.html-5c1bdaae.js'), []).then(({ data: e }) => e),
    'v-864f5086': () => i(() => import('./ListrLoggerOptionStyle.html-90d8369c.js'), []).then(({ data: e }) => e),
    'v-7c84ef3c': () => i(() => import('./ListrRendererFactory.html-a1ac6986.js'), []).then(({ data: e }) => e),
    'v-8706e164': () => i(() => import('./ListrRendererOptions.html-4a597e3c.js'), []).then(({ data: e }) => e),
    'v-56346dca': () => i(() => import('./ListrRendererValue.html-f38fbf80.js'), []).then(({ data: e }) => e),
    'v-8b57909e': () => i(() => import('./ListrSilentRenderer.html-0d7cef47.js'), []).then(({ data: e }) => e),
    'v-1f4a5a50': () => i(() => import('./ListrSilentRendererValue.html-73473497.js'), []).then(({ data: e }) => e),
    'v-66e60d18': () => i(() => import('./ListrSimpleRenderer.html-d6345378.js'), []).then(({ data: e }) => e),
    'v-6222f420': () => i(() => import('./ListrSimpleRendererOptions.html-23041fd3.js'), []).then(({ data: e }) => e),
    'v-499e1a70': () => i(() => import('./ListrSimpleRendererTasks.html-dcfc7726.js'), []).then(({ data: e }) => e),
    'v-54233a6d': () => i(() => import('./ListrSimpleRendererValue.html-6e068819.js'), []).then(({ data: e }) => e),
    'v-0ebb3bdc': () => i(() => import('./ListrTaskFn.html-e550f370.js'), []).then(({ data: e }) => e),
    'v-08bd1340': () => i(() => import('./ListrTaskPrompt.html-434000a8.js'), []).then(({ data: e }) => e),
    'v-f1641fb2': () => i(() => import('./ListrTaskResult.html-c9d0d947.js'), []).then(({ data: e }) => e),
    'v-635152d8': () => i(() => import('./ListrTestRenderer.html-a5f3a4b5.js'), []).then(({ data: e }) => e),
    'v-728b9300': () => i(() => import('./ListrTestRendererOptions.html-6c35ecb4.js'), []).then(({ data: e }) => e),
    'v-813e1d60': () => i(() => import('./ListrTestRendererTasks.html-6330eb22.js'), []).then(({ data: e }) => e),
    'v-6c33dd66': () => i(() => import('./ListrTestRendererValue.html-af7da422.js'), []).then(({ data: e }) => e),
    'v-334da610': () => i(() => import('./ListrVerboseRendererOptions.html-bc4b532e.js'), []).then(({ data: e }) => e),
    'v-b6a6ef40': () => i(() => import('./ListrVerboseRendererTasks.html-0a9a683e.js'), []).then(({ data: e }) => e),
    'v-51048213': () => i(() => import('./LoggerField.html-00241147.js'), []).then(({ data: e }) => e),
    'v-4e2913ce': () => i(() => import('./LoggerFormat.html-71b67c27.js'), []).then(({ data: e }) => e),
    'v-8c93ad92': () => i(() => import('./PresetTimer.html-b3fa8a4a.js'), []).then(({ data: e }) => e),
    'v-6af28886': () => i(() => import('./PresetTimestamp.html-611969e4.js'), []).then(({ data: e }) => e),
    'v-ecd1c87a': () => i(() => import('./PromptOptions.html-34ebba64.js'), []).then(({ data: e }) => e),
    'v-70f19ba9': () => i(() => import('./PromptOptionsType.html-e5e93ffd.js'), []).then(({ data: e }) => e),
    'v-70e16670': () => i(() => import('./PromptTypes.html-5ac8f5d2.js'), []).then(({ data: e }) => e),
    'v-7b7e7be0': () => i(() => import('./Unionize.html-41cd71ee.js'), []).then(({ data: e }) => e),
    'v-775e15e2': () => i(() => import('./ANSI_ESCAPE.html-a3c7a0b6.js'), []).then(({ data: e }) => e),
    'v-3077bc7b': () => i(() => import('./ANSI_ESCAPE_CODES.html-14f1b44b.js'), []).then(({ data: e }) => e),
    'v-ee25f356': () => i(() => import('./LISTR_DEFAULT_RENDERER_STYLE.html-37cb2884.js'), []).then(({ data: e }) => e),
    'v-396c3d46': () => i(() => import('./LISTR_LOGGER_STYLE.html-311f4702.js'), []).then(({ data: e }) => e),
    'v-2264582a': () => i(() => import('./RENDERER_TIMER.html-6a90f234.js'), []).then(({ data: e }) => e),
    'v-0a240df9': () => i(() => import('./RENDERER_TIMESTAMP.html-fcfc7f9b.js'), []).then(({ data: e }) => e),
    'v-a52a2088': () => i(() => import('./color.html-af245c0e.js'), []).then(({ data: e }) => e),
    'v-87ea73a8': () => i(() => import('./figures-1.html-14b53e70.js'), []).then(({ data: e }) => e),
    'v-3706649a': () => i(() => import('./404.html-5b5caed6.js'), []).then(({ data: e }) => e),
    'v-ccdc4da0': () => i(() => import('./index.html-0694e97b.js'), []).then(({ data: e }) => e),
    'v-acb2d44c': () => i(() => import('./index.html-be73263c.js'), []).then(({ data: e }) => e),
    'v-4748358c': () => i(() => import('./index.html-e77edd29.js'), []).then(({ data: e }) => e),
    'v-15537bf1': () => i(() => import('./index.html-7e348e17.js'), []).then(({ data: e }) => e),
    'v-73d692d2': () => i(() => import('./index.html-7eb0aad0.js'), []).then(({ data: e }) => e),
    'v-42196c2b': () => i(() => import('./index.html-7ff8bc90.js'), []).then(({ data: e }) => e),
    'v-be04cb7c': () => i(() => import('./index.html-48297135.js'), []).then(({ data: e }) => e),
    'v-69092c87': () => i(() => import('./index.html-9434a371.js'), []).then(({ data: e }) => e),
    'v-5c4abc24': () => i(() => import('./index.html-27e1445e.js'), []).then(({ data: e }) => e),
    'v-0c55dfe6': () => i(() => import('./index.html-d1d0a4a0.js'), []).then(({ data: e }) => e)
  },
  kn = JSON.parse(
    '{"base":"/","lang":"en-US","title":"","description":"","head":[["link",{"rel":"icon","href":"https://main.s3.kilic.dev/html/favicon.ico"}]],"locales":{"/":{"lang":"en-US","title":"listr2","description":"Documentation for listr2 npm library."}}}'
  ),
  Ta = {
    'v-8daa1a0e': v(() => i(() => import('./index.html-f8253f36.js'), ['assets/index.html-f8253f36.js', 'assets/framework-4c9bc095.js'])),
    'v-744497ce': v(() => i(() => import('./index.html-18280a35.js'), ['assets/index.html-18280a35.js', 'assets/framework-4c9bc095.js'])),
    'v-5dfe5c8c': v(() => i(() => import('./context.html-964ac80e.js'), ['assets/context.html-964ac80e.js', 'assets/framework-4c9bc095.js'])),
    'v-d8664854': v(() => i(() => import('./environment.html-ce7a9ab8.js'), ['assets/environment.html-ce7a9ab8.js', 'assets/framework-4c9bc095.js'])),
    'v-0d2bff00': v(() => i(() => import('./examples.html-13f2636f.js'), ['assets/examples.html-13f2636f.js', 'assets/framework-4c9bc095.js'])),
    'v-4e8563af': v(() => i(() => import('./installation.html-3f60c560.js'), ['assets/installation.html-3f60c560.js', 'assets/framework-4c9bc095.js'])),
    'v-0b947d42': v(() => i(() => import('./new-listr.html-950c38f7.js'), ['assets/new-listr.html-950c38f7.js', 'assets/framework-4c9bc095.js'])),
    'v-5e13a913': v(() => i(() => import('./task-options.html-a9091ec4.js'), ['assets/task-options.html-a9091ec4.js', 'assets/framework-4c9bc095.js'])),
    'v-9f6f9978': v(() => i(() => import('./task.html-1069229b.js'), ['assets/task.html-1069229b.js', 'assets/framework-4c9bc095.js'])),
    'v-43fc5fca': v(() => i(() => import('./index.html-efbc9b51.js'), ['assets/index.html-efbc9b51.js', 'assets/framework-4c9bc095.js'])),
    'v-d5137982': v(() => i(() => import('./v6.html-1850b0ca.js'), ['assets/v6.html-1850b0ca.js', 'assets/framework-4c9bc095.js'])),
    'v-6c1b2cf3': v(() => i(() => import('./index.html-56622fac.js'), ['assets/index.html-56622fac.js', 'assets/framework-4c9bc095.js'])),
    'v-2332fd96': v(() => i(() => import('./custom.html-2f3999fd.js'), ['assets/custom.html-2f3999fd.js', 'assets/framework-4c9bc095.js'])),
    'v-44c2f8aa': v(() => i(() => import('./default.html-479d06cf.js'), ['assets/default.html-479d06cf.js', 'assets/framework-4c9bc095.js'])),
    'v-daf836d4': v(() => i(() => import('./fallback-condition.html-545e2c84.js'), ['assets/fallback-condition.html-545e2c84.js', 'assets/framework-4c9bc095.js'])),
    'v-03c79b94': v(() => i(() => import('./simple.html-881e7547.js'), ['assets/simple.html-881e7547.js', 'assets/framework-4c9bc095.js'])),
    'v-3a5dbbf4': v(() => i(() => import('./test.html-f18cad97.js'), ['assets/test.html-f18cad97.js', 'assets/framework-4c9bc095.js'])),
    'v-593dc10a': v(() => i(() => import('./verbose.html-e3ca0dae.js'), ['assets/verbose.html-e3ca0dae.js', 'assets/framework-4c9bc095.js'])),
    'v-4a96075e': v(() => i(() => import('./changelog.html-4eb0b9be.js'), ['assets/changelog.html-4eb0b9be.js', 'assets/framework-4c9bc095.js'])),
    'v-48755a3c': v(() => i(() => import('./contributions.html-8626eab7.js'), ['assets/contributions.html-8626eab7.js', 'assets/framework-4c9bc095.js'])),
    'v-7d2304c7': v(() => i(() => import('./foreword.html-f8eb8ee9.js'), ['assets/foreword.html-f8eb8ee9.js', 'assets/framework-4c9bc095.js'])),
    'v-99296e84': v(() => i(() => import('./release.html-671db2e4.js'), ['assets/release.html-671db2e4.js', 'assets/framework-4c9bc095.js'])),
    'v-acc72eb6': v(() => i(() => import('./enable.html-cba4e274.js'), ['assets/enable.html-cba4e274.js', 'assets/framework-4c9bc095.js'])),
    'v-080ff07e': v(() => i(() => import('./error-handling.html-d67d4130.js'), ['assets/error-handling.html-d67d4130.js', 'assets/framework-4c9bc095.js'])),
    'v-64ba1832': v(() => i(() => import('./output.html-f70f680f.js'), ['assets/output.html-f70f680f.js', 'assets/framework-4c9bc095.js'])),
    'v-18a4691b': v(() => i(() => import('./prompts.html-9237c7ab.js'), ['assets/prompts.html-9237c7ab.js', 'assets/framework-4c9bc095.js'])),
    'v-df8eec3c': v(() => i(() => import('./retry.html-bf3c7b8e.js'), ['assets/retry.html-bf3c7b8e.js', 'assets/framework-4c9bc095.js'])),
    'v-53eb2424': v(() => i(() => import('./rollback.html-90567e86.js'), ['assets/rollback.html-90567e86.js', 'assets/framework-4c9bc095.js'])),
    'v-16a7542e': v(() => i(() => import('./skip.html-bceadf77.js'), ['assets/skip.html-bceadf77.js', 'assets/framework-4c9bc095.js'])),
    'v-9f44200c': v(() => i(() => import('./subtasks.html-a726201b.js'), ['assets/subtasks.html-a726201b.js', 'assets/framework-4c9bc095.js'])),
    'v-6a56d832': v(() => i(() => import('./title.html-9151400e.js'), ['assets/title.html-9151400e.js', 'assets/framework-4c9bc095.js'])),
    'v-5dad3ee2': v(() => i(() => import('./BaseEventMap.html-9c12a46a.js'), ['assets/BaseEventMap.html-9c12a46a.js', 'assets/framework-4c9bc095.js'])),
    'v-7bc5bc46': v(() => i(() => import('./Concurrency.html-0e8395b0.js'), ['assets/Concurrency.html-0e8395b0.js', 'assets/framework-4c9bc095.js'])),
    'v-42a4066c': v(() => i(() => import('./DefaultRenderer.html-aa3c6d45.js'), ['assets/DefaultRenderer.html-aa3c6d45.js', 'assets/framework-4c9bc095.js'])),
    'v-2e8161a2': v(() => i(() => import('./EventManager.html-7d95b89b.js'), ['assets/EventManager.html-7d95b89b.js', 'assets/framework-4c9bc095.js'])),
    'v-64a97bbc': v(() => i(() => import('./Listr.html-8191ad5e.js'), ['assets/Listr.html-8191ad5e.js', 'assets/framework-4c9bc095.js'])),
    'v-2119c4e8': v(() => i(() => import('./ListrBaseRenderer.html-955bfbff.js'), ['assets/ListrBaseRenderer.html-955bfbff.js', 'assets/framework-4c9bc095.js'])),
    'v-b3bf2a24': v(() => i(() => import('./ListrError.html-af0ab9f0.js'), ['assets/ListrError.html-af0ab9f0.js', 'assets/framework-4c9bc095.js'])),
    'v-79c6396e': v(() => i(() => import('./ListrEventManager.html-0b8315a1.js'), ['assets/ListrEventManager.html-0b8315a1.js', 'assets/framework-4c9bc095.js'])),
    'v-3192097a': v(() => i(() => import('./ListrEventMap.html-9a9ab588.js'), ['assets/ListrEventMap.html-9a9ab588.js', 'assets/framework-4c9bc095.js'])),
    'v-767931cc': v(() => i(() => import('./ListrLogger.html-e6aba82b.js'), ['assets/ListrLogger.html-e6aba82b.js', 'assets/framework-4c9bc095.js'])),
    'v-b1b64c8e': v(() => i(() => import('./ListrRenderer.html-dadc6607.js'), ['assets/ListrRenderer.html-dadc6607.js', 'assets/framework-4c9bc095.js'])),
    'v-d931a278': v(() => i(() => import('./ListrTaskEventManager.html-e96bc4df.js'), ['assets/ListrTaskEventManager.html-e96bc4df.js', 'assets/framework-4c9bc095.js'])),
    'v-baa96b16': v(() => i(() => import('./ListrTaskEventMap.html-fe628844.js'), ['assets/ListrTaskEventMap.html-fe628844.js', 'assets/framework-4c9bc095.js'])),
    'v-0eeffd38': v(() => i(() => import('./ListrTaskObject.html-69871320.js'), ['assets/ListrTaskObject.html-69871320.js', 'assets/framework-4c9bc095.js'])),
    'v-7def10b0': v(() => i(() => import('./ListrTaskWrapper.html-db06f045.js'), ['assets/ListrTaskWrapper.html-db06f045.js', 'assets/framework-4c9bc095.js'])),
    'v-6e3fd583': v(() => i(() => import('./Manager.html-3330dda6.js'), ['assets/Manager.html-3330dda6.js', 'assets/framework-4c9bc095.js'])),
    'v-271fb980': v(() => i(() => import('./ProcessOutput.html-25146dcb.js'), ['assets/ProcessOutput.html-25146dcb.js', 'assets/framework-4c9bc095.js'])),
    'v-51771be0': v(() => i(() => import('./ProcessOutputBuffer.html-0a7b469d.js'), ['assets/ProcessOutputBuffer.html-0a7b469d.js', 'assets/framework-4c9bc095.js'])),
    'v-20df2ec0': v(() => i(() => import('./ProcessOutputStream.html-80bdfa28.js'), ['assets/ProcessOutputStream.html-80bdfa28.js', 'assets/framework-4c9bc095.js'])),
    'v-1f53290c': v(() => i(() => import('./PromptError.html-2f7e4947.js'), ['assets/PromptError.html-2f7e4947.js', 'assets/framework-4c9bc095.js'])),
    'v-637e5960': v(() => i(() => import('./PromptOptionsMap.html-39d7e999.js'), ['assets/PromptOptionsMap.html-39d7e999.js', 'assets/framework-4c9bc095.js'])),
    'v-6cb9d38a': v(() => i(() => import('./SilentRenderer.html-46f95be4.js'), ['assets/SilentRenderer.html-46f95be4.js', 'assets/framework-4c9bc095.js'])),
    'v-7ef2954d': v(() => i(() => import('./SimpleRenderer.html-cdf76228.js'), ['assets/SimpleRenderer.html-cdf76228.js', 'assets/framework-4c9bc095.js'])),
    'v-21fa52d2': v(() => i(() => import('./Spinner.html-3bd8e0d1.js'), ['assets/Spinner.html-3bd8e0d1.js', 'assets/framework-4c9bc095.js'])),
    'v-9617d6a6': v(() => i(() => import('./TestRenderer.html-542befed.js'), ['assets/TestRenderer.html-542befed.js', 'assets/framework-4c9bc095.js'])),
    'v-6dcaa96a': v(() => i(() => import('./TestRendererEvent.html-6c1c8f67.js'), ['assets/TestRendererEvent.html-6c1c8f67.js', 'assets/framework-4c9bc095.js'])),
    'v-031b74cb': v(() => i(() => import('./VerboseRenderer.html-86580760.js'), ['assets/VerboseRenderer.html-86580760.js', 'assets/framework-4c9bc095.js'])),
    'v-7a4696fe': v(() =>
      i(() => import('./ListrDefaultRendererLogLevels.html-643baa5f.js'), ['assets/ListrDefaultRendererLogLevels.html-643baa5f.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-e53e06e8': v(() => i(() => import('./ListrEnvironmentVariables.html-482f4fca.js'), ['assets/ListrEnvironmentVariables.html-482f4fca.js', 'assets/framework-4c9bc095.js'])),
    'v-492026bf': v(() => i(() => import('./ListrErrorTypes.html-c7b44d96.js'), ['assets/ListrErrorTypes.html-c7b44d96.js', 'assets/framework-4c9bc095.js'])),
    'v-4c294a24': v(() => i(() => import('./ListrEventType.html-40f2abd6.js'), ['assets/ListrEventType.html-40f2abd6.js', 'assets/framework-4c9bc095.js'])),
    'v-3a79395a': v(() => i(() => import('./ListrTaskEventType.html-376a8f5f.js'), ['assets/ListrTaskEventType.html-376a8f5f.js', 'assets/framework-4c9bc095.js'])),
    'v-53c698d6': v(() => i(() => import('./ListrTaskState.html-cc2f9e0a.js'), ['assets/ListrTaskState.html-cc2f9e0a.js', 'assets/framework-4c9bc095.js'])),
    'v-5c809bf1': v(() => i(() => import('./LogLevels.html-5a10a9a5.js'), ['assets/LogLevels.html-5a10a9a5.js', 'assets/framework-4c9bc095.js'])),
    'v-52ddb36c': v(() => i(() => import('./assertFunctionOrSelf.html-418a381d.js'), ['assets/assertFunctionOrSelf.html-418a381d.js', 'assets/framework-4c9bc095.js'])),
    'v-1418b4c6': v(() => i(() => import('./cleanseAnsi.html-c3742df4.js'), ['assets/cleanseAnsi.html-c3742df4.js', 'assets/framework-4c9bc095.js'])),
    'v-a1253cc2': v(() => i(() => import('./cloneObject.html-030a6508.js'), ['assets/cloneObject.html-030a6508.js', 'assets/framework-4c9bc095.js'])),
    'v-57ce2d52': v(() => i(() => import('./createPrompt.html-d047f91b.js'), ['assets/createPrompt.html-d047f91b.js', 'assets/framework-4c9bc095.js'])),
    'v-9bc6bbb2': v(() => i(() => import('./generateUUID.html-a08d063b.js'), ['assets/generateUUID.html-a08d063b.js', 'assets/framework-4c9bc095.js'])),
    'v-6914d6fc': v(() => i(() => import('./getRenderer.html-2c083760.js'), ['assets/getRenderer.html-2c083760.js', 'assets/framework-4c9bc095.js'])),
    'v-722f2c78': v(() => i(() => import('./getRendererClass.html-b7df7f74.js'), ['assets/getRendererClass.html-b7df7f74.js', 'assets/framework-4c9bc095.js'])),
    'v-1bb1a42b': v(() => i(() => import('./indent.html-f04267a0.js'), ['assets/indent.html-f04267a0.js', 'assets/framework-4c9bc095.js'])),
    'v-27e2fe2c': v(() => i(() => import('./isObservable.html-f5e19613.js'), ['assets/isObservable.html-f5e19613.js', 'assets/framework-4c9bc095.js'])),
    'v-4617a59c': v(() => i(() => import('./isUnicodeSupported.html-f91231ff.js'), ['assets/isUnicodeSupported.html-f91231ff.js', 'assets/framework-4c9bc095.js'])),
    'v-9bfe6d76': v(() => i(() => import('./parseTimer.html-8d15b34b.js'), ['assets/parseTimer.html-8d15b34b.js', 'assets/framework-4c9bc095.js'])),
    'v-049b1cd8': v(() => i(() => import('./parseTimestamp.html-7824520b.js'), ['assets/parseTimestamp.html-7824520b.js', 'assets/framework-4c9bc095.js'])),
    'v-fddf488e': v(() => i(() => import('./splat.html-22d4ca9f.js'), ['assets/splat.html-22d4ca9f.js', 'assets/framework-4c9bc095.js'])),
    'v-55699790': v(() => i(() => import('./DefaultRendererOptions.html-e98947ad.js'), ['assets/DefaultRendererOptions.html-e98947ad.js', 'assets/framework-4c9bc095.js'])),
    'v-2b37b7dd': v(() =>
      i(() => import('./DefaultRendererTaskOptions.html-a9fa6ddf.js'), ['assets/DefaultRendererTaskOptions.html-a9fa6ddf.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-489ecb16': v(() => i(() => import('./ListrBaseClassOptions.html-647d3fdb.js'), ['assets/ListrBaseClassOptions.html-647d3fdb.js', 'assets/framework-4c9bc095.js'])),
    'v-303d04d8': v(() => i(() => import('./ListrLoggerOptions.html-b8adf633.js'), ['assets/ListrLoggerOptions.html-b8adf633.js', 'assets/framework-4c9bc095.js'])),
    'v-5b4cf8e8': v(() => i(() => import('./ListrOptions.html-68d43a3e.js'), ['assets/ListrOptions.html-68d43a3e.js', 'assets/framework-4c9bc095.js'])),
    'v-29f21ef3': v(() =>
      i(() => import('./ListrPrimaryRendererOptions.html-668f7c8b.js'), ['assets/ListrPrimaryRendererOptions.html-668f7c8b.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-342bf6b6': v(() =>
      i(() => import('./ListrSecondaryRendererOptions.html-d0f588ad.js'), ['assets/ListrSecondaryRendererOptions.html-d0f588ad.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-4e820f20': v(() => i(() => import('./ListrSubClassOptions.html-57aa88a1.js'), ['assets/ListrSubClassOptions.html-57aa88a1.js', 'assets/framework-4c9bc095.js'])),
    'v-d7078cb2': v(() => i(() => import('./ListrTask.html-73b13d8b.js'), ['assets/ListrTask.html-73b13d8b.js', 'assets/framework-4c9bc095.js'])),
    'v-75d8b678': v(() => i(() => import('./ListrTaskMessage.html-db3c5bd7.js'), ['assets/ListrTaskMessage.html-db3c5bd7.js', 'assets/framework-4c9bc095.js'])),
    'v-0db2897a': v(() => i(() => import('./ListrTaskRetry.html-7f0f059d.js'), ['assets/ListrTaskRetry.html-7f0f059d.js', 'assets/framework-4c9bc095.js'])),
    'v-6a6ebd64': v(() => i(() => import('./LoggerFieldFn.html-740a191d.js'), ['assets/LoggerFieldFn.html-740a191d.js', 'assets/framework-4c9bc095.js'])),
    'v-01c9ca44': v(() => i(() => import('./LoggerFieldOptions.html-6d49ab57.js'), ['assets/LoggerFieldOptions.html-6d49ab57.js', 'assets/framework-4c9bc095.js'])),
    'v-2d6dd616': v(() => i(() => import('./LoggerRendererOptions.html-238046cd.js'), ['assets/LoggerRendererOptions.html-238046cd.js', 'assets/framework-4c9bc095.js'])),
    'v-4511e5a0': v(() => i(() => import('./ProcessOutputBufferEntry.html-278503f0.js'), ['assets/ProcessOutputBufferEntry.html-278503f0.js', 'assets/framework-4c9bc095.js'])),
    'v-54336778': v(() =>
      i(() => import('./ProcessOutputBufferOptions.html-24e95fa9.js'), ['assets/ProcessOutputBufferOptions.html-24e95fa9.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-462793f2': v(() =>
      i(() => import('./ProcessOutputRendererOptions.html-91158bf7.js'), ['assets/ProcessOutputRendererOptions.html-91158bf7.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-2108b8c0': v(() => i(() => import('./PromptCancelOptions.html-bedce4a3.js'), ['assets/PromptCancelOptions.html-bedce4a3.js', 'assets/framework-4c9bc095.js'])),
    'v-6504bb4e': v(() => i(() => import('./PromptInstance.html-fe9c92e9.js'), ['assets/PromptInstance.html-fe9c92e9.js', 'assets/framework-4c9bc095.js'])),
    'v-083bf8ea': v(() => i(() => import('./PromptSettings.html-09b53a78.js'), ['assets/PromptSettings.html-09b53a78.js', 'assets/framework-4c9bc095.js'])),
    'v-64717b7d': v(() => i(() => import('./RendererPresetTimer.html-08b8c304.js'), ['assets/RendererPresetTimer.html-08b8c304.js', 'assets/framework-4c9bc095.js'])),
    'v-70e17068': v(() => i(() => import('./RendererPresetTimestamp.html-6c40c380.js'), ['assets/RendererPresetTimestamp.html-6c40c380.js', 'assets/framework-4c9bc095.js'])),
    'v-60656784': v(() => i(() => import('./RendererStyleMap.html-da98bb5b.js'), ['assets/RendererStyleMap.html-da98bb5b.js', 'assets/framework-4c9bc095.js'])),
    'v-6ac3ec17': v(() => i(() => import('./SimpleRendererOptions.html-dae6c5fe.js'), ['assets/SimpleRendererOptions.html-dae6c5fe.js', 'assets/framework-4c9bc095.js'])),
    'v-63c3683c': v(() => i(() => import('./SimpleRendererTaskOptions.html-c9080f0d.js'), ['assets/SimpleRendererTaskOptions.html-c9080f0d.js', 'assets/framework-4c9bc095.js'])),
    'v-ac12dd62': v(() => i(() => import('./SupportedRenderer.html-def01756.js'), ['assets/SupportedRenderer.html-def01756.js', 'assets/framework-4c9bc095.js'])),
    'v-70281cb7': v(() => i(() => import('./TestRendererOptions.html-c5d50cbb.js'), ['assets/TestRendererOptions.html-c5d50cbb.js', 'assets/framework-4c9bc095.js'])),
    'v-3ecbacf9': v(() => i(() => import('./VerboseRendererOptions.html-b192c0cd.js'), ['assets/VerboseRendererOptions.html-b192c0cd.js', 'assets/framework-4c9bc095.js'])),
    'v-7a5be81e': v(() =>
      i(() => import('./VerboseRendererTaskOptions.html-e05868d6.js'), ['assets/VerboseRendererTaskOptions.html-e05868d6.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-86e6018e': v(() => i(() => import('./EventData.html-cf545c67.js'), ['assets/EventData.html-cf545c67.js', 'assets/framework-4c9bc095.js'])),
    'v-55f7001a': v(() => i(() => import('./EventMap.html-fd186ea8.js'), ['assets/EventMap.html-fd186ea8.js', 'assets/framework-4c9bc095.js'])),
    'v-21c35a6e': v(() => i(() => import('./Figures.html-d70221b0.js'), ['assets/Figures.html-d70221b0.js', 'assets/framework-4c9bc095.js'])),
    'v-164beb0c': v(() => i(() => import('./ListrContext.html-84691337.js'), ['assets/ListrContext.html-84691337.js', 'assets/framework-4c9bc095.js'])),
    'v-af53b1b6': v(() => i(() => import('./ListrDefaultRenderer.html-622b16cf.js'), ['assets/ListrDefaultRenderer.html-622b16cf.js', 'assets/framework-4c9bc095.js'])),
    'v-6c65a562': v(() =>
      i(() => import('./ListrDefaultRendererOptions.html-926dbdaf.js'), ['assets/ListrDefaultRendererOptions.html-926dbdaf.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-ab61599c': v(() =>
      i(() => import('./ListrDefaultRendererOptionsStyle.html-866ccbf8.js'), ['assets/ListrDefaultRendererOptionsStyle.html-866ccbf8.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-5b92d35f': v(() => i(() => import('./ListrDefaultRendererTasks.html-94d2c2e4.js'), ['assets/ListrDefaultRendererTasks.html-94d2c2e4.js', 'assets/framework-4c9bc095.js'])),
    'v-6617f35c': v(() => i(() => import('./ListrDefaultRendererValue.html-2944fadb.js'), ['assets/ListrDefaultRendererValue.html-2944fadb.js', 'assets/framework-4c9bc095.js'])),
    'v-2350a378': v(() => i(() => import('./ListrFallbackRenderer.html-c3d1935e.js'), ['assets/ListrFallbackRenderer.html-c3d1935e.js', 'assets/framework-4c9bc095.js'])),
    'v-4bd9079d': v(() =>
      i(() => import('./ListrFallbackRendererValue.html-6fc06fc0.js'), ['assets/ListrFallbackRendererValue.html-6fc06fc0.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-3e2bcbe1': v(() =>
      i(() => import('./ListrGetRendererClassFromValue.html-e16373a3.js'), ['assets/ListrGetRendererClassFromValue.html-e16373a3.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-699f11e4': v(() => i(() => import('./ListrGetRendererOptions.html-6cdf6ef3.js'), ['assets/ListrGetRendererOptions.html-6cdf6ef3.js', 'assets/framework-4c9bc095.js'])),
    'v-dc6640ee': v(() =>
      i(() => import('./ListrGetRendererTaskOptions.html-396c5fb8.js'), ['assets/ListrGetRendererTaskOptions.html-396c5fb8.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-5636bf1a': v(() =>
      i(() => import('./ListrGetRendererValueFromClass.html-3ae9192d.js'), ['assets/ListrGetRendererValueFromClass.html-3ae9192d.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-864f5086': v(() => i(() => import('./ListrLoggerOptionStyle.html-47c1cf3c.js'), ['assets/ListrLoggerOptionStyle.html-47c1cf3c.js', 'assets/framework-4c9bc095.js'])),
    'v-7c84ef3c': v(() => i(() => import('./ListrRendererFactory.html-c4b7a898.js'), ['assets/ListrRendererFactory.html-c4b7a898.js', 'assets/framework-4c9bc095.js'])),
    'v-8706e164': v(() => i(() => import('./ListrRendererOptions.html-2238bd1c.js'), ['assets/ListrRendererOptions.html-2238bd1c.js', 'assets/framework-4c9bc095.js'])),
    'v-56346dca': v(() => i(() => import('./ListrRendererValue.html-faffabf0.js'), ['assets/ListrRendererValue.html-faffabf0.js', 'assets/framework-4c9bc095.js'])),
    'v-8b57909e': v(() => i(() => import('./ListrSilentRenderer.html-7cdf0d21.js'), ['assets/ListrSilentRenderer.html-7cdf0d21.js', 'assets/framework-4c9bc095.js'])),
    'v-1f4a5a50': v(() => i(() => import('./ListrSilentRendererValue.html-fffa0257.js'), ['assets/ListrSilentRendererValue.html-fffa0257.js', 'assets/framework-4c9bc095.js'])),
    'v-66e60d18': v(() => i(() => import('./ListrSimpleRenderer.html-9c1d3ea5.js'), ['assets/ListrSimpleRenderer.html-9c1d3ea5.js', 'assets/framework-4c9bc095.js'])),
    'v-6222f420': v(() =>
      i(() => import('./ListrSimpleRendererOptions.html-ff9da591.js'), ['assets/ListrSimpleRendererOptions.html-ff9da591.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-499e1a70': v(() => i(() => import('./ListrSimpleRendererTasks.html-2a01e68b.js'), ['assets/ListrSimpleRendererTasks.html-2a01e68b.js', 'assets/framework-4c9bc095.js'])),
    'v-54233a6d': v(() => i(() => import('./ListrSimpleRendererValue.html-a9c94b52.js'), ['assets/ListrSimpleRendererValue.html-a9c94b52.js', 'assets/framework-4c9bc095.js'])),
    'v-0ebb3bdc': v(() => i(() => import('./ListrTaskFn.html-14d9c403.js'), ['assets/ListrTaskFn.html-14d9c403.js', 'assets/framework-4c9bc095.js'])),
    'v-08bd1340': v(() => i(() => import('./ListrTaskPrompt.html-a278cc26.js'), ['assets/ListrTaskPrompt.html-a278cc26.js', 'assets/framework-4c9bc095.js'])),
    'v-f1641fb2': v(() => i(() => import('./ListrTaskResult.html-5bbb3bd3.js'), ['assets/ListrTaskResult.html-5bbb3bd3.js', 'assets/framework-4c9bc095.js'])),
    'v-635152d8': v(() => i(() => import('./ListrTestRenderer.html-792d2cd0.js'), ['assets/ListrTestRenderer.html-792d2cd0.js', 'assets/framework-4c9bc095.js'])),
    'v-728b9300': v(() => i(() => import('./ListrTestRendererOptions.html-428c11e0.js'), ['assets/ListrTestRendererOptions.html-428c11e0.js', 'assets/framework-4c9bc095.js'])),
    'v-813e1d60': v(() => i(() => import('./ListrTestRendererTasks.html-7a4c58b3.js'), ['assets/ListrTestRendererTasks.html-7a4c58b3.js', 'assets/framework-4c9bc095.js'])),
    'v-6c33dd66': v(() => i(() => import('./ListrTestRendererValue.html-d23202f2.js'), ['assets/ListrTestRendererValue.html-d23202f2.js', 'assets/framework-4c9bc095.js'])),
    'v-334da610': v(() =>
      i(() => import('./ListrVerboseRendererOptions.html-57b99e81.js'), ['assets/ListrVerboseRendererOptions.html-57b99e81.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-b6a6ef40': v(() => i(() => import('./ListrVerboseRendererTasks.html-12eb1d1b.js'), ['assets/ListrVerboseRendererTasks.html-12eb1d1b.js', 'assets/framework-4c9bc095.js'])),
    'v-51048213': v(() => i(() => import('./LoggerField.html-56fbd3b7.js'), ['assets/LoggerField.html-56fbd3b7.js', 'assets/framework-4c9bc095.js'])),
    'v-4e2913ce': v(() => i(() => import('./LoggerFormat.html-17baeeb5.js'), ['assets/LoggerFormat.html-17baeeb5.js', 'assets/framework-4c9bc095.js'])),
    'v-8c93ad92': v(() => i(() => import('./PresetTimer.html-e867e459.js'), ['assets/PresetTimer.html-e867e459.js', 'assets/framework-4c9bc095.js'])),
    'v-6af28886': v(() => i(() => import('./PresetTimestamp.html-caa6f322.js'), ['assets/PresetTimestamp.html-caa6f322.js', 'assets/framework-4c9bc095.js'])),
    'v-ecd1c87a': v(() => i(() => import('./PromptOptions.html-fdbb3792.js'), ['assets/PromptOptions.html-fdbb3792.js', 'assets/framework-4c9bc095.js'])),
    'v-70f19ba9': v(() => i(() => import('./PromptOptionsType.html-72415bf2.js'), ['assets/PromptOptionsType.html-72415bf2.js', 'assets/framework-4c9bc095.js'])),
    'v-70e16670': v(() => i(() => import('./PromptTypes.html-ae6195ef.js'), ['assets/PromptTypes.html-ae6195ef.js', 'assets/framework-4c9bc095.js'])),
    'v-7b7e7be0': v(() => i(() => import('./Unionize.html-9502ff44.js'), ['assets/Unionize.html-9502ff44.js', 'assets/framework-4c9bc095.js'])),
    'v-775e15e2': v(() => i(() => import('./ANSI_ESCAPE.html-c9075763.js'), ['assets/ANSI_ESCAPE.html-c9075763.js', 'assets/framework-4c9bc095.js'])),
    'v-3077bc7b': v(() => i(() => import('./ANSI_ESCAPE_CODES.html-b88acef2.js'), ['assets/ANSI_ESCAPE_CODES.html-b88acef2.js', 'assets/framework-4c9bc095.js'])),
    'v-ee25f356': v(() =>
      i(() => import('./LISTR_DEFAULT_RENDERER_STYLE.html-1362c4d5.js'), ['assets/LISTR_DEFAULT_RENDERER_STYLE.html-1362c4d5.js', 'assets/framework-4c9bc095.js'])
    ),
    'v-396c3d46': v(() => i(() => import('./LISTR_LOGGER_STYLE.html-12ab12ea.js'), ['assets/LISTR_LOGGER_STYLE.html-12ab12ea.js', 'assets/framework-4c9bc095.js'])),
    'v-2264582a': v(() => i(() => import('./RENDERER_TIMER.html-d416c49a.js'), ['assets/RENDERER_TIMER.html-d416c49a.js', 'assets/framework-4c9bc095.js'])),
    'v-0a240df9': v(() => i(() => import('./RENDERER_TIMESTAMP.html-70776e5b.js'), ['assets/RENDERER_TIMESTAMP.html-70776e5b.js', 'assets/framework-4c9bc095.js'])),
    'v-a52a2088': v(() => i(() => import('./color.html-86151ac0.js'), ['assets/color.html-86151ac0.js', 'assets/framework-4c9bc095.js'])),
    'v-87ea73a8': v(() => i(() => import('./figures-1.html-33487d38.js'), ['assets/figures-1.html-33487d38.js', 'assets/framework-4c9bc095.js'])),
    'v-3706649a': v(() => i(() => import('./404.html-85f03aa9.js'), ['assets/404.html-85f03aa9.js', 'assets/framework-4c9bc095.js'])),
    'v-ccdc4da0': v(() => i(() => import('./index.html-14bd3564.js'), ['assets/index.html-14bd3564.js', 'assets/framework-4c9bc095.js'])),
    'v-acb2d44c': v(() => i(() => import('./index.html-d0e86bc8.js'), ['assets/index.html-d0e86bc8.js', 'assets/framework-4c9bc095.js'])),
    'v-4748358c': v(() => i(() => import('./index.html-6304ba9d.js'), ['assets/index.html-6304ba9d.js', 'assets/framework-4c9bc095.js'])),
    'v-15537bf1': v(() => i(() => import('./index.html-7235e0dc.js'), ['assets/index.html-7235e0dc.js', 'assets/framework-4c9bc095.js'])),
    'v-73d692d2': v(() => i(() => import('./index.html-2c77d14a.js'), ['assets/index.html-2c77d14a.js', 'assets/framework-4c9bc095.js'])),
    'v-42196c2b': v(() => i(() => import('./index.html-d3d13a08.js'), ['assets/index.html-d3d13a08.js', 'assets/framework-4c9bc095.js'])),
    'v-be04cb7c': v(() => i(() => import('./index.html-255c1f2a.js'), ['assets/index.html-255c1f2a.js', 'assets/framework-4c9bc095.js'])),
    'v-69092c87': v(() => i(() => import('./index.html-d73ec62b.js'), ['assets/index.html-d73ec62b.js', 'assets/framework-4c9bc095.js'])),
    'v-5c4abc24': v(() => i(() => import('./index.html-d22bdeca.js'), ['assets/index.html-d22bdeca.js', 'assets/framework-4c9bc095.js'])),
    'v-0c55dfe6': v(() => i(() => import('./index.html-06cb8332.js'), ['assets/index.html-06cb8332.js', 'assets/framework-4c9bc095.js']))
  }
var wn = Symbol(''),
  Sn = O(Dn),
  Ra = _t({ key: '', path: '', title: '', lang: '', frontmatter: {}, headers: [] }),
  ie = O(Ra),
  w = () => ie,
  Oa = Symbol(''),
  N = () => {
    const e = ae(Oa)
    if (!e) throw new Error('usePageFrontmatter() is called without provider.')
    return e
  },
  Ia = Symbol(''),
  Vn = () => {
    const e = ae(Ia)
    if (!e) throw new Error('usePageHead() is called without provider.')
    return e
  },
  Cn = Symbol(''),
  Pa = Symbol(''),
  Aa = () => {
    const e = ae(Pa)
    if (!e) throw new Error('usePageLang() is called without provider.')
    return e
  },
  Da = Symbol(''),
  xn = () => {
    const e = ae(Da)
    if (!e) throw new Error('usePageLayout() is called without provider.')
    return e
  },
  Et = Symbol(''),
  de = () => {
    const e = ae(Et)
    if (!e) throw new Error('useRouteLocale() is called without provider.')
    return e
  },
  fe = O(kn),
  ka = () => fe,
  wa = Symbol(''),
  Ue = () => {
    const e = ae(wa)
    if (!e) throw new Error('useSiteLocaleData() is called without provider.')
    return e
  },
  Mn = Symbol(''),
  $n = 'Layout',
  Fn = 'NotFound',
  ee = sn({
    resolveLayouts: (e) => e.reduce((t, a) => ({ ...t, ...a.layouts }), {}),
    resolvePageData: async (e) => {
      const t = Sn.value[e]
      return (await (t == null ? void 0 : t())) ?? Ra
    },
    resolvePageFrontmatter: (e) => e.frontmatter,
    resolvePageHead: (e, t, a) => {
      const r = z(t.description) ? t.description : a.description,
        o = [...(ft(t.head) ? t.head : []), ...a.head, ['title', {}, e], ['meta', { name: 'description', content: r }]]
      return ln(o)
    },
    resolvePageHeadTitle: (e, t) => [e.title, t.title].filter((a) => !!a).join(' | '),
    resolvePageLang: (e) => e.lang || 'en',
    resolvePageLayout: (e, t) => {
      let a
      if (e.path) {
        const r = e.frontmatter.layout
        z(r) ? (a = r) : (a = $n)
      } else a = Fn
      return t[a]
    },
    resolveRouteLocale: (e, t) => cn(e, t),
    resolveSiteLocaleData: (e, t) => ({ ...e, ...e.locales[t] })
  }),
  qe = y({
    name: 'ClientOnly',
    setup(e, t) {
      const a = O(!1)
      return (
        F(() => {
          a.value = !0
        }),
        () => {
          var r, o
          return a.value ? ((o = (r = t.slots).default) == null ? void 0 : o.call(r)) : null
        }
      )
    }
  }),
  Sa = y({
    name: 'Content',
    props: { pageKey: { type: String, required: !1, default: '' } },
    setup(e) {
      const t = w(),
        a = h(() => Ta[e.pageKey || t.value.key])
      return () => (a.value ? n(a.value) : n('div', '404 Not Found'))
    }
  }),
  X = (e = {}) => e,
  pe = (e) => (ke(e) ? e : `/${Ea(e)}`)
const Nn = {}
var B = Uint8Array,
  ue = Uint16Array,
  Va = Uint32Array,
  Ca = new B([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
  xa = new B([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
  Bn = new B([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  Ma = function (e, t) {
    for (var a = new ue(31), r = 0; r < 31; ++r) a[r] = t += 1 << e[r - 1]
    for (var o = new Va(a[30]), r = 1; r < 30; ++r) for (var s = a[r]; s < a[r + 1]; ++s) o[s] = ((s - a[r]) << 5) | r
    return [a, o]
  },
  $a = Ma(Ca, 2),
  Fa = $a[0],
  zn = $a[1]
;(Fa[28] = 258), (zn[258] = 28)
var Hn = Ma(xa, 0),
  jn = Hn[0],
  st = new ue(32768)
for (var S = 0; S < 32768; ++S) {
  var oe = ((S & 43690) >>> 1) | ((S & 21845) << 1)
  ;(oe = ((oe & 52428) >>> 2) | ((oe & 13107) << 2)), (oe = ((oe & 61680) >>> 4) | ((oe & 3855) << 4)), (st[S] = (((oe & 65280) >>> 8) | ((oe & 255) << 8)) >>> 1)
}
var Ae = function (e, t, a) {
    for (var r = e.length, o = 0, s = new ue(t); o < r; ++o) e[o] && ++s[e[o] - 1]
    var l = new ue(t)
    for (o = 0; o < t; ++o) l[o] = (l[o - 1] + s[o - 1]) << 1
    var c
    if (a) {
      c = new ue(1 << t)
      var p = 15 - t
      for (o = 0; o < r; ++o) if (e[o]) for (var u = (o << 4) | e[o], d = t - e[o], m = l[e[o] - 1]++ << d, _ = m | ((1 << d) - 1); m <= _; ++m) c[st[m] >>> p] = u
    } else for (c = new ue(r), o = 0; o < r; ++o) e[o] && (c[o] = st[l[e[o] - 1]++] >>> (15 - e[o]))
    return c
  },
  Se = new B(288)
for (var S = 0; S < 144; ++S) Se[S] = 8
for (var S = 144; S < 256; ++S) Se[S] = 9
for (var S = 256; S < 280; ++S) Se[S] = 7
for (var S = 280; S < 288; ++S) Se[S] = 8
var Na = new B(32)
for (var S = 0; S < 32; ++S) Na[S] = 5
var Un = Ae(Se, 9, 1),
  qn = Ae(Na, 5, 1),
  Ze = function (e) {
    for (var t = e[0], a = 1; a < e.length; ++a) e[a] > t && (t = e[a])
    return t
  },
  G = function (e, t, a) {
    var r = (t / 8) | 0
    return ((e[r] | (e[r + 1] << 8)) >> (t & 7)) & a
  },
  et = function (e, t) {
    var a = (t / 8) | 0
    return (e[a] | (e[a + 1] << 8) | (e[a + 2] << 16)) >> (t & 7)
  },
  Gn = function (e) {
    return ((e + 7) / 8) | 0
  },
  Lt = function (e, t, a) {
    ;(t == null || t < 0) && (t = 0), (a == null || a > e.length) && (a = e.length)
    var r = new (e.BYTES_PER_ELEMENT == 2 ? ue : e.BYTES_PER_ELEMENT == 4 ? Va : B)(a - t)
    return r.set(e.subarray(t, a)), r
  },
  Wn = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
  ],
  W = function (e, t, a) {
    var r = new Error(t || Wn[e])
    if (((r.code = e), Error.captureStackTrace && Error.captureStackTrace(r, W), !a)) throw r
    return r
  },
  Yn = function (e, t, a) {
    var r = e.length
    if (!r || (a && a.f && !a.l)) return t || new B(0)
    var o = !t || a,
      s = !a || a.i
    a || (a = {}), t || (t = new B(r * 3))
    var l = function (Ft) {
        var Nt = t.length
        if (Ft > Nt) {
          var Bt = new B(Math.max(Nt * 2, Ft))
          Bt.set(t), (t = Bt)
        }
      },
      c = a.f || 0,
      p = a.p || 0,
      u = a.b || 0,
      d = a.l,
      m = a.d,
      _ = a.m,
      f = a.n,
      g = r * 8
    do {
      if (!d) {
        c = G(e, p, 1)
        var E = G(e, p + 1, 3)
        if (((p += 3), E))
          if (E == 1) (d = Un), (m = qn), (_ = 9), (f = 5)
          else if (E == 2) {
            var A = G(e, p, 31) + 257,
              M = G(e, p + 10, 15) + 4,
              $ = A + G(e, p + 5, 31) + 1
            p += 14
            for (var P = new B($), b = new B(19), T = 0; T < M; ++T) b[Bn[T]] = G(e, p + T * 3, 7)
            p += M * 3
            for (var x = Ze(b), Z = (1 << x) - 1, rn = Ae(b, x, 1), T = 0; T < $; ) {
              var Ct = rn[G(e, p, Z)]
              p += Ct & 15
              var L = Ct >>> 4
              if (L < 16) P[T++] = L
              else {
                var ve = 0,
                  xe = 0
                for (
                  L == 16 ? ((xe = 3 + G(e, p, 3)), (p += 2), (ve = P[T - 1])) : L == 17 ? ((xe = 3 + G(e, p, 7)), (p += 3)) : L == 18 && ((xe = 11 + G(e, p, 127)), (p += 7));
                  xe--;

                )
                  P[T++] = ve
              }
            }
            var xt = P.subarray(0, A),
              ne = P.subarray(A)
            ;(_ = Ze(xt)), (f = Ze(ne)), (d = Ae(xt, _, 1)), (m = Ae(ne, f, 1))
          } else W(1)
        else {
          var L = Gn(p) + 4,
            R = e[L - 4] | (e[L - 3] << 8),
            I = L + R
          if (I > r) {
            s && W(0)
            break
          }
          o && l(u + R), t.set(e.subarray(L, I), u), (a.b = u += R), (a.p = p = I * 8), (a.f = c)
          continue
        }
        if (p > g) {
          s && W(0)
          break
        }
      }
      o && l(u + 131072)
      for (var nn = (1 << _) - 1, on = (1 << f) - 1, Je = p; ; Je = p) {
        var ve = d[et(e, p) & nn],
          me = ve >>> 4
        if (((p += ve & 15), p > g)) {
          s && W(0)
          break
        }
        if ((ve || W(2), me < 256)) t[u++] = me
        else if (me == 256) {
          ;(Je = p), (d = null)
          break
        } else {
          var Mt = me - 254
          if (me > 264) {
            var T = me - 257,
              Ie = Ca[T]
            ;(Mt = G(e, p, (1 << Ie) - 1) + Fa[T]), (p += Ie)
          }
          var Ke = m[et(e, p) & on],
            Xe = Ke >>> 4
          Ke || W(3), (p += Ke & 15)
          var ne = jn[Xe]
          if (Xe > 3) {
            var Ie = xa[Xe]
            ;(ne += et(e, p) & ((1 << Ie) - 1)), (p += Ie)
          }
          if (p > g) {
            s && W(0)
            break
          }
          o && l(u + 131072)
          for (var $t = u + Mt; u < $t; u += 4) (t[u] = t[u - ne]), (t[u + 1] = t[u + 1 - ne]), (t[u + 2] = t[u + 2 - ne]), (t[u + 3] = t[u + 3 - ne])
          u = $t
        }
      }
      ;(a.l = d), (a.p = Je), (a.b = u), (a.f = c), d && ((c = 1), (a.m = _), (a.d = m), (a.n = f))
    } while (!c)
    return u == t.length ? t : Lt(t, 0, u)
  },
  Qn = new B(0),
  Jn = function (e) {
    ;((e[0] & 15) != 8 || e[0] >>> 4 > 7 || ((e[0] << 8) | e[1]) % 31) && W(6, 'invalid zlib data'), e[1] & 32 && W(6, 'invalid zlib data: preset dictionaries not supported')
  }
function Kn(e, t) {
  return Yn((Jn(e), e.subarray(2, -4)), t)
}
var jt = typeof TextEncoder < 'u' && new TextEncoder(),
  lt = typeof TextDecoder < 'u' && new TextDecoder(),
  Xn = 0
try {
  lt.decode(Qn, { stream: !0 }), (Xn = 1)
} catch {}
var Zn = function (e) {
  for (var t = '', a = 0; ; ) {
    var r = e[a++],
      o = (r > 127) + (r > 223) + (r > 239)
    if (a + o > e.length) return [t, Lt(e, a - 1)]
    o
      ? o == 3
        ? ((r = (((r & 15) << 18) | ((e[a++] & 63) << 12) | ((e[a++] & 63) << 6) | (e[a++] & 63)) - 65536), (t += String.fromCharCode(55296 | (r >> 10), 56320 | (r & 1023))))
        : o & 1
        ? (t += String.fromCharCode(((r & 31) << 6) | (e[a++] & 63)))
        : (t += String.fromCharCode(((r & 15) << 12) | ((e[a++] & 63) << 6) | (e[a++] & 63)))
      : (t += String.fromCharCode(r))
  }
}
function eo(e, t) {
  if (t) {
    for (var a = new B(e.length), r = 0; r < e.length; ++r) a[r] = e.charCodeAt(r)
    return a
  }
  if (jt) return jt.encode(e)
  for (
    var o = e.length,
      s = new B(e.length + (e.length >> 1)),
      l = 0,
      c = function (d) {
        s[l++] = d
      },
      r = 0;
    r < o;
    ++r
  ) {
    if (l + 5 > s.length) {
      var p = new B(l + 8 + ((o - r) << 1))
      p.set(s), (s = p)
    }
    var u = e.charCodeAt(r)
    u < 128 || t
      ? c(u)
      : u < 2048
      ? (c(192 | (u >> 6)), c(128 | (u & 63)))
      : u > 55295 && u < 57344
      ? ((u = (65536 + (u & (1023 << 10))) | (e.charCodeAt(++r) & 1023)), c(240 | (u >> 18)), c(128 | ((u >> 12) & 63)), c(128 | ((u >> 6) & 63)), c(128 | (u & 63)))
      : (c(224 | (u >> 12)), c(128 | ((u >> 6) & 63)), c(128 | (u & 63)))
  }
  return Lt(s, 0, l)
}
function to(e, t) {
  if (t) {
    for (var a = '', r = 0; r < e.length; r += 16384) a += String.fromCharCode.apply(null, e.subarray(r, r + 16384))
    return a
  } else {
    if (lt) return lt.decode(e)
    var o = Zn(e),
      s = o[0],
      l = o[1]
    return l.length && W(8), s
  }
}
const V = ({ name: e = '', color: t = 'currentColor' }, { slots: a }) => {
  var r
  return n(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', class: ['icon', `${e}-icon`], viewBox: '0 0 1024 1024', fill: t, 'aria-label': `${e} icon` },
    (r = a.default) == null ? void 0 : r.call(a)
  )
}
V.displayName = 'IconBase'
const Ba = ({ size: e = 48, stroke: t = 4, wrapper: a = !0, height: r = 2 * e }) => {
  const o = n('svg', { xmlns: 'http://www.w3.org/2000/svg', width: e, height: e, preserveAspectRatio: 'xMidYMid', viewBox: '25 25 50 50' }, [
    n('animateTransform', { attributeName: 'transform', type: 'rotate', dur: '2s', keyTimes: '0;1', repeatCount: 'indefinite', values: '0;360' }),
    n('circle', { cx: '50', cy: '50', r: '20', fill: 'none', stroke: 'currentColor', 'stroke-width': t, 'stroke-linecap': 'round' }, [
      n('animate', { attributeName: 'stroke-dasharray', dur: '1.5s', keyTimes: '0;0.5;1', repeatCount: 'indefinite', values: '1,200;90,200;1,200' }),
      n('animate', { attributeName: 'stroke-dashoffset', dur: '1.5s', keyTimes: '0;0.5;1', repeatCount: 'indefinite', values: '0;-35px;-125px' })
    ])
  ])
  return a ? n('div', { class: 'loading-icon-wrapper', style: `display:flex;align-items:center;justify-content:center;height:${r}px` }, o) : o
}
Ba.displayName = 'LoadingIcon'
const za = (e, { slots: t }) => {
    var a
    return ((a = t.default) == null ? void 0 : a.call(t)) || null
  },
  Ha = () =>
    n(V, { name: 'github' }, () =>
      n('path', {
        d: 'M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z'
      })
    )
Ha.displayName = 'GitHubIcon'
const ja = () =>
  n(V, { name: 'gitlab' }, () =>
    n('path', {
      d: 'M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z'
    })
  )
ja.displayName = 'GitLabIcon'
const Ua = () =>
  n(V, { name: 'gitee' }, () =>
    n('path', {
      d: 'M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z'
    })
  )
Ua.displayName = 'GiteeIcon'
const qa = () =>
  n(V, { name: 'bitbucket' }, () =>
    n('path', {
      d: 'M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z'
    })
  )
qa.displayName = 'BitbucketIcon'
const Ga = () =>
  n(V, { name: 'source' }, () =>
    n('path', {
      d: 'M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z'
    })
  )
Ga.displayName = 'SourceIcon'
const Wa = Array.isArray,
  ao = (e) => typeof e == 'function',
  se = (e) => typeof e == 'string'
var Ya = (e) => /^(https?:)?\/\//.test(e),
  Qa = (e) => Object.prototype.toString.call(e) === '[object Object]'
const Y = (e, t) => {
  const a = t ? t._instance : He()
  return Qa(a == null ? void 0 : a.appContext.components) && (e in a.appContext.components || zt(e) in a.appContext.components || un(zt(e)) in a.appContext.components)
}
function ro(e) {
  return e
}
function no(e, t = !0) {
  He() ? F(e) : t ? e() : we(e)
}
function oo(e, t = !1) {
  const a = O(),
    r = () => (a.value = !!e())
  return r(), no(r, t), a
}
const Ut = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {},
  qt = '__vueuse_ssr_handlers__'
Ut[qt] = Ut[qt] || {}
var Gt
;(function (e) {
  ;(e.UP = 'UP'), (e.RIGHT = 'RIGHT'), (e.DOWN = 'DOWN'), (e.LEFT = 'LEFT'), (e.NONE = 'NONE')
})(Gt || (Gt = {}))
var io = Object.defineProperty,
  Wt = Object.getOwnPropertySymbols,
  so = Object.prototype.hasOwnProperty,
  lo = Object.prototype.propertyIsEnumerable,
  Yt = (e, t, a) => (t in e ? io(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[t] = a)),
  co = (e, t) => {
    for (var a in t || (t = {})) so.call(t, a) && Yt(e, a, t[a])
    if (Wt) for (var a of Wt(t)) lo.call(t, a) && Yt(e, a, t[a])
    return e
  }
const uo = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
}
co({ linear: ro }, uo)
const po = () => oo(() => typeof window < 'u' && window.navigator && 'userAgent' in window.navigator),
  vo = () => {
    const e = po()
    return h(() => e.value && /\b(?:Android|iPhone)/i.test(navigator.userAgent))
  },
  Re = (e) => {
    const t = de()
    return h(() => e[t.value])
  },
  mo = (e = '') => {
    if (e) {
      if (typeof e == 'number') return new Date(e)
      const t = Date.parse(e.toString())
      if (!Number.isNaN(t)) return new Date(t)
    }
    return null
  },
  Ja = (e, t) => {
    let a = 1
    for (let r = 0; r < e.length; r++) (a += e.charCodeAt(r)), (a += a << 10), (a ^= a >> 6)
    return (a += a << 3), (a ^= a >> 11), a % t
  },
  De = (e, t) => se(e) && e.startsWith(t),
  _e = (e, t) => se(e) && e.endsWith(t),
  Ka = Object.entries,
  le = Object.keys,
  Qt = (e) => Qa(e) && se(e.name),
  Jt = (e, t = !1) =>
    e
      ? Wa(e)
        ? e.map((a) => (se(a) ? { name: a } : Qt(a) ? a : null)).filter((a) => a !== null)
        : se(e)
        ? [{ name: e }]
        : Qt(e)
        ? [e]
        : (console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${t ? '' : '| false'} | undefined\`, but got`, e), [])
      : [],
  Xa = (e, t) => {
    if (e) {
      if (Wa(e) && e.every(se)) return e
      if (se(e)) return [e]
      console.error(`Expect ${t || 'value'} to be \`string[] | string | undefined\`, but got`, e)
    }
    return []
  },
  _o = (e) => Xa(e, 'category'),
  fo = (e) => Xa(e, 'tag'),
  yt = (e) => De(e, '/'),
  Za = /#.*$/u,
  ho = (e) => {
    const t = Za.exec(e)
    return t ? t[0] : ''
  },
  Kt = (e) =>
    decodeURI(e)
      .replace(Za, '')
      .replace(/(index)?\.(md|html)$/, ''),
  Tt = (e, t) => {
    if (t === void 0) return !1
    const a = Kt(e.path),
      r = Kt(t),
      o = ho(t)
    return o ? o === e.hash && (!r || a === r) : a === r
  },
  Xt = (e) => {
    const t = atob(e)
    return to(Kn(eo(t, !0)))
  },
  go = (e) => (Ya(e) ? e : `https://github.com/${e}`),
  er = (e) => (!Ya(e) || /github\.com/.test(e) ? 'GitHub' : /bitbucket\.org/.test(e) ? 'Bitbucket' : /gitlab\.com/.test(e) ? 'GitLab' : /gitee\.com/.test(e) ? 'Gitee' : null),
  Rt = (e, ...t) => {
    const a = e.resolve(...t),
      r = a.matched[a.matched.length - 1]
    if (!(r != null && r.redirect)) return a
    const { redirect: o } = r,
      s = ao(o) ? o(a) : o,
      l = se(s) ? { path: s } : s
    return Rt(e, { hash: a.hash, query: a.query, params: a.params, ...l })
  }
var Zt
const Ve = typeof window < 'u',
  bo = (e) => typeof e == 'function',
  Eo = (e) => typeof e == 'string',
  Be = () => {},
  ea = Ve && ((Zt = window == null ? void 0 : window.navigator) == null ? void 0 : Zt.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent)
function H(e) {
  return typeof e == 'function' ? e() : pn(e)
}
function tr(e, t) {
  function a(...r) {
    return new Promise((o, s) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r }))
        .then(o)
        .catch(s)
    })
  }
  return a
}
const ar = (e) => e()
function Lo(e, t = !0, a = !0, r = !1) {
  let o = 0,
    s,
    l = !0,
    c = Be,
    p
  const u = () => {
    s && (clearTimeout(s), (s = void 0), c(), (c = Be))
  }
  return (m) => {
    const _ = H(e),
      f = Date.now() - o,
      g = () => (p = m())
    return (
      u(),
      _ <= 0
        ? ((o = Date.now()), g())
        : (f > _ && (a || !l)
            ? ((o = Date.now()), g())
            : t &&
              (p = new Promise((E, L) => {
                ;(c = r ? L : E),
                  (s = setTimeout(() => {
                    ;(o = Date.now()), (l = !0), E(g()), u()
                  }, Math.max(0, _ - f)))
              })),
          !a && !s && (s = setTimeout(() => (l = !0), _)),
          (l = !1),
          p)
    )
  }
}
function yo(e = ar) {
  const t = O(!0)
  function a() {
    t.value = !1
  }
  function r() {
    t.value = !0
  }
  const o = (...s) => {
    t.value && e(...s)
  }
  return { isActive: _t(t), pause: a, resume: r, eventFilter: o }
}
function To(e) {
  return e
}
function Oe(e) {
  return vn() ? (mn(e), !0) : !1
}
function Ro(e, t = 200, a = !1, r = !0, o = !1) {
  return tr(Lo(t, a, r, o), e)
}
function rr(e) {
  return typeof e == 'function' ? h(e) : O(e)
}
function nr(e, t = !0) {
  He() ? F(e) : t ? e() : we(e)
}
function Oo(e) {
  He() && ht(e)
}
function Io(e, t, a = {}) {
  const { immediate: r = !0 } = a,
    o = O(!1)
  let s = null
  function l() {
    s && (clearTimeout(s), (s = null))
  }
  function c() {
    ;(o.value = !1), l()
  }
  function p(...u) {
    l(),
      (o.value = !0),
      (s = setTimeout(() => {
        ;(o.value = !1), (s = null), e(...u)
      }, H(t)))
  }
  return r && ((o.value = !0), Ve && p()), Oe(c), { isPending: _t(o), start: p, stop: c }
}
function ct(e = !1, t = {}) {
  const { truthyValue: a = !0, falsyValue: r = !1 } = t,
    o = dn(e),
    s = O(e)
  function l(c) {
    if (arguments.length) return (s.value = c), s.value
    {
      const p = H(a)
      return (s.value = s.value === p ? H(r) : p), s.value
    }
  }
  return o ? l : [s, l]
}
var ta = Object.getOwnPropertySymbols,
  Po = Object.prototype.hasOwnProperty,
  Ao = Object.prototype.propertyIsEnumerable,
  Do = (e, t) => {
    var a = {}
    for (var r in e) Po.call(e, r) && t.indexOf(r) < 0 && (a[r] = e[r])
    if (e != null && ta) for (var r of ta(e)) t.indexOf(r) < 0 && Ao.call(e, r) && (a[r] = e[r])
    return a
  }
function ko(e, t, a = {}) {
  const r = a,
    { eventFilter: o = ar } = r,
    s = Do(r, ['eventFilter'])
  return C(e, tr(o, t), s)
}
var wo = Object.defineProperty,
  So = Object.defineProperties,
  Vo = Object.getOwnPropertyDescriptors,
  ze = Object.getOwnPropertySymbols,
  or = Object.prototype.hasOwnProperty,
  ir = Object.prototype.propertyIsEnumerable,
  aa = (e, t, a) => (t in e ? wo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[t] = a)),
  Co = (e, t) => {
    for (var a in t || (t = {})) or.call(t, a) && aa(e, a, t[a])
    if (ze) for (var a of ze(t)) ir.call(t, a) && aa(e, a, t[a])
    return e
  },
  xo = (e, t) => So(e, Vo(t)),
  Mo = (e, t) => {
    var a = {}
    for (var r in e) or.call(e, r) && t.indexOf(r) < 0 && (a[r] = e[r])
    if (e != null && ze) for (var r of ze(e)) t.indexOf(r) < 0 && ir.call(e, r) && (a[r] = e[r])
    return a
  }
function $o(e, t, a = {}) {
  const r = a,
    { eventFilter: o } = r,
    s = Mo(r, ['eventFilter']),
    { eventFilter: l, pause: c, resume: p, isActive: u } = yo(o)
  return { stop: ko(e, t, xo(Co({}, s), { eventFilter: l })), pause: c, resume: p, isActive: u }
}
function Ot(e) {
  var t
  const a = H(e)
  return (t = a == null ? void 0 : a.$el) != null ? t : a
}
const ye = Ve ? window : void 0,
  sr = Ve ? window.document : void 0,
  Fo = Ve ? window.navigator : void 0
function Q(...e) {
  let t, a, r, o
  if ((Eo(e[0]) || Array.isArray(e[0]) ? (([a, r, o] = e), (t = ye)) : ([t, a, r, o] = e), !t)) return Be
  Array.isArray(a) || (a = [a]), Array.isArray(r) || (r = [r])
  const s = [],
    l = () => {
      s.forEach((d) => d()), (s.length = 0)
    },
    c = (d, m, _, f) => (d.addEventListener(m, _, f), () => d.removeEventListener(m, _, f)),
    p = C(
      () => [Ot(t), H(o)],
      ([d, m]) => {
        l(), d && s.push(...a.flatMap((_) => r.map((f) => c(d, _, f, m))))
      },
      { immediate: !0, flush: 'post' }
    ),
    u = () => {
      p(), l()
    }
  return Oe(u), u
}
function Ge(e, t = !1) {
  const a = O(),
    r = () => (a.value = Boolean(e()))
  return r(), nr(r, t), a
}
function No(e, t = {}) {
  const { window: a = ye } = t,
    r = Ge(() => a && 'matchMedia' in a && typeof a.matchMedia == 'function')
  let o
  const s = O(!1),
    l = () => {
      o && ('removeEventListener' in o ? o.removeEventListener('change', c) : o.removeListener(c))
    },
    c = () => {
      r.value && (l(), (o = a.matchMedia(rr(e).value)), (s.value = o.matches), 'addEventListener' in o ? o.addEventListener('change', c) : o.addListener(c))
    }
  return fn(c), Oe(() => l()), s
}
function Bo(e = {}) {
  const { navigator: t = Fo, read: a = !1, source: r, copiedDuring: o = 1500, legacy: s = !1 } = e,
    l = ['copy', 'cut'],
    c = Ge(() => t && 'clipboard' in t),
    p = h(() => c.value || s),
    u = O(''),
    d = O(!1),
    m = Io(() => (d.value = !1), o)
  function _() {
    c.value
      ? t.clipboard.readText().then((L) => {
          u.value = L
        })
      : (u.value = E())
  }
  if (p.value && a) for (const L of l) Q(L, _)
  async function f(L = H(r)) {
    p.value && L != null && (c.value ? await t.clipboard.writeText(L) : g(L), (u.value = L), (d.value = !0), m.start())
  }
  function g(L) {
    const R = document.createElement('textarea')
    ;(R.value = L ?? ''), (R.style.position = 'absolute'), (R.style.opacity = '0'), document.body.appendChild(R), R.select(), document.execCommand('copy'), R.remove()
  }
  function E() {
    var L, R, I
    return (I = (R = (L = document == null ? void 0 : document.getSelection) == null ? void 0 : L.call(document)) == null ? void 0 : R.toString()) != null ? I : ''
  }
  return { isSupported: p, text: u, copied: d, copy: f }
}
const ut = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {},
  pt = '__vueuse_ssr_handlers__'
ut[pt] = ut[pt] || {}
const zo = ut[pt]
function Ho(e, t) {
  return zo[e] || t
}
function jo(e) {
  return e == null
    ? 'any'
    : e instanceof Set
    ? 'set'
    : e instanceof Map
    ? 'map'
    : e instanceof Date
    ? 'date'
    : typeof e == 'boolean'
    ? 'boolean'
    : typeof e == 'string'
    ? 'string'
    : typeof e == 'object'
    ? 'object'
    : Number.isNaN(e)
    ? 'any'
    : 'number'
}
var Uo = Object.defineProperty,
  ra = Object.getOwnPropertySymbols,
  qo = Object.prototype.hasOwnProperty,
  Go = Object.prototype.propertyIsEnumerable,
  na = (e, t, a) => (t in e ? Uo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[t] = a)),
  oa = (e, t) => {
    for (var a in t || (t = {})) qo.call(t, a) && na(e, a, t[a])
    if (ra) for (var a of ra(t)) Go.call(t, a) && na(e, a, t[a])
    return e
  }
const Wo = {
    boolean: { read: (e) => e === 'true', write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: { read: (e) => new Map(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e.entries())) },
    set: { read: (e) => new Set(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e)) },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() }
  },
  ia = 'vueuse-storage'
function It(e, t, a, r = {}) {
  var o
  const {
      flush: s = 'pre',
      deep: l = !0,
      listenToStorageChanges: c = !0,
      writeDefaults: p = !0,
      mergeDefaults: u = !1,
      shallow: d,
      window: m = ye,
      eventFilter: _,
      onError: f = (T) => {
        console.error(T)
      }
    } = r,
    g = (d ? _n : O)(t)
  if (!a)
    try {
      a = Ho('getDefaultStorage', () => {
        var T
        return (T = ye) == null ? void 0 : T.localStorage
      })()
    } catch (T) {
      f(T)
    }
  if (!a) return g
  const E = H(t),
    L = jo(E),
    R = (o = r.serializer) != null ? o : Wo[L],
    { pause: I, resume: A } = $o(g, () => M(g.value), { flush: s, deep: l, eventFilter: _ })
  return m && c && (Q(m, 'storage', b), Q(m, ia, P)), b(), g
  function M(T) {
    try {
      if (T == null) a.removeItem(e)
      else {
        const x = R.write(T),
          Z = a.getItem(e)
        Z !== x && (a.setItem(e, x), m && m.dispatchEvent(new CustomEvent(ia, { detail: { key: e, oldValue: Z, newValue: x, storageArea: a } })))
      }
    } catch (x) {
      f(x)
    }
  }
  function $(T) {
    const x = T ? T.newValue : a.getItem(e)
    if (x == null) return p && E !== null && a.setItem(e, R.write(E)), E
    if (!T && u) {
      const Z = R.read(x)
      return bo(u) ? u(Z, E) : L === 'object' && !Array.isArray(Z) ? oa(oa({}, E), Z) : Z
    } else return typeof x != 'string' ? x : R.read(x)
  }
  function P(T) {
    b(T.detail)
  }
  function b(T) {
    if (!(T && T.storageArea !== a)) {
      if (T && T.key == null) {
        g.value = E
        return
      }
      if (!(T && T.key !== e)) {
        I()
        try {
          g.value = $(T)
        } catch (x) {
          f(x)
        } finally {
          T ? we(A) : A()
        }
      }
    }
  }
}
function Yo(e) {
  return No('(prefers-color-scheme: dark)', e)
}
const sa = [
  ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
  ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
  ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
  ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
  ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']
]
function Pt(e, t = {}) {
  const { document: a = sr, autoExit: r = !1 } = t,
    o = e || (a == null ? void 0 : a.querySelector('html')),
    s = O(!1)
  let l = sa[0]
  const c = Ge(() => {
      if (a) {
        for (const E of sa) if (E[1] in a) return (l = E), !0
      } else return !1
      return !1
    }),
    [p, u, d, , m] = l
  async function _() {
    c.value && (a != null && a[d] && (await a[u]()), (s.value = !1))
  }
  async function f() {
    if (!c.value) return
    await _()
    const E = Ot(o)
    E && (await E[p](), (s.value = !0))
  }
  async function g() {
    s.value ? await _() : await f()
  }
  return (
    a &&
      Q(
        a,
        m,
        () => {
          s.value = !!(a != null && a[d])
        },
        !1
      ),
    r && Oe(_),
    { isSupported: c, isFullscreen: s, enter: f, exit: _, toggle: g }
  )
}
var la = Object.getOwnPropertySymbols,
  Qo = Object.prototype.hasOwnProperty,
  Jo = Object.prototype.propertyIsEnumerable,
  Ko = (e, t) => {
    var a = {}
    for (var r in e) Qo.call(e, r) && t.indexOf(r) < 0 && (a[r] = e[r])
    if (e != null && la) for (var r of la(e)) t.indexOf(r) < 0 && Jo.call(e, r) && (a[r] = e[r])
    return a
  }
function Xo(e, t, a = {}) {
  const r = a,
    { window: o = ye } = r,
    s = Ko(r, ['window'])
  let l
  const c = Ge(() => o && 'MutationObserver' in o),
    p = () => {
      l && (l.disconnect(), (l = void 0))
    },
    u = C(
      () => Ot(e),
      (m) => {
        p(), c.value && o && m && ((l = new MutationObserver(t)), l.observe(m, s))
      },
      { immediate: !0 }
    ),
    d = () => {
      p(), u()
    }
  return Oe(d), { isSupported: c, stop: d }
}
var ca
;(function (e) {
  ;(e.UP = 'UP'), (e.RIGHT = 'RIGHT'), (e.DOWN = 'DOWN'), (e.LEFT = 'LEFT'), (e.NONE = 'NONE')
})(ca || (ca = {}))
function Zo(e, t = Be, a = {}) {
  const {
      immediate: r = !0,
      manual: o = !1,
      type: s = 'text/javascript',
      async: l = !0,
      crossOrigin: c,
      referrerPolicy: p,
      noModule: u,
      defer: d,
      document: m = sr,
      attrs: _ = {}
    } = a,
    f = O(null)
  let g = null
  const E = (I) =>
      new Promise((A, M) => {
        const $ = (T) => ((f.value = T), A(T), T)
        if (!m) {
          A(!1)
          return
        }
        let P = !1,
          b = m.querySelector(`script[src="${H(e)}"]`)
        b
          ? b.hasAttribute('data-loaded') && $(b)
          : ((b = m.createElement('script')),
            (b.type = s),
            (b.async = l),
            (b.src = H(e)),
            d && (b.defer = d),
            c && (b.crossOrigin = c),
            u && (b.noModule = u),
            p && (b.referrerPolicy = p),
            Object.entries(_).forEach(([T, x]) => (b == null ? void 0 : b.setAttribute(T, x))),
            (P = !0)),
          b.addEventListener('error', (T) => M(T)),
          b.addEventListener('abort', (T) => M(T)),
          b.addEventListener('load', () => {
            b.setAttribute('data-loaded', 'true'), t(b), $(b)
          }),
          P && (b = m.head.appendChild(b)),
          I || $(b)
      }),
    L = (I = !0) => (g || (g = E(I)), g),
    R = () => {
      if (!m) return
      ;(g = null), f.value && (f.value = null)
      const I = m.querySelector(`script[src="${H(e)}"]`)
      I && m.head.removeChild(I)
    }
  return r && !o && nr(L), o || Oo(R), { scriptTag: f, load: L, unload: R }
}
function lr(e) {
  const t = window.getComputedStyle(e)
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientHeight < e.scrollHeight) ||
    (t.overflowY === 'auto' && e.clientWidth < e.scrollWidth)
  )
    return !0
  {
    const a = e.parentNode
    return !a || a.tagName === 'BODY' ? !1 : lr(a)
  }
}
function ei(e) {
  const t = e || window.event,
    a = t.target
  return lr(a) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1)
}
function cr(e, t = !1) {
  const a = O(t)
  let r = null,
    o
  C(
    rr(e),
    (c) => {
      if (c) {
        const p = c
        ;(o = p.style.overflow), a.value && (p.style.overflow = 'hidden')
      }
    },
    { immediate: !0 }
  )
  const s = () => {
      const c = H(e)
      !c ||
        a.value ||
        (ea &&
          (r = Q(
            c,
            'touchmove',
            (p) => {
              ei(p)
            },
            { passive: !1 }
          )),
        (c.style.overflow = 'hidden'),
        (a.value = !0))
    },
    l = () => {
      const c = H(e)
      !c || !a.value || (ea && (r == null || r()), (c.style.overflow = o), (a.value = !1))
    }
  return (
    Oe(l),
    h({
      get() {
        return a.value
      },
      set(c) {
        c ? s() : l()
      }
    })
  )
}
var ti = Object.defineProperty,
  ua = Object.getOwnPropertySymbols,
  ai = Object.prototype.hasOwnProperty,
  ri = Object.prototype.propertyIsEnumerable,
  pa = (e, t, a) => (t in e ? ti(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[t] = a)),
  ni = (e, t) => {
    for (var a in t || (t = {})) ai.call(t, a) && pa(e, a, t[a])
    if (ua) for (var a of ua(t)) ri.call(t, a) && pa(e, a, t[a])
    return e
  }
const oi = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
}
ni({ linear: To }, oi)
function ii({ window: e = ye } = {}) {
  if (!e) return { x: O(0), y: O(0) }
  const t = O(e.scrollX),
    a = O(e.scrollY)
  return (
    Q(
      e,
      'scroll',
      () => {
        ;(t.value = e.scrollX), (a.value = e.scrollY)
      },
      { capture: !1, passive: !0 }
    ),
    { x: t, y: a }
  )
}
const ur = ({ type: e = 'info', text: t = '', vertical: a = 'top', color: r }, { slots: o }) => {
  var s
  return n('span', { class: ['badge', e, { diy: r }], style: { verticalAlign: a, ...(r ? { backgroundColor: r } : {}) } }, t || ((s = o.default) == null ? void 0 : s.call(o)))
}
ur.displayName = 'Badge'
var si = y({
  name: 'FontIcon',
  props: { icon: { type: String, default: '' }, color: { type: String, default: '' }, size: { type: [String, Number], default: '' } },
  setup(e) {
    const t = h(() => {
        const r = ['font-icon icon']
        return `${e.icon}`, r
      }),
      a = h(() => {
        const r = {}
        return e.color && (r.color = e.color), e.size && (r['font-size'] = Number.isNaN(Number(e.size)) ? e.size : `${e.size}px`), le(r).length ? r : null
      })
    return () => (e.icon ? n('iconify-icon', { key: e.icon, class: t.value, style: a.value, mode: 'style', inline: '', icon: `${e.icon}`, width: '1em', height: '1em' }) : null)
  }
})
const pr = () =>
  n(V, { name: 'back-to-top' }, () => [
    n('path', {
      d: 'M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z'
    }),
    n('path', {
      d: 'm795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z'
    })
  ])
pr.displayName = 'BackToTopIcon'
var li = y({
  name: 'BackToTop',
  props: { threshold: { type: Number, default: 300 } },
  setup(e) {
    const t = N(),
      a = Re({ '/': { backToTop: 'Back to top' } }),
      { y: r } = ii(),
      o = h(() => t.value.backToTop !== !1 && r.value > e.threshold)
    return () =>
      n(Le, { name: 'fade' }, () =>
        o.value
          ? n(
              'button',
              {
                type: 'button',
                class: 'back-to-top',
                'aria-label': a.value.backToTop,
                'data-balloon-pos': 'left',
                onClick: () => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              },
              n(pr)
            )
          : null
      )
  }
})
const ci = X({
  enhance: ({ app: e }) => {
    Y('Badge') || e.component('Badge', ur), Y('FontIcon') || e.component('FontIcon', si)
  },
  setup: () => {
    Zo('https://cdn.jsdelivr.net/npm/iconify-icon@1')
  },
  rootComponents: [() => n(li, { threshold: 300 })]
})
function ui(e, t, a) {
  var r, o, s
  t === void 0 && (t = 50), a === void 0 && (a = {})
  var l = (r = a.isImmediate) != null && r,
    c = (o = a.callback) != null && o,
    p = a.maxWait,
    u = Date.now(),
    d = []
  function m() {
    if (p !== void 0) {
      var f = Date.now() - u
      if (f + t >= p) return p - f
    }
    return t
  }
  var _ = function () {
    var f = [].slice.call(arguments),
      g = this
    return new Promise(function (E, L) {
      var R = l && s === void 0
      if (
        (s !== void 0 && clearTimeout(s),
        (s = setTimeout(function () {
          if (((s = void 0), (u = Date.now()), !l)) {
            var A = e.apply(g, f)
            c && c(A),
              d.forEach(function (M) {
                return (0, M.resolve)(A)
              }),
              (d = [])
          }
        }, m())),
        R)
      ) {
        var I = e.apply(g, f)
        return c && c(I), E(I)
      }
      d.push({ resolve: E, reject: L })
    })
  }
  return (
    (_.cancel = function (f) {
      s !== void 0 && clearTimeout(s),
        d.forEach(function (g) {
          return (0, g.reject)(f)
        }),
        (d = [])
    }),
    _
  )
}
const pi = ({ headerLinkSelector: e, headerAnchorSelector: t, delay: a, offset: r = 5 }) => {
    const o = K(),
      l = ui(() => {
        var E, L
        const c = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
        if (Math.abs(c - 0) < r) {
          da(o, '')
          return
        }
        const u = window.innerHeight + c,
          d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
          m = Math.abs(d - u) < r,
          _ = Array.from(document.querySelectorAll(e)),
          g = Array.from(document.querySelectorAll(t)).filter((R) => _.some((I) => I.hash === R.hash))
        for (let R = 0; R < g.length; R++) {
          const I = g[R],
            A = g[R + 1],
            M = c >= (((E = I.parentElement) == null ? void 0 : E.offsetTop) ?? 0) - r,
            $ = !A || c < (((L = A.parentElement) == null ? void 0 : L.offsetTop) ?? 0) - r
          if (!(M && $)) continue
          const b = decodeURIComponent(o.currentRoute.value.hash),
            T = decodeURIComponent(I.hash)
          if (b === T) return
          if (m) {
            for (let x = R + 1; x < g.length; x++) if (b === decodeURIComponent(g[x].hash)) return
          }
          da(o, T)
          return
        }
      }, a)
    F(() => {
      window.addEventListener('scroll', l)
    }),
      hn(() => {
        window.removeEventListener('scroll', l)
      })
  },
  da = async (e, t) => {
    const { scrollBehavior: a } = e.options
    ;(e.options.scrollBehavior = void 0), await e.replace({ query: e.currentRoute.value.query, hash: t, force: !0 }).finally(() => (e.options.scrollBehavior = a))
  },
  di = '.sidebar-link, .toc-link',
  vi = '.header-anchor',
  mi = 200,
  _i = 5,
  fi = X({
    setup() {
      pi({ headerLinkSelector: di, headerAnchorSelector: vi, delay: mi, offset: _i })
    }
  })
var hi = y({
    name: 'AutoCatalog',
    props: { base: { type: String, default: '' }, level: { type: Number, default: 3 }, index: Boolean },
    setup(e, { slots: t }) {
      const a = Re({ '/': { title: 'Catalog' } }),
        r = w(),
        o = K(),
        s = ka(),
        l = (u) => {
          const d = u.I
          return typeof d > 'u' || d
        },
        c = () => {
          const u = e.base || r.value.path.replace(/\/[^/]+$/, '/'),
            d = o.getRoutes(),
            m = []
          return (
            d
              .filter(({ meta: _, path: f }) => {
                if (!De(f, u) || f === u) return !1
                if (u === '/') {
                  const g = le(s.value.locales).filter((E) => E !== '/')
                  if (f === '/404.html' || g.some((E) => De(f, E))) return !1
                }
                return ((_e(f, '.html') && !_e(f, '/index.html')) || _e(f, '/')) && l(_)
              })
              .map(({ path: _, meta: f }) => {
                const g = _.substring(u.length).split('/').length
                return { title: f.t || '', icon: f.i, base: _.replace(/\/[^/]+\/?$/, '/'), order: f.O || null, level: _e(_, '/') ? g - 1 : g, path: _ }
              })
              .filter(({ title: _, level: f }) => typeof _ == 'string' && _ && f <= e.level)
              .sort(
                ({ title: _, level: f, path: g, order: E }, { title: L, level: R, path: I, order: A }) =>
                  f - R ||
                  (_e(g, '/index.html')
                    ? -1
                    : _e(I, '/index.html')
                    ? 1
                    : E === null
                    ? A === null
                      ? _.localeCompare(L)
                      : A
                    : A === null
                    ? E
                    : E > 0
                    ? A > 0
                      ? E - A
                      : -1
                    : A < 0
                    ? E - A
                    : 1)
              )
              .forEach((_) => {
                var f
                const { base: g, level: E } = _
                switch (E) {
                  case 1:
                    m.push(_)
                    break
                  case 2: {
                    const L = m.find((R) => R.path === g)
                    L && (L.children ?? (L.children = [])).push(_)
                    break
                  }
                  default: {
                    const L = m.find((R) => R.path === g.replace(/\/[^/]+\/$/, '/'))
                    if (L) {
                      const R = (f = L.children) == null ? void 0 : f.find((I) => I.path === g)
                      R && (R.children ?? (R.children = [])).push(_)
                    }
                  }
                }
              }),
            m
          )
        },
        p = h(() => c())
      return () =>
        n('div', { class: 'auto-catalog-wrapper' }, [
          n('h2', { class: 'main-title' }, a.value.title),
          ...p.value.map(({ children: u = [], icon: d, path: m, title: _ }, f) => [
            n('h3', { id: _, class: ['child-title', { 'has-children': u.length }] }, [
              n('a', { href: `#${_}`, class: 'header-anchor' }, '#'),
              n(te, { class: 'catalog-title', to: m }, () => [e.index ? `${f + 1}.` : null, d && t.icon ? t.icon({ icon: d }) : null, _ || 'Unknown'])
            ]),
            u.length
              ? n(
                  'ul',
                  { class: 'child-catalog-wrapper' },
                  u.map(({ children: g = [], icon: E, path: L, title: R }, I) =>
                    n('li', { class: 'child-catalog-item' }, [
                      n('div', { class: ['sub-title', { 'has-children': g.length }] }, [
                        n('a', { href: `#${R}`, class: 'header-anchor' }, '#'),
                        n(te, { class: 'catalog-title', to: L }, () => [e.index ? `${f + 1}.${I + 1}` : null, E && t.icon ? t.icon({ icon: E }) : null, R || 'Unknown'])
                      ]),
                      g.length
                        ? n(
                            'div',
                            { class: 'sub-catalog-wrapper' },
                            g.map(({ icon: A, path: M, title: $ }, P) =>
                              n(te, { class: 'sub-catalog-item', to: M }, () => [
                                e.index ? `${f + 1}.${I + 1}.${P + 1}` : null,
                                A && t.icon ? t.icon({ icon: A }) : null,
                                $ || 'Unknown'
                              ])
                            )
                          )
                        : null
                    ])
                  )
                )
              : null
          ])
        ])
    }
  }),
  gi = X({
    enhance: ({ app: e }) => {
      Y('AutoCatalog', e) || e.component('AutoCatalog', (t) => n(hi, t, { icon: ({ icon: a }) => n(q('HopeIcon'), { icon: a }) }))
    }
  })
const bi = n(
    'svg',
    {
      class: 'external-link-icon',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      focusable: 'false',
      x: '0px',
      y: '0px',
      viewBox: '0 0 100 100',
      width: '15',
      height: '15'
    },
    [
      n('path', { fill: 'currentColor', d: 'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z' }),
      n('polygon', { fill: 'currentColor', points: '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9' })
    ]
  ),
  dr = y({
    name: 'ExternalLinkIcon',
    props: { locales: { type: Object, required: !1, default: () => ({}) } },
    setup(e) {
      const t = de(),
        a = h(() => e.locales[t.value] ?? { openInNewWindow: 'open in new window' })
      return () => n('span', [bi, n('span', { class: 'external-link-icon-sr-only' }, a.value.openInNewWindow)])
    }
  }),
  Ei = {},
  Li = X({
    enhance({ app: e }) {
      e.component('ExternalLinkIcon', n(dr, { locales: Ei }))
    }
  })
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */ const D = {
    settings: {
      minimum: 0.08,
      easing: 'ease',
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      barSelector: '[role="bar"]',
      parent: 'body',
      template: '<div class="bar" role="bar"></div>'
    },
    status: null,
    set: (e) => {
      const t = D.isStarted()
      ;(e = tt(e, D.settings.minimum, 1)), (D.status = e === 1 ? null : e)
      const a = D.render(!t),
        r = a.querySelector(D.settings.barSelector),
        o = D.settings.speed,
        s = D.settings.easing
      return (
        a.offsetWidth,
        yi((l) => {
          Me(r, { transform: 'translate3d(' + va(e) + '%,0,0)', transition: 'all ' + o + 'ms ' + s }),
            e === 1
              ? (Me(a, { transition: 'none', opacity: '1' }),
                a.offsetWidth,
                setTimeout(function () {
                  Me(a, { transition: 'all ' + o + 'ms linear', opacity: '0' }),
                    setTimeout(function () {
                      D.remove(), l()
                    }, o)
                }, o))
              : setTimeout(() => l(), o)
        }),
        D
      )
    },
    isStarted: () => typeof D.status == 'number',
    start: () => {
      D.status || D.set(0)
      const e = () => {
        setTimeout(() => {
          D.status && (D.trickle(), e())
        }, D.settings.trickleSpeed)
      }
      return D.settings.trickle && e(), D
    },
    done: (e) => (!e && !D.status ? D : D.inc(0.3 + 0.5 * Math.random()).set(1)),
    inc: (e) => {
      let t = D.status
      return t ? (typeof e != 'number' && (e = (1 - t) * tt(Math.random() * t, 0.1, 0.95)), (t = tt(t + e, 0, 0.994)), D.set(t)) : D.start()
    },
    trickle: () => D.inc(Math.random() * D.settings.trickleRate),
    render: (e) => {
      if (D.isRendered()) return document.getElementById('nprogress')
      ma(document.documentElement, 'nprogress-busy')
      const t = document.createElement('div')
      ;(t.id = 'nprogress'), (t.innerHTML = D.settings.template)
      const a = t.querySelector(D.settings.barSelector),
        r = e ? '-100' : va(D.status || 0),
        o = document.querySelector(D.settings.parent)
      return (
        Me(a, { transition: 'all 0 linear', transform: 'translate3d(' + r + '%,0,0)' }), o !== document.body && ma(o, 'nprogress-custom-parent'), o == null || o.appendChild(t), t
      )
    },
    remove: () => {
      _a(document.documentElement, 'nprogress-busy'), _a(document.querySelector(D.settings.parent), 'nprogress-custom-parent')
      const e = document.getElementById('nprogress')
      e && Ti(e)
    },
    isRendered: () => !!document.getElementById('nprogress')
  },
  tt = (e, t, a) => (e < t ? t : e > a ? a : e),
  va = (e) => (-1 + e) * 100,
  yi = (function () {
    const e = []
    function t() {
      const a = e.shift()
      a && a(t)
    }
    return function (a) {
      e.push(a), e.length === 1 && t()
    }
  })(),
  Me = (function () {
    const e = ['Webkit', 'O', 'Moz', 'ms'],
      t = {}
    function a(l) {
      return l.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (c, p) {
        return p.toUpperCase()
      })
    }
    function r(l) {
      const c = document.body.style
      if (l in c) return l
      let p = e.length
      const u = l.charAt(0).toUpperCase() + l.slice(1)
      let d
      for (; p--; ) if (((d = e[p] + u), d in c)) return d
      return l
    }
    function o(l) {
      return (l = a(l)), t[l] || (t[l] = r(l))
    }
    function s(l, c, p) {
      ;(c = o(c)), (l.style[c] = p)
    }
    return function (l, c) {
      for (const p in c) {
        const u = c[p]
        u !== void 0 && Object.prototype.hasOwnProperty.call(c, p) && s(l, p, u)
      }
    }
  })(),
  vr = (e, t) => (typeof e == 'string' ? e : At(e)).indexOf(' ' + t + ' ') >= 0,
  ma = (e, t) => {
    const a = At(e),
      r = a + t
    vr(a, t) || (e.className = r.substring(1))
  },
  _a = (e, t) => {
    const a = At(e)
    if (!vr(e, t)) return
    const r = a.replace(' ' + t + ' ', ' ')
    e.className = r.substring(1, r.length - 1)
  },
  At = (e) => (' ' + (e.className || '') + ' ').replace(/\s+/gi, ' '),
  Ti = (e) => {
    e && e.parentNode && e.parentNode.removeChild(e)
  }
const Ri = () => {
    F(() => {
      const e = K(),
        t = new Set()
      t.add(e.currentRoute.value.path),
        e.beforeEach((a) => {
          t.has(a.path) || D.start()
        }),
        e.afterEach((a) => {
          t.add(a.path), D.done()
        })
    })
  },
  Oi = X({
    setup() {
      Ri()
    }
  }),
  Ii = JSON.parse(
    `{"encrypt":{},"navbarAutoHide":"none","repo":"cenk1cenk2/listr2","footer":"\\n<img src=\\"https://main.s3.kilic.dev/html/icon.png\\" height=\\"16px\\" style=\\"margin-bottom: -2px;\\" />\\n<a href=\\"https://kilic.dev\\" target=\\"_blank\\">kilic.dev</a>\\n<br/>\\n<small>Made with <a href=\\"https://theme-hope.vuejs.press/\\" target=\\"_blank\\">VuePress - Mr.Hope Theme</a>.</small>\\n","copyright":"\\n<a href=\\"https://github.com/cenk1cenk2/listr2/blob/master/LICENSE\\">MIT LICENSE</a>\\n","displayFooter":true,"mobileBreakPoint":959,"pcBreakPoint":1920,"print":false,"docsDir":"docs/","locales":{"/":{"lang":"en-US","navbarLocales":{"langName":"English","selectLangAriaLabel":"Select language"},"metaLocales":{"author":"Author","date":"Writing Date","origin":"Original","views":"Page views","category":"Category","tag":"Tag","readingTime":"Reading Time","words":"Words","toc":"On This Page","prev":"Prev","next":"Next","lastUpdated":"Last update","contributors":"Contributors","editLink":"Edit this page on GitHub","print":"Print"},"outlookLocales":{"themeColor":"Theme Color","darkmode":"Theme Mode","fullscreen":"Full Screen"},"encryptLocales":{"iconLabel":"Page Encrypted","placeholder":"Enter password","remember":"Remember password","errorHint":"Please enter the correct password!"},"routeLocales":{"skipToContent":"Skip to main content","notFoundTitle":"Page not found","notFoundMsg":["There’s nothing here.","How did we get here?","That’s a Four-Oh-Four.","Looks like we've got some broken links."],"back":"Go back","home":"Take me home","openInNewWindow":"Open in new window"},"navbar":["/",{"text":"documentation","icon":"discover","link":"/getting-started/installation.html"},{"text":"foreword","icon":"discover","link":"/repository/foreword.html"},{"text":"","icon":"simple-icons:npm","link":"https://www.npmjs.com/package/listr2"},{"text":"","icon":"vscode-icons:file-type-gitlab","link":"https://gitlab.kilic.dev/libraries/listr2/-/pipelines"}],"sidebar":{"/":["",{"text":"Repository","icon":"mdi:git","prefix":"repository/","children":"structure"},{"text":"Getting Started","prefix":"getting-started/","children":"structure","collapsible":true},{"text":"Task","prefix":"task/","children":"structure","collapsible":true},{"text":"Renderer","prefix":"renderer/","children":"structure","collapsible":true},{"text":"Manager","prefix":"manager/","children":"structure","collapsible":true},{"text":"Migration","prefix":"migration/","children":"structure","collapsible":true},{"text":"API","icon":"eos-icons:api-outlined","prefix":"api/","children":"structure","collapsible":true}]}}}}`
  ),
  Pi = O(Ii),
  mr = () => Pi,
  _r = Symbol(''),
  Ai = () => {
    const e = ae(_r)
    if (!e) throw new Error('useThemeLocaleData() is called without provider.')
    return e
  },
  Di = (e, t) => {
    var a
    return { ...e, ...((a = e.locales) == null ? void 0 : a[t]) }
  },
  ki = X({
    enhance({ app: e }) {
      const t = mr(),
        a = e._context.provides[Et],
        r = h(() => Di(t.value, a.value))
      e.provide(_r, r),
        Object.defineProperties(e.config.globalProperties, {
          $theme: {
            get() {
              return t.value
            }
          },
          $themeLocale: {
            get() {
              return r.value
            }
          }
        })
    }
  })
const wi = 800,
  Si = 2e3,
  Vi = { '/': { copy: 'Copy code', copied: 'Copied', hint: 'Copied successfully' } },
  Ci = !1,
  xi = ['.theme-hope-content div[class*="language-"] pre'],
  fa = !1,
  at = new Map(),
  Mi = () => {
    const { copy: e } = Bo({ legacy: !0 }),
      t = Re(Vi),
      a = w(),
      r = vo(),
      o = (c) => {
        if (!c.hasAttribute('copy-code-registered')) {
          const p = document.createElement('button')
          ;(p.type = 'button'),
            p.classList.add('copy-code-button'),
            (p.innerHTML = '<div class="copy-icon" />'),
            p.setAttribute('aria-label', t.value.copy),
            p.setAttribute('data-copied', t.value.copied),
            c.parentElement && c.parentElement.insertBefore(p, c),
            c.setAttribute('copy-code-registered', '')
        }
      },
      s = () =>
        we().then(
          () =>
            new Promise((c) => {
              setTimeout(() => {
                xi.forEach((p) => {
                  document.querySelectorAll(p).forEach(o)
                }),
                  c()
              }, wi)
            })
        ),
      l = (c, p, u) => {
        let { innerText: d = '' } = p
        ;/language-(shellscript|shell|bash|sh|zsh)/.test(c.classList.toString()) && (d = d.replace(/^ *(\$|>) /gm, '')),
          e(d).then(() => {
            u.classList.add('copied'), clearTimeout(at.get(u))
            const m = setTimeout(() => {
              u.classList.remove('copied'), u.blur(), at.delete(u)
            }, Si)
            at.set(u, m)
          })
      }
    F(() => {
      ;(!r.value || fa) && s(),
        Q('click', (c) => {
          const p = c.target
          if (p.matches('div[class*="language-"] > button.copy')) {
            const u = p.parentElement,
              d = p.nextElementSibling
            d && l(u, d, p)
          } else if (p.matches('div[class*="language-"] div.copy-icon')) {
            const u = p.parentElement,
              d = u.parentElement,
              m = u.nextElementSibling
            m && l(d, m, u)
          }
        }),
        C(
          () => a.value.path,
          () => {
            ;(!r.value || fa) && s()
          }
        )
    })
  }
var $i = X({
  setup: () => {
    Mi()
  }
})
const $e = It('VUEPRESS_CODE_TAB_STORE', {})
var Fi = y({
  name: 'CodeTabs',
  props: { active: { type: Number, default: 0 }, data: { type: Array, required: !0 }, id: { type: String, required: !0 }, tabId: { type: String, default: '' } },
  setup(e, { slots: t }) {
    const a = O(e.active),
      r = O([]),
      o = () => {
        if (e.tabId) {
          const { title: u, id: d = u } = e.data[a.value]
          $e.value[e.tabId] = d
        }
      },
      s = (u = a.value) => {
        ;(a.value = u < r.value.length - 1 ? u + 1 : 0), r.value[a.value].focus()
      },
      l = (u = a.value) => {
        ;(a.value = u > 0 ? u - 1 : r.value.length - 1), r.value[a.value].focus()
      },
      c = (u, d) => {
        if (
          (u.key === ' ' || u.key === 'Enter'
            ? (u.preventDefault(), (a.value = d))
            : u.key === 'ArrowRight'
            ? (u.preventDefault(), s())
            : u.key === 'ArrowLeft' && (u.preventDefault(), l()),
          e.tabId)
        ) {
          const { title: m, id: _ = m } = e.data[a.value]
          $e.value[e.tabId] = _
        }
      },
      p = () => {
        if (e.tabId) {
          const u = e.data.findIndex(({ title: d, id: m = d }) => $e.value[e.tabId] === m)
          if (u !== -1) return u
        }
        return e.active
      }
    return (
      F(() => {
        ;(a.value = p()),
          C(
            () => $e.value[e.tabId],
            (u, d) => {
              if (e.tabId && u !== d) {
                const m = e.data.findIndex(({ title: _, id: f = _ }) => f === u)
                m !== -1 && (a.value = m)
              }
            }
          )
      }),
      () =>
        e.data.length
          ? n('div', { class: 'code-tabs' }, [
              n(
                'div',
                { class: 'code-tabs-nav', role: 'tablist' },
                e.data.map(({ title: u }, d) => {
                  const m = d === a.value
                  return n(
                    'button',
                    {
                      type: 'button',
                      ref: (_) => {
                        _ && (r.value[d] = _)
                      },
                      class: ['code-tabs-nav-tab', { active: m }],
                      role: 'tab',
                      'aria-controls': `codetab-${e.id}-${d}`,
                      'aria-selected': m,
                      onClick: () => {
                        ;(a.value = d), o()
                      },
                      onKeydown: (_) => c(_, d)
                    },
                    u
                  )
                })
              ),
              e.data.map(({ title: u, id: d = u }, m) => {
                var _
                const f = m === a.value
                return n(
                  'div',
                  { class: ['code-tab', { active: f }], id: `codetab-${e.id}-${m}`, role: 'tabpanel', 'aria-expanded': f },
                  (_ = t[`tab${m}`]) == null ? void 0 : _.call(t, { title: u, value: d, isActive: f })
                )
              })
            ])
          : null
    )
  }
})
const fr = ({ active: e = !1 }, { slots: t }) => {
  var a
  return n('div', { class: ['code-group-item', { active: e }], 'aria-selected': e }, (a = t.default) == null ? void 0 : a.call(t))
}
fr.displayName = 'CodeGroupItem'
const Ni = y({
  name: 'CodeGroup',
  setup(e, { slots: t }) {
    const a = O(-1),
      r = O([]),
      o = (c = a.value) => {
        ;(a.value = c < r.value.length - 1 ? c + 1 : 0), r.value[a.value].focus()
      },
      s = (c = a.value) => {
        ;(a.value = c > 0 ? c - 1 : r.value.length - 1), r.value[a.value].focus()
      },
      l = (c, p) => {
        c.key === ' ' || c.key === 'Enter'
          ? (c.preventDefault(), (a.value = p))
          : c.key === 'ArrowRight'
          ? (c.preventDefault(), o(p))
          : c.key === 'ArrowLeft' && (c.preventDefault(), s(p))
      }
    return () => {
      var c
      const p = (((c = t.default) == null ? void 0 : c.call(t)) || []).filter((u) => u.type.name === 'CodeGroupItem').map((u) => (u.props === null && (u.props = {}), u))
      return p.length === 0
        ? null
        : (a.value < 0 || a.value > p.length - 1
            ? ((a.value = p.findIndex((u) => 'active' in u.props)), a.value === -1 && (a.value = 0))
            : p.forEach((u, d) => {
                u.props.active = d === a.value
              }),
          n('div', { class: 'code-group' }, [
            n(
              'div',
              { class: 'code-group-nav' },
              p.map((u, d) => {
                const m = d === a.value
                return n(
                  'button',
                  {
                    type: 'button',
                    ref: (_) => {
                      _ && (r.value[d] = _)
                    },
                    class: ['code-group-nav-tab', { active: m }],
                    'aria-pressed': m,
                    'aria-expanded': m,
                    onClick: () => {
                      a.value = d
                    },
                    onKeydown: (_) => l(_, d)
                  },
                  u.props.title
                )
              })
            ),
            p
          ]))
    }
  }
})
const Bi =
    '<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>',
  zi =
    '<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>'
const rt = {
    useBabel: !1,
    jsLib: [],
    cssLib: [],
    codepenLayout: 'left',
    codepenEditors: '101',
    babel: 'https://unpkg.com/@babel/standalone/babel.min.js',
    vue: 'https://unpkg.com/vue/dist/vue.global.prod.js',
    react: 'https://unpkg.com/react/umd/react.production.min.js',
    reactDOM: 'https://unpkg.com/react-dom/umd/react-dom.production.min.js'
  },
  ha = {
    html: { types: ['html', 'slim', 'haml', 'md', 'markdown', 'vue'], map: { html: 'none', vue: 'none', md: 'markdown' } },
    js: {
      types: ['js', 'javascript', 'coffee', 'coffeescript', 'ts', 'typescript', 'ls', 'livescript'],
      map: { js: 'none', javascript: 'none', coffee: 'coffeescript', ls: 'livescript', ts: 'typescript' }
    },
    css: { types: ['css', 'less', 'sass', 'scss', 'stylus', 'styl'], map: { css: 'none', styl: 'stylus' } }
  },
  Hi = (e, t, a) => {
    const r = document.createElement(e)
    return (
      je(t) &&
        le(t).forEach((o) => {
          if (o.indexOf('data')) r[o] = t[o]
          else {
            const s = o.replace('data', '')
            r.dataset[s] = t[o]
          }
        }),
      a &&
        a.forEach((o) => {
          r.appendChild(o)
        }),
      r
    )
  },
  Dt = (e) => ({ ...rt, ...e, jsLib: Array.from(new Set([...(rt.jsLib || []), ...(e.jsLib || [])])), cssLib: Array.from(new Set([...(rt.cssLib || []), ...(e.cssLib || [])])) }),
  ge = (e, t) => {
    if (e[t] !== void 0) return e[t]
    const a = new Promise((r) => {
      var o
      const s = document.createElement('script')
      ;(s.src = t),
        (o = document.querySelector('body')) == null || o.appendChild(s),
        (s.onload = () => {
          r()
        })
    })
    return (e[t] = a), a
  },
  ji = (e, t) => {
    if (t.css && Array.from(e.childNodes).every((a) => a.nodeName !== 'STYLE')) {
      const a = Hi('style', { innerHTML: t.css })
      e.appendChild(a)
    }
  },
  Ui = (e, t, a) => {
    const r = a.getScript()
    if (r && Array.from(t.childNodes).every((o) => o.nodeName !== 'SCRIPT')) {
      const o = document.createElement('script')
      o.appendChild(
        document.createTextNode(`{const document=window.document.querySelector('#${e} .code-demo-container').shadowRoot;
${r}}`)
      ),
        t.appendChild(o)
    }
  },
  qi = (e) => {
    const t = le(e),
      a = { html: [], js: [], css: [], isLegal: !1 }
    return (
      ['html', 'js', 'css'].forEach((r) => {
        const o = t.filter((s) => ha[r].types.includes(s))
        if (o.length) {
          const s = o[0]
          a[r] = [e[s].replace(/^\n|\n$/g, ''), ha[r].map[s] || s]
        }
      }),
      (a.isLegal = (!a.html.length || a.html[1] === 'none') && (!a.js.length || a.js[1] === 'none') && (!a.css.length || a.css[1] === 'none')),
      a
    )
  },
  hr = (e) => e.replace(/<br \/>/g, '<br>').replace(/<((\S+)[^<]*?)\s+\/>/g, '<$1></$2>'),
  gr = (e) => `<div id="app">
${hr(e)}
</div>`,
  Gi = (e) => `${e.replace('export default ', 'const $reactApp = ').replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/, '')};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`,
  Wi = (e) =>
    e
      .replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u, "Vue.createApp({$1}).mount('#app')")
      .replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u, "Vue.createApp({$1}).mount('#app')")
      .trim(),
  br = (e) => `(function(exports){var module={};module.exports=exports;${e};return module.exports.__esModule?module.exports.default:module.exports;})({})`,
  Yi = (e, t) => {
    const a = Dt(t),
      r = e.js[0] || ''
    return {
      ...a,
      html: hr(e.html[0] || ''),
      js: r,
      css: e.css[0] || '',
      isLegal: e.isLegal,
      getScript: () => {
        var o
        return a.useBabel ? ((o = window.Babel.transform(r, { presets: ['es2015'] })) == null ? void 0 : o.code) || '' : r
      }
    }
  },
  Qi = (e, t) => {
    const a = Dt(t),
      r = e.html[0] || '',
      o = /<template>([\s\S]+)<\/template>/u.exec(r),
      s = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u.exec(r),
      l = /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u.exec(r),
      c = o ? o[1].replace(/^\n|\n$/g, '') : '',
      [p = '', u = ''] = s ? [s[4].replace(/^\n|\n$/g, ''), s[3]] : [],
      [d = '', m = ''] = l ? [l[4].replace(/^\n|\n$/g, ''), l[3]] : [],
      _ = u === '' && (m === '' || m === 'css')
    return {
      ...a,
      html: gr(c),
      js: Wi(p),
      css: d,
      isLegal: _,
      jsLib: [a.vue, ...a.jsLib],
      getScript: () => {
        var f, g
        const E = t.useBabel
          ? ((g = (f = window.Babel) == null ? void 0 : f.transform(p, { presets: ['es2015'] })) == null ? void 0 : g.code) || ''
          : p.replace(/export\s+default/u, 'return')
        return `const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${br(E)};appOptions.template=\`${c.replace(
          '`',
          '\\`"'
        )}\`;window.Vue.createApp(appOptions).mount(app);`
      }
    }
  },
  Ji = (e, t) => {
    const a = Dt(t)
    return {
      ...a,
      html: gr(''),
      js: Gi(e.js[0] || ''),
      css: e.css[0] || (e.js[0] ? e.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/, '$1').trim() : ''),
      isLegal: e.isLegal,
      jsLib: [a.react, a.reactDOM, ...a.jsLib],
      jsx: !0,
      getScript: () => {
        var r, o
        const s = ((o = (r = window.Babel) == null ? void 0 : r.transform(e.js[0] || '', { presets: ['es2015', 'react'] })) == null ? void 0 : o.code) || ''
        return `window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${br(s)}))`
      }
    }
  },
  be = {},
  Ki = (e) => Promise.all([ge(be, e.babel), ge(be, e.react), ge(be, e.reactDOM)]),
  Xi = (e) => {
    const t = [ge(be, e.vue)]
    return e.useBabel && t.push(ge(be, e.babel)), Promise.all(t)
  },
  Zi = (e) => (e.useBabel ? ge(be, e.babel) : Promise.resolve())
var es = y({
  name: 'CodeDemo',
  props: {
    id: { type: String, required: !0 },
    type: { type: String, default: 'normal' },
    title: { type: String, default: '' },
    config: { type: String, default: '' },
    code: { type: String, required: !0 }
  },
  setup(e, { slots: t }) {
    const [a, r] = ct(!1),
      o = O(),
      s = O(),
      l = O('0'),
      c = O(!1),
      p = h(() => JSON.parse(e.config ? Xt(e.config) : '{}')),
      u = h(() => {
        const g = JSON.parse(Xt(e.code))
        return qi(g)
      }),
      d = h(() => (e.type === 'react' ? Ji(u.value, p.value) : e.type === 'vue' ? Qi(u.value, p.value) : Yi(u.value, p.value))),
      m = h(() => d.value.isLegal),
      _ = (g = !1) => {
        const E = o.value.attachShadow({ mode: 'open' }),
          L = document.createElement('div')
        L.classList.add('code-demo-app'),
          E.appendChild(L),
          m.value ? (g && (L.innerHTML = d.value.html), ji(E, d.value), Ui(e.id, E, d.value), (l.value = '0')) : (l.value = 'auto'),
          (c.value = !0)
      },
      f = () => {
        switch (e.type) {
          case 'react':
            return Ki(d.value).then(() => _())
          case 'vue':
            return Xi(d.value).then(() => _())
          default:
            return Zi(d.value).then(() => _(!0))
        }
      }
    return (
      F(() => {
        setTimeout(() => {
          f()
        }, 800)
      }),
      () => {
        var g
        return n('div', { class: 'code-demo-wrapper', id: e.id }, [
          n('div', { class: 'code-demo-header' }, [
            d.value.isLegal
              ? n('button', {
                  type: 'button',
                  title: 'toggle',
                  'aria-hidden': !0,
                  class: ['toggle-button', a.value ? 'down' : 'end'],
                  onClick: () => {
                    ;(l.value = a.value ? '0' : `${s.value.clientHeight + 13.8}px`), r()
                  }
                })
              : null,
            e.title ? n('span', { class: 'title' }, decodeURIComponent(e.title)) : null,
            d.value.isLegal && d.value.jsfiddle !== !1
              ? n('form', { class: 'code-demo-jsfiddle', target: '_blank', action: 'https://jsfiddle.net/api/post/library/pure/', method: 'post' }, [
                  n('input', { type: 'hidden', name: 'html', value: d.value.html }),
                  n('input', { type: 'hidden', name: 'js', value: d.value.js }),
                  n('input', { type: 'hidden', name: 'css', value: d.value.css }),
                  n('input', { type: 'hidden', name: 'wrap', value: '1' }),
                  n('input', { type: 'hidden', name: 'panel_js', value: '3' }),
                  n('input', { type: 'hidden', name: 'resources', value: [...d.value.cssLib, ...d.value.jsLib].join(',') }),
                  n('button', { type: 'submit', class: 'jsfiddle-button', innerHTML: zi, 'aria-label': 'JSFiddle', 'data-balloon-pos': 'up' })
                ])
              : null,
            !d.value.isLegal || d.value.codepen !== !1
              ? n('form', { class: 'code-demo-codepen', target: '_blank', action: 'https://codepen.io/pen/define', method: 'post' }, [
                  n('input', {
                    type: 'hidden',
                    name: 'data',
                    value: JSON.stringify({
                      html: d.value.html,
                      js: d.value.js,
                      css: d.value.css,
                      js_external: d.value.jsLib.join(';'),
                      css_external: d.value.cssLib.join(';'),
                      layout: d.value.codepenLayout,
                      html_pre_processor: u.value ? u.value.html[1] : 'none',
                      js_pre_processor: u.value ? u.value.js[1] : d.value.jsx ? 'babel' : 'none',
                      css_pre_processor: u.value ? u.value.css[1] : 'none',
                      editors: d.value.codepenEditors
                    })
                  }),
                  n('button', { type: 'submit', innerHTML: Bi, class: 'codepen-button', 'aria-label': 'Codepen', 'data-balloon-pos': 'up' })
                ])
              : null
          ]),
          c.value ? null : n(Ba, { class: 'code-demo-loading' }),
          n('div', { ref: o, class: 'code-demo-container', style: { display: m.value && c.value ? 'block' : 'none' } }),
          n('div', { class: 'code-demo-code-wrapper', style: { height: l.value } }, n('div', { ref: s, class: 'code-demo-codes' }, (g = t.default) == null ? void 0 : g.call(t)))
        ])
      }
    )
  }
})
const nt = It('VUEPRESS_TAB_STORE', {})
var ts = y({
  name: 'Tabs',
  props: { active: { type: Number, default: 0 }, data: { type: Array, required: !0 }, id: { type: String, required: !0 }, tabId: { type: String, default: '' } },
  setup(e, { slots: t }) {
    const a = O(e.active),
      r = O([]),
      o = () => {
        if (e.tabId) {
          const { title: u, id: d = u } = e.data[a.value]
          nt.value[e.tabId] = d
        }
      },
      s = (u = a.value) => {
        ;(a.value = u < r.value.length - 1 ? u + 1 : 0), r.value[a.value].focus()
      },
      l = (u = a.value) => {
        ;(a.value = u > 0 ? u - 1 : r.value.length - 1), r.value[a.value].focus()
      },
      c = (u, d) => {
        u.key === ' ' || u.key === 'Enter'
          ? (u.preventDefault(), (a.value = d))
          : u.key === 'ArrowRight'
          ? (u.preventDefault(), s())
          : u.key === 'ArrowLeft' && (u.preventDefault(), l()),
          o()
      },
      p = () => {
        if (e.tabId) {
          const u = e.data.findIndex(({ title: d, id: m = d }) => nt.value[e.tabId] === m)
          if (u !== -1) return u
        }
        return e.active
      }
    return (
      F(() => {
        ;(a.value = p()),
          C(
            () => nt.value[e.tabId],
            (u, d) => {
              if (e.tabId && u !== d) {
                const m = e.data.findIndex(({ title: _, id: f = _ }) => f === u)
                m !== -1 && (a.value = m)
              }
            }
          )
      }),
      () =>
        e.data.length
          ? n('div', { class: 'tab-list' }, [
              n(
                'div',
                { class: 'tab-list-nav', role: 'tablist' },
                e.data.map(({ title: u }, d) => {
                  const m = d === a.value
                  return n(
                    'button',
                    {
                      type: 'button',
                      ref: (_) => {
                        _ && (r.value[d] = _)
                      },
                      class: ['tab-list-nav-item', { active: m }],
                      role: 'tab',
                      'aria-controls': `tab-${e.id}-${d}`,
                      'aria-selected': m,
                      onClick: () => {
                        ;(a.value = d), o()
                      },
                      onKeydown: (_) => c(_, d)
                    },
                    u
                  )
                })
              ),
              e.data.map(({ title: u, id: d = u }, m) => {
                var _
                const f = m === a.value
                return n(
                  'div',
                  { class: ['tab-item', { active: f }], id: `tab-${e.id}-${m}`, role: 'tabpanel', 'aria-expanded': f },
                  (_ = t[`tab${m}`]) == null ? void 0 : _.call(t, { title: u, value: d, isActive: f })
                )
              })
            ])
          : null
    )
  }
})
const as = X({
  enhance: ({ app: e }) => {
    e.component('CodeTabs', Fi),
      Y('CodeGroup', e) || e.component('CodeGroup', Ni),
      Y('CodeGroupItem', e) || e.component('CodeGroupItem', fr),
      e.component('CodeDemo', es),
      e.component('Tabs', ts)
  }
})
const rs = '.theme-hope-content :not(a) > img:not([no-view])',
  ns = {
    '/': {
      closeTitle: 'Close',
      downloadTitle: 'Download Image',
      fullscreenTitle: 'Switch to full screen',
      zoomTitle: 'Zoom in/out',
      arrowPrevTitle: 'Prev (Arrow Left)',
      arrowNextTitle: 'Next (Arrow Right)'
    }
  },
  os = 800,
  is = {},
  ss = (e) => (z(e) ? Array.from(document.querySelectorAll(e)) : e.map((t) => Array.from(document.querySelectorAll(t))).flat()),
  Er = (e) =>
    new Promise((t, a) => {
      e.complete ? t({ src: e.src, width: e.naturalWidth, height: e.naturalHeight, alt: e.alt }) : ((e.onload = () => t(Er(e))), (e.onerror = (r) => a(r)))
    }),
  ls = () => {
    const { isSupported: e, toggle: t } = Pt(),
      a = Re(ns),
      r = w(),
      o = () =>
        Promise.all([i(() => import('./photoswipe.esm-6e6cbe40.js'), []), we().then(() => new Promise((s) => setTimeout(s, os)).then(() => ss(rs)))]).then(
          ([{ default: s }, l]) => {
            const c =
              '<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>'
            l.forEach((p, u) => {
              const d = () => {
                const m = Array(l.length).fill({ html: c }),
                  _ = new s({ dataSource: m, preloaderDelay: 0, ...a.value, ...is, index: u })
                _.on('uiRegister', () => {
                  e &&
                    _.ui.registerElement({
                      name: 'fullscreen',
                      order: 7,
                      isButton: !0,
                      html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',
                      onClick: () => {
                        t()
                      }
                    }),
                    _.ui.registerElement({
                      name: 'download',
                      order: 8,
                      isButton: !0,
                      tagName: 'a',
                      html: {
                        isCustomSVG: !0,
                        inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',
                        outlineID: 'pswp__icn-download'
                      },
                      onInit: (f, g) => {
                        f.setAttribute('download', ''),
                          f.setAttribute('target', '_blank'),
                          f.setAttribute('rel', 'noopener'),
                          g.on('change', () => {
                            f.href = g.currSlide.data.src
                          })
                      }
                    })
                }),
                  _.init(),
                  l.forEach((f, g) => {
                    Er(f).then((E) => {
                      m.splice(g, 1, E), _.refreshSlideContent(g)
                    })
                  })
              }
              ;(p.style.cursor = 'zoom-in'),
                p.addEventListener('click', () => {
                  d()
                }),
                p.addEventListener('keypress', ({ key: m }) => {
                  m === 'Enter' && d()
                })
            })
          }
        )
    F(() => {
      o(),
        C(
          () => r.value.path,
          () => o()
        )
    })
  }
var cs = X({
  setup: () => {
    ls()
  }
})
const U = (e) => {
  const { icon: t = '' } = e
  return ke(t) ? n('img', { class: 'icon', src: t, 'no-view': '' }) : yt(t) ? n('img', { class: 'icon', src: pe(t), 'no-view': '' }) : n(q('FontIcon'), e)
}
U.displayName = 'HopeIcon'
const Ee = (e, t = !1) => {
    const a = K(),
      { fullPath: r, meta: o, name: s } = Rt(a, encodeURI(e))
    return { text: !t && o.s ? o.s : o.t || e, link: s === '404' ? e : r, ...(o.i ? { icon: o.i } : {}) }
  },
  us = () => {
    const e = K(),
      t = J()
    return (a) => {
      if (a)
        if (yt(a)) t.path !== a && e.push(a)
        else if (ke(a) || La(a)) window && window.open(a)
        else {
          const r = t.path.slice(0, t.path.lastIndexOf('/'))
          e.push(`${r}/${encodeURI(a)}`)
        }
    }
  },
  ce = () => mr(),
  k = () => Ai(),
  We = () => h(() => Boolean(ce().value.pure)),
  Lr = () => {
    const e = k(),
      t = N()
    return h(() => {
      const { author: a } = t.value
      return a ? Jt(a) : a === !1 ? [] : Jt(e.value.author, !1)
    })
  },
  ps = () => {
    const e = N()
    return h(() => _o(e.value.category).map((t) => ({ name: t, path: '' })))
  },
  ds = () => {
    const e = N()
    return h(() => fo(e.value.tag).map((t) => ({ name: t, path: '' })))
  },
  vs = () => {
    const e = N(),
      t = w()
    return h(() => {
      const a = mo(e.value.date)
      if (a) return a
      const { createdTime: r } = t.value.git || {}
      return r ? new Date(r) : null
    })
  },
  ms = () => {
    const e = k(),
      t = w(),
      a = N(),
      r = Lr(),
      o = ps(),
      s = ds(),
      l = vs(),
      c = h(() => ({
        author: r.value,
        category: o.value,
        date: l.value,
        localizedDate: t.value.localizedDate,
        tag: s.value,
        isOriginal: a.value.isOriginal || !1,
        readingTime: t.value.readingTime || null,
        pageview: 'pageview' in a.value ? a.value.pageview : !0
      })),
      p = h(() => ('pageInfo' in a.value ? a.value.pageInfo : 'pageInfo' in e.value ? e.value.pageInfo : null))
    return { info: c, items: p }
  }
let ot = null,
  Pe = null
const _s = {
    wait: () => ot,
    pending: () => {
      ot = new Promise((e) => (Pe = e))
    },
    resolve: () => {
      Pe == null || Pe(), (ot = null), (Pe = null)
    }
  },
  yr = () => _s,
  Ye = () => {
    const e = ce(),
      t = O(!1),
      a = O(!1),
      r = () => {
        ;(t.value = window.innerWidth <= (e.value.mobileBreakPoint || 719)), (a.value = window.innerWidth >= (e.value.pcBreakPoint || 1440))
      }
    return (
      F(() => {
        r(), Q('resize', r, !1), Q('orientationchange', r, !1)
      }),
      { isMobile: t, isPC: a }
    )
  },
  Tr = Symbol(''),
  Ce = () => {
    const e = ae(Tr)
    if (!e) throw new Error('useDarkmode() is called without provider.')
    return e
  },
  fs = (e) => {
    const t = ce(),
      a = Yo(),
      r = It('vuepress-theme-hope-scheme', 'auto'),
      o = h(() => t.value.darkmode || 'switch'),
      s = h(() => {
        const c = o.value
        return c === 'disable' ? !1 : c === 'enable' ? !0 : c === 'auto' ? a.value : c === 'toggle' ? r.value === 'dark' : r.value === 'dark' || (r.value === 'auto' && a.value)
      }),
      l = h(() => {
        const c = o.value
        return c === 'switch' || c === 'toggle'
      })
    e.provide(Tr, { canToggle: l, config: o, isDarkmode: s, status: r }), Object.defineProperties(e.config.globalProperties, { $isDarkmode: { get: () => s.value } })
  },
  hs = () => {
    const { isDarkmode: e } = Ce(),
      t = (a = e.value) => document.documentElement.setAttribute('data-theme', a ? 'dark' : 'light')
    F(() => {
      C(e, t, { immediate: !0 })
    })
  },
  j = y({
    name: 'AutoLink',
    inheritAttrs: !1,
    props: { config: { type: Object, required: !0 }, exact: Boolean, noExternalLinkIcon: Boolean },
    emits: ['focusout'],
    setup(e, { attrs: t, emit: a, slots: r }) {
      const o = J(),
        s = ka(),
        l = gt(e, 'config'),
        c = h(() => ke(l.value.link)),
        p = h(() => La(l.value.link) || gn(l.value.link)),
        u = h(() => (p.value ? void 0 : l.value.target || (c.value ? '_blank' : void 0))),
        d = h(() => u.value === '_blank'),
        m = h(() => !c.value && !p.value && !d.value),
        _ = h(() => (p.value ? void 0 : l.value.rel || (d.value ? 'noopener noreferrer' : void 0))),
        f = h(() => l.value.ariaLabel || l.value.text),
        g = h(() => {
          if (e.exact) return !1
          const L = le(s.value.locales)
          return L.length ? L.every((R) => R !== l.value.link) : l.value.link !== '/'
        }),
        E = h(() => (m.value ? (l.value.activeMatch ? new RegExp(l.value.activeMatch).test(o.path) : g.value ? De(o.path, l.value.link) : o.path === l.value.link) : !1))
      return () => {
        var A, M, $
        const { text: L, icon: R, link: I } = l.value
        return m.value
          ? n(te, { to: I, 'aria-label': f.value, ...t, class: ['nav-link', { active: E.value }, t.class], onFocusout: () => a('focusout') }, () => {
              var P, b, T
              return (
                ((P = r.default) == null ? void 0 : P.call(r)) || [
                  ((b = r.before) == null ? void 0 : b.call(r)) || n(U, { icon: R }),
                  L,
                  (T = r.after) == null ? void 0 : T.call(r)
                ]
              )
            })
          : n(
              'a',
              { href: I, rel: _.value, target: u.value, 'aria-label': f.value, ...t, class: ['nav-link', t.class], onFocusout: () => a('focusout') },
              ((A = r.default) == null ? void 0 : A.call(r)) || [
                ((M = r.before) == null ? void 0 : M.call(r)) || n(U, { icon: R }),
                L,
                e.noExternalLinkIcon ? null : n(dr),
                ($ = r.after) == null ? void 0 : $.call(r)
              ]
            )
      }
    }
  }),
  Te = (e, t, a = !1) => ('activeMatch' in t ? new RegExp(t.activeMatch).test(e.path) : Tt(e, t.link) ? !0 : t.children && !a ? t.children.some((r) => Te(e, r)) : !1),
  Rr = (e, t) => (t.type === 'group' ? t.children.some((a) => (a.type === 'group' ? Rr(e, a) : a.type === 'page' && Te(e, a, !0))) || ('prefix' in t && Tt(e, t.prefix)) : !1),
  Or = (e, t) => (z(e.link) ? n(j, { ...t, config: e }) : n('p', t, [n(U, { icon: e.icon }), e.text])),
  Ir = (e) => {
    const t = J()
    return e
      ? n(
          'ul',
          { class: 'sidebar-sub-headers' },
          e.map((a) => {
            const r = Te(t, a, !0)
            return n('li', { class: 'sidebar-sub-header' }, [Or(a, { class: ['sidebar-link', 'heading', { active: r }] }), Ir(a.children)])
          })
        )
      : null
  },
  kt = {
    '/repository/': ['foreword', 'contributions', 'release', 'changelog'],
    '/getting-started/': ['installation', 'environment', 'examples', 'new-listr', 'task', 'task-options', 'context'],
    '/task/': ['error-handling', 'subtasks', 'title', 'output', 'enable', 'skip', 'prompts', 'retry', 'rollback'],
    '/renderer/': ['', 'fallback-condition', 'default', 'simple', 'verbose', 'test', 'custom'],
    '/manager/': [''],
    '/migration/': ['v6'],
    '/api/': [
      '',
      {
        text: 'Classes',
        prefix: 'classes/',
        collapsible: !0,
        children: [
          'BaseEventMap',
          'Concurrency',
          'DefaultRenderer',
          'EventManager',
          'Listr',
          'ListrBaseRenderer',
          'ListrError',
          'ListrEventManager',
          'ListrEventMap',
          'ListrLogger',
          'ListrRenderer',
          'ListrTaskEventManager',
          'ListrTaskEventMap',
          'ListrTaskObject',
          'ListrTaskWrapper',
          'Manager',
          'ProcessOutput',
          'ProcessOutputBuffer',
          'ProcessOutputStream',
          'PromptError',
          'PromptOptionsMap',
          'SilentRenderer',
          'SimpleRenderer',
          'Spinner',
          'TestRenderer',
          'TestRendererEvent',
          'VerboseRenderer'
        ]
      },
      {
        text: 'Enums',
        prefix: 'enums/',
        collapsible: !0,
        children: ['ListrDefaultRendererLogLevels', 'ListrEnvironmentVariables', 'ListrErrorTypes', 'ListrEventType', 'ListrTaskEventType', 'ListrTaskState', 'LogLevels']
      },
      {
        text: 'Functions',
        prefix: 'functions/',
        collapsible: !0,
        children: [
          'assertFunctionOrSelf',
          'cleanseAnsi',
          'cloneObject',
          'createPrompt',
          'generateUUID',
          'getRenderer',
          'getRendererClass',
          'indent',
          'isObservable',
          'isUnicodeSupported',
          'parseTimer',
          'parseTimestamp',
          'splat'
        ]
      },
      {
        text: 'Interfaces',
        prefix: 'interfaces/',
        collapsible: !0,
        children: [
          'DefaultRendererOptions',
          'DefaultRendererTaskOptions',
          'ListrBaseClassOptions',
          'ListrLoggerOptions',
          'ListrOptions',
          'ListrPrimaryRendererOptions',
          'ListrSecondaryRendererOptions',
          'ListrSubClassOptions',
          'ListrTask',
          'ListrTaskMessage',
          'ListrTaskRetry',
          'LoggerFieldFn',
          'LoggerFieldOptions',
          'LoggerRendererOptions',
          'ProcessOutputBufferEntry',
          'ProcessOutputBufferOptions',
          'ProcessOutputRendererOptions',
          'PromptCancelOptions',
          'PromptInstance',
          'PromptSettings',
          'RendererPresetTimer',
          'RendererPresetTimestamp',
          'RendererStyleMap',
          'SimpleRendererOptions',
          'SimpleRendererTaskOptions',
          'SupportedRenderer',
          'TestRendererOptions',
          'VerboseRendererOptions',
          'VerboseRendererTaskOptions'
        ]
      },
      {
        text: 'Types',
        prefix: 'types/',
        collapsible: !0,
        children: [
          'EventData',
          'EventMap',
          'Figures',
          'ListrContext',
          'ListrDefaultRenderer',
          'ListrDefaultRendererOptions',
          'ListrDefaultRendererOptionsStyle',
          'ListrDefaultRendererTasks',
          'ListrDefaultRendererValue',
          'ListrFallbackRenderer',
          'ListrFallbackRendererValue',
          'ListrGetRendererClassFromValue',
          'ListrGetRendererOptions',
          'ListrGetRendererTaskOptions',
          'ListrGetRendererValueFromClass',
          'ListrLoggerOptionStyle',
          'ListrRendererFactory',
          'ListrRendererOptions',
          'ListrRendererValue',
          'ListrSilentRenderer',
          'ListrSilentRendererValue',
          'ListrSimpleRenderer',
          'ListrSimpleRendererOptions',
          'ListrSimpleRendererTasks',
          'ListrSimpleRendererValue',
          'ListrTaskFn',
          'ListrTaskPrompt',
          'ListrTaskResult',
          'ListrTestRenderer',
          'ListrTestRendererOptions',
          'ListrTestRendererTasks',
          'ListrTestRendererValue',
          'ListrVerboseRendererOptions',
          'ListrVerboseRendererTasks',
          'LoggerField',
          'LoggerFormat',
          'PresetTimer',
          'PresetTimestamp',
          'PromptOptions',
          'PromptOptionsType',
          'PromptTypes',
          'Unionize'
        ]
      },
      {
        text: 'Variables',
        prefix: 'variables/',
        collapsible: !0,
        children: ['ANSI_ESCAPE', 'ANSI_ESCAPE_CODES', 'color', 'figures-1', 'LISTR_DEFAULT_RENDERER_STYLE', 'LISTR_LOGGER_STYLE', 'RENDERER_TIMER', 'RENDERER_TIMESTAMP']
      }
    ]
  },
  it = (e = '', t = '') => (yt(t) ? t : `${bn(e)}${t}`),
  gs = (e, t) => {
    const a = w()
    return { type: 'heading', text: e.title, link: `${a.value.path}#${e.slug}`, children: wt(e.children, t) }
  },
  wt = (e, t) => (t > 0 ? e.map((a) => gs(a, t - 1)) : []),
  Pr = (e) => {
    const t = w()
    return wt(t.value.headers, e)
  },
  dt = (e, t, a = '') => {
    const r = w(),
      o = (s, l = a) => {
        var p
        const c = z(s) ? Ee(it(l, s)) : s.link ? { ...s, ...(Ne(s.link) ? {} : { link: Ee(it(l, s.link)).link }) } : s
        if ('children' in c) {
          const u = it(l, c.prefix),
            d = c.children === 'structure' ? kt[u] : c.children
          return { type: 'group', ...c, prefix: u, children: d.map((m) => o(m, u)) }
        }
        return {
          type: 'page',
          ...c,
          children: c.link === r.value.path ? wt(((p = r.value.headers[0]) == null ? void 0 : p.level) === 1 ? r.value.headers[0].children : r.value.headers, t) : []
        }
      }
    return e.map((s) => o(s))
  },
  bs = (e, t) => {
    const a = w(),
      r = le(e).sort((o, s) => s.length - o.length)
    for (const o of r)
      if (De(decodeURI(a.value.path), o)) {
        const s = e[o]
        return s ? dt(s === 'structure' ? kt[o] : s === 'heading' ? Pr(t) : s, t, o) : []
      }
    return console.warn(`${a.value.path} is missing sidebar config.`), []
  },
  Es = () => {
    const e = de(),
      t = N(),
      a = k(),
      r = t.value.home ? !1 : t.value.sidebar ?? a.value.sidebar ?? 'structure',
      o = t.value.headerDepth ?? a.value.headerDepth ?? 2
    return r === !1 ? [] : r === 'heading' ? Pr(o) : r === 'structure' ? dt(kt[e.value], o, e.value) : ft(r) ? dt(r, o) : je(r) ? bs(r, o) : []
  },
  Ar = Symbol(''),
  Ls = () => {
    const e = h(() => Es())
    ya(Ar, e)
  },
  St = () => {
    const e = ae(Ar)
    if (!e) throw new Error('useSidebarItems() is called without provider.')
    return e
  }
const ys = y({
  name: 'PageFooter',
  setup() {
    const e = N(),
      t = k(),
      a = Lr(),
      r = h(() => {
        const { copyright: l, footer: c } = e.value
        return c !== !1 && Boolean(l || c || t.value.displayFooter)
      }),
      o = h(() => {
        const { footer: l } = e.value
        return l === !1 ? !1 : z(l) ? l : t.value.footer || ''
      }),
      s = h(() =>
        'copyright' in e.value
          ? e.value.copyright
          : 'copyright' in t.value
          ? t.value.copyright
          : a.value.length
          ? `Copyright © ${new Date().getFullYear()} ${a.value[0].name}`
          : !1
      )
    return () =>
      r.value
        ? n('footer', { class: 'footer-wrapper' }, [
            o.value ? n('div', { class: 'footer', innerHTML: o.value }) : null,
            s.value ? n('div', { class: 'copyright', innerHTML: s.value }) : null
          ])
        : null
  }
})
const Dr = y({
    name: 'NavbarDropdownLink',
    props: { config: { type: Object, required: !0 } },
    setup(e, { slots: t }) {
      const a = w(),
        r = gt(e, 'config'),
        o = h(() => r.value.ariaLabel || r.value.text),
        s = O(!1)
      C(
        () => a.value.path,
        () => {
          s.value = !1
        }
      )
      const l = (c) => {
        c.detail === 0 && (s.value = !s.value)
      }
      return () => {
        var c
        return n('div', { class: ['dropdown-wrapper', { open: s.value }] }, [
          n('button', { type: 'button', class: 'dropdown-title', 'aria-label': o.value, onClick: l }, [
            ((c = t.title) == null ? void 0 : c.call(t)) || n('span', { class: 'title' }, [n(U, { icon: r.value.icon }), e.config.text]),
            n('span', { class: 'arrow' }),
            n(
              'ul',
              { class: 'nav-dropdown' },
              r.value.children.map((p, u) => {
                const d = u === r.value.children.length - 1
                return n(
                  'li',
                  { class: 'dropdown-item' },
                  'children' in p
                    ? [
                        n(
                          'h4',
                          { class: 'dropdown-subtitle' },
                          p.link
                            ? n(j, {
                                config: p,
                                onFocusout: () => {
                                  p.children.length === 0 && d && (s.value = !1)
                                }
                              })
                            : n('span', p.text)
                        ),
                        n(
                          'ul',
                          { class: 'dropdown-subitem-wrapper' },
                          p.children.map((m, _) =>
                            n(
                              'li',
                              { class: 'dropdown-subitem' },
                              n(j, {
                                config: m,
                                onFocusout: () => {
                                  _ === p.children.length - 1 && d && (s.value = !1)
                                }
                              })
                            )
                          )
                        )
                      ]
                    : n(j, {
                        config: p,
                        onFocusout: () => {
                          d && (s.value = !1)
                        }
                      })
                )
              })
            )
          ])
        ])
      }
    }
  }),
  kr = () =>
    n(V, { name: 'i18n' }, () => [
      n('path', {
        d: 'M379.392 460.8 494.08 575.488l-42.496 102.4L307.2 532.48 138.24 701.44l-71.68-72.704L234.496 460.8l-45.056-45.056c-27.136-27.136-51.2-66.56-66.56-108.544h112.64c7.68 14.336 16.896 27.136 26.112 35.84l45.568 46.08 45.056-45.056C382.976 312.32 409.6 247.808 409.6 204.8H0V102.4h256V0h102.4v102.4h256v102.4H512c0 70.144-37.888 161.28-87.04 210.944L378.88 460.8zM576 870.4 512 1024H409.6l256-614.4H768l256 614.4H921.6l-64-153.6H576zM618.496 768h196.608L716.8 532.48 618.496 768z'
      })
    ])
kr.displayName = 'I18nIcon'
const wr = (e, t = '') =>
    z(e)
      ? Ee(`${t}${e}`)
      : 'children' in e
      ? { ...e, ...(e.link && !Ne(e.link) ? Ee(`${t}${e.link}`) : {}), children: e.children.map((a) => wr(a, `${t}${e.prefix || ''}`)) }
      : { ...e, link: Ne(e.link) ? e.link : Ee(`${t}${e.link}`).link },
  Sr = () => h(() => (k().value.navbar || []).map((e) => wr(e))),
  Ts = () => {
    const e = K(),
      t = J(),
      a = de(),
      r = Ue(),
      o = ce(),
      s = k()
    return h(() => {
      const l = le(r.value.locales)
      if (l.length < 2) return null
      const { path: c, fullPath: p } = e.currentRoute.value,
        { navbarLocales: u } = s.value
      return {
        text: '',
        ariaLabel: u == null ? void 0 : u.selectLangAriaLabel,
        children: [
          ...l.map((m) => {
            var R, I, A
            const _ = ((R = r.value.locales) == null ? void 0 : R[m]) ?? {},
              f = ((I = o.value.locales) == null ? void 0 : I[m]) ?? {},
              g = _.lang || '',
              E = ((A = f.navbarLocales) == null ? void 0 : A.langName) ?? g
            let L
            if (g === r.value.lang) L = c
            else {
              const M = c.replace(a.value, m)
              L = e.getRoutes().some(($) => $.path === M) ? p.replace(c, M) : f.home ?? m
            }
            return { text: E, link: L }
          }),
          ...Ka(o.value.extraLocales || {}).map(([m, _]) => ({ text: m, link: _.replace(':route', t.path.replace(a.value, '')) }))
        ]
      }
    })
  },
  Rs = () => {
    const e = k(),
      t = h(() => e.value.repo || null),
      a = h(() => (t.value ? go(t.value) : null)),
      r = h(() => (t.value ? er(t.value) : null)),
      o = h(() => (a.value ? e.value.repoLabel ?? (r.value === null ? 'Source' : r.value) : null))
    return h(() => (!a.value || !o.value || e.value.repoDisplay === !1 ? null : { type: r.value || 'Source', label: o.value, link: a.value }))
  }
y({
  name: 'LanguageDropdown',
  setup() {
    const e = Ts()
    return () =>
      e.value
        ? n(
            'div',
            { class: 'nav-item' },
            n(
              Dr,
              { class: 'i18n-dropdown', config: e.value },
              {
                title: () => {
                  var t
                  return n(kr, { 'aria-label': (t = e.value) == null ? void 0 : t.ariaLabel, style: { width: '1rem', height: '1rem', verticalAlign: 'middle' } })
                }
              }
            )
          )
        : null
  }
})
const Os = y({
  name: 'NavScreenDropdown',
  props: { config: { type: Object, required: !0 } },
  setup(e) {
    const t = w(),
      a = gt(e, 'config'),
      r = h(() => a.value.ariaLabel || a.value.text),
      o = O(!1)
    C(
      () => t.value.path,
      () => {
        o.value = !1
      }
    )
    const s = (l, c) => c[c.length - 1] === l
    return () => [
      n(
        'button',
        {
          type: 'button',
          class: ['nav-screen-dropdown-title', { active: o.value }],
          'aria-label': r.value,
          onClick: () => {
            o.value = !o.value
          }
        },
        [n('span', { class: 'title' }, [n(U, { icon: a.value.icon }), e.config.text]), n('span', { class: ['arrow', o.value ? 'down' : 'end'] })]
      ),
      n(
        'ul',
        { class: ['nav-screen-dropdown', { hide: !o.value }] },
        a.value.children.map((l) =>
          n(
            'li',
            { class: 'dropdown-item' },
            'children' in l
              ? [
                  n(
                    'h4',
                    { class: 'dropdown-subtitle' },
                    l.link
                      ? n(j, {
                          config: l,
                          onFocusout: () => {
                            s(l, a.value.children) && l.children.length === 0 && (o.value = !1)
                          }
                        })
                      : n('span', l.text)
                  ),
                  n(
                    'ul',
                    { class: 'dropdown-subitem-wrapper' },
                    l.children.map((c) =>
                      n(
                        'li',
                        { class: 'dropdown-subitem' },
                        n(j, {
                          config: c,
                          onFocusout: () => {
                            s(c, l.children) && s(l, a.value.children) && (o.value = !1)
                          }
                        })
                      )
                    )
                  )
                ]
              : n(j, {
                  config: l,
                  onFocusout: () => {
                    s(l, a.value.children) && (o.value = !1)
                  }
                })
          )
        )
      )
    ]
  }
})
const Is = y({
    name: 'NavScreenLinks',
    setup() {
      const e = Sr()
      return () =>
        e.value.length
          ? n(
              'nav',
              { class: 'nav-screen-links' },
              e.value.map((t) => n('div', { class: 'navbar-links-item' }, 'children' in t ? n(Os, { config: t }) : n(j, { config: t })))
            )
          : null
    }
  }),
  Vr = () =>
    n(V, { name: 'dark' }, () =>
      n('path', {
        d: 'M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z'
      })
    )
Vr.displayName = 'DarkIcon'
const Cr = () =>
  n(V, { name: 'light' }, () =>
    n('path', {
      d: 'M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z'
    })
  )
Cr.displayName = 'LightIcon'
const xr = () =>
  n(V, { name: 'auto' }, () =>
    n('path', {
      d: 'M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z'
    })
  )
xr.displayName = 'AutoIcon'
const Mr = () =>
  n(V, { name: 'enter-fullscreen' }, () =>
    n('path', {
      d: 'M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z'
    })
  )
Mr.displayName = 'EnterFullScreenIcon'
const $r = () =>
  n(V, { name: 'cancel-fullscreen' }, () =>
    n('path', {
      d: 'M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z'
    })
  )
$r.displayName = 'CancelFullScreenIcon'
const Fr = () =>
  n(V, { name: 'outlook' }, () => [
    n('path', {
      d: 'M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z'
    })
  ])
Fr.displayName = 'OutlookIcon'
const Nr = y({
    name: 'AppearanceSwitch',
    setup() {
      const { config: e, status: t } = Ce(),
        a = () => {
          e.value === 'switch' ? (t.value = { light: 'dark', dark: 'auto', auto: 'light' }[t.value]) : (t.value = t.value === 'light' ? 'dark' : 'light')
        }
      return () =>
        n('button', { type: 'button', id: 'appearance-switch', onClick: () => a() }, [
          n(xr, { style: { display: t.value === 'auto' ? 'block' : 'none' } }),
          n(Vr, { style: { display: t.value === 'dark' ? 'block' : 'none' } }),
          n(Cr, { style: { display: t.value === 'light' ? 'block' : 'none' } })
        ])
    }
  }),
  Ps = y({
    name: 'AppearanceMode',
    setup() {
      const e = k(),
        { canToggle: t } = Ce(),
        a = h(() => e.value.outlookLocales.darkmode)
      return () => (t.value ? n('div', { class: 'appearance-wrapper' }, [n('label', { class: 'appearance-title', for: 'appearance-switch' }, a.value), n(Nr)]) : null)
    }
  })
const As = y({
    name: 'ThemeColorPicker',
    props: { themeColor: { type: Object, required: !0 } },
    setup(e) {
      const t = (a = '') => {
        const r = document.documentElement.classList,
          o = le(e.themeColor).map((s) => `theme-${s}`)
        if (!a) {
          localStorage.removeItem('theme'), r.remove(...o)
          return
        }
        r.remove(...o.filter((s) => s !== `theme-${a}`)), r.add(`theme-${a}`), localStorage.setItem('theme', a)
      }
      return (
        F(() => {
          const a = localStorage.getItem('theme')
          a && t(a)
        }),
        () =>
          n('ul', { id: 'theme-color-picker' }, [
            n('li', n('span', { class: 'theme-color', onClick: () => t() })),
            ...Ka(e.themeColor).map(([a, r]) => n('li', n('span', { style: { background: r }, onClick: () => t(a) })))
          ])
      )
    }
  }),
  Ds = y({
    name: 'ThemeColor',
    setup() {
      const e = ce(),
        t = k(),
        a = h(() => t.value.outlookLocales.themeColor),
        r = h(() => {
          const { themeColor: o } = e.value
          return o === !1 ? null : o
        })
      return () =>
        r.value
          ? n('div', { class: 'theme-color-wrapper' }, [n('label', { class: 'theme-color-title', for: 'theme-color-picker' }, a.value), n(As, { themeColor: r.value })])
          : null
    }
  })
const Br = y({
    name: 'ToggleFullScreenButton',
    setup() {
      const e = k(),
        { isSupported: t, isFullscreen: a, toggle: r } = Pt(),
        o = h(() => e.value.outlookLocales.fullscreen)
      return () =>
        t
          ? n('div', { class: 'full-screen-wrapper' }, [
              n('label', { class: 'full-screen-title', for: 'full-screen-switch' }, o.value),
              n('button', { type: 'button', class: 'full-screen', id: 'full-screen-switch', ariaPressed: a.value, onClick: () => r() }, a.value ? n($r) : n(Mr))
            ])
          : null
    }
  }),
  zr = y({
    name: 'OutlookSettings',
    setup() {
      const e = ce(),
        t = We(),
        a = h(() => !t.value && Boolean(e.value.themeColor)),
        r = h(() => !t.value && e.value.fullscreen)
      return () => n(qe, () => [a.value ? n(Ds) : null, n(Ps), r.value ? n(Br) : null])
    }
  })
const ks = y({
  name: 'NavScreen',
  props: { show: Boolean },
  emits: ['close'],
  setup(e, { emit: t, slots: a }) {
    const r = w(),
      { isMobile: o } = Ye(),
      s = O(),
      l = cr(s)
    return (
      F(() => {
        ;(s.value = document.body),
          C(o, (c) => {
            !c && e.show && ((l.value = !1), t('close'))
          }),
          C(
            () => r.value.path,
            () => {
              ;(l.value = !1), t('close')
            }
          )
      }),
      ht(() => {
        l.value = !1
      }),
      () =>
        n(
          Le,
          {
            name: 'fade',
            onEnter: () => {
              l.value = !0
            },
            onAfterLeave: () => {
              l.value = !1
            }
          },
          () => {
            var c, p
            return e.show
              ? n(
                  'div',
                  { id: 'nav-screen' },
                  n('div', { class: 'container' }, [
                    (c = a.before) == null ? void 0 : c.call(a),
                    n(Is),
                    n('div', { class: 'outlook-wrapper' }, n(zr)),
                    (p = a.after) == null ? void 0 : p.call(a)
                  ])
                )
              : null
          }
        )
    )
  }
})
const ws = y({
  name: 'NavbarBrand',
  setup() {
    const e = de(),
      t = Ue(),
      a = k(),
      r = h(() => a.value.home || e.value),
      o = h(() => t.value.title),
      s = h(() => (a.value.logo ? pe(a.value.logo) : null)),
      l = h(() => (a.value.logoDark ? pe(a.value.logoDark) : null))
    return () =>
      n(te, { to: r.value, class: 'brand' }, () => [
        s.value ? n('img', { class: ['logo', { light: Boolean(l.value) }], src: s.value, alt: o.value }) : null,
        l.value ? n('img', { class: ['logo dark'], src: l.value, alt: o.value }) : null,
        o.value ? n('span', { class: ['site-name', { 'hide-in-pad': s.value && a.value.hideSiteNameOnMobile !== !1 }] }, o.value) : null
      ])
  }
})
const Ss = y({
  name: 'NavbarLinks',
  setup() {
    const e = Sr()
    return () =>
      e.value.length
        ? n('nav', { class: 'nav-links' }, [...e.value.map((t) => n('div', { class: 'nav-item hide-in-mobile' }, 'children' in t ? n(Dr, { config: t }) : n(j, { config: t })))])
        : null
  }
})
const Vs = y({
  name: 'RepoLink',
  components: { BitbucketIcon: qa, GiteeIcon: Ua, GitHubIcon: Ha, GitLabIcon: ja, SourceIcon: Ga },
  setup() {
    const e = Rs()
    return () =>
      e.value
        ? n(
            'div',
            { class: 'nav-item' },
            n(
              'a',
              { class: 'repo-link', href: e.value.link, target: '_blank', rel: 'noopener noreferrer', 'aria-label': e.value.label },
              n(q(`${e.value.type}Icon`), { style: { width: '1.25rem', height: '1.25rem', verticalAlign: 'middle' } })
            )
          )
        : null
  }
})
const Hr = ({ active: e = !1 }, { emit: t }) =>
  n(
    'button',
    {
      type: 'button',
      class: ['toggle-navbar-button', { 'is-active': e }],
      'aria-label': 'Toggle Navbar',
      'aria-expanded': e,
      'aria-controls': 'nav-screen',
      onClick: () => t('toggle')
    },
    n('span', { class: 'button-container' }, [n('span', { class: 'button-top' }), n('span', { class: 'button-middle' }), n('span', { class: 'button-bottom' })])
  )
Hr.displayName = 'ToggleNavbarButton'
const Vt = (e, { emit: t }) => n('button', { type: 'button', class: 'toggle-sidebar-button', title: 'Toggle Sidebar', onClick: () => t('toggle') }, n('span', { class: 'icon' }))
Vt.displayName = 'ToggleSidebarButton'
Vt.emits = ['toggle']
const Cs = y({
  name: 'OutlookButton',
  setup() {
    const { isSupported: e } = Pt(),
      t = ce(),
      a = We(),
      r = w(),
      { canToggle: o } = Ce(),
      s = O(!1),
      l = h(() => !a.value && Boolean(t.value.themeColor)),
      c = h(() => !a.value && t.value.fullscreen && e)
    return (
      C(
        () => r.value.path,
        () => {
          s.value = !1
        }
      ),
      () =>
        o.value || c.value || l.value
          ? n(
              'div',
              { class: 'nav-item hide-in-mobile' },
              o.value && !c.value && !l.value
                ? n(Nr)
                : c.value && !o.value && !l.value
                ? n(Br)
                : n('button', { type: 'button', class: ['outlook-button', { open: s.value }], tabindex: '-1', 'aria-hidden': !0 }, [
                    n(Fr),
                    n('div', { class: 'outlook-dropdown' }, n(zr))
                  ])
            )
          : null
    )
  }
})
const xs = y({
  name: 'NavBar',
  emits: ['toggleSidebar'],
  setup(e, { emit: t, slots: a }) {
    const r = k(),
      { isMobile: o } = Ye(),
      s = O(!1),
      l = h(() => {
        const { navbarAutoHide: p = 'mobile' } = r.value
        return p !== 'none' && (p === 'always' || o.value)
      }),
      c = h(() => r.value.navbarLayout || { start: ['Brand'], center: ['Links'], end: ['Language', 'Repo', 'Outlook', 'Search'] })
    return () => {
      var u, d, m, _, f, g
      const p = {
        Brand: n(ws),
        Language: null,
        Links: n(Ss),
        Repo: n(Vs),
        Outlook: n(Cs),
        Search: Y('Docsearch') ? n(q('Docsearch')) : Y('SearchBox') ? n(q('SearchBox')) : Y('SearchBox') ? n(q('SearchBox')) : null
      }
      return [
        n('header', { class: ['navbar', { 'auto-hide': l.value, 'hide-icon': r.value.navbarIcon === !1 }], id: 'navbar' }, [
          n('div', { class: 'navbar-start' }, [
            n(Vt, {
              onToggle: () => {
                s.value && (s.value = !1), t('toggleSidebar')
              }
            }),
            (u = a.startBefore) == null ? void 0 : u.call(a),
            ...(c.value.start || []).map((E) => p[E]),
            (d = a.startAfter) == null ? void 0 : d.call(a)
          ]),
          n('div', { class: 'navbar-center' }, [
            (m = a.centerBefore) == null ? void 0 : m.call(a),
            ...(c.value.center || []).map((E) => p[E]),
            (_ = a.centerAfter) == null ? void 0 : _.call(a)
          ]),
          n('div', { class: 'navbar-end' }, [
            (f = a.endBefore) == null ? void 0 : f.call(a),
            ...(c.value.end || []).map((E) => p[E]),
            (g = a.endAfter) == null ? void 0 : g.call(a),
            n(Hr, {
              active: s.value,
              onToggle: () => {
                s.value = !s.value
              }
            })
          ])
        ]),
        n(
          ks,
          {
            show: s.value,
            onClose: () => {
              s.value = !1
            }
          },
          {
            before: () => {
              var E
              return (E = a.screenTop) == null ? void 0 : E.call(a)
            },
            after: () => {
              var E
              return (E = a.screenBottom) == null ? void 0 : E.call(a)
            }
          }
        )
      ]
    }
  }
})
const Ms = y({
  name: 'SidebarChild',
  props: { config: { type: Object, required: !0 } },
  setup(e) {
    const t = J()
    return () => [Or(e.config, { class: ['sidebar-link', `sidebar-${e.config.type}`, { active: Te(t, e.config, !0) }], exact: !0 }), Ir(e.config.children)]
  }
})
const $s = y({
  name: 'SidebarGroup',
  props: { config: { type: Object, required: !0 }, open: { type: Boolean, required: !0 } },
  emits: ['toggle'],
  setup(e, { emit: t }) {
    const a = J(),
      r = h(() => Te(a, e.config)),
      o = h(() => Te(a, e.config, !0))
    return () => {
      const { collapsible: s, children: l = [], icon: c, prefix: p, link: u, text: d } = e.config
      return n('section', { class: 'sidebar-group' }, [
        n(
          s ? 'button' : 'p',
          {
            class: ['sidebar-heading', { clickable: s || u, exact: o.value, active: r.value }],
            ...(s
              ? {
                  type: 'button',
                  onClick: () => t('toggle'),
                  onKeydown: (m) => {
                    m.key === 'Enter' && t('toggle')
                  }
                }
              : {})
          },
          [
            n(U, { icon: c }),
            u ? n(te, { to: u, class: 'title' }, () => d) : n('span', { class: 'title' }, d),
            s ? n('span', { class: ['arrow', e.open ? 'down' : 'end'] }) : null
          ]
        ),
        e.open || !s ? n(jr, { key: p, config: l }) : null
      ])
    }
  }
})
const jr = y({
  name: 'SidebarLinks',
  props: { config: { type: Array, required: !0 } },
  setup(e) {
    const t = J(),
      a = O(-1),
      r = (o) => {
        a.value = o === a.value ? -1 : o
      }
    return (
      C(
        () => t.path,
        () => {
          const o = e.config.findIndex((s) => Rr(t, s))
          a.value = o
        },
        { immediate: !0, flush: 'post' }
      ),
      () =>
        n(
          'ul',
          { class: 'sidebar-links' },
          e.config.map((o, s) => n('li', o.type === 'group' ? n($s, { config: o, open: s === a.value, onToggle: () => r(s) }) : n(Ms, { config: o })))
        )
    )
  }
})
const Fs = y({
  name: 'SideBar',
  setup(e, { slots: t }) {
    const a = J(),
      r = k(),
      o = St(),
      s = O()
    return (
      F(() => {
        C(
          () => a.hash,
          (l) => {
            const c = document.querySelector(`.sidebar a.sidebar-link[href="${a.path}${l}"]`)
            if (!c) return
            const { top: p, height: u } = s.value.getBoundingClientRect(),
              { top: d, height: m } = c.getBoundingClientRect()
            d < p ? c.scrollIntoView(!0) : d + m > p + u && c.scrollIntoView(!1)
          }
        )
      }),
      () => {
        var l, c, p
        return n('aside', { class: ['sidebar', { 'hide-icon': r.value.sidebarIcon === !1 }], id: 'sidebar', ref: s }, [
          (l = t.top) == null ? void 0 : l.call(t),
          ((c = t.default) == null ? void 0 : c.call(t)) || n(jr, { config: o.value }),
          (p = t.bottom) == null ? void 0 : p.call(t)
        ])
      }
    )
  }
})
const Ur = y({
  name: 'CommonWrapper',
  props: { noNavbar: Boolean, noSidebar: Boolean },
  setup(e, { slots: t }) {
    const a = K(),
      r = w(),
      o = N(),
      s = k(),
      { isMobile: l, isPC: c } = Ye(),
      [p, u] = ct(!1),
      [d, m] = ct(!1),
      _ = St(),
      f = O(!1),
      g = h(() => (e.noNavbar || o.value.navbar === !1 || s.value.navbar === !1 ? !1 : Boolean(r.value.title || s.value.logo || s.value.repo || s.value.navbar))),
      E = h(() => (e.noSidebar ? !1 : o.value.sidebar !== !1 && _.value.length !== 0 && !o.value.home)),
      L = { x: 0, y: 0 },
      R = (P) => {
        ;(L.x = P.changedTouches[0].clientX), (L.y = P.changedTouches[0].clientY)
      },
      I = (P) => {
        const b = P.changedTouches[0].clientX - L.x,
          T = P.changedTouches[0].clientY - L.y
        Math.abs(b) > Math.abs(T) * 1.5 && Math.abs(b) > 40 && (b > 0 && L.x <= 80 ? u(!0) : u(!1))
      },
      A = h(() => (o.value.home ? !1 : o.value.toc || (s.value.toc !== !1 && o.value.toc !== !1))),
      M = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    let $ = 0
    return (
      Q(
        'scroll',
        Ro(
          () => {
            const P = M()
            P <= 58 || P < $ ? (f.value = !1) : $ + 200 < P && !p.value && (f.value = !0), ($ = P)
          },
          300,
          !0
        )
      ),
      C(l, (P) => {
        P || u(!1)
      }),
      F(() => {
        const P = cr(document.body)
        C(p, (T) => {
          P.value = T
        })
        const b = a.afterEach(() => {
          u(!1)
        })
        ht(() => {
          ;(P.value = !1), b()
        })
      }),
      () =>
        n(Y('GlobalEncrypt') ? q('GlobalEncrypt') : za, () => {
          var P
          return n(
            'div',
            {
              class: [
                'theme-container',
                {
                  'no-navbar': !g.value,
                  'no-sidebar': !E.value && !(t.sidebar || t.sidebarTop || t.sidebarBottom),
                  'has-toc': A.value,
                  'hide-navbar': f.value,
                  'sidebar-collapsed': !l.value && !c.value && d.value,
                  'sidebar-open': l.value && p.value
                },
                o.value.containerClass || ''
              ],
              onTouchStart: R,
              onTouchEnd: I
            },
            [
              g.value
                ? n(
                    xs,
                    { onToggleSidebar: () => u() },
                    {
                      startBefore: () => {
                        var b
                        return (b = t.navbarStartBefore) == null ? void 0 : b.call(t)
                      },
                      startAfter: () => {
                        var b
                        return (b = t.navbarStartAfter) == null ? void 0 : b.call(t)
                      },
                      centerBefore: () => {
                        var b
                        return (b = t.navbarCenterBefore) == null ? void 0 : b.call(t)
                      },
                      centerAfter: () => {
                        var b
                        return (b = t.navbarCenterAfter) == null ? void 0 : b.call(t)
                      },
                      endBefore: () => {
                        var b
                        return (b = t.navbarEndBefore) == null ? void 0 : b.call(t)
                      },
                      endAfter: () => {
                        var b
                        return (b = t.navbarEndAfter) == null ? void 0 : b.call(t)
                      },
                      screenTop: () => {
                        var b
                        return (b = t.navScreenTop) == null ? void 0 : b.call(t)
                      },
                      screenBottom: () => {
                        var b
                        return (b = t.navScreenBottom) == null ? void 0 : b.call(t)
                      }
                    }
                  )
                : null,
              n(Le, { name: 'fade' }, () => (p.value ? n('div', { class: 'sidebar-mask', onClick: () => u(!1) }) : null)),
              n(Le, { name: 'fade' }, () =>
                l.value ? null : n('div', { class: 'toggle-sidebar-wrapper', onClick: () => m() }, n('span', { class: ['arrow', d.value ? 'end' : 'start'] }))
              ),
              n(
                Fs,
                {},
                {
                  ...(t.sidebar
                    ? {
                        default: () => {
                          var b
                          return (b = t.sidebar) == null ? void 0 : b.call(t)
                        }
                      }
                    : {}),
                  top: () => {
                    var b
                    return (b = t.sidebarTop) == null ? void 0 : b.call(t)
                  },
                  bottom: () => {
                    var b
                    return (b = t.sidebarBottom) == null ? void 0 : b.call(t)
                  }
                }
              ),
              (P = t.default) == null ? void 0 : P.call(t),
              n(ys)
            ]
          )
        })
    )
  }
})
const Ns = y({
    name: 'FeaturePanel',
    props: { items: { type: Object, default: () => [] }, header: { type: String, default: '' } },
    setup(e) {
      return () =>
        n('div', { class: 'feature-panel' }, [
          e.header ? n('h2', { class: 'feature-header' }, e.header) : null,
          e.items.length
            ? n(
                'div',
                { class: 'feature-wrapper' },
                e.items.map((t) => {
                  const a = [n('h3', [n(U, { icon: t.icon }), n('span', { innerHTML: t.title })]), n('p', { innerHTML: t.details })]
                  return t.link
                    ? Ne(t.link)
                      ? n('a', { class: 'feature-item link', href: t.link, role: 'navigation', 'aria-label': t.title, target: '_blank' }, a)
                      : n(te, { class: 'feature-item link', to: t.link, role: 'navigation', 'aria-label': t.title }, () => a)
                    : n('div', { class: 'feature-item' }, a)
                })
              )
            : null
        ])
    }
  }),
  he = y({
    name: 'DropTransition',
    props: { type: { type: String, default: 'single' }, delay: { type: Number, default: 0 }, duration: { type: Number, default: 0.25 }, appear: Boolean },
    setup(e, { slots: t }) {
      const a = (o) => {
          ;(o.style.transition = `transform ${e.duration}s ease-in-out ${e.delay}s, opacity ${e.duration}s ease-in-out ${e.delay}s`),
            (o.style.transform = 'translateY(-20px)'),
            (o.style.opacity = '0')
        },
        r = (o) => {
          ;(o.style.transform = 'translateY(0)'), (o.style.opacity = '1')
        }
      return () =>
        n(e.type === 'single' ? Le : En, { name: 'drop', appear: e.appear, onAppear: a, onAfterAppear: r, onEnter: a, onAfterEnter: r, onBeforeLeave: a }, () => {
          var o
          return (o = t.default) == null ? void 0 : o.call(t)
        })
    }
  })
const Bs = y({
    name: 'HeroInfo',
    setup(e, { slots: t }) {
      const a = N(),
        r = Ue(),
        o = h(() => (a.value.heroText === !1 ? !1 : a.value.heroText || r.value.title || 'Hello')),
        s = h(() => (a.value.tagline === !1 ? !1 : a.value.tagline || r.value.description || 'Welcome to your VuePress site')),
        l = h(() => (a.value.heroImage ? pe(a.value.heroImage) : null)),
        c = h(() => (a.value.heroImageDark ? pe(a.value.heroImageDark) : null)),
        p = h(() => a.value.heroAlt || o.value || 'hero'),
        u = h(() => a.value.actions ?? [])
      return () => {
        var d, m
        return n('header', { class: 'hero-info-wrapper' }, [
          ((d = t.heroImage) == null ? void 0 : d.call(t)) ||
            n(he, { appear: !0, type: 'group' }, () => [
              l.value ? n('img', { key: 'light', class: { light: c.value }, src: l.value, alt: p.value }) : null,
              c.value ? n('img', { key: 'dark', class: 'dark', src: c.value, alt: p.value }) : null
            ]),
          ((m = t.heroInfo) == null ? void 0 : m.call(t)) ||
            n('div', { class: 'hero-info' }, [
              o.value ? n(he, { appear: !0, delay: 0.04 }, () => n('h1', { id: 'main-title' }, o.value)) : null,
              s.value ? n(he, { appear: !0, delay: 0.08 }, () => n('p', { class: 'description' }, s.value)) : null,
              u.value.length
                ? n(he, { appear: !0, delay: 0.12 }, () =>
                    n(
                      'p',
                      { class: 'actions' },
                      u.value.map((_) => n(j, { class: ['action-button', _.type || 'default'], config: _, noExternalLinkIcon: !0 }))
                    )
                  )
                : null
            ])
        ])
      }
    }
  }),
  Qe = ({ custom: e }) => n(Sa, { class: ['theme-hope-content', { custom: e }] })
Qe.displayName = 'MarkdownContent'
Qe.props = { custom: Boolean }
const zs = y({
    name: 'HopePage',
    setup(e, { slots: t }) {
      const a = We(),
        r = N(),
        o = h(() => {
          const { features: s } = r.value
          return ft(s) ? (s.some((l) => !('items' in l)) ? [{ items: s }] : s) : []
        })
      return () => {
        var s, l, c
        return n('main', { class: ['home project', { pure: a.value }], id: 'main-content', 'aria-labelledby': r.value.heroText === null ? void 0 : 'main-title' }, [
          (s = t.top) == null ? void 0 : s.call(t),
          n(Bs),
          o.value.map(({ header: p = '', items: u }, d) => n(he, { appear: !0, delay: 0.16 + d * 0.08 }, () => n(Ns, { header: p, items: u }))),
          (l = t.center) == null ? void 0 : l.call(t),
          n(he, { appear: !0, delay: 0.16 + o.value.length * 0.08 }, () => n(Qe)),
          (c = t.bottom) == null ? void 0 : c.call(t)
        ])
      }
    }
  }),
  Hs = (e, t) => {
    const a = e.replace(t, '/').split('/'),
      r = []
    let o = bt(t)
    return (
      a.forEach((s, l) => {
        l !== a.length - 1 ? ((o += `${s}/`), r.push(o)) : s !== '' && ((o += s), r.push(o))
      }),
      r
    )
  }
const js = y({
  name: 'BreadCrumb',
  setup() {
    const e = K(),
      t = w(),
      a = de(),
      r = N(),
      o = k(),
      s = O([]),
      l = h(() => (r.value.breadcrumb || (r.value.breadcrumb !== !1 && o.value.breadcrumb !== !1)) && s.value.length > 1),
      c = h(() => r.value.breadcrumbIcon || (r.value.breadcrumbIcon !== !1 && o.value.breadcrumbIcon !== !1)),
      p = () => {
        const u = e.getRoutes(),
          d = Hs(t.value.path, a.value)
            .map((m) => {
              const _ = u.find((f) => f.path === m)
              if (_) {
                const { meta: f, path: g } = Rt(e, _.path),
                  E = f.s || f.t
                if (E) return { title: E, icon: f.i, path: g }
              }
              return null
            })
            .filter((m) => m !== null)
        d.length > 1 && (s.value = d)
      }
    return (
      F(() => {
        p(), C(() => t.value.path, p)
      }),
      () =>
        n(
          'nav',
          { class: ['breadcrumb', { disable: !l.value }] },
          l.value
            ? n(
                'ol',
                { vocab: 'https://schema.org/', typeof: 'BreadcrumbList' },
                s.value.map((u, d) =>
                  n('li', { class: { 'is-active': s.value.length - 1 === d }, property: 'itemListElement', typeof: 'ListItem' }, [
                    n(te, { to: u.path, property: 'item', typeof: 'WebPage' }, () => [
                      c.value ? n(U, { icon: u.icon }) : null,
                      n('span', { property: 'name' }, u.title || 'Unknown')
                    ]),
                    n('meta', { property: 'position', content: d + 1 })
                  ])
                )
              )
            : []
        )
    )
  }
})
const ga = (e) => (e === !1 ? !1 : z(e) ? Ee(e, !0) : je(e) ? e : null),
  vt = (e, t, a) => {
    const r = e.findIndex((o) => o.link === t)
    if (r !== -1) {
      const o = e[r + a]
      return o != null && o.link ? o : null
    }
    for (const o of e)
      if (o.children) {
        const s = vt(o.children, t, a)
        if (s) return s
      }
    return null
  },
  Us = y({
    name: 'PageNav',
    setup() {
      const e = k(),
        t = N(),
        a = St(),
        r = w(),
        o = us(),
        s = h(() => {
          const c = ga(t.value.prev)
          return c === !1 ? null : c || (e.value.prevLink === !1 ? null : vt(a.value, r.value.path, -1))
        }),
        l = h(() => {
          const c = ga(t.value.next)
          return c === !1 ? null : c || (e.value.nextLink === !1 ? null : vt(a.value, r.value.path, 1))
        })
      return (
        Q('keydown', (c) => {
          c.altKey && (c.key === 'ArrowRight' ? l.value && (o(l.value.link), c.preventDefault()) : c.key === 'ArrowLeft' && s.value && (o(s.value.link), c.preventDefault()))
        }),
        () =>
          s.value || l.value
            ? n('nav', { class: 'page-nav' }, [
                s.value
                  ? n(j, { class: 'prev', config: s.value }, () => {
                      var c, p
                      return [
                        n('div', { class: 'hint' }, [n('span', { class: 'arrow start' }), e.value.metaLocales.prev]),
                        n('div', { class: 'link' }, [n(U, { icon: (c = s.value) == null ? void 0 : c.icon }), (p = s.value) == null ? void 0 : p.text])
                      ]
                    })
                  : null,
                l.value
                  ? n(j, { class: 'next', config: l.value }, () => {
                      var c, p
                      return [
                        n('div', { class: 'hint' }, [e.value.metaLocales.next, n('span', { class: 'arrow end' })]),
                        n('div', { class: 'link' }, [(c = l.value) == null ? void 0 : c.text, n(U, { icon: (p = l.value) == null ? void 0 : p.icon })])
                      ]
                    })
                  : null
              ])
            : null
      )
    }
  }),
  qr = () =>
    n(V, { name: 'author' }, () =>
      n('path', {
        d: 'M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z'
      })
    )
qr.displayName = 'AuthorIcon'
const Gr = () =>
  n(V, { name: 'calendar' }, () =>
    n('path', {
      d: 'M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z'
    })
  )
Gr.displayName = 'CalendarIcon'
const Wr = () =>
  n(V, { name: 'category' }, () =>
    n('path', {
      d: 'M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z'
    })
  )
Wr.displayName = 'CategoryIcon'
const Yr = () =>
  n(V, { name: 'eye' }, () =>
    n('path', {
      d: 'M992 512.096c0-5.76-.992-10.592-1.28-11.136-.192-2.88-1.152-8.064-2.08-10.816-.256-.672-.544-1.376-.832-2.08-.48-1.568-1.024-3.104-1.6-4.32C897.664 290.112 707.104 160 512 160c-195.072 0-385.632 130.016-473.76 322.592-1.056 2.112-1.792 4.096-2.272 5.856a55.512 55.512 0 00-.64 1.6c-1.76 5.088-1.792 8.64-1.632 7.744-.832 3.744-1.568 11.168-1.568 11.168-.224 2.272-.224 4.032.032 6.304 0 0 .736 6.464 1.088 7.808.128 1.824.576 4.512 1.12 6.976h-.032c.448 2.08 1.12 4.096 1.984 6.08.48 1.536.992 2.976 1.472 4.032C126.432 733.856 316.992 864 512 864c195.136 0 385.696-130.048 473.216-321.696 1.376-2.496 2.24-4.832 2.848-6.912.256-.608.48-1.184.672-1.728 1.536-4.48 1.856-8.32 1.728-8.32l-.032.032c.608-3.104 1.568-7.744 1.568-13.28zM512 672c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160 160-71.776 160-160 160z'
    })
  )
Yr.displayName = 'EyeIcon'
const Qr = () =>
  n(V, { name: 'fire' }, () =>
    n('path', {
      d: 'M726.4 201.6c-12.8-9.6-28.8-6.4-38.4 0-9.6 9.6-16 25.6-9.6 38.4 6.4 12.8 9.6 28.8 12.8 44.8C604.8 83.2 460.8 38.4 454.4 35.2c-9.6-3.2-22.4 0-28.8 6.4-9.6 6.4-12.8 19.2-9.6 28.8 12.8 86.4-25.6 188.8-115.2 310.4-6.4-25.6-16-51.2-32-80-9.6-9.6-22.4-16-35.2-12.8-16 3.2-25.6 12.8-25.6 28.8-3.2 48-25.6 92.8-51.2 140.8C134.4 499.2 112 544 102.4 592c-32 150.4 99.2 329.6 233.6 380.8 9.6 3.2 19.2 6.4 32 9.6-25.6-19.2-41.6-51.2-48-96C294.4 691.2 505.6 640 515.2 460.8c153.6 105.6 224 336 137.6 505.6 3.2 0 6.4-3.2 9.6-3.2 0 0 3.2 0 3.2-3.2 163.2-89.6 252.8-208 259.2-345.6 16-211.2-163.2-390.4-198.4-412.8z'
    })
  )
Qr.displayName = 'FireIcon'
const Jr = () =>
  n(V, { name: 'print' }, () =>
    n('path', {
      d: 'M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z'
    })
  )
Jr.displayName = 'PrintIcon'
const Kr = () =>
  n(V, { name: 'tag' }, () =>
    n('path', {
      d: 'M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z'
    })
  )
Kr.displayName = 'TagIcon'
const Xr = () =>
  n(V, { name: 'timer' }, () =>
    n('path', {
      d: 'M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z'
    })
  )
Xr.displayName = 'TimerIcon'
const Zr = () =>
  n(V, { name: 'word' }, () => [
    n('path', {
      d: 'M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z'
    }),
    n('path', {
      d: 'M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z'
    })
  ])
Zr.displayName = 'WordIcon'
const re = () => {
    const e = k()
    return h(() => e.value.metaLocales)
  },
  en = { '/': { word: 'About $word words', less1Minute: 'Less than 1 minute', time: 'About $time min' } },
  qs = {
    GitHub: ':repo/edit/:branch/:path',
    GitLab: ':repo/-/edit/:branch/:path',
    Gitee: ':repo/edit/:branch/:path',
    Bitbucket: ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default'
  },
  Gs = ({ docsRepo: e, docsBranch: t, docsDir: a, filePathRelative: r, editLinkPattern: o }) => {
    if (!r) return null
    const s = er(e)
    let l
    return (
      o ? (l = o) : s !== null && (l = qs[s]),
      l
        ? l
            .replace(/:repo/, ke(e) ? e : `https://github.com/${e}`)
            .replace(/:branch/, t)
            .replace(/:path/, Ea(`${bt(a)}/${r}`))
        : null
    )
  },
  Ws = () => {
    const e = k(),
      t = w(),
      a = N()
    return h(() => {
      const { repo: r, docsRepo: o = r, docsBranch: s = 'main', docsDir: l = '', editLink: c, editLinkPattern: p = '' } = e.value
      if (!(a.value.editLink ?? c ?? !0) || !o) return null
      const d = Gs({ docsRepo: o, docsBranch: s, docsDir: l, editLinkPattern: p, filePathRelative: t.value.filePathRelative })
      return d ? { text: e.value.metaLocales.editLink, link: d } : null
    })
  },
  Ys = () => {
    const e = Ue(),
      t = k(),
      a = w(),
      r = N()
    return h(() => {
      var l, c
      return !(r.value.lastUpdated ?? t.value.lastUpdated ?? !0) || !((l = a.value.git) != null && l.updatedTime)
        ? null
        : new Date((c = a.value.git) == null ? void 0 : c.updatedTime).toLocaleString(e.value.lang)
    })
  },
  Qs = () => {
    const e = k(),
      t = w(),
      a = N()
    return h(() => {
      var o
      return a.value.contributors ?? e.value.contributors ?? !0 ? ((o = t.value.git) == null ? void 0 : o.contributors) ?? null : null
    })
  }
const Js = y({
  name: 'AuthorInfo',
  inheritAttrs: !1,
  props: { author: { type: Array, required: !0 }, pure: Boolean },
  setup(e) {
    const t = re()
    return () =>
      e.author.length
        ? n('span', { class: 'page-author-info', 'aria-label': `${t.value.author}${e.pure ? '' : '🖊'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
            n(qr),
            n(
              'span',
              e.author.map((a) =>
                a.url ? n('a', { class: 'page-author-item', href: a.url, target: '_blank', rel: 'noopener noreferrer' }, a.name) : n('span', { class: 'page-author-item' }, a.name)
              )
            ),
            n('span', { property: 'author', content: e.author.map((a) => a.name).join(', ') })
          ])
        : null
  }
})
const Ks = y({
    name: 'CategoryInfo',
    inheritAttrs: !1,
    props: { category: { type: Array, required: !0 }, pure: Boolean },
    setup(e) {
      const t = K(),
        a = w(),
        r = re(),
        o = (s, l = '') => {
          l && a.value.path !== l && (s.preventDefault(), t.push(l))
        }
      return () =>
        e.category.length
          ? n('span', { class: 'page-category-info', 'aria-label': `${r.value.category}${e.pure ? '' : '🌈'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
              n(Wr),
              ...e.category.map(({ name: s, path: l }) =>
                n('span', { class: ['page-category-item', { [`category${Ja(s, 9)}`]: !e.pure, clickable: l }], role: l ? 'navigation' : '', onClick: (c) => o(c, l) }, s)
              ),
              n('meta', { property: 'articleSection', content: e.category.map(({ name: s }) => s).join(',') })
            ])
          : null
    }
  }),
  Xs = y({
    name: 'DateInfo',
    inheritAttrs: !1,
    props: { date: { type: Object, default: null }, localizedDate: { type: String, default: '' }, pure: Boolean },
    setup(e) {
      const t = Aa(),
        a = re()
      return () =>
        e.date
          ? n('span', { class: 'page-date-info', 'aria-label': `${a.value.date}${e.pure ? '' : '📅'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
              n(Gr),
              n(
                'span',
                n(qe, () => e.localizedDate || e.date.toLocaleDateString(t.value))
              ),
              n('meta', { property: 'datePublished', content: e.date.toISOString() || '' })
            ])
          : null
    }
  })
const Zs = y({
  name: 'OriginalInfo',
  inheritAttrs: !1,
  props: { isOriginal: Boolean },
  setup(e) {
    const t = re()
    return () => (e.isOriginal ? n('span', { class: 'page-original-info' }, t.value.origin) : null)
  }
})
y({
  name: 'PageViewInfo',
  inheritAttrs: !1,
  props: { pageview: { type: [Boolean, String], default: !1 }, pure: Boolean },
  setup(e) {
    const t = J(),
      a = re(),
      r = O(),
      o = O(0)
    return (
      Xo(
        r,
        () => {
          const s = r.value.textContent
          s && !isNaN(Number(s)) && (o.value = Number(s))
        },
        { childList: !0 }
      ),
      () =>
        e.pageview
          ? n('span', { class: 'page-pageview-info', 'aria-label': `${a.value.views}${e.pure ? '' : '🔢'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
              n(o.value < 1e3 ? Yr : Qr),
              n('span', { ref: r, class: 'waline-pageview-count', id: 'ArtalkPV', 'data-path': z(e.pageview) ? e.pageview : pe(t.path) }, '...')
            ])
          : null
    )
  }
})
const el = y({
  name: 'ReadingTimeInfo',
  inheritAttrs: !1,
  props: { readingTime: { type: Object, default: () => null }, pure: Boolean },
  setup(e) {
    const t = re(),
      a = Re(en),
      r = h(() => {
        if (!e.readingTime) return null
        const { minutes: o } = e.readingTime
        return o < 1 ? { text: a.value.less1Minute, time: 'PT1M' } : { text: a.value.time.replace('$time', Math.round(o).toString()), time: `PT${Math.round(o)}M` }
      })
    return () =>
      r.value
        ? n('span', { class: 'page-reading-time-info', 'aria-label': `${t.value.readingTime}${e.pure ? '' : '⌛'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
            n(Xr),
            n('span', r.value.text),
            n('meta', { property: 'timeRequired', content: r.value.time })
          ])
        : null
  }
})
const tl = y({
    name: 'TagInfo',
    inheritAttrs: !1,
    props: { tag: { type: Array, default: () => [] }, pure: Boolean },
    setup(e) {
      const t = K(),
        a = w(),
        r = re(),
        o = (s, l = '') => {
          l && a.value.path !== l && (s.preventDefault(), t.push(l))
        }
      return () =>
        e.tag.length
          ? n('span', { class: 'page-tag-info', 'aria-label': `${r.value.tag}${e.pure ? '' : '🏷'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
              n(Kr),
              ...e.tag.map(({ name: s, path: l }) =>
                n('span', { class: ['page-tag-item', { [`tag${Ja(s, 9)}`]: !e.pure, clickable: l }], role: l ? 'navigation' : '', onClick: (c) => o(c, l) }, s)
              ),
              n('meta', { property: 'keywords', content: e.tag.map(({ name: s }) => s).join(',') })
            ])
          : null
    }
  }),
  al = y({
    name: 'ReadTimeInfo',
    inheritAttrs: !1,
    props: { readingTime: { type: Object, default: () => null }, pure: Boolean },
    setup(e) {
      const t = re(),
        a = Re(en),
        r = h(() => {
          var s
          return (s = e.readingTime) == null ? void 0 : s.words.toString()
        }),
        o = h(() => a.value.word.replace('$word', r.value || ''))
      return () =>
        r.value
          ? n('span', { class: 'page-word-info', 'aria-label': `${t.value.words}${e.pure ? '' : '🔠'}`, ...(e.pure ? {} : { 'data-balloon-pos': 'down' }) }, [
              n(Zr),
              n('span', o.value),
              n('meta', { property: 'wordCount', content: r.value })
            ])
          : null
    }
  })
const rl = y({
  name: 'PageInfo',
  components: { AuthorInfo: Js, CategoryInfo: Ks, DateInfo: Xs, OriginalInfo: Zs, PageViewInfo: () => null, ReadingTimeInfo: el, TagInfo: tl, WordInfo: al },
  props: { items: { type: [Array, Boolean], default: () => ['Author', 'Original', 'Date', 'PageView', 'ReadingTime', 'Category', 'Tag'] }, info: { type: Object, required: !0 } },
  setup(e) {
    const t = We()
    return () =>
      e.items
        ? n(
            'div',
            { class: 'page-info' },
            e.items.map((a) => n(q(`${a}Info`), { ...e.info, pure: t.value }))
          )
        : null
  }
})
const nl = y({
    name: 'PageTitle',
    setup() {
      const e = w(),
        t = N(),
        a = k(),
        { info: r, items: o } = ms()
      return () =>
        n('div', { class: 'page-title' }, [
          n('h1', [a.value.titleIcon === !1 ? null : n(U, { icon: t.value.icon }), e.value.title]),
          n(rl, { info: r.value, ...(o.value === null ? {} : { items: o.value }) }),
          n('hr')
        ])
    }
  }),
  tn = () =>
    n(V, { name: 'edit' }, () => [
      n('path', {
        d: 'M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z'
      }),
      n('path', {
        d: 'M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z'
      })
    ])
tn.displayName = 'EditIcon'
const ol = y({
  name: 'PageMeta',
  setup() {
    const e = k(),
      t = Ws(),
      a = Ys(),
      r = Qs()
    return () => {
      const { metaLocales: o } = e.value
      return n('footer', { class: 'page-meta' }, [
        t.value ? n('div', { class: 'meta-item edit-link' }, n(j, { class: 'label', config: t.value }, { before: () => n(tn) })) : null,
        n('div', { class: 'meta-item git-info' }, [
          a.value ? n('div', { class: 'update-time' }, [n('span', { class: 'label' }, `${o.lastUpdated}: `), n(qe, () => n('span', { class: 'info' }, a.value))]) : null,
          r.value && r.value.length
            ? n('div', { class: 'contributors' }, [
                n('span', { class: 'label' }, `${o.contributors}: `),
                r.value.map(({ email: s, name: l }, c) => [n('span', { class: 'contributor', title: `email: ${s}` }, l), c !== r.value.length - 1 ? ',' : ''])
              ])
            : null
        ])
      ])
    }
  }
})
const il = y({
  name: 'PrintButton',
  setup() {
    const e = ce(),
      t = k()
    return () =>
      e.value.print === !1
        ? null
        : n(
            'button',
            {
              type: 'button',
              class: 'print-button',
              title: t.value.metaLocales.print,
              onClick: () => {
                window.print()
              }
            },
            n(Jr)
          )
  }
})
const sl = ({ title: e, level: t, slug: a }) => n(te, { to: `#${a}`, class: ['toc-link', `level${t}`] }, () => e),
  mt = (e, t) => {
    const a = J()
    return e.length && t > 0
      ? n(
          'ul',
          { class: 'toc-list' },
          e.map((r) => {
            const o = mt(r.children, t - 1)
            return [n('li', { class: ['toc-item', { active: Tt(a, `#${r.slug}`) }] }, sl(r)), o ? n('li', o) : null]
          })
        )
      : null
  },
  ll = y({
    name: 'TOC',
    props: { items: { type: Array, default: () => [] }, headerDepth: { type: Number, default: 2 } },
    setup(e, { slots: t }) {
      const a = J(),
        r = w(),
        o = re(),
        s = O(),
        l = (c) => {
          var p
          ;(p = s.value) == null || p.scrollTo({ top: c, behavior: 'smooth' })
        }
      return (
        F(() => {
          C(
            () => a.hash,
            (c) => {
              if (s.value) {
                const p = document.querySelector(`#toc a.toc-link[href$="${c}"]`)
                if (!p) return
                const { top: u, height: d } = s.value.getBoundingClientRect(),
                  { top: m, height: _ } = p.getBoundingClientRect()
                m < u ? l(s.value.scrollTop + m - u) : m + _ > u + d && l(s.value.scrollTop + m + _ - u - d)
              }
            }
          )
        }),
        () => {
          var p, u
          const c = e.items.length ? mt(e.items, e.headerDepth) : r.value.headers ? mt(r.value.headers, e.headerDepth) : null
          return c
            ? n('div', { class: 'toc-place-holder' }, [
                n('aside', { id: 'toc' }, [
                  (p = t.before) == null ? void 0 : p.call(t),
                  n('div', { class: 'toc-header' }, [o.value.toc, n(il)]),
                  n('div', { class: 'toc-wrapper', ref: s }, c),
                  (u = t.after) == null ? void 0 : u.call(t)
                ])
              ])
            : null
        }
      )
    }
  })
const cl = y({
  name: 'NormalPage',
  setup(e, { slots: t }) {
    const a = N(),
      { isDarkmode: r } = Ce(),
      o = k(),
      s = h(() => a.value.toc || (a.value.toc !== !1 && o.value.toc !== !1))
    return () =>
      n(
        'main',
        { class: 'page', id: 'main-content' },
        n(Y('LocalEncrypt') ? q('LocalEncrypt') : za, () => {
          var l, c, p, u
          return [
            (l = t.top) == null ? void 0 : l.call(t),
            n(js),
            n(nl),
            s.value
              ? n(
                  ll,
                  { headerDepth: a.value.headerDepth ?? o.value.headerDepth ?? 2 },
                  {
                    before: () => {
                      var d
                      return (d = t.tocBefore) == null ? void 0 : d.call(t)
                    },
                    after: () => {
                      var d
                      return (d = t.tocAfter) == null ? void 0 : d.call(t)
                    }
                  }
                )
              : null,
            (c = t.contentBefore) == null ? void 0 : c.call(t),
            n(Qe),
            (p = t.contentAfter) == null ? void 0 : p.call(t),
            n(ol),
            n(Us),
            Y('CommentService') ? n(q('CommentService'), { darkmode: r.value }) : null,
            (u = t.bottom) == null ? void 0 : u.call(t)
          ]
        })
      )
  }
})
const an = y({
  name: 'SkipLink',
  props: { content: { type: String, default: 'main-content' } },
  setup(e) {
    const t = w(),
      a = k(),
      r = O(),
      o = ({ target: s }) => {
        const l = document.querySelector(s.hash)
        if (l) {
          const c = () => {
            l.removeAttribute('tabindex'), l.removeEventListener('blur', c)
          }
          l.setAttribute('tabindex', '-1'), l.addEventListener('blur', c), l.focus(), window.scrollTo(0, 0)
        }
      }
    return (
      F(() => {
        C(
          () => t.value.path,
          () => r.value.focus()
        )
      }),
      () => [n('span', { ref: r, tabindex: '-1' }), n('a', { href: `#${e.content}`, class: 'skip-link sr-only', onClick: o }, a.value.routeLocales.skipToContent)]
    )
  }
})
const ul = y({
    name: 'FadeSlideY',
    setup(e, { slots: t }) {
      const { resolve: a, pending: r } = yr()
      return () =>
        n(Le, { name: 'fade-slide-y', mode: 'out-in', onBeforeEnter: a, onBeforeLeave: r }, () => {
          var o
          return (o = t.default) == null ? void 0 : o.call(t)
        })
    }
  }),
  pl = y({
    name: 'Layout',
    setup() {
      k()
      const e = w(),
        t = N(),
        { isMobile: a } = Ye(),
        r = h(() => 'none')
      return () => [
        n(an),
        n(
          Ur,
          {},
          {
            default: () => (t.value.home ? n(zs) : n(ul, () => n(cl, { key: e.value.path }))),
            ...(r.value !== 'none' ? { navScreenBottom: () => n(q('BloggerInfo')) } : {}),
            ...(!a.value && r.value === 'always' ? { sidebar: () => n(q('BloggerInfo')) } : {})
          }
        )
      ]
    }
  })
const dl = y({
  name: 'NotFoundHint',
  setup() {
    const e = k(),
      t = () => {
        const a = e.value.routeLocales.notFoundMsg
        return a[Math.floor(Math.random() * a.length)]
      }
    return () =>
      n('div', { class: 'not-found-hint' }, [
        n('p', { class: 'error-code' }, '404'),
        n('h1', { class: 'error-title' }, e.value.routeLocales.notFoundTitle),
        n('p', { class: 'error-hint' }, t())
      ])
  }
})
const vl = y({
  name: 'NotFound',
  setup(e, { slots: t }) {
    const a = de(),
      r = k(),
      { navigate: o } = Ln({ to: r.value.home ?? a.value })
    return () => [
      n(an),
      n(Ur, { noSidebar: !0 }, () => {
        var s
        return n(
          'main',
          { class: 'page not-found', id: 'main-content' },
          ((s = t.default) == null ? void 0 : s.call(t)) || [
            n(dl),
            n('div', { class: 'actions' }, [
              n(
                'button',
                {
                  type: 'button',
                  class: 'action-button',
                  onClick: () => {
                    window.history.go(-1)
                  }
                },
                r.value.routeLocales.back
              ),
              n('button', { type: 'button', class: 'action-button', onClick: () => o() }, r.value.routeLocales.home)
            ])
          ]
        )
      })
    ]
  }
})
const ml = X({
    enhance: ({ app: e, router: t }) => {
      const { scrollBehavior: a } = t.options
      ;(t.options.scrollBehavior = async (...r) => (await yr().wait(), a(...r))), fs(e), e.component('HopeIcon', U)
    },
    setup: () => {
      hs(), Ls()
    },
    layouts: { Layout: pl, NotFound: vl }
  }),
  Fe = [Nn, ci, fi, gi, Li, Oi, ki, $i, as, cs, ml],
  _l = [
    ['v-8daa1a0e', '/', { y: 'h', t: 'listr2', i: 'home' }, ['/index.html', '/README.md']],
    ['v-744497ce', '/api/', { y: 'a', t: 'listr2' }, ['/api/index.html', '/api/README.md']],
    ['v-5dfe5c8c', '/getting-started/context.html', { y: 'a', t: 'Concept of Context', O: 40, s: 'Context' }, ['/getting-started/context', '/getting-started/context.md']],
    ['v-d8664854', '/getting-started/environment.html', { y: 'a', t: 'Environment', O: 10 }, ['/getting-started/environment', '/getting-started/environment.md']],
    ['v-0d2bff00', '/getting-started/examples.html', { y: 'a', t: 'Examples', O: 15 }, ['/getting-started/examples', '/getting-started/examples.md']],
    ['v-4e8563af', '/getting-started/installation.html', { y: 'a', t: 'Installation', O: 5 }, ['/getting-started/installation', '/getting-started/installation.md']],
    ['v-0b947d42', '/getting-started/new-listr.html', { y: 'a', t: 'Creating a New Instance', O: 20 }, ['/getting-started/new-listr', '/getting-started/new-listr.md']],
    ['v-5e13a913', '/getting-started/task-options.html', { y: 'a', t: 'Task Options', O: 30 }, ['/getting-started/task-options', '/getting-started/task-options.md']],
    ['v-9f6f9978', '/getting-started/task.html', { y: 'a', t: 'Task', O: 30 }, ['/getting-started/task', '/getting-started/task.md']],
    ['v-43fc5fca', '/manager/', { y: 'a', t: 'Manager', O: 1 }, ['/manager/index.html', '/manager/README.md']],
    ['v-d5137982', '/migration/v6.html', { y: 'a', t: 'v6', O: 10 }, ['/migration/v6', '/migration/v6.md']],
    ['v-6c1b2cf3', '/renderer/', { y: 'a', t: 'Renderer', O: 1 }, ['/renderer/index.html', '/renderer/README.md']],
    ['v-2332fd96', '/renderer/custom.html', { y: 'a', t: 'Custom Renderer', O: 50 }, ['/renderer/custom', '/renderer/custom.md']],
    ['v-44c2f8aa', '/renderer/default.html', { y: 'a', t: 'Default Renderer', O: 10 }, ['/renderer/default', '/renderer/default.md']],
    ['v-daf836d4', '/renderer/fallback-condition.html', { y: 'a', t: 'Fallback Condition', O: 5 }, ['/renderer/fallback-condition', '/renderer/fallback-condition.md']],
    ['v-03c79b94', '/renderer/simple.html', { y: 'a', t: 'Simple Renderer', O: 20 }, ['/renderer/simple', '/renderer/simple.md']],
    ['v-3a5dbbf4', '/renderer/test.html', { y: 'a', t: 'Test Renderer', O: 40 }, ['/renderer/test', '/renderer/test.md']],
    ['v-593dc10a', '/renderer/verbose.html', { y: 'a', t: 'Verbose Renderer', O: 30 }, ['/renderer/verbose', '/renderer/verbose.md']],
    ['v-4a96075e', '/repository/changelog.html', { y: 'a', t: 'Changelog', O: -10 }, ['/repository/changelog', '/repository/changelog.md']],
    ['v-48755a3c', '/repository/contributions.html', { y: 'a', t: 'Contributions', O: 10 }, ['/repository/contributions', '/repository/contributions.md']],
    ['v-7d2304c7', '/repository/foreword.html', { y: 'a', t: 'Foreword', O: 1 }, ['/repository/foreword', '/repository/foreword.md']],
    ['v-99296e84', '/repository/release.html', { y: 'a', t: 'Release', O: 20 }, ['/repository/release', '/repository/release.md']],
    ['v-acc72eb6', '/task/enable.html', { y: 'a', t: 'Conditional Enable', O: 40 }, ['/task/enable', '/task/enable.md']],
    ['v-080ff07e', '/task/error-handling.html', { y: 'a', t: 'Error Handling', O: 5 }, ['/task/error-handling', '/task/error-handling.md']],
    ['v-64ba1832', '/task/output.html', { y: 'a', t: 'Output', O: 30 }, ['/task/output', '/task/output.md']],
    ['v-18a4691b', '/task/prompts.html', { y: 'a', t: 'Prompts', O: 60 }, ['/task/prompts', '/task/prompts.md']],
    ['v-df8eec3c', '/task/retry.html', { y: 'a', t: 'Retry', O: 70 }, ['/task/retry', '/task/retry.md']],
    ['v-53eb2424', '/task/rollback.html', { y: 'a', t: 'Rollback', O: 80 }, ['/task/rollback', '/task/rollback.md']],
    ['v-16a7542e', '/task/skip.html', { y: 'a', t: 'Conditional Skip', O: 50 }, ['/task/skip', '/task/skip.md']],
    ['v-9f44200c', '/task/subtasks.html', { y: 'a', t: 'Subtasks', O: 10 }, ['/task/subtasks', '/task/subtasks.md']],
    ['v-6a56d832', '/task/title.html', { y: 'a', t: 'Title', O: 20 }, ['/task/title', '/task/title.md']],
    ['v-5dad3ee2', '/api/classes/BaseEventMap.html', { y: 'a', t: 'Class: BaseEventMap' }, ['/api/classes/BaseEventMap', '/api/classes/BaseEventMap.md']],
    ['v-7bc5bc46', '/api/classes/Concurrency.html', { y: 'a', t: 'Class: Concurrency' }, ['/api/classes/Concurrency', '/api/classes/Concurrency.md']],
    ['v-42a4066c', '/api/classes/DefaultRenderer.html', { y: 'a', t: 'Class: DefaultRenderer' }, ['/api/classes/DefaultRenderer', '/api/classes/DefaultRenderer.md']],
    ['v-2e8161a2', '/api/classes/EventManager.html', { y: 'a', t: 'Class: EventManager<Event, Map>' }, ['/api/classes/EventManager', '/api/classes/EventManager.md']],
    ['v-64a97bbc', '/api/classes/Listr.html', { y: 'a', t: 'Class: Listr<Ctx, Renderer, FallbackRenderer>' }, ['/api/classes/Listr', '/api/classes/Listr.md']],
    ['v-2119c4e8', '/api/classes/ListrBaseRenderer.html', { y: 'a', t: 'Class: ListrBaseRenderer' }, ['/api/classes/ListrBaseRenderer', '/api/classes/ListrBaseRenderer.md']],
    ['v-b3bf2a24', '/api/classes/ListrError.html', { y: 'a', t: 'Class: ListrError<Ctx>' }, ['/api/classes/ListrError', '/api/classes/ListrError.md']],
    ['v-79c6396e', '/api/classes/ListrEventManager.html', { y: 'a', t: 'Class: ListrEventManager' }, ['/api/classes/ListrEventManager', '/api/classes/ListrEventManager.md']],
    ['v-3192097a', '/api/classes/ListrEventMap.html', { y: 'a', t: 'Class: ListrEventMap' }, ['/api/classes/ListrEventMap', '/api/classes/ListrEventMap.md']],
    ['v-767931cc', '/api/classes/ListrLogger.html', { y: 'a', t: 'Class: ListrLogger' }, ['/api/classes/ListrLogger', '/api/classes/ListrLogger.md']],
    ['v-b1b64c8e', '/api/classes/ListrRenderer.html', { y: 'a', t: 'Class: ListrRenderer' }, ['/api/classes/ListrRenderer', '/api/classes/ListrRenderer.md']],
    [
      'v-d931a278',
      '/api/classes/ListrTaskEventManager.html',
      { y: 'a', t: 'Class: ListrTaskEventManager' },
      ['/api/classes/ListrTaskEventManager', '/api/classes/ListrTaskEventManager.md']
    ],
    ['v-baa96b16', '/api/classes/ListrTaskEventMap.html', { y: 'a', t: 'Class: ListrTaskEventMap' }, ['/api/classes/ListrTaskEventMap', '/api/classes/ListrTaskEventMap.md']],
    [
      'v-0eeffd38',
      '/api/classes/ListrTaskObject.html',
      { y: 'a', t: 'Class: ListrTaskObject<Ctx, Renderer>' },
      ['/api/classes/ListrTaskObject', '/api/classes/ListrTaskObject.md']
    ],
    [
      'v-7def10b0',
      '/api/classes/ListrTaskWrapper.html',
      { y: 'a', t: 'Class: ListrTaskWrapper<Ctx, Renderer>' },
      ['/api/classes/ListrTaskWrapper', '/api/classes/ListrTaskWrapper.md']
    ],
    ['v-6e3fd583', '/api/classes/Manager.html', { y: 'a', t: 'Class: Manager<Ctx, Renderer, FallbackRenderer>' }, ['/api/classes/Manager', '/api/classes/Manager.md']],
    ['v-271fb980', '/api/classes/ProcessOutput.html', { y: 'a', t: 'Class: ProcessOutput' }, ['/api/classes/ProcessOutput', '/api/classes/ProcessOutput.md']],
    [
      'v-51771be0',
      '/api/classes/ProcessOutputBuffer.html',
      { y: 'a', t: 'Class: ProcessOutputBuffer' },
      ['/api/classes/ProcessOutputBuffer', '/api/classes/ProcessOutputBuffer.md']
    ],
    [
      'v-20df2ec0',
      '/api/classes/ProcessOutputStream.html',
      { y: 'a', t: 'Class: ProcessOutputStream' },
      ['/api/classes/ProcessOutputStream', '/api/classes/ProcessOutputStream.md']
    ],
    ['v-1f53290c', '/api/classes/PromptError.html', { y: 'a', t: 'Class: PromptError' }, ['/api/classes/PromptError', '/api/classes/PromptError.md']],
    ['v-637e5960', '/api/classes/PromptOptionsMap.html', { y: 'a', t: 'Class: PromptOptionsMap' }, ['/api/classes/PromptOptionsMap', '/api/classes/PromptOptionsMap.md']],
    ['v-6cb9d38a', '/api/classes/SilentRenderer.html', { y: 'a', t: 'Class: SilentRenderer' }, ['/api/classes/SilentRenderer', '/api/classes/SilentRenderer.md']],
    ['v-7ef2954d', '/api/classes/SimpleRenderer.html', { y: 'a', t: 'Class: SimpleRenderer' }, ['/api/classes/SimpleRenderer', '/api/classes/SimpleRenderer.md']],
    ['v-21fa52d2', '/api/classes/Spinner.html', { y: 'a', t: 'Class: Spinner' }, ['/api/classes/Spinner', '/api/classes/Spinner.md']],
    ['v-9617d6a6', '/api/classes/TestRenderer.html', { y: 'a', t: 'Class: TestRenderer' }, ['/api/classes/TestRenderer', '/api/classes/TestRenderer.md']],
    ['v-6dcaa96a', '/api/classes/TestRendererEvent.html', { y: 'a', t: 'Class: TestRendererEvent<T>' }, ['/api/classes/TestRendererEvent', '/api/classes/TestRendererEvent.md']],
    ['v-031b74cb', '/api/classes/VerboseRenderer.html', { y: 'a', t: 'Class: VerboseRenderer' }, ['/api/classes/VerboseRenderer', '/api/classes/VerboseRenderer.md']],
    [
      'v-7a4696fe',
      '/api/enums/ListrDefaultRendererLogLevels.html',
      { y: 'a', t: 'Enumeration: ListrDefaultRendererLogLevels' },
      ['/api/enums/ListrDefaultRendererLogLevels', '/api/enums/ListrDefaultRendererLogLevels.md']
    ],
    [
      'v-e53e06e8',
      '/api/enums/ListrEnvironmentVariables.html',
      { y: 'a', t: 'Enumeration: ListrEnvironmentVariables' },
      ['/api/enums/ListrEnvironmentVariables', '/api/enums/ListrEnvironmentVariables.md']
    ],
    ['v-492026bf', '/api/enums/ListrErrorTypes.html', { y: 'a', t: 'Enumeration: ListrErrorTypes' }, ['/api/enums/ListrErrorTypes', '/api/enums/ListrErrorTypes.md']],
    ['v-4c294a24', '/api/enums/ListrEventType.html', { y: 'a', t: 'Enumeration: ListrEventType' }, ['/api/enums/ListrEventType', '/api/enums/ListrEventType.md']],
    ['v-3a79395a', '/api/enums/ListrTaskEventType.html', { y: 'a', t: 'Enumeration: ListrTaskEventType' }, ['/api/enums/ListrTaskEventType', '/api/enums/ListrTaskEventType.md']],
    ['v-53c698d6', '/api/enums/ListrTaskState.html', { y: 'a', t: 'Enumeration: ListrTaskState' }, ['/api/enums/ListrTaskState', '/api/enums/ListrTaskState.md']],
    ['v-5c809bf1', '/api/enums/LogLevels.html', { y: 'a', t: 'Enumeration: LogLevels' }, ['/api/enums/LogLevels', '/api/enums/LogLevels.md']],
    [
      'v-52ddb36c',
      '/api/functions/assertFunctionOrSelf.html',
      { y: 'a', t: 'Function: assertFunctionOrSelf' },
      ['/api/functions/assertFunctionOrSelf', '/api/functions/assertFunctionOrSelf.md']
    ],
    ['v-1418b4c6', '/api/functions/cleanseAnsi.html', { y: 'a', t: 'Function: cleanseAnsi' }, ['/api/functions/cleanseAnsi', '/api/functions/cleanseAnsi.md']],
    ['v-a1253cc2', '/api/functions/cloneObject.html', { y: 'a', t: 'Function: cloneObject' }, ['/api/functions/cloneObject', '/api/functions/cloneObject.md']],
    ['v-57ce2d52', '/api/functions/createPrompt.html', { y: 'a', t: 'Function: createPrompt' }, ['/api/functions/createPrompt', '/api/functions/createPrompt.md']],
    ['v-9bc6bbb2', '/api/functions/generateUUID.html', { y: 'a', t: 'Function: generateUUID' }, ['/api/functions/generateUUID', '/api/functions/generateUUID.md']],
    ['v-6914d6fc', '/api/functions/getRenderer.html', { y: 'a', t: 'Function: getRenderer' }, ['/api/functions/getRenderer', '/api/functions/getRenderer.md']],
    ['v-722f2c78', '/api/functions/getRendererClass.html', { y: 'a', t: 'Function: getRendererClass' }, ['/api/functions/getRendererClass', '/api/functions/getRendererClass.md']],
    ['v-1bb1a42b', '/api/functions/indent.html', { y: 'a', t: 'Function: indent' }, ['/api/functions/indent', '/api/functions/indent.md']],
    ['v-27e2fe2c', '/api/functions/isObservable.html', { y: 'a', t: 'Function: isObservable' }, ['/api/functions/isObservable', '/api/functions/isObservable.md']],
    [
      'v-4617a59c',
      '/api/functions/isUnicodeSupported.html',
      { y: 'a', t: 'Function: isUnicodeSupported' },
      ['/api/functions/isUnicodeSupported', '/api/functions/isUnicodeSupported.md']
    ],
    ['v-9bfe6d76', '/api/functions/parseTimer.html', { y: 'a', t: 'Function: parseTimer' }, ['/api/functions/parseTimer', '/api/functions/parseTimer.md']],
    ['v-049b1cd8', '/api/functions/parseTimestamp.html', { y: 'a', t: 'Function: parseTimestamp' }, ['/api/functions/parseTimestamp', '/api/functions/parseTimestamp.md']],
    ['v-fddf488e', '/api/functions/splat.html', { y: 'a', t: 'Function: splat' }, ['/api/functions/splat', '/api/functions/splat.md']],
    [
      'v-55699790',
      '/api/interfaces/DefaultRendererOptions.html',
      { y: 'a', t: 'Interface: DefaultRendererOptions' },
      ['/api/interfaces/DefaultRendererOptions', '/api/interfaces/DefaultRendererOptions.md']
    ],
    [
      'v-2b37b7dd',
      '/api/interfaces/DefaultRendererTaskOptions.html',
      { y: 'a', t: 'Interface: DefaultRendererTaskOptions' },
      ['/api/interfaces/DefaultRendererTaskOptions', '/api/interfaces/DefaultRendererTaskOptions.md']
    ],
    [
      'v-489ecb16',
      '/api/interfaces/ListrBaseClassOptions.html',
      { y: 'a', t: 'Interface: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer>' },
      ['/api/interfaces/ListrBaseClassOptions', '/api/interfaces/ListrBaseClassOptions.md']
    ],
    [
      'v-303d04d8',
      '/api/interfaces/ListrLoggerOptions.html',
      { y: 'a', t: 'Interface: ListrLoggerOptions' },
      ['/api/interfaces/ListrLoggerOptions', '/api/interfaces/ListrLoggerOptions.md']
    ],
    ['v-5b4cf8e8', '/api/interfaces/ListrOptions.html', { y: 'a', t: 'Interface: ListrOptions<Ctx>' }, ['/api/interfaces/ListrOptions', '/api/interfaces/ListrOptions.md']],
    [
      'v-29f21ef3',
      '/api/interfaces/ListrPrimaryRendererOptions.html',
      { y: 'a', t: 'Interface: ListrPrimaryRendererOptions<T>' },
      ['/api/interfaces/ListrPrimaryRendererOptions', '/api/interfaces/ListrPrimaryRendererOptions.md']
    ],
    [
      'v-342bf6b6',
      '/api/interfaces/ListrSecondaryRendererOptions.html',
      { y: 'a', t: 'Interface: ListrSecondaryRendererOptions<T>' },
      ['/api/interfaces/ListrSecondaryRendererOptions', '/api/interfaces/ListrSecondaryRendererOptions.md']
    ],
    [
      'v-4e820f20',
      '/api/interfaces/ListrSubClassOptions.html',
      { y: 'a', t: 'Interface: ListrSubClassOptions<Ctx, Renderer>' },
      ['/api/interfaces/ListrSubClassOptions', '/api/interfaces/ListrSubClassOptions.md']
    ],
    ['v-d7078cb2', '/api/interfaces/ListrTask.html', { y: 'a', t: 'Interface: ListrTask<Ctx, Renderer>' }, ['/api/interfaces/ListrTask', '/api/interfaces/ListrTask.md']],
    [
      'v-75d8b678',
      '/api/interfaces/ListrTaskMessage.html',
      { y: 'a', t: 'Interface: ListrTaskMessage' },
      ['/api/interfaces/ListrTaskMessage', '/api/interfaces/ListrTaskMessage.md']
    ],
    ['v-0db2897a', '/api/interfaces/ListrTaskRetry.html', { y: 'a', t: 'Interface: ListrTaskRetry' }, ['/api/interfaces/ListrTaskRetry', '/api/interfaces/ListrTaskRetry.md']],
    ['v-6a6ebd64', '/api/interfaces/LoggerFieldFn.html', { y: 'a', t: 'Interface: LoggerFieldFn<Args>' }, ['/api/interfaces/LoggerFieldFn', '/api/interfaces/LoggerFieldFn.md']],
    [
      'v-01c9ca44',
      '/api/interfaces/LoggerFieldOptions.html',
      { y: 'a', t: 'Interface: LoggerFieldOptions<MultipleOnly>' },
      ['/api/interfaces/LoggerFieldOptions', '/api/interfaces/LoggerFieldOptions.md']
    ],
    [
      'v-2d6dd616',
      '/api/interfaces/LoggerRendererOptions.html',
      { y: 'a', t: 'Interface: LoggerRendererOptions' },
      ['/api/interfaces/LoggerRendererOptions', '/api/interfaces/LoggerRendererOptions.md']
    ],
    [
      'v-4511e5a0',
      '/api/interfaces/ProcessOutputBufferEntry.html',
      { y: 'a', t: 'Interface: ProcessOutputBufferEntry' },
      ['/api/interfaces/ProcessOutputBufferEntry', '/api/interfaces/ProcessOutputBufferEntry.md']
    ],
    [
      'v-54336778',
      '/api/interfaces/ProcessOutputBufferOptions.html',
      { y: 'a', t: 'Interface: ProcessOutputBufferOptions' },
      ['/api/interfaces/ProcessOutputBufferOptions', '/api/interfaces/ProcessOutputBufferOptions.md']
    ],
    [
      'v-462793f2',
      '/api/interfaces/ProcessOutputRendererOptions.html',
      { y: 'a', t: 'Interface: ProcessOutputRendererOptions' },
      ['/api/interfaces/ProcessOutputRendererOptions', '/api/interfaces/ProcessOutputRendererOptions.md']
    ],
    [
      'v-2108b8c0',
      '/api/interfaces/PromptCancelOptions.html',
      { y: 'a', t: 'Interface: PromptCancelOptions' },
      ['/api/interfaces/PromptCancelOptions', '/api/interfaces/PromptCancelOptions.md']
    ],
    ['v-6504bb4e', '/api/interfaces/PromptInstance.html', { y: 'a', t: 'Interface: PromptInstance' }, ['/api/interfaces/PromptInstance', '/api/interfaces/PromptInstance.md']],
    ['v-083bf8ea', '/api/interfaces/PromptSettings.html', { y: 'a', t: 'Interface: PromptSettings' }, ['/api/interfaces/PromptSettings', '/api/interfaces/PromptSettings.md']],
    [
      'v-64717b7d',
      '/api/interfaces/RendererPresetTimer.html',
      { y: 'a', t: 'Interface: RendererPresetTimer' },
      ['/api/interfaces/RendererPresetTimer', '/api/interfaces/RendererPresetTimer.md']
    ],
    [
      'v-70e17068',
      '/api/interfaces/RendererPresetTimestamp.html',
      { y: 'a', t: 'Interface: RendererPresetTimestamp' },
      ['/api/interfaces/RendererPresetTimestamp', '/api/interfaces/RendererPresetTimestamp.md']
    ],
    [
      'v-60656784',
      '/api/interfaces/RendererStyleMap.html',
      { y: 'a', t: 'Interface: RendererStyleMap<Levels>' },
      ['/api/interfaces/RendererStyleMap', '/api/interfaces/RendererStyleMap.md']
    ],
    [
      'v-6ac3ec17',
      '/api/interfaces/SimpleRendererOptions.html',
      { y: 'a', t: 'Interface: SimpleRendererOptions' },
      ['/api/interfaces/SimpleRendererOptions', '/api/interfaces/SimpleRendererOptions.md']
    ],
    [
      'v-63c3683c',
      '/api/interfaces/SimpleRendererTaskOptions.html',
      { y: 'a', t: 'Interface: SimpleRendererTaskOptions' },
      ['/api/interfaces/SimpleRendererTaskOptions', '/api/interfaces/SimpleRendererTaskOptions.md']
    ],
    [
      'v-ac12dd62',
      '/api/interfaces/SupportedRenderer.html',
      { y: 'a', t: 'Interface: SupportedRenderer' },
      ['/api/interfaces/SupportedRenderer', '/api/interfaces/SupportedRenderer.md']
    ],
    [
      'v-70281cb7',
      '/api/interfaces/TestRendererOptions.html',
      { y: 'a', t: 'Interface: TestRendererOptions' },
      ['/api/interfaces/TestRendererOptions', '/api/interfaces/TestRendererOptions.md']
    ],
    [
      'v-3ecbacf9',
      '/api/interfaces/VerboseRendererOptions.html',
      { y: 'a', t: 'Interface: VerboseRendererOptions' },
      ['/api/interfaces/VerboseRendererOptions', '/api/interfaces/VerboseRendererOptions.md']
    ],
    [
      'v-7a5be81e',
      '/api/interfaces/VerboseRendererTaskOptions.html',
      { y: 'a', t: 'Interface: VerboseRendererTaskOptions' },
      ['/api/interfaces/VerboseRendererTaskOptions', '/api/interfaces/VerboseRendererTaskOptions.md']
    ],
    ['v-86e6018e', '/api/types/EventData.html', { y: 'a', t: 'Type alias: EventData<Event, Map>' }, ['/api/types/EventData', '/api/types/EventData.md']],
    ['v-55f7001a', '/api/types/EventMap.html', { y: 'a', t: 'Type alias: EventMap<Events>' }, ['/api/types/EventMap', '/api/types/EventMap.md']],
    ['v-21c35a6e', '/api/types/Figures.html', { y: 'a', t: 'Type alias: Figures' }, ['/api/types/Figures', '/api/types/Figures.md']],
    ['v-164beb0c', '/api/types/ListrContext.html', { y: 'a', t: 'Type alias: ListrContext' }, ['/api/types/ListrContext', '/api/types/ListrContext.md']],
    [
      'v-af53b1b6',
      '/api/types/ListrDefaultRenderer.html',
      { y: 'a', t: 'Type alias: ListrDefaultRenderer' },
      ['/api/types/ListrDefaultRenderer', '/api/types/ListrDefaultRenderer.md']
    ],
    [
      'v-6c65a562',
      '/api/types/ListrDefaultRendererOptions.html',
      { y: 'a', t: 'Type alias: ListrDefaultRendererOptions' },
      ['/api/types/ListrDefaultRendererOptions', '/api/types/ListrDefaultRendererOptions.md']
    ],
    [
      'v-ab61599c',
      '/api/types/ListrDefaultRendererOptionsStyle.html',
      { y: 'a', t: 'Type alias: ListrDefaultRendererOptionsStyle' },
      ['/api/types/ListrDefaultRendererOptionsStyle', '/api/types/ListrDefaultRendererOptionsStyle.md']
    ],
    [
      'v-5b92d35f',
      '/api/types/ListrDefaultRendererTasks.html',
      { y: 'a', t: 'Type alias: ListrDefaultRendererTasks' },
      ['/api/types/ListrDefaultRendererTasks', '/api/types/ListrDefaultRendererTasks.md']
    ],
    [
      'v-6617f35c',
      '/api/types/ListrDefaultRendererValue.html',
      { y: 'a', t: 'Type alias: ListrDefaultRendererValue' },
      ['/api/types/ListrDefaultRendererValue', '/api/types/ListrDefaultRendererValue.md']
    ],
    [
      'v-2350a378',
      '/api/types/ListrFallbackRenderer.html',
      { y: 'a', t: 'Type alias: ListrFallbackRenderer' },
      ['/api/types/ListrFallbackRenderer', '/api/types/ListrFallbackRenderer.md']
    ],
    [
      'v-4bd9079d',
      '/api/types/ListrFallbackRendererValue.html',
      { y: 'a', t: 'Type alias: ListrFallbackRendererValue' },
      ['/api/types/ListrFallbackRendererValue', '/api/types/ListrFallbackRendererValue.md']
    ],
    [
      'v-3e2bcbe1',
      '/api/types/ListrGetRendererClassFromValue.html',
      { y: 'a', t: 'Type alias: ListrGetRendererClassFromValue<T>' },
      ['/api/types/ListrGetRendererClassFromValue', '/api/types/ListrGetRendererClassFromValue.md']
    ],
    [
      'v-699f11e4',
      '/api/types/ListrGetRendererOptions.html',
      { y: 'a', t: 'Type alias: ListrGetRendererOptions<T>' },
      ['/api/types/ListrGetRendererOptions', '/api/types/ListrGetRendererOptions.md']
    ],
    [
      'v-dc6640ee',
      '/api/types/ListrGetRendererTaskOptions.html',
      { y: 'a', t: 'Type alias: ListrGetRendererTaskOptions<T>' },
      ['/api/types/ListrGetRendererTaskOptions', '/api/types/ListrGetRendererTaskOptions.md']
    ],
    [
      'v-5636bf1a',
      '/api/types/ListrGetRendererValueFromClass.html',
      { y: 'a', t: 'Type alias: ListrGetRendererValueFromClass<T>' },
      ['/api/types/ListrGetRendererValueFromClass', '/api/types/ListrGetRendererValueFromClass.md']
    ],
    [
      'v-864f5086',
      '/api/types/ListrLoggerOptionStyle.html',
      { y: 'a', t: 'Type alias: ListrLoggerOptionStyle<T>' },
      ['/api/types/ListrLoggerOptionStyle', '/api/types/ListrLoggerOptionStyle.md']
    ],
    [
      'v-7c84ef3c',
      '/api/types/ListrRendererFactory.html',
      { y: 'a', t: 'Type alias: ListrRendererFactory' },
      ['/api/types/ListrRendererFactory', '/api/types/ListrRendererFactory.md']
    ],
    [
      'v-8706e164',
      '/api/types/ListrRendererOptions.html',
      { y: 'a', t: 'Type alias: ListrRendererOptions<Renderer, FallbackRenderer>' },
      ['/api/types/ListrRendererOptions', '/api/types/ListrRendererOptions.md']
    ],
    ['v-56346dca', '/api/types/ListrRendererValue.html', { y: 'a', t: 'Type alias: ListrRendererValue' }, ['/api/types/ListrRendererValue', '/api/types/ListrRendererValue.md']],
    [
      'v-8b57909e',
      '/api/types/ListrSilentRenderer.html',
      { y: 'a', t: 'Type alias: ListrSilentRenderer' },
      ['/api/types/ListrSilentRenderer', '/api/types/ListrSilentRenderer.md']
    ],
    [
      'v-1f4a5a50',
      '/api/types/ListrSilentRendererValue.html',
      { y: 'a', t: 'Type alias: ListrSilentRendererValue' },
      ['/api/types/ListrSilentRendererValue', '/api/types/ListrSilentRendererValue.md']
    ],
    [
      'v-66e60d18',
      '/api/types/ListrSimpleRenderer.html',
      { y: 'a', t: 'Type alias: ListrSimpleRenderer' },
      ['/api/types/ListrSimpleRenderer', '/api/types/ListrSimpleRenderer.md']
    ],
    [
      'v-6222f420',
      '/api/types/ListrSimpleRendererOptions.html',
      { y: 'a', t: 'Type alias: ListrSimpleRendererOptions' },
      ['/api/types/ListrSimpleRendererOptions', '/api/types/ListrSimpleRendererOptions.md']
    ],
    [
      'v-499e1a70',
      '/api/types/ListrSimpleRendererTasks.html',
      { y: 'a', t: 'Type alias: ListrSimpleRendererTasks' },
      ['/api/types/ListrSimpleRendererTasks', '/api/types/ListrSimpleRendererTasks.md']
    ],
    [
      'v-54233a6d',
      '/api/types/ListrSimpleRendererValue.html',
      { y: 'a', t: 'Type alias: ListrSimpleRendererValue' },
      ['/api/types/ListrSimpleRendererValue', '/api/types/ListrSimpleRendererValue.md']
    ],
    ['v-0ebb3bdc', '/api/types/ListrTaskFn.html', { y: 'a', t: 'Type alias: ListrTaskFn<Ctx, Renderer>' }, ['/api/types/ListrTaskFn', '/api/types/ListrTaskFn.md']],
    ['v-08bd1340', '/api/types/ListrTaskPrompt.html', { y: 'a', t: 'Type alias: ListrTaskPrompt' }, ['/api/types/ListrTaskPrompt', '/api/types/ListrTaskPrompt.md']],
    ['v-f1641fb2', '/api/types/ListrTaskResult.html', { y: 'a', t: 'Type alias: ListrTaskResult<Ctx>' }, ['/api/types/ListrTaskResult', '/api/types/ListrTaskResult.md']],
    ['v-635152d8', '/api/types/ListrTestRenderer.html', { y: 'a', t: 'Type alias: ListrTestRenderer' }, ['/api/types/ListrTestRenderer', '/api/types/ListrTestRenderer.md']],
    [
      'v-728b9300',
      '/api/types/ListrTestRendererOptions.html',
      { y: 'a', t: 'Type alias: ListrTestRendererOptions' },
      ['/api/types/ListrTestRendererOptions', '/api/types/ListrTestRendererOptions.md']
    ],
    [
      'v-813e1d60',
      '/api/types/ListrTestRendererTasks.html',
      { y: 'a', t: 'Type alias: ListrTestRendererTasks' },
      ['/api/types/ListrTestRendererTasks', '/api/types/ListrTestRendererTasks.md']
    ],
    [
      'v-6c33dd66',
      '/api/types/ListrTestRendererValue.html',
      { y: 'a', t: 'Type alias: ListrTestRendererValue' },
      ['/api/types/ListrTestRendererValue', '/api/types/ListrTestRendererValue.md']
    ],
    [
      'v-334da610',
      '/api/types/ListrVerboseRendererOptions.html',
      { y: 'a', t: 'Type alias: ListrVerboseRendererOptions' },
      ['/api/types/ListrVerboseRendererOptions', '/api/types/ListrVerboseRendererOptions.md']
    ],
    [
      'v-b6a6ef40',
      '/api/types/ListrVerboseRendererTasks.html',
      { y: 'a', t: 'Type alias: ListrVerboseRendererTasks' },
      ['/api/types/ListrVerboseRendererTasks', '/api/types/ListrVerboseRendererTasks.md']
    ],
    ['v-51048213', '/api/types/LoggerField.html', { y: 'a', t: 'Type alias: LoggerField<Args>' }, ['/api/types/LoggerField', '/api/types/LoggerField.md']],
    ['v-4e2913ce', '/api/types/LoggerFormat.html', { y: 'a', t: 'Type alias: LoggerFormat' }, ['/api/types/LoggerFormat', '/api/types/LoggerFormat.md']],
    ['v-8c93ad92', '/api/types/PresetTimer.html', { y: 'a', t: 'Type alias: PresetTimer' }, ['/api/types/PresetTimer', '/api/types/PresetTimer.md']],
    ['v-6af28886', '/api/types/PresetTimestamp.html', { y: 'a', t: 'Type alias: PresetTimestamp' }, ['/api/types/PresetTimestamp', '/api/types/PresetTimestamp.md']],
    ['v-ecd1c87a', '/api/types/PromptOptions.html', { y: 'a', t: 'Type alias: PromptOptions<T>' }, ['/api/types/PromptOptions', '/api/types/PromptOptions.md']],
    ['v-70f19ba9', '/api/types/PromptOptionsType.html', { y: 'a', t: 'Type alias: PromptOptionsType<T>' }, ['/api/types/PromptOptionsType', '/api/types/PromptOptionsType.md']],
    ['v-70e16670', '/api/types/PromptTypes.html', { y: 'a', t: 'Type alias: PromptTypes' }, ['/api/types/PromptTypes', '/api/types/PromptTypes.md']],
    ['v-7b7e7be0', '/api/types/Unionize.html', { y: 'a', t: 'Type alias: Unionize<T>' }, ['/api/types/Unionize', '/api/types/Unionize.md']],
    ['v-775e15e2', '/api/variables/ANSI_ESCAPE.html', { y: 'a', t: 'Variable: ANSI_ESCAPE' }, ['/api/variables/ANSI_ESCAPE', '/api/variables/ANSI_ESCAPE.md']],
    [
      'v-3077bc7b',
      '/api/variables/ANSI_ESCAPE_CODES.html',
      { y: 'a', t: 'Variable: ANSI_ESCAPE_CODES' },
      ['/api/variables/ANSI_ESCAPE_CODES', '/api/variables/ANSI_ESCAPE_CODES.md']
    ],
    [
      'v-ee25f356',
      '/api/variables/LISTR_DEFAULT_RENDERER_STYLE.html',
      { y: 'a', t: 'Variable: LISTR_DEFAULT_RENDERER_STYLE' },
      ['/api/variables/LISTR_DEFAULT_RENDERER_STYLE', '/api/variables/LISTR_DEFAULT_RENDERER_STYLE.md']
    ],
    [
      'v-396c3d46',
      '/api/variables/LISTR_LOGGER_STYLE.html',
      { y: 'a', t: 'Variable: LISTR_LOGGER_STYLE' },
      ['/api/variables/LISTR_LOGGER_STYLE', '/api/variables/LISTR_LOGGER_STYLE.md']
    ],
    ['v-2264582a', '/api/variables/RENDERER_TIMER.html', { y: 'a', t: 'Variable: RENDERER_TIMER' }, ['/api/variables/RENDERER_TIMER', '/api/variables/RENDERER_TIMER.md']],
    [
      'v-0a240df9',
      '/api/variables/RENDERER_TIMESTAMP.html',
      { y: 'a', t: 'Variable: RENDERER_TIMESTAMP' },
      ['/api/variables/RENDERER_TIMESTAMP', '/api/variables/RENDERER_TIMESTAMP.md']
    ],
    ['v-a52a2088', '/api/variables/color.html', { y: 'a', t: 'Variable: color' }, ['/api/variables/color', '/api/variables/color.md']],
    ['v-87ea73a8', '/api/variables/figures-1.html', { y: 'a', t: 'Variable: figures' }, ['/api/variables/figures-1', '/api/variables/figures-1.md']],
    ['v-3706649a', '/404.html', { y: 'p', t: '' }, ['/404']],
    ['v-ccdc4da0', '/getting-started/', { y: 'p', t: 'Getting Started' }, ['/getting-started/index.html']],
    ['v-acb2d44c', '/migration/', { y: 'p', t: 'Migration' }, ['/migration/index.html']],
    ['v-4748358c', '/repository/', { y: 'p', t: 'Repository' }, ['/repository/index.html']],
    ['v-15537bf1', '/task/', { y: 'p', t: 'Task' }, ['/task/index.html']],
    ['v-73d692d2', '/api/classes/', { y: 'p', t: 'Classes' }, ['/api/classes/index.html']],
    ['v-42196c2b', '/api/enums/', { y: 'p', t: 'Enums' }, ['/api/enums/index.html']],
    ['v-be04cb7c', '/api/functions/', { y: 'p', t: 'Functions' }, ['/api/functions/index.html']],
    ['v-69092c87', '/api/interfaces/', { y: 'p', t: 'Interfaces' }, ['/api/interfaces/index.html']],
    ['v-5c4abc24', '/api/types/', { y: 'p', t: 'Types' }, ['/api/types/index.html']],
    ['v-0c55dfe6', '/api/variables/', { y: 'p', t: 'Variables' }, ['/api/variables/index.html']]
  ]
var ba = y({
    name: 'Vuepress',
    setup() {
      const e = xn()
      return () => n(e.value)
    }
  }),
  fl = () =>
    _l.reduce(
      (e, [t, a, r, o]) => (e.push({ name: t, path: a, component: ba, meta: r }, ...o.map((s) => ({ path: s, redirect: a }))), e),
      [{ name: '404', path: '/:catchAll(.*)', component: ba }]
    ),
  hl = On,
  gl = () => {
    const e = yn({ history: hl(bt('/')), routes: fl(), scrollBehavior: (t, a, r) => r || (t.hash ? { el: t.hash } : { top: 0 }) })
    return (
      e.beforeResolve(async (t, a) => {
        var r
        ;(t.path !== a.path || a === Tn) && ([ie.value] = await Promise.all([ee.resolvePageData(t.name), (r = Ta[t.name]) == null ? void 0 : r.__asyncLoader()]))
      }),
      e
    )
  },
  bl = (e) => {
    e.component('ClientOnly', qe), e.component('Content', Sa)
  },
  El = (e, t, a) => {
    const r = O(t.currentRoute.value.path)
    C(
      () => t.currentRoute.value.path,
      (_) => (r.value = _)
    )
    const o = h(() => ee.resolveLayouts(a)),
      s = h(() => ee.resolveRouteLocale(fe.value.locales, r.value)),
      l = h(() => ee.resolveSiteLocaleData(fe.value, s.value)),
      c = h(() => ee.resolvePageFrontmatter(ie.value)),
      p = h(() => ee.resolvePageHeadTitle(ie.value, l.value)),
      u = h(() => ee.resolvePageHead(p.value, c.value, l.value)),
      d = h(() => ee.resolvePageLang(ie.value)),
      m = h(() => ee.resolvePageLayout(ie.value, o.value))
    return (
      e.provide(wn, o),
      e.provide(Oa, c),
      e.provide(Cn, p),
      e.provide(Ia, u),
      e.provide(Pa, d),
      e.provide(Da, m),
      e.provide(Et, s),
      e.provide(wa, l),
      Object.defineProperties(e.config.globalProperties, {
        $frontmatter: { get: () => c.value },
        $head: { get: () => u.value },
        $headTitle: { get: () => p.value },
        $lang: { get: () => d.value },
        $page: { get: () => ie.value },
        $routeLocale: { get: () => s.value },
        $site: { get: () => fe.value },
        $siteLocale: { get: () => l.value },
        $withBase: { get: () => pe }
      }),
      { layouts: o, pageData: ie, pageFrontmatter: c, pageHead: u, pageHeadTitle: p, pageLang: d, pageLayout: m, routeLocale: s, siteData: fe, siteLocaleData: l }
    )
  },
  Ll = () => {
    const e = Vn(),
      t = Aa(),
      a = O([]),
      r = () => {
        e.value.forEach((s) => {
          const l = yl(s)
          l && a.value.push(l)
        })
      },
      o = () => {
        ;(document.documentElement.lang = t.value),
          a.value.forEach((s) => {
            s.parentNode === document.head && document.head.removeChild(s)
          }),
          a.value.splice(0, a.value.length),
          e.value.forEach((s) => {
            const l = Tl(s)
            l !== null && (document.head.appendChild(l), a.value.push(l))
          })
      }
    ya(Mn, o),
      F(() => {
        r(),
          o(),
          C(
            () => e.value,
            () => o()
          )
      })
  },
  yl = ([e, t, a = '']) => {
    const r = Object.entries(t)
        .map(([c, p]) => (z(p) ? `[${c}=${JSON.stringify(p)}]` : p === !0 ? `[${c}]` : ''))
        .join(''),
      o = `head > ${e}${r}`
    return Array.from(document.querySelectorAll(o)).find((c) => c.innerText === a) || null
  },
  Tl = ([e, t, a]) => {
    if (!z(e)) return null
    const r = document.createElement(e)
    return (
      je(t) &&
        Object.entries(t).forEach(([o, s]) => {
          z(s) ? r.setAttribute(o, s) : s === !0 && r.setAttribute(o, '')
        }),
      z(a) && r.appendChild(document.createTextNode(a)),
      r
    )
  },
  Rl = Rn,
  Ol = async () => {
    var a
    const e = Rl({
        name: 'VuepressApp',
        setup() {
          var r
          Ll()
          for (const o of Fe) (r = o.setup) == null || r.call(o)
          return () => [n(In), ...Fe.flatMap(({ rootComponents: o = [] }) => o.map((s) => n(s)))]
        }
      }),
      t = gl()
    bl(e), El(e, t, Fe)
    for (const r of Fe) await ((a = r.enhance) == null ? void 0 : a.call(r, { app: e, router: t, siteData: fe }))
    return e.use(t), { app: e, router: t }
  }
Ol().then(({ app: e, router: t }) => {
  t.isReady().then(() => {
    e.mount('#app')
  })
})
export { Ol as createVueApp }
