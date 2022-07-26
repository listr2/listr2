# Type alias: PromptOptionsType<T\>

[index](../modules/index.md).PromptOptionsType

Ƭ **PromptOptionsType**<`T`\>: `T` extends keyof [`PromptOptionsMap`](../classes/index.PromptOptionsMap.md) ? [`PromptOptionsMap`](../classes/index.PromptOptionsMap.md)[`T`] : `T` extends `string` ? `BasePromptOptions` & `Record`<`PropertyKey`, `unknown`\> : `any`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/utils/prompt.interface.ts:130](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L130)
