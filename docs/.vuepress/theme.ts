/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { hopeTheme } from 'vuepress-theme-hope'

import { enNavbar } from './navbar/index.js'
import { enSidebar } from './sidebar/index.js'

export default hopeTheme({
  hostname: 'https://listr2.kilic.dev',

  author: {
    name: 'Cenk Kılıç',
    url: 'https://cenk.kilic.dev',
    email: 'cenk@kilic.dev'
  },

  navbarAutoHide: 'none',

  repo: 'cenk1cenk2/listr2',

  footer: '<a href="https://kilic.dev">kilic.dev</a>',
  copyright: '<a href="https://github.com/cenk1cenk2/listr2/blob/master/LICENSE">MIT LICENSE</a>',

  displayFooter: true,

  mobileBreakPoint: 959,
  wideBreakPoint: 1920,

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
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: [ 'ts', 'vue' ]
      },
      presentation: {
        plugins: [ 'highlight', 'math', 'search', 'notes', 'zoom' ]
      },
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em') {
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended'
              }
            }
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true
    },

    autoCatalog: true
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
