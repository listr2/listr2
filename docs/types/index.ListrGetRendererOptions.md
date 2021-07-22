[listr2](../README.md) / [index](../modules/index.md) / ListrGetRendererOptions

# Type alias: ListrGetRendererOptions<T\>

[index](../modules/index.md).ListrGetRendererOptions

Ƭ **ListrGetRendererOptions**<`T`\>: `T` extends [`ListrDefaultRendererValue`](index.ListrDefaultRendererValue.md) ? [`ListrDefaultRenderer`](index.ListrDefaultRenderer.md)[``"rendererOptions"``] : `T` extends [`ListrSimpleRendererValue`](index.ListrSimpleRendererValue.md) ? [`ListrSimpleRenderer`](index.ListrSimpleRenderer.md)[``"rendererOptions"``] : `T` extends [`ListrFallbackRendererValue`](index.ListrFallbackRendererValue.md) ? [`ListrFallbackRenderer`](index.ListrFallbackRenderer.md)[``"rendererOptions"``] : `T` extends [`ListrSilentRenderer`](index.ListrSilentRenderer.md) ? [`ListrSilentRenderer`](index.ListrSilentRenderer.md)[``"rendererOptions"``] : `T` extends [`ListrRendererFactory`](index.ListrRendererFactory.md) ? `T`[``"rendererOptions"``] : `never`

Returns renderer global options depending on the renderer type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListrRendererValue`](index.ListrRendererValue.md) |

#### Defined in

src/interfaces/renderer.interface.ts:64
