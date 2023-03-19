import { navbar } from 'vuepress-theme-hope'

export const enNavbar = navbar([
  '/',
  {
    text: 'documentation',
    icon: 'discover',
    link: '/getting-started/installation.html'
  },
  {
    text: 'foreword',
    icon: 'discover',
    link: '/repository/foreword.html'
  },
  {
    text: '',
    icon: 'simple-icons:npm',
    link: 'https://www.npmjs.com/package/listr2'
  },
  {
    text: '',
    icon: 'vscode-icons:file-type-gitlab',
    link: 'https://gitlab.kilic.dev/libraries/listr2/-/pipelines'
  }
])
