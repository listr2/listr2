import { ListrRendererSelection } from '@constants'
import type { ListrGetRendererOptions, ListrOptions, ListrRenderer, ListrRendererFactory, ListrRendererValue, SupportedRenderer } from '@interfaces'
import { DefaultRenderer, SilentRenderer, SimpleRenderer, TestRenderer, VerboseRenderer } from '@renderer'
import { assertFunctionOrSelf } from '../assert'

function getBuiltInRenderers(): Record<'default' | 'simple' | 'verbose' | 'test' | 'silent', typeof ListrRenderer> {
  return {
    default: DefaultRenderer,
    simple: SimpleRenderer,
    verbose: VerboseRenderer,
    test: TestRenderer,
    silent: SilentRenderer
  }
}

function isNpmCmdBridgeInGitBashOnWindows(): boolean {
  if (process.platform !== 'win32') {
    return false
  }

  if (!process.env.MSYSTEM) {
    return false
  }

  const comSpec = process.env.ComSpec?.toLowerCase()
  const isCmdShell = comSpec?.endsWith('cmd.exe') ?? false
  if (!isCmdShell) {
    return false
  }

  return Boolean(process.env.npm_lifecycle_event || process.env.npm_execpath || process.env.npm_config_user_agent)
}

function isRendererSupported(renderer: ListrRendererFactory): boolean {
  if (isNpmCmdBridgeInGitBashOnWindows() && renderer.nonTTY === false) {
    return false
  }

  return process.stdout.isTTY === true || renderer.nonTTY === true
}

export function getRendererClass(renderer: ListrRendererValue): ListrRendererFactory {
  const renderers = getBuiltInRenderers()

  if (typeof renderer === 'string') {
    return renderers[renderer] ?? renderers.default
  }

  return typeof renderer === 'function' ? renderer : renderers.default
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
