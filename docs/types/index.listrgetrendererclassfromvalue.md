[listr2](../README.md) / [index](../modules/index.md) / ListrGetRendererClassFromValue

# Type alias: ListrGetRendererClassFromValue<T\>

[index](../modules/index.md).ListrGetRendererClassFromValue

Ƭ **ListrGetRendererClassFromValue**<T\>: T *extends* [*ListrDefaultRendererValue*](index.listrdefaultrenderervalue.md) ? [*ListrDefaultRenderer*](index.listrdefaultrenderer.md) : T *extends* [*ListrFallbackRendererValue*](index.listrfallbackrenderervalue.md) ? [*ListrFallbackRenderer*](index.listrfallbackrenderer.md) : T *extends* [*ListrSilentRenderer*](index.listrsilentrenderer.md) ? [*ListrSilentRenderer*](index.listrsilentrenderer.md) : T *extends* [*ListrRendererFactory*](index.listrrendererfactory.md) ? T : *never*

Returns the class type from friendly names of the renderers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ListrRendererValue*](index.listrrenderervalue.md) |

Defined in: src/interfaces/renderer.interface.ts:29
