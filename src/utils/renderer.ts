import { SupportedRenderer } from './renderer.interface'
import { ListrRendererFactory, ListrRendererValue, ListrOptions } from '@interfaces/listr.interface'
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

export function getRenderer (renderer: ListrRendererValue, fallbackRenderer?: ListrRendererValue, fallbackCondition?: ListrOptions['rendererFallback']): SupportedRenderer {
  let returnValue: SupportedRenderer
  let ret = getRendererClass(renderer)

  returnValue = { renderer: ret, nonTTY: false }

  let evaluateFallback: boolean
  if (typeof fallbackCondition === 'function') {
    evaluateFallback = fallbackCondition()
  } else {
    evaluateFallback = fallbackCondition
  }

  if (!isRendererSupported(ret) || evaluateFallback) {
    ret = getRendererClass(fallbackRenderer)
    returnValue = { renderer: ret, nonTTY: true }
  }

  return returnValue
}
