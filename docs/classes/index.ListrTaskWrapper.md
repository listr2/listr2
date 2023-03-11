# Class: ListrTaskWrapper<Ctx, Renderer\>

[index](../modules/index.md).ListrTaskWrapper

Extend the task to have more functionality while accessing from the outside.

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

src/lib/task-wrapper.ts:18

## Properties

### task

• **task**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\>

#### Defined in

src/lib/task-wrapper.ts:18

___

### errors

• **errors**: [`ListrError`](index.ListrError.md)<`Ctx`\>[]

#### Defined in

src/lib/task-wrapper.ts:18

___

### options

• `Private` **options**: [`ListrBaseClassOptions`](../types/index.ListrBaseClassOptions.md)<`Ctx`, `any`, `any`\>

#### Defined in

src/lib/task-wrapper.ts:18

## Accessors

### title

• `get` **title**(): `string`

Get the title of the current task.

#### Returns

`string`

#### Defined in

src/lib/task-wrapper.ts:21

• `set` **title**(`data`): `void`

Change the title of the current task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`void`

#### Defined in

src/lib/task-wrapper.ts:26

___

### output

• `get` **output**(): `string`

Get the output from the output channel.

#### Returns

`string`

#### Defined in

src/lib/task-wrapper.ts:31

• `set` **output**(`data`): `void`

Send a output to the output channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`void`

#### Defined in

src/lib/task-wrapper.ts:36

## Methods

### newListr

▸ **newListr**<`NewCtx`\>(`task`, `options?`): [`Listr`](index.Listr.md)<`NewCtx`, `any`, `any`\>

Create a new subtask with given renderer selection from the parent task.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NewCtx` | `Ctx` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`ListrTask`](../interfaces/index.ListrTask.md)<`NewCtx`, `Renderer`\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`NewCtx`, `Renderer`\>[] \| (`parent`: `Omit`<[`ListrTaskWrapper`](index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\>, ``"skip"`` \| ``"enabled"``\>) => [`ListrTask`](../interfaces/index.ListrTask.md)<`NewCtx`, `Renderer`\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`NewCtx`, `Renderer`\>[] |
| `options?` | [`ListrSubClassOptions`](../types/index.ListrSubClassOptions.md)<`NewCtx`, `Renderer`\> |

#### Returns

[`Listr`](index.Listr.md)<`NewCtx`, `any`, `any`\>

#### Defined in

src/lib/task-wrapper.ts:41

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

src/lib/task-wrapper.ts:57

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

src/lib/task-wrapper.ts:66

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

src/lib/task-wrapper.ts:75

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

src/lib/task-wrapper.ts:84

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

src/lib/task-wrapper.ts:89

___

### stdout

▸ **stdout**(): `WriteStream` & `WritableStream`

Pass stream of data to internal stdout.

Since Listr2 takes control of process.stdout utilizing the default renderer, any data outputted to process.stdout
will corrupt its looks.

This returns a fake stream to pass any stream inside Listr as task data.

#### Returns

`WriteStream` & `WritableStream`

#### Defined in

src/lib/task-wrapper.ts:101

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

src/lib/task-wrapper.ts:115
