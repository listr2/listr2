# Type alias: ListrEventFromType<T, E\>

[index](../modules/index.md).ListrEventFromType

Ƭ **ListrEventFromType**<`T`, `E`\>: `E` extends { `type`: infer U  } ? `T` extends `U` ? `E` : `never` : `never`

Used to match event.type to ListrEvent permutations

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ListrEventType`](../enums/index.ListrEventType.md) |
| `E` | [`ListrEvent`](index.ListrEvent.md) |

#### Defined in

src/interfaces/listr.interface.ts:193
