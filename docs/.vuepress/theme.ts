/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { hopeTheme } from 'vuepress-theme-hope'

import { STYLIZE } from './enchance.js'
import { enNavbar } from './navbar/index.js'
import { enSidebar } from './sidebar/index.js'

export default hopeTheme({
  hostname: 'https://listr2.kilic.dev',

  navbarAutoHide: 'none',

  repo: 'listr2/listr2',

  favicon: 'https://main.s3.kilic.dev/html/favicon.ico',

  footer: `
<img src="https://main.s3.kilic.dev/html/icon.png" height="16px" style="margin-bottom: -2px;" />
<a href="https://kilic.dev" target="_blank">kilic.dev</a>
<br/>
<small>Made with <a href="https://theme-hope.vuejs.press/" target="_blank">VuePress - Mr.Hope Theme</a>.</small>
`,
  copyright: `
<a href="https://github.com/cenk1cenk2/listr2/blob/master/LICENSE">MIT LICENSE</a>
`,

  displayFooter: true,

  mobileBreakPoint: 959,
  pcBreakPoint: 1920,
  print: false,

  docsDir: 'docs/',

  locales: {
    '/': {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      metaLocales: {
        editLink: 'Edit this page on GitHub'
      }
    }
  },

  iconAssets: 'iconify',

  plugins: {
    comment: false,

    mdEnhance: {
      align: true,
      attrs: true,
      chart: false,
      codetabs: true,
      demo: true,
      echarts: false,
      figure: true,
      flowchart: false,
      gfm: true,
      footnote: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      tasklist: true,
      katex: false,
      mark: true,
      mermaid: false,
      stylize: STYLIZE,
      sub: true,
      sup: true,
      tabs: true
    }

    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
})
