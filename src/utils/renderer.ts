import { SupportedRenderer } from './renderer.interface'
import { ListrRendererFactory, ListrRendererValue } from '@interfaces/listr.interface'
import { DefaultRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'

const renderers = {
  default: DefaultRenderer,
  verbose: VerboseRenderer,
  silent: SilentRenderer
}

function isRendererSupported (renderer: ListrRendererFactory): boolean {
  return process.stdout.isTTY === true || renderer.nonTTY === true
}

function getRendererClass (renderer: ListrRendererValue): ListrRendererFactory {
  if (typeof renderer === 'string') {
    return renderers[renderer] || renderers.default
  }

  return typeof renderer === 'function' ? renderer : renderers.default
}

export function getRenderer (renderer: ListrRendererValue, fallbackRenderer?: ListrRendererValue): SupportedRenderer {
  let returnValue: SupportedRenderer
  let ret = getRendererClass(renderer)
  returnValue = { renderer: ret, nonTTY: false }

  if (!isRendererSupported(ret)) {
    ret = getRendererClass(fallbackRenderer)
    returnValue = { renderer: ret, nonTTY: true }
  }

  return returnValue
}
