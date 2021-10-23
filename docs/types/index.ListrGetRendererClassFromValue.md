# Type alias: ListrGetRendererClassFromValue<T\>

[index](../modules/index.md).ListrGetRendererClassFromValue

Ƭ **ListrGetRendererClassFromValue**<`T`\>: `T` extends [`ListrDefaultRendererValue`](index.ListrDefaultRendererValue.md) ? [`ListrDefaultRenderer`](index.ListrDefaultRenderer.md) : `T` extends [`ListrSimpleRendererValue`](index.ListrSimpleRendererValue.md) ? [`ListrSimpleRenderer`](index.ListrSimpleRenderer.md) : `T` extends [`ListrFallbackRendererValue`](index.ListrFallbackRendererValue.md) ? [`ListrFallbackRenderer`](index.ListrFallbackRenderer.md) : `T` extends [`ListrSilentRenderer`](index.ListrSilentRenderer.md) ? [`ListrSilentRenderer`](index.ListrSilentRenderer.md) : `T` extends [`ListrRendererFactory`](index.ListrRendererFactory.md) ? `T` : `never`

Returns the class type from friendly names of the renderers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListrRendererValue`](index.ListrRendererValue.md) |

#### Defined in

src/interfaces/renderer.interface.ts:34
