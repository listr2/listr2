# Interface: ListrDefaultNonTTYRendererOptions<T\>

[index](../modules/index.md).ListrDefaultNonTTYRendererOptions

Select a fallback renderer to fallback to in non-tty conditions

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) |

## Properties

### nonTTYRenderer

• `Optional` **nonTTYRenderer**: `T`

the fallback renderer to fallback to on non-tty conditions

#### Defined in

[src/interfaces/renderer.interface.ts:102](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L102)

___

### nonTTYRendererOptions

• `Optional` **nonTTYRendererOptions**: [`ListrGetRendererOptions`](../types/index.ListrGetRendererOptions.md)<`T`\>

Renderer options depending on the current renderer

#### Defined in

[src/interfaces/renderer.interface.ts:104](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L104)
