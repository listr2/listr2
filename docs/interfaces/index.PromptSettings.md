# Interface: PromptSettings

[index](../modules/index.md).PromptSettings

## Properties

### error

• `Optional` **error**: `boolean`

#### Defined in

[src/utils/prompt.interface.ts:156](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L156)

___

### stdout

• `Optional` **stdout**: `WriteStream` \| `Writable`

#### Defined in

[src/utils/prompt.interface.ts:158](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L158)

___

### enquirer

• `Optional` **enquirer**: `Enquirer`<`object`\>

#### Defined in

[src/utils/prompt.interface.ts:159](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L159)

## Methods

### cancelCallback

▸ `Optional` **cancelCallback**(`settings?`): `string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings?` | [`PromptSettings`](index.PromptSettings.md) |

#### Returns

`string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

#### Defined in

[src/utils/prompt.interface.ts:157](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L157)
