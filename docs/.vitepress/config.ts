import footnote from 'markdown-it-footnote'
import taskLists from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

import { LINK } from './link.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'listr2',
  mpa: false,
  description: 'Documentation website for npm package of listr2.',
  lastUpdated: true,
  // included files go crazy with the links inside of them
  ignoreDeadLinks: true,
  outDir: 'dist/',
  head: [ [ 'link', { rel: 'icon', href: 'https://main.s3.kilic.dev/html/favicon.ico' } ] ],
  lang: 'en-US',
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    }
  },
  sitemap: {
    hostname: 'https://listr2.kilic.dev'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: `
<img src="https://main.s3.kilic.dev/html/icon.png" style="max-height: 16px;" />
<a href="https://kilic.dev" target="_blank">kilic.dev</a>
<br/>
<small>Made with <a href="https://vitepress.dev/" target="_blank">Vitepress</a>.</small>
`
    },
    lastUpdated: { formatOptions: { hour12: false } },
    search: {
      provider: 'algolia',
      options: {
        appId: '4G64M4W5QP',
        apiKey: '4cdadab526edbb306f6fb0d195f634e6',
        indexName: 'listr2'
      }
    },
    editLink: {
      pattern: 'https://github.com/listr2/listr2/edit/master/docs/:path'
    },
    nav: [
      {
        text: 'Repository',
        link: '/repository/foreword.html'
      },
      {
        text: 'Listr',
        link: '/listr/listr.html'
      },
      {
        text: 'Task',
        link: '/task/task.html'
      },
      {
        text: 'Renderer',
        link: '/renderer/renderer.html'
      },
      {
        text: 'Migration',
        link: '/migration/'
      },
      {
        text: 'API',
        link: '/api/'
      }
    ],

    sidebar: generateSidebar({
      documentRootPath: '/',
      useTitleFromFrontmatter: true,
      sortMenusByFrontmatterOrder: true,
      capitalizeFirst: true,
      collapsed: true,
      excludeFolders: [ 'node_modules' ],
      excludeFiles: [ 'format.md' ],
      manualSortFileNameByPriority: [ 'repository', 'listr', 'task', 'renderer', 'migration', 'api' ]
    }) as any,
    socialLinks: [ { icon: 'github', link: 'https://github.com/listr2/listr2' } ]
  },

  markdown: {
    lineNumbers: true,
    config: (md) => {
      // use more markdown-it plugins!
      md.use(footnote).use(taskLists)

      md.renderer.rules.em_open = (tokens, i, options, _env, self): string => {
        const open = tokens[i]
        const next = tokens[i + 1]
        const close = tokens[i + 2]
        const match = next.type === 'text' && LINK.find((link) => link.content === next.content)

        if (match) {
          open.tag = 'a'
          close.tag = 'a'
          open.attrs = [ [ 'href', match.href ] ]
        }

        return self.renderToken(tokens, i, options)
      }
    }
  },
  vite: {
    clearScreen: false
  }
})
