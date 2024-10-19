import { ListrRendererSelection } from '@constants'
import type { ListrGetRendererOptions, ListrOptions, ListrRenderer, ListrRendererFactory, ListrRendererValue, SupportedRenderer } from '@interfaces'
import { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'
import { assertFunctionOrSelf } from '@utils'

const RENDERERS: Record<'default' | 'simple' | 'verbose' | 'test' | 'silent', typeof ListrRenderer> = {
  default: DefaultRenderer,
  simple: SimpleRenderer,
  verbose: VerboseRenderer,
  test: TestRenderer,
  silent: SilentRenderer
}

function isRendererSupported(renderer: ListrRendererFactory): boolean {
  return process.stdout.isTTY === true || renderer.nonTTY === true
}

export function getRendererClass(renderer: ListrRendererValue): ListrRendererFactory {
  if (typeof renderer === 'string') {
    return RENDERERS[renderer] ?? RENDERERS.default
  }

  return typeof renderer === 'function' ? renderer : RENDERERS.default
}

export function getRenderer<Renderer extends ListrRendererValue, FallbackRenderer extends ListrRendererValue>(options: {
  renderer: Renderer
  rendererOptions: ListrGetRendererOptions<Renderer>
  fallbackRenderer: FallbackRenderer
  fallbackRendererOptions: ListrGetRendererOptions<FallbackRenderer>
  fallbackRendererCondition?: ListrOptions['fallbackRendererCondition']
  silentRendererCondition?: ListrOptions['silentRendererCondition']
}): SupportedRenderer<ListrRendererFactory> {
  if (assertFunctionOrSelf(options?.silentRendererCondition)) {
    return { renderer: getRendererClass('silent'), selection: ListrRendererSelection.SILENT }
  }

  const r: SupportedRenderer<ListrRendererFactory> = {
    renderer: getRendererClass(options.renderer),
    options: options.rendererOptions,
    selection: ListrRendererSelection.PRIMARY
  }

  if (!isRendererSupported(r.renderer) || assertFunctionOrSelf(options?.fallbackRendererCondition)) {
    return {
      renderer: getRendererClass(options.fallbackRenderer),
      options: options.fallbackRendererOptions,
      selection: ListrRendererSelection.SECONDARY
    }
  }

  return r
}
