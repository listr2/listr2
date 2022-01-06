# Interface: PromptSettings

[index](../modules/index.md).PromptSettings

## Properties

### error

• `Optional` **error**: `boolean`

#### Defined in

[src/utils/prompt.interface.ts:154](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/prompt.interface.ts#L154)

---

### stdout

• `Optional` **stdout**: `WriteStream` \| `Writable`

#### Defined in

[src/utils/prompt.interface.ts:156](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/prompt.interface.ts#L156)

---

### enquirer

• `Optional` **enquirer**: `Enquirer`<`object`\>

#### Defined in

[src/utils/prompt.interface.ts:157](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/prompt.interface.ts#L157)

## Methods

### cancelCallback

▸ `Optional` **cancelCallback**(`settings?`): `string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

#### Parameters

| Name        | Type                                        |
| :---------- | :------------------------------------------ |
| `settings?` | [`PromptSettings`](index.PromptSettings.md) |

#### Returns

`string` \| `void` \| `Error` \| [`PromptError`](../classes/index.PromptError.md)

#### Defined in

[src/utils/prompt.interface.ts:155](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/prompt.interface.ts#L155)
