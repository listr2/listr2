[listr2](../README.md) / [index](../modules/index.md) / PromptSettings

# Interface: PromptSettings

[index](../modules/index.md).PromptSettings

## Properties

### enquirer

• `Optional` **enquirer**: `Enquirer`<`object`\>

#### Defined in

src/utils/prompt.interface.ts:159

___

### error

• `Optional` **error**: `boolean`

#### Defined in

src/utils/prompt.interface.ts:156

___

### stdout

• `Optional` **stdout**: `WriteStream` \| `Writable`

#### Defined in

src/utils/prompt.interface.ts:158

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

src/utils/prompt.interface.ts:157
