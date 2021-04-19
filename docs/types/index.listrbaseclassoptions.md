[listr2](../README.md) / [index](../modules/index.md) / ListrBaseClassOptions

# Type alias: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer\>

[index](../modules/index.md).ListrBaseClassOptions

Ƭ **ListrBaseClassOptions**<Ctx, Renderer, FallbackRenderer\>: [*ListrOptions*](../interfaces/index.listroptions.md)<Ctx\> & [*ListrDefaultRendererOptions*](../interfaces/index.listrdefaultrendereroptions.md)<Renderer\> & [*ListrDefaultNonTTYRendererOptions*](../interfaces/index.listrdefaultnonttyrendereroptions.md)<FallbackRenderer\>

Parent class options.

Parent class has more options where you can also select the and set renderer and non-tty renderer.

Any subtasks will respect those options so they will be stripped of that properties.

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | [*ListrContext*](index.listrcontext.md) |
| `Renderer` | [*ListrRendererValue*](index.listrrenderervalue.md) | [*ListrDefaultRendererValue*](index.listrdefaultrenderervalue.md) |
| `FallbackRenderer` | [*ListrRendererValue*](index.listrrenderervalue.md) | [*ListrFallbackRendererValue*](index.listrfallbackrenderervalue.md) |

Defined in: src/interfaces/listr.interface.ts:141
