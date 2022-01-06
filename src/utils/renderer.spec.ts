import { DefaultRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { SimpleRenderer } from '@renderer/simple.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'
import { getRenderer } from '@utils/renderer'

describe('renderers', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return default renderer', async () => {
    expect(getRenderer('default').renderer.name).toEqual(DefaultRenderer.name)
  })

  it('should return simple renderer', async () => {
    expect(getRenderer('simple').renderer.name).toEqual(SimpleRenderer.name)
  })

  it('should return default renderer', async () => {
    expect(getRenderer('verbose').renderer.name).toEqual(VerboseRenderer.name)
  })

  it('should return silent renderer', async () => {
    expect(getRenderer('silent').renderer.name).toEqual(SilentRenderer.name)
  })

  // it('should return verbose renderer if non-tty', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => false)
  //     }
  //   })
  //
  //   const { getRenderer } = await import('@utils/renderer')
  //
  //   expect(getRenderer('default', 'verbose').renderer.name).toEqual(VerboseRenderer.name)
  // })
  //
  // it('should evaluate the fallback and return fallback renderer', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRenderer } = await import('@utils/renderer')
  //
  //   expect(getRenderer('default', 'verbose', 3 > 0).renderer.name).toEqual(VerboseRenderer.name)
  // })
  //
  // it('should evaluate the fallback and return default renderer', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRenderer } = jest.requireMock('@utils/renderer')
  //
  //   expect(getRenderer('default', 'verbose', 3 < 0).renderer.name).toEqual(DefaultRenderer.name)
  // })
  //
  // it('should evaluate the fallback and return the default renderer', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRenderer } = jest.requireMock('@utils/renderer')
  //
  //   expect(getRenderer('default', 'verbose', null, 0 > 3).renderer.name).toEqual(SilentRenderer.name)
  // })
  //
  // it('should evaluate the fallback and return silent renderer', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRenderer } = jest.requireMock('@utils/renderer')
  //
  //   expect(getRenderer('default', 'verbose', 0 < 3).renderer.name).toEqual(SilentRenderer.name)
  // })
  //
  // it('should return default renderer if tty', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRenderer } = await import('@utils/renderer')
  //
  //   expect(getRenderer('default', 'verbose').renderer.name).toEqual(DefaultRenderer.name)
  // })
  //
  // it('should return selected renderer if tty', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRenderer } = await import('@utils/renderer')
  //
  //   expect(getRenderer('simple', 'verbose').renderer.name).toEqual(SimpleRenderer.name)
  // })
  //
  // it('should return default renderer when no renderer by that name exists', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRendererClass } = await import('@utils/renderer')
  //
  //   expect(getRendererClass('does-not-exists' as any).name).toEqual(DefaultRenderer.name)
  // })
  //
  // it('should return the given renderer class verbose if specified', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRendererClass } = await import('@utils/renderer')
  //
  //   expect(getRendererClass('verbose' as any).name).toEqual(VerboseRenderer.name)
  // })
  //
  // it('should return the given renderer class simple if specified', async () => {
  //   jest.doMock('@utils/renderer', () => {
  //     const originalModule = jest.requireActual('@utils/renderer')
  //
  //     // Mock the default export and named export 'foo'
  //     return {
  //       // eslint-disable-next-line @typescript-eslint/naming-convention
  //       __esModule: true,
  //       ...originalModule,
  //       isRendererSupported: jest.fn(() => true)
  //     }
  //   })
  //
  //   const { getRendererClass } = await import('@utils/renderer')
  //
  //   expect(getRendererClass('simple' as any).name).toEqual(SimpleRenderer.name)
  // })
})
