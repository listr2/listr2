# Function: createPrompt

[index](../modules/index.md).createPrompt

▸ **createPrompt**(`this`, `options`, `settings?`): `Promise`<`any`\>

Create a new prompt with Enquirer externally.
This extends enquirer so you dont have to give a name to single prompts and such so it is also
useful to use externally.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `any` |
| `options` | [`PromptOptions`](../types/index.PromptOptions.md)<``false``\> \| [`PromptOptions`](../types/index.PromptOptions.md)<``true``\>[] |
| `settings?` | [`PromptSettings`](../interfaces/index.PromptSettings.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/utils/prompt.ts:29](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.ts#L29)
