# Type alias: ListrBaseClassOptions<Ctx, Renderer, FallbackRenderer\>

[index](../modules/index.md).ListrBaseClassOptions

Ƭ **ListrBaseClassOptions**<`Ctx`, `Renderer`, `FallbackRenderer`\>: [`ListrOptions`](../interfaces/index.ListrOptions.md)<`Ctx`\> & [`ListrDefaultRendererOptions`](../interfaces/index.ListrDefaultRendererOptions.md)<`Renderer`\> & [`ListrDefaultNonTTYRendererOptions`](../interfaces/index.ListrDefaultNonTTYRendererOptions.md)<`FallbackRenderer`\>

Parent class options.

Parent class has more options where you can also select the and set renderer and non-tty renderer.

Any subtasks will respect those options so they will be stripped of that properties.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | [`ListrContext`](index.ListrContext.md) |
| `Renderer` | extends [`ListrRendererValue`](index.ListrRendererValue.md)[`ListrDefaultRendererValue`](index.ListrDefaultRendererValue.md) |
| `FallbackRenderer` | extends [`ListrRendererValue`](index.ListrRendererValue.md)[`ListrFallbackRendererValue`](index.ListrFallbackRendererValue.md) |

#### Defined in

[src/interfaces/listr.interface.ts:161](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L161)
