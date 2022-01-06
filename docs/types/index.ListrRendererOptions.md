# Type alias: ListrRendererOptions<Renderer, FallbackRenderer\>

[index](../modules/index.md).ListrRendererOptions

Ƭ **ListrRendererOptions**<`Renderer`, `FallbackRenderer`\>: [`ListrDefaultRendererOptions`](../interfaces/index.ListrDefaultRendererOptions.md)<`Renderer`\> & [`ListrDefaultNonTTYRendererOptions`](../interfaces/index.ListrDefaultNonTTYRendererOptions.md)<`FallbackRenderer`\>

Renderer options for the base class, including setup for selecting default and fallback renderers.

#### Type parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `Renderer`         | extends [`ListrRendererValue`](index.ListrRendererValue.md) |
| `FallbackRenderer` | extends [`ListrRendererValue`](index.ListrRendererValue.md) |

#### Defined in

[src/interfaces/renderer.interface.ts:108](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L108)
