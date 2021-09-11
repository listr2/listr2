# Interface: ListrTask<Ctx, Renderer\>

[index](../modules/index.md).ListrTask

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
Tasks without a title will hide themselves in the default renderer and useful for running a background instance.

#### Defined in

[src/interfaces/listr.interface.ts:29](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L29)

___

### retry

• `Optional` **retry**: `number`

Adds a couple of retries to the task if the task fails

#### Defined in

[src/interfaces/listr.interface.ts:44](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L44)

___

### skip

• `Optional` **skip**: `string` \| `boolean` \| (`ctx`: `Ctx`) => `string` \| `boolean` \| `Promise`<`string` \| `boolean`\>

Skip this task depending on the context.

The function that has been passed in will be evaluated at the runtime when task tries to initially run.

#### Defined in

[src/interfaces/listr.interface.ts:50](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L50)

___

### enabled

• `Optional` **enabled**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

Enable a task depending on the context.

The function that has been passed in will be evaluated at the initial creation of the Listr class.

#### Defined in

[src/interfaces/listr.interface.ts:56](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L56)

___

### options

• `Optional` **options**: [`ListrGetRendererTaskOptions`](../types/index.ListrGetRendererTaskOptions.md)<`Renderer`\>

Per task options, depending on the selected renderer.

This options depend on the implementation of selected renderer. If selected renderer has no options it will
be displayed as never.

#### Defined in

[src/interfaces/listr.interface.ts:63](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L63)

___

### exitOnError

• `Optional` **exitOnError**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

Set exit on error option from task level instead of setting it for all the subtasks.

#### Defined in

[src/interfaces/listr.interface.ts:67](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L67)

## Methods

### task

▸ **task**(`ctx`, `task`): `void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

The task itself.

Task can be a sync or async function, an Observable or a Stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |
| `task` | [`ListrTaskWrapper`](../classes/index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\> |

#### Returns

`void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

#### Defined in

[src/interfaces/listr.interface.ts:35](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L35)

___

### rollback

▸ `Optional` **rollback**(`ctx`, `task`): `void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

Runs a specific event if the current task or any of the subtasks has failed.
Mostly useful for rollback purposes for subtasks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |
| `task` | [`ListrTaskWrapper`](../classes/index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\> |

#### Returns

`void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

#### Defined in

[src/interfaces/listr.interface.ts:40](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L40)
