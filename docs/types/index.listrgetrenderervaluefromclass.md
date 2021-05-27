[listr2](../README.md) / [index](../modules/index.md) / ListrGetRendererValueFromClass

# Type alias: ListrGetRendererValueFromClass<T\>

[index](../modules/index.md).ListrGetRendererValueFromClass

Ƭ **ListrGetRendererValueFromClass**<T\>: T *extends* [*DefaultRenderer*](../classes/renderer_default_renderer.defaultrenderer.md) ? [*ListrDefaultRendererValue*](index.listrdefaultrenderervalue.md) : T *extends* [*VerboseRenderer*](../classes/renderer_verbose_renderer.verboserenderer.md) ? [*ListrFallbackRendererValue*](index.listrfallbackrenderervalue.md) : T *extends* [*SilentRenderer*](../classes/renderer_silent_renderer.silentrenderer.md) ? [*ListrSilentRenderer*](index.listrsilentrenderer.md) : T *extends* [*ListrRendererFactory*](index.listrrendererfactory.md) ? T : *never*

Returns the friendly names from the type of renderer classes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ListrRendererFactory*](index.listrrendererfactory.md) |

Defined in: src/interfaces/renderer.interface.ts:42
