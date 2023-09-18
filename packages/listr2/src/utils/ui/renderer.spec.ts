import { getRendererClass } from './renderer'
import { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'

describe('renderers', () => {
  process.stdout.isTTY = true

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
})
