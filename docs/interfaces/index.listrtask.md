[listr2](../README.md) / [index](../modules/index.md) / ListrTask

# Interface: ListrTask<Ctx, Renderer\>

[index](../modules/index.md).ListrTask

## Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | [*ListrContext*](../types/index.listrcontext.md) |
| `Renderer` | [*ListrRendererFactory*](../types/index.listrrendererfactory.md) | *any* |

## Properties

### enabled

• `Optional` **enabled**: *boolean* \| (`ctx`: Ctx) => *boolean* \| *Promise*<boolean\>

Enable a task depending on the context.

The function that has been passed in will be evaluated at the initial creation of the Listr class.

Defined in: src/interfaces/listr.interface.ts:56

___

### exitOnError

• `Optional` **exitOnError**: *boolean* \| (`ctx`: Ctx) => *boolean* \| *Promise*<boolean\>

Set exit on error option from task level instead of setting it for all the subtasks.

Defined in: src/interfaces/listr.interface.ts:67

___

### options

• `Optional` **options**: [*ListrGetRendererTaskOptions*](../types/index.listrgetrenderertaskoptions.md)<Renderer\>

Per task options, depending on the selected renderer.

This options depend on the implementation of selected renderer. If selected renderer has no options it will
be displayed as never.

Defined in: src/interfaces/listr.interface.ts:63

___

### retry

• `Optional` **retry**: *number*

Adds a couple of retries to the task if the task fails

Defined in: src/interfaces/listr.interface.ts:44

___

### rollback

• `Optional` **rollback**: (`ctx`: Ctx, `task`: [*ListrTaskWrapper*](../classes/index.listrtaskwrapper.md)<Ctx, Renderer\>) => *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

Runs a specific event if the current task or any of the subtasks has failed.
Mostly useful for rollback purposes for subtasks.

#### Type declaration:

▸ (`ctx`: Ctx, `task`: [*ListrTaskWrapper*](../classes/index.listrtaskwrapper.md)<Ctx, Renderer\>): *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `ctx` | Ctx |
| `task` | [*ListrTaskWrapper*](../classes/index.listrtaskwrapper.md)<Ctx, Renderer\> |

**Returns:** *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

Defined in: src/interfaces/listr.interface.ts:40

Defined in: src/interfaces/listr.interface.ts:40

___

### skip

• `Optional` **skip**: *string* \| *boolean* \| (`ctx`: Ctx) => *string* \| *boolean* \| *Promise*<boolean\> \| *Promise*<string\>

Skip this task depending on the context.

The function that has been passed in will be evaluated at the runtime when task tries to initially run.

Defined in: src/interfaces/listr.interface.ts:50

___

### task

• **task**: (`ctx`: Ctx, `task`: [*ListrTaskWrapper*](../classes/index.listrtaskwrapper.md)<Ctx, Renderer\>) => *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

The task itself.

Task can be a sync or async function, an Observable or a Stream.

#### Type declaration:

▸ (`ctx`: Ctx, `task`: [*ListrTaskWrapper*](../classes/index.listrtaskwrapper.md)<Ctx, Renderer\>): *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `ctx` | Ctx |
| `task` | [*ListrTaskWrapper*](../classes/index.listrtaskwrapper.md)<Ctx, Renderer\> |

**Returns:** *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

Defined in: src/interfaces/listr.interface.ts:35

Defined in: src/interfaces/listr.interface.ts:35

___

### title

• `Optional` **title**: *string*

Title of the task.

Give this task a title if you want to track it by name in the current renderer.
Tasks without a title will tend to hide themselves in the default renderer and useful for

Defined in: src/interfaces/listr.interface.ts:29
