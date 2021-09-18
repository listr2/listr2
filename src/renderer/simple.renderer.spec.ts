import { stderr as logUpdate } from 'log-update'
import { EOL } from 'os'
import { Subject } from 'rxjs'

import { SimpleRenderer } from './simple.renderer'
import { ListrTaskEventType } from '@constants/event.constants'
import { ListrTaskState } from '@constants/state.constants'
import { ListrContext, ListrEvent } from '@interfaces/listr.interface'
import { ListrTaskWrapper } from '@interfaces/task.interface'

jest.mock('log-update')

const nowMock = jest.fn<Date, any[]>().mockReturnValue(new Date(8273648734628))
const logUpdateMock = logUpdate as jest.MockedFunction<typeof logUpdate>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getListrObject () {
  return Object.assign(new Subject<ListrEvent>(), {
    isPending: jest.fn().mockReturnValue(false),
    isSkipped: jest.fn().mockReturnValue(false),
    isCompleted: jest.fn().mockReturnValue(false),
    isEnabled: jest.fn().mockReturnValue(true),
    check: jest.fn(),
    task: jest.fn(),
    skip: jest.fn().mockReturnValue(false),
    isPrompt: jest.fn().mockReturnValue(false),
    hasTitle: jest.fn().mockReturnValue(false),
    hasSubtasks: jest.fn().mockReturnValue(false),
    hasFailed: jest.fn().mockReturnValue(false),
    run: jest.fn().mockResolvedValue(undefined),
    title: 'foo',
    output: 'none',
    state: ListrTaskState.COMPLETED,
    subtasks: [] as ListrTaskWrapper<ListrContext, typeof SimpleRenderer>[]
  })
}

