# Type alias: ListrSubClassOptions<Ctx, Renderer\>

[index](../modules/index.md).ListrSubClassOptions

Ƭ **ListrSubClassOptions**<`Ctx`, `Renderer`\>: [`ListrOptions`](../interfaces/index.ListrOptions.md)<`Ctx`\> & `Omit`<[`ListrDefaultRendererOptions`](../interfaces/index.ListrDefaultRendererOptions.md)<`Renderer`\>, `"renderer"`\>

Sub class options.

Subtasks has reduced set options where the missing ones are explicitly set by the base class.

#### Type parameters

| Name       | Type                                                                                                                            |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `Ctx`      | [`ListrContext`](index.ListrContext.md)                                                                                         |
| `Renderer` | extends [`ListrRendererValue`](index.ListrRendererValue.md) = [`ListrDefaultRendererValue`](index.ListrDefaultRendererValue.md) |

#### Defined in

[src/interfaces/listr.interface.ts:184](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L184)
