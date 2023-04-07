/* eslint-disable @typescript-eslint/naming-convention */
import { sidebar } from 'vuepress-theme-hope'

export const enSidebar = sidebar({
  '/': [
    '',
    {
      text: 'Repository',
      icon: 'mdi:git',
      prefix: 'repository/',
      children: 'structure'
    },
    {
      text: 'Listr',
      prefix: 'listr/',
      children: 'structure',
      collapsible: true
    },
    {
      text: 'Task',
      prefix: 'task/',
      children: 'structure',
      collapsible: true
    },
    {
      text: 'Renderer',
      prefix: 'renderer/',
      children: 'structure',
      collapsible: true
    },
    {
      text: 'Migration',
      prefix: 'migration/',
      children: 'structure',
      collapsible: true
    },
    {
      text: 'API',
      icon: 'eos-icons:api-outlined',
      prefix: 'api/',
      children: 'structure',
      collapsible: true
    }
  ]
})
