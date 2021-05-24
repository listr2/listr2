[listr2](../README.md) / [index](../modules/index.md) / PromptOptionsType

# Type alias: PromptOptionsType<T\>

[index](../modules/index.md).PromptOptionsType

Ƭ **PromptOptionsType**<T\>: T *extends* keyof [*PromptOptionsMap*](../classes/index.promptoptionsmap.md) ? [*PromptOptionsMap*](../classes/index.promptoptionsmap.md)[T] : T *extends* *string* ? BasePromptOptions & *Record*<string, unknown\> : *any*

#### Type parameters

| Name |
| :------ |
| `T` |

Defined in: src/utils/prompt.interface.ts:131
