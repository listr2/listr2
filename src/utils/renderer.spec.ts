/* eslint-disable no-underscore-dangle */
import rewire from 'rewire'

import { MultiLineRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'
import { getRenderer } from '@utils/renderer'

describe('renderers', () => {

  it('should return default renderer', async () => {
    expect(getRenderer('default').renderer.name).toEqual(MultiLineRenderer.name)
  })

  it('should return default renderer', async () => {
    expect(getRenderer('verbose').renderer.name).toEqual(VerboseRenderer.name)
  })

  it('should return silent renderer', async () => {
    expect(getRenderer('silent').renderer.name).toEqual(SilentRenderer.name)
  })

  it('should return verbose renderer if non-tty', async () => {
    const renderer = rewire('@utils/renderer')

    renderer.__set__('isRendererSupported', jest.fn(() => false))

    expect(renderer.__get__('getRenderer')('default', 'verbose').renderer.name).toEqual(VerboseRenderer.name)
    expect(renderer.__get__('isRendererSupported')).toBeCalledTimes(1)
  })

  it('should return default renderer if tty', async () => {
    const renderer = rewire('@utils/renderer')

    renderer.__set__('isRendererSupported', jest.fn(() => true))

    expect(renderer.__get__('getRenderer')('default', 'verbose').renderer.name).toEqual(MultiLineRenderer.name)
    expect(renderer.__get__('isRendererSupported')).toBeCalledTimes(1)
  })

  it('should return default renderer when no renderer by that name exists', async () => {
    const renderer = rewire('@utils/renderer')

    expect(renderer.__get__('getRendererClass')('does-not-exists').name).toEqual(MultiLineRenderer.name)
  })

  it('should return default renderer when renderer by that name exists', async () => {
    const renderer = rewire('@utils/renderer')

    expect(renderer.__get__('getRendererClass')('verbose').name).toEqual(VerboseRenderer.name)
  })

  it('should return the given renderer class if specified', async () => {
    const renderer = rewire('@utils/renderer')

    expect(renderer.__get__('getRendererClass')(VerboseRenderer).name).toEqual(VerboseRenderer.name)
  })
})