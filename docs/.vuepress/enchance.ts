/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { StylizeOptions } from 'vuepress-plugin-md-enhance'

export const STYLIZE: StylizeOptions = [
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
  },
  {
    matcher: 'Listr',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/api/classes/Listr.html', target: '_blank' }
        }
      }
    }
  },
  {
    matcher: 'Task',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/api/interfaces/ListrTask.html#properties', target: '_blank' }
        }
      }
    }
  },
  {
    matcher: 'Subtask',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/task/subtasks.html', target: '_blank' }
        }
      }
    }
  },
  {
    matcher: 'DefaultRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/default.html', target: '_blank' }
        }
      }
    }
  },
  {
    matcher: 'SimpleRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/simple.html', target: '_blank' }
        }
      }
    }
  },
  {
    matcher: 'VerboseRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/verbose.html', target: '_blank' }
        }
      }
    }
  },
  {
    matcher: 'TestRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/test.html', target: '_blank' }
        }
      }
    }
  }
]
