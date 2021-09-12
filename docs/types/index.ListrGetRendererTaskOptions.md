# Type alias: ListrGetRendererTaskOptions<T\>

[index](../modules/index.md).ListrGetRendererTaskOptions

Ƭ **ListrGetRendererTaskOptions**<`T`\>: `T` extends [`ListrDefaultRendererValue`](index.ListrDefaultRendererValue.md) ? [`ListrDefaultRenderer`](index.ListrDefaultRenderer.md)[``"rendererTaskOptions"``] : `T` extends [`ListrSimpleRendererValue`](index.ListrSimpleRendererValue.md) ? [`ListrSimpleRenderer`](index.ListrSimpleRenderer.md) : `T` extends [`ListrFallbackRendererValue`](index.ListrFallbackRendererValue.md) ? [`ListrFallbackRenderer`](index.ListrFallbackRenderer.md)[``"rendererTaskOptions"``] : `T` extends [`ListrSilentRenderer`](index.ListrSilentRenderer.md) ? [`ListrSilentRenderer`](index.ListrSilentRenderer.md)[``"rendererTaskOptions"``] : `T` extends [`ListrRendererFactory`](index.ListrRendererFactory.md) ? `T`[``"rendererTaskOptions"``] : `never`

Returns renderer per task options depending on the renderer type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListrRendererValue`](index.ListrRendererValue.md) |

#### Defined in

[src/interfaces/renderer.interface.ts:79](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/renderer.interface.ts#L79)
