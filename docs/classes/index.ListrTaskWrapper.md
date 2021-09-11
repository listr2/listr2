# Class: ListrTaskWrapper<Ctx, Renderer\>

[index](../modules/index.md).ListrTaskWrapper

Extend the task to have more functionality while accesing from the outside.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | `Ctx` |
| `Renderer` | extends [`ListrRendererFactory`](../types/index.ListrRendererFactory.md) |

## Constructors

### constructor

• **new ListrTaskWrapper**<`Ctx`, `Renderer`\>(`task`, `errors`, `options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | `Ctx` |
| `Renderer` | extends typeof [`ListrRenderer`](index.ListrRenderer.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\> |
| `errors` | [`ListrError`](index.ListrError.md)<`Ctx`\>[] |
| `options` | [`ListrBaseClassOptions`](../types/index.ListrBaseClassOptions.md)<`Ctx`, `any`, `any`\> |

#### Defined in

[src/lib/task-wrapper.ts:18](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L18)

## Properties

### task

• **task**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\>

___

### errors

• **errors**: [`ListrError`](index.ListrError.md)<`Ctx`\>[]

## Accessors

### title

• `get` **title**(): `string`

Get the title of the current task.

#### Returns

`string`

#### Defined in

[src/lib/task-wrapper.ts:26](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L26)

• `set` **title**(`data`): `void`

Change the title of the current task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/task-wrapper.ts:21](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L21)

___

### output

• `get` **output**(): `string`

Get the output from the output channel.

#### Returns

`string`

#### Defined in

[src/lib/task-wrapper.ts:36](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L36)

• `set` **output**(`data`): `void`

Send a output to the output channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/task-wrapper.ts:31](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L31)

## Methods

### newListr

▸ **newListr**(`task`, `options?`): [`Listr`](index.Listr.md)<`Ctx`, `any`, `any`\>

Create a new subtask with given renderer selection from the parent task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, `Renderer`\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, `Renderer`\>[] \| (`parent`: [`ListrTaskWrapper`](index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\>) => [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, `Renderer`\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, `Renderer`\>[] |
| `options?` | [`ListrSubClassOptions`](../types/index.ListrSubClassOptions.md)<`Ctx`, `Renderer`\> |

#### Returns

[`Listr`](index.Listr.md)<`Ctx`, `any`, `any`\>

#### Defined in

[src/lib/task-wrapper.ts:41](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L41)

___

### report

▸ **report**(`error`, `type`): `void`

Report a error in process for error collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `type` | [`ListrErrorTypes`](../enums/index.ListrErrorTypes.md) |

#### Returns

`void`

#### Defined in

[src/lib/task-wrapper.ts:57](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L57)

___

### skip

▸ **skip**(`message?`): `void`

Skip current task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/task-wrapper.ts:64](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L64)

___

### isRetrying

▸ **isRetrying**(): `Object`

Get the number of retrying, else returns false

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `withError?` | `any` |

#### Defined in

[src/lib/task-wrapper.ts:73](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L73)

___

### prompt

▸ **prompt**<`T`\>(`options`): `Promise`<`T`\>

Create a new Enquirer prompt using prompt options.

Since process.stdout is controlled by Listr, this will passthrough all Enquirer data through internal stdout.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PromptOptions`](../types/index.PromptOptions.md)<``false``\> \| [`PromptOptions`](../types/index.PromptOptions.md)<``true``\>[] |

#### Returns

`Promise`<`T`\>

#### Defined in

[src/lib/task-wrapper.ts:82](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L82)

___

### cancelPrompt

▸ **cancelPrompt**(`throwError?`): `void`

Cancels the current prompt attach to this task.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `throwError` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/lib/task-wrapper.ts:87](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L87)

___

### stdout

▸ **stdout**(): `WriteStream` & `WritableStream`

Pass stream of data to internal stdout.

Since Listr2 takes control of process.stdout utilizing the default renderer, any data outputted to process.stdout
will corupt its looks.

This returns a fake stream to pass any stream inside Listr as task data.

#### Returns

`WriteStream` & `WritableStream`

#### Defined in

[src/lib/task-wrapper.ts:99](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L99)

___

### run

▸ **run**(`ctx`): `Promise`<`void`\>

Run this task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/task-wrapper.ts:113](https://github.com/cenk1cenk2/listr2/blob/3146341/src/lib/task-wrapper.ts#L113)
