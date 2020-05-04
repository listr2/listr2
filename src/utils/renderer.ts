import { ListrRendererClass, ListrRendererValue } from '@interfaces/listr.interface'
import { MultiLineRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'

const renderers = {
  default: MultiLineRenderer,
  verbose: VerboseRenderer,
  silent: SilentRenderer
}

function isRendererSupported (renderer: ListrRendererClass): boolean {
  return process.stdout.isTTY === true || renderer.nonTTY === true
}

function getRendererClass (renderer: ListrRendererValue): ListrRendererClass {
  if (typeof renderer === 'string') {
    return renderers[renderer] || renderers.default
  }

  return typeof renderer === 'function' ? renderer : renderers.default
}

export function getRenderer (renderer: ListrRendererValue, fallbackRenderer?: ListrRendererValue): ListrRendererClass {
  let ret = getRendererClass(renderer)

  if (!isRendererSupported(ret)) {
    ret = getRendererClass(fallbackRenderer)
  }

  return ret
}
