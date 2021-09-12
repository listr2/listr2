# Interface: ListrTask<Ctx, Renderer\>

[index](../modules/index.md).ListrTask

ListrTask.

Defines the task, conditions and options to run a specific task in the listr.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | [`ListrContext`](../types/index.ListrContext.md) |
| `Renderer` | extends [`ListrRendererFactory`](../types/index.ListrRendererFactory.md)`any` |

## Properties

### title

• `Optional` **title**: `string`

Title of the task.

Give this task a title if you want to track it by name in the current renderer.

Tasks without a title will hide in the default renderer and are useful for running a background instance.
On verbose renderer, state changes from these tasks will log as 'Task without a title.'

#### Defined in

[src/interfaces/listr.interface.ts:36](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L36)

___

### skip

• `Optional` **skip**: `string` \| `boolean` \| (`ctx`: `Ctx`) => `string` \| `boolean` \| `Promise`<`string` \| `boolean`\>

Skip this task depending on the context.

The function that has been passed in will be evaluated at the runtime when the task tries to initially run.

#### Defined in

[src/interfaces/listr.interface.ts:49](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L49)

___

### enabled

• `Optional` **enabled**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

Enable a task depending on the context.

The function that has been passed in will be evaluated at the initial creation of the Listr class for rendering purposes,
as well as re-evaluated when the time for that specific task has come.

#### Defined in

[src/interfaces/listr.interface.ts:56](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L56)

___

### retry

• `Optional` **retry**: `number`

Adds the given number of retry attempts to the task if the task fails.

#### Defined in

[src/interfaces/listr.interface.ts:60](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L60)

___

### exitOnError

• `Optional` **exitOnError**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

Set exit on the error option from task-level instead of setting it for all the subtasks.

#### Defined in

[src/interfaces/listr.interface.ts:71](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L71)

___

### options

• `Optional` **options**: [`ListrGetRendererTaskOptions`](../types/index.ListrGetRendererTaskOptions.md)<`Renderer`\>

Per task options, that depends on the selected renderer.

These options depend on the implementation of the selected renderer. If the selected renderer has no options it will
be displayed as never.

#### Defined in

[src/interfaces/listr.interface.ts:78](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L78)

## Methods

### task

▸ **task**(`ctx`, `task`): `void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

The task itself.

Task can be a sync or async function, an Observable, or a Stream.
Task will be executed, if the certain criteria of the state are met and whenever the time for that specific task has come.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |
| `task` | [`ListrTaskWrapper`](../classes/index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\> |

#### Returns

`void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

#### Defined in

[src/interfaces/listr.interface.ts:43](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L43)

___

### rollback

▸ `Optional` **rollback**(`ctx`, `task`): `void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

Runs a specific event if the current task or any of the subtasks has failed.

Mostly useful for rollback purposes for subtasks.
But can also be useful whenever a task is failed and some measures have to be taken to ensure the state is not changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |
| `task` | [`ListrTaskWrapper`](../classes/index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\> |

#### Returns

`void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

#### Defined in

[src/interfaces/listr.interface.ts:67](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/interfaces/listr.interface.ts#L67)
