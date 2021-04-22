[listr2](../README.md) / [index](../modules/index.md) / PromptSettings

# Interface: PromptSettings

[index](../modules/index.md).PromptSettings

## Properties

### cancelCallback

• `Optional` **cancelCallback**: (`settings?`: [*PromptSettings*](index.promptsettings.md)) => *string* \| *void* \| Error \| [*PromptError*](../classes/index.prompterror.md)

#### Type declaration:

▸ (`settings?`: [*PromptSettings*](index.promptsettings.md)): *string* \| *void* \| Error \| [*PromptError*](../classes/index.prompterror.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `settings?` | [*PromptSettings*](index.promptsettings.md) |

**Returns:** *string* \| *void* \| Error \| [*PromptError*](../classes/index.prompterror.md)

Defined in: src/utils/prompt.interface.ts:157

Defined in: src/utils/prompt.interface.ts:157

___

### enquirer

• `Optional` **enquirer**: *Enquirer*<object\>

Defined in: src/utils/prompt.interface.ts:159

___

### error

• `Optional` **error**: *boolean*

Defined in: src/utils/prompt.interface.ts:156

___

### stdout

• `Optional` **stdout**: *WriteStream* \| *Writable*

Defined in: src/utils/prompt.interface.ts:158
