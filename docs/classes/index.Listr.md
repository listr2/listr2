# Class: Listr<Ctx, Renderer, FallbackRenderer\>

[index](../modules/index.md).Listr

Creates a new set of Listr2 task list.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends [`ListrContext`](../types/index.ListrContext.md) = [`ListrContext`](../types/index.ListrContext.md) |
| `Renderer` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = [`ListrDefaultRendererValue`](../types/index.ListrDefaultRendererValue.md) |
| `FallbackRenderer` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = [`ListrFallbackRendererValue`](../types/index.ListrFallbackRendererValue.md) |

## Properties

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[] = `[]`

#### Defined in

src/listr.ts:28

___

### err

• **err**: [`ListrError`](index.ListrError.md)<`Ctx`\>[] = `[]`

#### Defined in

src/listr.ts:29

___

### ctx

• **ctx**: `Ctx`

#### Defined in

src/listr.ts:30

___

### rendererClass

• **rendererClass**: typeof [`ListrRenderer`](index.ListrRenderer.md)

#### Defined in

src/listr.ts:31

___

### rendererClassOptions

• **rendererClassOptions**: `Record`<`PropertyKey`, `any`\>

#### Defined in

src/listr.ts:32

___

### renderHook$

• **renderHook$**: `Subject`<`void`\>

#### Defined in

src/listr.ts:33

___

### path

• **path**: `string`[] = `[]`

#### Defined in

src/listr.ts:34

___

### concurrency

• `Private` **concurrency**: `number`

#### Defined in

src/listr.ts:35

___

### renderer

• `Private` **renderer**: [`ListrRenderer`](index.ListrRenderer.md)

#### Defined in

src/listr.ts:36

___

### task

• **task**: [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[]

#### Defined in

src/listr.ts:39

___

### options

• `Optional` **options**: [`ListrBaseClassOptions`](../types/index.ListrBaseClassOptions.md)<`Ctx`, `Renderer`, `FallbackRenderer`\>

#### Defined in

src/listr.ts:40

___

### parentTask

• `Optional` **parentTask**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, `any`\>

#### Defined in

src/listr.ts:41

## Constructors

### constructor

• **new Listr**<`Ctx`, `Renderer`, `FallbackRenderer`\>(`task`, `options?`, `parentTask?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends `unknown` = `any` |
| `Renderer` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = ``"default"`` |
| `FallbackRenderer` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = ``"verbose"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[] |
| `options?` | [`ListrBaseClassOptions`](../types/index.ListrBaseClassOptions.md)<`Ctx`, `Renderer`, `FallbackRenderer`\> |
| `parentTask?` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, `any`\> |

#### Defined in

src/listr.ts:38

## Methods

### add

▸ **add**(`task`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[] |

#### Returns

`void`

#### Defined in

src/listr.ts:112

___

### run

▸ **run**(`context?`): `Promise`<`Ctx`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `Ctx` |

#### Returns

`Promise`<`Ctx`\>

#### Defined in

src/listr.ts:120

___

### checkAll

▸ `Private` **checkAll**(`context`): `Promise`<`void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |

#### Returns

`Promise`<`void`[]\>

#### Defined in

src/listr.ts:160

___

### runTask

▸ `Private` **runTask**(`task`, `context`, `errors`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> |
| `context` | `Ctx` |
| `errors` | [`ListrError`](index.ListrError.md)<`Ctx`\>[] |

#### Returns

`Promise`<`void`\>

#### Defined in

src/listr.ts:164