describe('SimpleRenderer', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('now', () => {
    it('should return new Date', () => {
      expect(SimpleRenderer.now()).toBeInstanceOf(Date)
    })
  })

  describe('formatTitle', () => {
    it('should return empty string', () => {
      expect(SimpleRenderer.formatTitle()).toEqual('')
      expect(SimpleRenderer.formatTitle({} as never)).toEqual('')
      expect(SimpleRenderer.formatTitle({ title: '' } as never)).toEqual('')
    })

    it('should return formatted title', () => {
      expect(SimpleRenderer.formatTitle({ title: 'the Foo' } as never)).toEqual(' the Foo')
    })
  })

  describe('log', () => {
    it.each<'stdout' | 'stderr'>([ 'stdout', 'stderr' ])('should simply log', (output) => {
      const spy = jest.spyOn(process[output], 'write').mockImplementation()

      const renderer = new SimpleRenderer([], { output })

      renderer.log('the foo')

      expect(spy).toHaveBeenCalledWith(expect.stringContaining('the foo'))

      spy.mockRestore()
    })

    it('should add timestamp', () => {
      const spy = jest.spyOn(process.stdout, 'write').mockImplementation()

      const renderer = new SimpleRenderer([], { prefixWithTimestamp: true })
      SimpleRenderer.now = nowMock

      renderer.log('the foo\n')

      expect(spy).toHaveBeenCalledWith(expect.stringMatching(/\[[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\] the foo/))

      spy.mockRestore()
    })
  })

  describe('render', () => {
    it('should render tasks', () => {
      const taskMock = getListrObject()

      const renderer = new SimpleRenderer([ taskMock as any ], {})
      renderer.eventTypeRendererMap[ListrTaskEventType.ENABLED] = jest.fn()
      renderer.render()

      taskMock.next({ type: ListrTaskEventType.ENABLED, data: 'foo' })

      expect(renderer.eventTypeRendererMap[ListrTaskEventType.ENABLED]).toHaveBeenCalledWith(taskMock, {
        type: ListrTaskEventType.ENABLED,
        data: 'foo'
      })
    })

    it('should handle missing handler', () => {
      const taskMock = getListrObject()
      let renderHandler: (value: ListrEvent) => void
      taskMock.subscribe = jest.fn((handler) => {
        renderHandler = handler
      }) as any

      const renderer = new SimpleRenderer([ taskMock as any ], {})
      delete renderer.eventTypeRendererMap[ListrTaskEventType.ENABLED]
      renderer.render()

      expect(() => renderHandler({ type: ListrTaskEventType.ENABLED, data: 'foo' })).not.toThrow()
    })

    it('should render error', () => {
      const taskMock = getListrObject()

      const renderer = new SimpleRenderer([ taskMock as any ], {})
      renderer.log = jest.fn()
      renderer.render()

      taskMock.error(new Error('the foo'))

      expect(renderer.log).toHaveBeenCalledWith(new Error('the foo'))
    })
  })

  describe('end', () => {
    it('should do nothing', () => {
      expect(new SimpleRenderer([], {}).end).not.toThrow()
    })
  })

  describe('eventTypeRendererMap.SUBTASK', () => {
    const renderer = new SimpleRenderer([], {})
    renderer.log = jest.fn()
    const event: ListrEvent = { type: ListrTaskEventType.SUBTASK }

    it('should not render', () => {
      const taskMock = getListrObject()

      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).not.toHaveBeenCalled()
    })

    it('should render title', () => {
      const taskMock = getListrObject()
      taskMock.hasTitle.mockReturnValue(true)

      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).toHaveBeenCalledWith(expect.stringContaining('foo'))
    })

    it('should render subtask', () => {
      const taskMock = getListrObject()
      const subTaskMock = getListrObject()

      taskMock.hasSubtasks.mockReturnValue(true)
      taskMock.subtasks = [ subTaskMock as never ]

      renderer.eventTypeRendererMap[ListrTaskEventType.ENABLED] = jest.fn()
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)
      subTaskMock.next({ type: ListrTaskEventType.ENABLED, data: 'the sub foo' })

      expect(renderer.log).not.toHaveBeenCalled()
      expect(renderer.eventTypeRendererMap[ListrTaskEventType.ENABLED]).toHaveBeenCalledWith(subTaskMock, {
        type: ListrTaskEventType.ENABLED,
        data: 'the sub foo'
      })
    })
  })

  describe('eventTypeRendererMap.STATE', () => {
    const renderer = new SimpleRenderer([], {})
    renderer.log = jest.fn()
    const event: ListrEvent = { type: ListrTaskEventType.STATE }

    it('should not render if pending', () => {
      const taskMock = getListrObject()
      taskMock.hasTitle.mockReturnValue(true)
      taskMock.isPending.mockReturnValue(true)

      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).not.toHaveBeenCalled()
    })

    it('should render if complete', () => {
      const taskMock = getListrObject()
      taskMock.hasTitle.mockReturnValue(true)
      taskMock.isCompleted.mockReturnValue(true)

      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).toHaveBeenCalledWith(expect.stringContaining('foo'))
    })
  })

  describe('eventTypeRendererMap.DATA', () => {
    const renderer = new SimpleRenderer([], {})
    renderer.log = jest.fn()
    const event: ListrEvent = { type: ListrTaskEventType.DATA, data: 'the data' }

    it('should not render if prompt and newLine', () => {
      const taskMock = getListrObject()
      taskMock.isPrompt.mockReturnValue(true)

      event.data = EOL
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(logUpdateMock).not.toHaveBeenCalled()
      expect(renderer.log).toHaveBeenCalledWith(expect.stringContaining(EOL))
    })

    it('should render updating', () => {
      const taskMock = getListrObject()
      taskMock.isPrompt.mockReturnValue(true)

      event.data = 'the prompt'
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).not.toHaveBeenCalled()
      expect(logUpdateMock).toHaveBeenCalledWith('the prompt')
    })

    it('should render non updating', () => {
      const taskMock = getListrObject()
      taskMock.isPrompt.mockReturnValue(false)

      event.data = 'the data'
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(logUpdateMock).not.toHaveBeenCalled()
      expect(renderer.log).toHaveBeenCalledWith(expect.stringContaining('the data'))
    })
  })

  describe('eventTypeRendererMap.Message', () => {
    const renderer = new SimpleRenderer([], {})
    renderer.log = jest.fn()
    const event: ListrEvent = { type: ListrTaskEventType.MESSAGE, data: {} }

    it('should not render', () => {
      const taskMock = getListrObject()

      event.data = {}
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).not.toHaveBeenCalled()
    })

    it('should render error', () => {
      const taskMock = getListrObject()

      event.data = { error: 'the foo err' }
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).toHaveBeenCalledWith(expect.stringContaining('foo: the foo err'))
    })

    it('should render skip', () => {
      const taskMock = getListrObject()

      event.data = { skip: 'the foo skip' }
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      taskMock.title = 'the foo skip'
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).toHaveBeenNthCalledWith(1, expect.stringContaining('foo [skipped: the foo skip]'))
      expect(renderer.log).toHaveBeenNthCalledWith(2, expect.stringContaining('the foo skip [skipped]'))
    })

    it('should render rollback', () => {
      const taskMock = getListrObject()

      event.data = { rollback: 'the foo roolback' }
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).toHaveBeenCalledWith(expect.stringContaining('foo: the foo roolback'))
    })

    it('should render retry', () => {
      const taskMock = getListrObject()

      event.data = { retry: { count: 6 } }
      renderer.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(renderer.log).toHaveBeenCalledWith(expect.stringMatching(/\[6\].*foo/))
    })
  })
})
