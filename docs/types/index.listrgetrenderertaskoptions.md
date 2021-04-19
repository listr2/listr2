[listr2](../README.md) / [index](../modules/index.md) / ListrGetRendererTaskOptions

# Type alias: ListrGetRendererTaskOptions<T\>

[index](../modules/index.md).ListrGetRendererTaskOptions

Ƭ **ListrGetRendererTaskOptions**<T\>: T *extends* [*ListrDefaultRendererValue*](index.listrdefaultrenderervalue.md) ? [*ListrDefaultRenderer*](index.listrdefaultrenderer.md)[``"rendererTaskOptions"``] : T *extends* [*ListrFallbackRendererValue*](index.listrfallbackrenderervalue.md) ? [*ListrFallbackRenderer*](index.listrfallbackrenderer.md)[``"rendererTaskOptions"``] : T *extends* [*ListrSilentRenderer*](index.listrsilentrenderer.md) ? [*ListrSilentRenderer*](index.listrsilentrenderer.md)[``"rendererTaskOptions"``] : T *extends* [*ListrRendererFactory*](index.listrrendererfactory.md) ? T[``"rendererTaskOptions"``] : *never*

Returns renderer per task options depending on the renderer type.

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | [*ListrRendererValue*](index.listrrenderervalue.md) |

Defined in: src/interfaces/renderer.interface.ts:68
