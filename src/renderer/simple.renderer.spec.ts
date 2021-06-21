import {
  ListrEvent,
  ListrTaskWrapper,
  ListrContext,
  ListrTaskState,
  ListrEventType
} from 'listr2'
import { stderr as logUpdate } from 'log-update'
import { Subject } from 'rxjs'

import { SimpleRenderer } from './simple.renderer'
import colorette from '@root/utils/colorette'
import { figures } from '@root/utils/figures'

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
  beforeEach(()=> jest.clearAllMocks())

  describe('constructor', () => {
    it('Should accept options', () => {
      const res = new SimpleRenderer([ { foo: 'bar' } ] as never, {
        prefixWithTimestamp: true
      })

      expect(res.tasks).toEqual([ { foo: 'bar' } ])
      expect(res.options).toEqual({ prefixWithTimestamp: true })
    })
  })

  describe('now', () => {
    it('Shdould return new Date', () => {
      expect(SimpleRenderer.now()).toBeInstanceOf(Date)
    })
  })

  describe('formatTitle', () => {
    it('Shdould return empty string', () => {
      expect(SimpleRenderer.formatTitle()).toEqual('')
      expect(SimpleRenderer.formatTitle({} as never)).toEqual('')
      expect(SimpleRenderer.formatTitle({ title: '' } as never)).toEqual('')
    })
    it('Shdould return formatted title', () => {
      expect(SimpleRenderer.formatTitle({ title: 'the Foo' } as never)).toEqual(
        ' the Foo'
      )
    })
  })

  describe('log', () => {
    it('Shoudl simply log', () => {
      const stderrSpy = jest
        .spyOn(process.stderr, 'write')
        .mockImplementation()

      const sut = new SimpleRenderer([], {})

      sut.log('the foo')

      expect(stderrSpy).toHaveBeenCalledWith('the foo\n')

      stderrSpy.mockRestore()
    })

    it('Should add timestamp', () => {
      const stderrSpy = jest
        .spyOn(process.stderr, 'write')
        .mockImplementation()

      const sut = new SimpleRenderer([], { prefixWithTimestamp: true })
      SimpleRenderer.now = nowMock

      sut.log('the foo\n')

      expect(stderrSpy).toHaveBeenCalledWith(`${colorette.dim('[20:45:34]')} the foo\n`)

      stderrSpy.mockRestore()
    })
  })

  describe('render', () => {
    it('Should render tasks', () => {
      const taskMock = getListrObject()

      const sut = new SimpleRenderer([ taskMock as any ], {})
      sut.eventTypeRendererMap[ListrEventType.ENABLED] = jest.fn()
      sut.render()

      taskMock.next({ type: ListrEventType.ENABLED, data: 'foo' })

      expect(
        sut.eventTypeRendererMap[ListrEventType.ENABLED]
      ).toHaveBeenCalledWith(taskMock, {
        type: ListrEventType.ENABLED,
        data: 'foo'
      })
    })

    it('Should handle missing handler', () => {
      const taskMock = getListrObject()
      let renderHandler: (value: ListrEvent) => void
      taskMock.subscribe = jest.fn((handler) => {
        renderHandler = handler
      }) as any

      const sut = new SimpleRenderer([ taskMock as any ], {})
      delete sut.eventTypeRendererMap[ListrEventType.ENABLED]
      sut.render()

      expect(() =>
        renderHandler({ type: ListrEventType.ENABLED, data: 'foo' })
      ).not.toThrow()
    })

    it('Should render error', () => {
      const taskMock = getListrObject()

      const sut = new SimpleRenderer([ taskMock as any ], {})
      sut.log = jest.fn()
      sut.render()

      taskMock.error(new Error('the foo'))

      expect(sut.log).toHaveBeenCalledWith(Error('the foo'))
    })
  })

  describe('end', () => {
    it('should do nothing', () => {
      expect(new SimpleRenderer([], {}).end).not.toThrow()
    })
  })

  describe('eventTypeRendererMap.SUBTASK', () => {
    const sut = new SimpleRenderer([], {})
    sut.log = jest.fn()
    const event: ListrEvent = { type: ListrEventType.SUBTASK }

    it('Should not render', () => {
      const taskMock = getListrObject()

      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).not.toHaveBeenCalled()
    })

    it('Should render title', () => {
      const taskMock = getListrObject()
      taskMock.hasTitle.mockReturnValue(true)

      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).toHaveBeenCalledWith(`${colorette.magentaBright('❯')} foo`)
    })

    it('Should render subtask', () => {
      const taskMock = getListrObject()
      const subTaskMock = getListrObject()

      taskMock.hasSubtasks.mockReturnValue(true)
      taskMock.subtasks = [ subTaskMock as never ]

      sut.eventTypeRendererMap[ListrEventType.ENABLED] = jest.fn()
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)
      subTaskMock.next({ type: ListrEventType.ENABLED, data: 'the sub foo' })

      expect(sut.log).not.toHaveBeenCalled()
      expect(
        sut.eventTypeRendererMap[ListrEventType.ENABLED]
      ).toHaveBeenCalledWith(subTaskMock, {
        type: ListrEventType.ENABLED,
        data: 'the sub foo'
      })
    })
  })

  describe('eventTypeRendererMap.STATE', () => {
    const sut = new SimpleRenderer([], {})
    sut.log = jest.fn()
    const event: ListrEvent = { type: ListrEventType.STATE }

    it('Should not render if pending', () => {
      const taskMock = getListrObject()
      taskMock.hasTitle.mockReturnValue(true)
      taskMock.isPending.mockReturnValue(true)

      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).not.toHaveBeenCalled()
    })

    it('Should render if conplete', () => {
      const taskMock = getListrObject()
      taskMock.hasTitle.mockReturnValue(true)
      taskMock.isSkipped.mockReturnValue(false)
      taskMock.isPending.mockReturnValue(false)

      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).toHaveBeenCalledWith(`${colorette.green('✔')} foo`)
    })
  })

  describe('eventTypeRendererMap.DATA', () => {
    const sut = new SimpleRenderer([], {})
    sut.log = jest.fn()
    const event: ListrEvent = { type: ListrEventType.DATA, data: 'the data' }

    it('Should not render if prompt and newLine', () => {
      const taskMock = getListrObject()
      taskMock.isPrompt.mockReturnValue(true)

      event.data = '\n'
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(logUpdateMock).not.toHaveBeenCalled()
      expect(sut.log).toHaveBeenCalledWith('  \n')
    })

    it('Should render updating', () => {
      const taskMock = getListrObject()
      taskMock.isPrompt.mockReturnValue(true)

      event.data = 'the prompt'
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).not.toHaveBeenCalled()
      expect(logUpdateMock).toHaveBeenCalledWith('the prompt')
    })

    it('Should render non updating', () => {
      const taskMock = getListrObject()
      taskMock.isPrompt.mockReturnValue(false)

      event.data = 'the data'
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(logUpdateMock).not.toHaveBeenCalled()
      expect(sut.log).toHaveBeenCalledWith('  the data')
    })
  })

  describe('eventTypeRendererMap.Message', () => {
    const sut = new SimpleRenderer([], {})
    sut.log = jest.fn()
    const event: ListrEvent = { type: ListrEventType.MESSAGE, data: {} }

    it('Should not render', () => {
      const taskMock = getListrObject()

      event.data = {}
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).not.toHaveBeenCalled()
    })

    it('Should render error', () => {
      const taskMock = getListrObject()

      event.data = { error: 'the foo err' }
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).toHaveBeenCalledWith(`${colorette.red(figures.warning)} foo: the foo err`)
    })

    it('Should render skip', () => {
      const taskMock = getListrObject()

      event.data = { skip: 'the foo skip' }
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      taskMock.title = 'the foo skip'
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).toHaveBeenNthCalledWith(1,
        `${colorette.yellow(figures.arrowDown)} foo [${colorette.yellow('skipped: the foo skip')}]`
      )
      expect(sut.log).toHaveBeenNthCalledWith(2,
        `${colorette.yellow(figures.arrowDown)} the foo skip [${colorette.yellow('skipped')}]`
      )

    })

    it('Should render rollback', () => {
      const taskMock = getListrObject()

      event.data = { rollback: 'the foo roolback' }
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).toHaveBeenCalledWith(
        `${colorette.red(figures.arrowLeft)} foo: the foo roolback`
      )
    })

    it('Should render retry', () => {
      const taskMock = getListrObject()

      event.data = { retry: { count: 6 } }
      sut.eventTypeRendererMap[event.type]?.(taskMock as any, event)

      expect(sut.log).toHaveBeenCalledWith('[6] foo')
    })
  })
})
