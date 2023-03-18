import type { ListrOptions } from '@interfaces/listr.interface'
import type { SupportedRenderer, ListrRendererFactory, ListrRendererValue, ListrRenderer } from '@interfaces/renderer.interface'
import { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'
import { assertFunctionOrSelf } from '@utils/assert'

const RENDERERS: Record<'default' | 'simple' | 'verbose' | 'test' | 'silent', typeof ListrRenderer> = {
  default: DefaultRenderer,
  simple: SimpleRenderer,
  verbose: VerboseRenderer,
  test: TestRenderer,
  silent: SilentRenderer
}

function isRendererSupported (renderer: ListrRendererFactory): boolean {
  return process.stdout.isTTY === true || renderer.nonTTY === true
}

export function getRendererClass (renderer: ListrRendererValue): ListrRendererFactory {
  if (typeof renderer === 'string') {
    return RENDERERS[renderer] ?? RENDERERS.default
  }

  return typeof renderer === 'function' ? renderer : RENDERERS.default
}

export function getRenderer (
  renderer: ListrRendererValue,
  fallbackRenderer?: ListrRendererValue,
  fallbackCondition?: ListrOptions['rendererFallback'],
  silentCondition?: ListrOptions['rendererSilent']
): SupportedRenderer {
  if (assertFunctionOrSelf(silentCondition)) {
    return { renderer: getRendererClass('silent'), isFallbackRenderer: true }
  }

  const r: SupportedRenderer = { renderer: getRendererClass(renderer), isFallbackRenderer: false }

  if (!isRendererSupported(r.renderer) || assertFunctionOrSelf(fallbackCondition)) {
    return { renderer: getRendererClass(fallbackRenderer), isFallbackRenderer: true }
  }

  return r
}
