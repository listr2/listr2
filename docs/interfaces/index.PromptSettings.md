# Interface: PromptSettings

[index](../modules/index.md).PromptSettings

## Properties

### error

• `Optional` **error**: `boolean`

#### Defined in

src/utils/prompt.interface.ts:155

___

### cancelCallback

• `Optional` **cancelCallback**: (`settings?`: [`PromptSettings`](index.PromptSettings.md)) => `string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

#### Type declaration

▸ (`settings?`): `string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `settings?` | [`PromptSettings`](index.PromptSettings.md) |

##### Returns

`string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

#### Defined in

src/utils/prompt.interface.ts:156

___

### stdout

• `Optional` **stdout**: `WriteStream` \| `Writable`

#### Defined in

src/utils/prompt.interface.ts:157

___

### enquirer

• `Optional` **enquirer**: `Enquirer`<`object`\>

#### Defined in

src/utils/prompt.interface.ts:158
