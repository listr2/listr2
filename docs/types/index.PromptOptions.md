# Type alias: PromptOptions<T\>

[index](../modules/index.md).PromptOptions

Ƭ **PromptOptions**<`T`\>: [`Unionize`](index.Unionize.md)<{ [K in PromptTypes]-?: T extends true ? object & PromptOptionsType<K\> & object : object & PromptOptionsType<K\>}\> \| { `type`: `string`  } & `T` extends ``true`` ? [`PromptOptionsType`](index.PromptOptionsType.md)<`string`\> & { `name`: `string` \| () => `string`  } : [`PromptOptionsType`](index.PromptOptionsType.md)<`string`\>

Returns all the prompt options depending on the type selected.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean```false`` |

#### Defined in

[src/utils/prompt.interface.ts:9](https://github.com/cenk1cenk2/listr2/blob/3146341/src/utils/prompt.interface.ts#L9)
