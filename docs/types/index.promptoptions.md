[listr2](../README.md) / [index](../modules/index.md) / PromptOptions

# Type alias: PromptOptions<T\>

[index](../modules/index.md).PromptOptions

Ƭ **PromptOptions**<T\>: [*Unionize*](index.unionize.md)<{ [K in PromptTypes]-?: T extends true ? object & PromptOptionsType<K\> & object : object & PromptOptionsType<K\>}\> \| { `type`: *string*  } & T *extends* ``true`` ? [*PromptOptionsType*](index.promptoptionstype.md)<string\> & { `name`: *string* \| () => *string*  } : [*PromptOptionsType*](index.promptoptionstype.md)<string\>

Returns all the prompt options depending on the type selected.

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *boolean* | ``false`` |

Defined in: src/utils/prompt.interface.ts:9
