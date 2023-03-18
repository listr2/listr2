# Interface: ListrTask<Ctx, Renderer\>

ListrTask.

Defines the task, conditions and options to run a specific task in the listr.

## Type parameters

| Name       | Type                                                                        |
| :--------- | :-------------------------------------------------------------------------- |
| `Ctx`      | [`ListrContext`](../README.md#listrcontext)                                 |
| `Renderer` | extends [`ListrRendererFactory`](../README.md#listrrendererfactory) = `any` |

## Properties

### enabled

• `Optional` **enabled**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

Enable a task depending on the context.

The function that has been passed in will be evaluated at the initial creation of the Listr class for rendering purposes, as well as re-evaluated when the time for that specific task has come.

#### Defined in

[src/interfaces/task.interface.ts:46](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L46)

---

### exitOnError

• `Optional` **exitOnError**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

Set exit on the error option from task-level instead of setting it for all the subtasks.

#### Defined in

[src/interfaces/task.interface.ts:61](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L61)

---

### options

• `Optional` **options**: [`ListrGetRendererTaskOptions`](../README.md#listrgetrenderertaskoptions)<`Renderer`\>

Per task options, that depends on the selected renderer.

These options depend on the implementation of the selected renderer. If the selected renderer has no options it will be displayed as never.

#### Defined in

[src/interfaces/task.interface.ts:68](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L68)

---

### retry

• `Optional` **retry**: `number`

Adds the given number of retry attempts to the task if the task fails.

#### Defined in

[src/interfaces/task.interface.ts:50](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L50)

---

### rollback

• `Optional` **rollback**: [`ListrTaskFn`](../README.md#listrtaskfn)<`Ctx`, `Renderer`\>

Runs a specific event if the current task or any of the subtasks has failed.

Mostly useful for rollback purposes for subtasks. But can also be useful whenever a task is failed and some measures have to be taken to ensure the state is not changed.

#### Defined in

[src/interfaces/task.interface.ts:57](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L57)

---

### skip

• `Optional` **skip**: `string` \| `boolean` \| (`ctx`: `Ctx`) => `string` \| `boolean` \| `Promise`<`string` \| `boolean`\>

Skip this task depending on the context.

The function that has been passed in will be evaluated at the runtime when the task tries to initially run.

#### Defined in

[src/interfaces/task.interface.ts:39](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L39)

---

### task

• **task**: [`ListrTaskFn`](../README.md#listrtaskfn)<`Ctx`, `Renderer`\>

The task itself.

Task can be a sync or async function, an Observable, or a Stream. Task will be executed, if the certain criteria of the state are met and whenever the time for that specific task has come.

#### Defined in

[src/interfaces/task.interface.ts:33](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L33)

---

### title

• `Optional` **title**: `string`

Title of the task.

Give this task a title if you want to track it by name in the current renderer.

Tasks without a title will hide in the default renderer and are useful for running a background instance. On verbose renderer, state changes from these tasks will log as 'Task without a title.'

#### Defined in

[src/interfaces/task.interface.ts:26](https://github.com/cenk1cenk2/listr2/blob/7fc254f/src/interfaces/task.interface.ts#L26)
