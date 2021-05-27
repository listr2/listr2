[listr2](../README.md) / [index](../modules/index.md) / ListrGetRendererOptions

# Type alias: ListrGetRendererOptions<T\>

[index](../modules/index.md).ListrGetRendererOptions

Ƭ **ListrGetRendererOptions**<T\>: T *extends* [*ListrDefaultRendererValue*](index.listrdefaultrenderervalue.md) ? [*ListrDefaultRenderer*](index.listrdefaultrenderer.md)[``"rendererOptions"``] : T *extends* [*ListrFallbackRendererValue*](index.listrfallbackrenderervalue.md) ? [*ListrFallbackRenderer*](index.listrfallbackrenderer.md)[``"rendererOptions"``] : T *extends* [*ListrSilentRenderer*](index.listrsilentrenderer.md) ? [*ListrSilentRenderer*](index.listrsilentrenderer.md)[``"rendererOptions"``] : T *extends* [*ListrRendererFactory*](index.listrrendererfactory.md) ? T[``"rendererOptions"``] : *never*

Returns renderer global options depending on the renderer type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ListrRendererValue*](index.listrrenderervalue.md) |

Defined in: src/interfaces/renderer.interface.ts:55
