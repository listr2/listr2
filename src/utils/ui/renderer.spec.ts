import { getRenderer } from './renderer'
import { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'

describe('renderers', () => {
  process.stdout.isTTY = true

  it('should return default renderer', () => {
    expect(getRenderer('default').renderer.name).toEqual(DefaultRenderer.name)
  })

  it('should return simple renderer', () => {
    expect(getRenderer('simple').renderer.name).toEqual(SimpleRenderer.name)
  })

  it('should return verbose renderer', () => {
    expect(getRenderer('verbose').renderer.name).toEqual(VerboseRenderer.name)
  })

  it('should return test renderer', () => {
    expect(getRenderer('test').renderer.name).toEqual(TestRenderer.name)
  })

  it('should return silent renderer', () => {
    expect(getRenderer('silent').renderer.name).toEqual(SilentRenderer.name)
  })
})
