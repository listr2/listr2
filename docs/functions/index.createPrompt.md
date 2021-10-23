# Function: createPrompt

[index](../modules/index.md).createPrompt

▸ **createPrompt**(`options`, `settings?`): `Promise`<`any`\>

Create a new prompt with Enquirer externally.
This extends enquirer so you dont have to give a name to single prompts and such so it is also
useful to use externally.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PromptOptions`](../types/index.PromptOptions.md)<``false``\> \| [`PromptOptions`](../types/index.PromptOptions.md)<``true``\>[] |
| `settings?` | [`PromptSettings`](../interfaces/index.PromptSettings.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/utils/prompt.ts:17
