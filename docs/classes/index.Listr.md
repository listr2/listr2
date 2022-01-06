# Class: Listr<Ctx, Renderer, FallbackRenderer\>

[index](../modules/index.md).Listr

Creates a new set of Listr2 task list.

## Type parameters

| Name               | Type                                                                                                                                                |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Ctx`              | [`ListrContext`](../types/index.ListrContext.md)                                                                                                    |
| `Renderer`         | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = [`ListrDefaultRendererValue`](../types/index.ListrDefaultRendererValue.md)   |
| `FallbackRenderer` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = [`ListrFallbackRendererValue`](../types/index.ListrFallbackRendererValue.md) |

## Constructors

### constructor

• **new Listr**<`Ctx`, `Renderer`, `FallbackRenderer`\>(`task`, `options?`, `parentTask?`)

#### Type parameters

| Name               | Type                                                                               |
| :----------------- | :--------------------------------------------------------------------------------- |
| `Ctx`              | `any`                                                                              |
| `Renderer`         | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = `"default"` |
| `FallbackRenderer` | extends [`ListrRendererValue`](../types/index.ListrRendererValue.md) = `"verbose"` |

#### Parameters

| Name | Type |
| :-- | :-- |
| `task` | [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[] |
| `options?` | [`ListrBaseClassOptions`](../types/index.ListrBaseClassOptions.md)<`Ctx`, `Renderer`, `FallbackRenderer`\> |
| `parentTask?` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, `any`\> |

#### Defined in

[src/listr.ts:34](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L34)

## Properties

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[] = `[]`

#### Defined in

[src/listr.ts:24](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L24)

---

### err

• **err**: [`ListrError`](index.ListrError.md)<`Ctx`\>[] = `[]`

#### Defined in

[src/listr.ts:25](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L25)

---

### ctx

• **ctx**: `Ctx`

#### Defined in

[src/listr.ts:26](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L26)

---

### rendererClass

• **rendererClass**: typeof [`ListrRenderer`](index.ListrRenderer.md)

#### Defined in

[src/listr.ts:27](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L27)

---

### rendererClassOptions

• **rendererClassOptions**: `Record`<`PropertyKey`, `any`\>

#### Defined in

[src/listr.ts:28](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L28)

---

### renderHook$

• **renderHook$**: `Subject`<`void`\>

#### Defined in

[src/listr.ts:29](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L29)

---

### path

• **path**: `string`[] = `[]`

#### Defined in

[src/listr.ts:30](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L30)

---

### concurrency

• `Private` **concurrency**: `number`

#### Defined in

[src/listr.ts:31](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L31)

---

### renderer

• `Private` **renderer**: [`ListrRenderer`](index.ListrRenderer.md)

#### Defined in

[src/listr.ts:32](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L32)

---

### task

• **task**: [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[]

---

### options

• `Optional` **options**: [`ListrBaseClassOptions`](../types/index.ListrBaseClassOptions.md)<`Ctx`, `Renderer`, `FallbackRenderer`\>

---

### parentTask

• `Optional` **parentTask**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, `any`\>

## Methods

### add

▸ **add**(`task`): `void`

#### Parameters

| Name | Type |
| :-- | :-- |
| `task` | [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> \| [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\>[] |

#### Returns

`void`

#### Defined in

[src/listr.ts:107](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L107)

---

### run

▸ **run**(`context?`): `Promise`<`Ctx`\>

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `context?` | `Ctx` |

#### Returns

`Promise`<`Ctx`\>

#### Defined in

[src/listr.ts:115](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L115)

---

### checkAll

▸ `Private` **checkAll**(`context`): `Promise`<`void`[]\>

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `context` | `any` |

#### Returns

`Promise`<`void`[]\>

#### Defined in

[src/listr.ts:155](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L155)

---

### runTask

▸ `Private` **runTask**(`task`, `context`, `errors`): `Promise`<`void`\>

#### Parameters

| Name      | Type                                                                                                                                                     |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `task`    | [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, [`ListrGetRendererClassFromValue`](../types/index.ListrGetRendererClassFromValue.md)<`Renderer`\>\> |
| `context` | `Ctx`                                                                                                                                                    |
| `errors`  | [`ListrError`](index.ListrError.md)<`Ctx`\>[]                                                                                                            |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/listr.ts:159](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/listr.ts#L159)
