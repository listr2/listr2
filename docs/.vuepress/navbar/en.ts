import { navbar } from 'vuepress-theme-hope'

export const enNavbar = navbar([
  '/',
  {
    text: 'Repository',
    icon: 'discover',
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
    text: 'API',
    link: '/api'
  }
])
