[listr2](../README.md) / [index](../modules/index.md) / ListrTaskWrapper

# Class: ListrTaskWrapper<Ctx, Renderer\>

[index](../modules/index.md).ListrTaskWrapper

Extend the task to have more functionality while accesing from the outside.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | - |
| `Renderer` | [*ListrRendererFactory*](../types/index.listrrendererfactory.md) |

## Constructors

### constructor

\+ **new ListrTaskWrapper**<Ctx, Renderer\>(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, *typeof* [*ListrRenderer*](index.listrrenderer.md)\>, `errors`: [*ListrError*](index.listrerror.md)[], `options`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, any, any\>): [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `Ctx` | - |
| `Renderer` | *typeof* [*ListrRenderer*](index.listrrenderer.md) |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, *typeof* [*ListrRenderer*](index.listrrenderer.md)\> |
| `errors` | [*ListrError*](index.listrerror.md)[] |
| `options` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, any, any\> |

**Returns:** [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>

Defined in: src/lib/task-wrapper.ts:16

## Properties

### errors

• **errors**: [*ListrError*](index.listrerror.md)[]

___

### task

• **task**: [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, *typeof* [*ListrRenderer*](index.listrrenderer.md)\>

## Accessors

### output

• get **output**(): *string*

Get the output from the output channel.

**Returns:** *string*

Defined in: src/lib/task-wrapper.ts:35

• set **output**(`data`: *string*): *void*

Send a output to the output channel.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *string* |

**Returns:** *void*

Defined in: src/lib/task-wrapper.ts:30

___

### title

• get **title**(): *string*

Get the title of the current task.

**Returns:** *string*

Defined in: src/lib/task-wrapper.ts:25

• set **title**(`data`: *string*): *void*

Change the title of the current task.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *string* |

**Returns:** *void*

Defined in: src/lib/task-wrapper.ts:20

## Methods

### cancelPrompt

▸ **cancelPrompt**(`throwError?`: *boolean*): *void*

Cancels the current prompt attach to this task.

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `throwError` | *boolean* | false |

**Returns:** *void*

Defined in: src/lib/task-wrapper.ts:93

___

### isRetrying

▸ **isRetrying**(): *object*

Get the number of retrying, else returns false

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `count` | *number* |
| `withError?` | *any* |

Defined in: src/lib/task-wrapper.ts:79

___

### newListr

▸ **newListr**(`task`: [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\>[] \| (`parent`: [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>) => [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\>[], `options?`: [*ListrSubClassOptions*](../types/index.listrsubclassoptions.md)<Ctx, Renderer\>): [*Listr*](index.listr.md)<Ctx, any, any\>

Create a new subtask with given renderer selection from the parent task.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\>[] \| (`parent`: [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>) => [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, Renderer\>[] |
| `options?` | [*ListrSubClassOptions*](../types/index.listrsubclassoptions.md)<Ctx, Renderer\> |

**Returns:** [*Listr*](index.listr.md)<Ctx, any, any\>

Defined in: src/lib/task-wrapper.ts:40

___

### prompt

▸ **prompt**<T\>(`options`: [*PromptOptions*](../types/index.promptoptions.md)<``false``\> \| [*PromptOptions*](../types/index.promptoptions.md)<``true``\>[]): *Promise*<T\>

Create a new Enquirer prompt using prompt options.

Since process.stdout is controlled by Listr, this will passthrough all Enquirer data through internal stdout.

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `T` | *any* |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options` | [*PromptOptions*](../types/index.promptoptions.md)<``false``\> \| [*PromptOptions*](../types/index.promptoptions.md)<``true``\>[] |

**Returns:** *Promise*<T\>

Defined in: src/lib/task-wrapper.ts:88

___

### report

▸ **report**(`error`: [*ListrError*](index.listrerror.md) \| Error): *void*

Report a error in process for error collection.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `error` | [*ListrError*](index.listrerror.md) \| Error |

**Returns:** *void*

Defined in: src/lib/task-wrapper.ts:56

___

### run

▸ **run**(`ctx`: Ctx): *Promise*<void\>

Run this task.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `ctx` | Ctx |

**Returns:** *Promise*<void\>

Defined in: src/lib/task-wrapper.ts:121

___

### skip

▸ **skip**(`message?`: *string*): *void*

Skip current task.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message?` | *string* |

**Returns:** *void*

Defined in: src/lib/task-wrapper.ts:70

___

### stdout

▸ **stdout**(): *WriteStream* & *WritableStream*

Pass stream of data to internal stdout.

Since Listr2 takes control of process.stdout utilizing the default renderer, any data outputted to process.stdout
will corupt its looks.

This returns a fake stream to pass any stream inside Listr as task data.

**Returns:** *WriteStream* & *WritableStream*

Defined in: src/lib/task-wrapper.ts:105
