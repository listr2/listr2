import { ListrRendererSelection } from '@constants'
import { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'
import { getRenderer, getRendererClass } from './renderer'

describe('renderers', () => {
  const originalIsTTY = process.stdout.isTTY
  const originalMSYSTEM = process.env.MSYSTEM
  const originalComSpec = process.env.ComSpec
  const originalNpmLifecycleEvent = process.env.npm_lifecycle_event
  const originalNpmExecPath = process.env.npm_execpath
  const originalNpmUserAgent = process.env.npm_config_user_agent
  const originalPlatform = process.platform

  beforeEach(() => {
    process.stdout.isTTY = true
    delete process.env.MSYSTEM
    delete process.env.ComSpec
    delete process.env.npm_lifecycle_event
    delete process.env.npm_execpath
    delete process.env.npm_config_user_agent
  })

  afterAll(() => {
    process.stdout.isTTY = originalIsTTY
    Object.defineProperty(process, 'platform', {
      configurable: true,
      value: originalPlatform
    })

    if (originalMSYSTEM === undefined) {
      delete process.env.MSYSTEM
    } else {
      process.env.MSYSTEM = originalMSYSTEM
    }

    if (originalComSpec === undefined) {
      delete process.env.ComSpec
    } else {
      process.env.ComSpec = originalComSpec
    }

    if (originalNpmLifecycleEvent === undefined) {
      delete process.env.npm_lifecycle_event
    } else {
      process.env.npm_lifecycle_event = originalNpmLifecycleEvent
    }

    if (originalNpmExecPath === undefined) {
      delete process.env.npm_execpath
    } else {
      process.env.npm_execpath = originalNpmExecPath
    }

    if (originalNpmUserAgent === undefined) {
      delete process.env.npm_config_user_agent
    } else {
      process.env.npm_config_user_agent = originalNpmUserAgent
    }
  })

  it('should return default renderer', () => {
    expect(getRendererClass('default').name).toEqual(DefaultRenderer.name)
  })

  it('should return simple renderer', () => {
    expect(getRendererClass('simple').name).toEqual(SimpleRenderer.name)
  })

  it('should return verbose renderer', () => {
    expect(getRendererClass('verbose').name).toEqual(VerboseRenderer.name)
  })

  it('should return test renderer', () => {
    expect(getRendererClass('test').name).toEqual(TestRenderer.name)
  })

  it('should return silent renderer', () => {
    expect(getRendererClass('silent').name).toEqual(SilentRenderer.name)
  })

  it('should fallback to secondary renderer in git bash on windows when bridged through npm cmd shell', () => {
    Object.defineProperty(process, 'platform', {
      configurable: true,
      value: 'win32'
    })
    process.env.MSYSTEM = 'MINGW64'
    process.env.ComSpec = 'C:\\Windows\\System32\\cmd.exe'
    process.env.npm_lifecycle_event = 'lint'

    const renderer = getRenderer({
      renderer: 'default',
      rendererOptions: undefined,
      fallbackRenderer: 'simple',
      fallbackRendererOptions: undefined
    })

    expect(renderer.selection).toEqual(ListrRendererSelection.SECONDARY)
    expect(renderer.renderer.name).toEqual(SimpleRenderer.name)
  })

  it('should keep primary renderer in git bash on windows when not running via npm cmd bridge', () => {
    Object.defineProperty(process, 'platform', {
      configurable: true,
      value: 'win32'
    })
    process.env.MSYSTEM = 'MINGW64'

    const renderer = getRenderer({
      renderer: 'default',
      rendererOptions: undefined,
      fallbackRenderer: 'simple',
      fallbackRendererOptions: undefined
    })

    expect(renderer.selection).toEqual(ListrRendererSelection.PRIMARY)
    expect(renderer.renderer.name).toEqual(DefaultRenderer.name)
  })

  it('should keep primary renderer in non-git-bash environment', () => {
    Object.defineProperty(process, 'platform', {
      configurable: true,
      value: 'win32'
    })
    delete process.env.MSYSTEM

    const renderer = getRenderer({
      renderer: 'default',
      rendererOptions: undefined,
      fallbackRenderer: 'simple',
      fallbackRendererOptions: undefined
    })

    expect(renderer.selection).toEqual(ListrRendererSelection.PRIMARY)
    expect(renderer.renderer.name).toEqual(DefaultRenderer.name)
  })
})
