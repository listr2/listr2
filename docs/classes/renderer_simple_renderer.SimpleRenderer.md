# Class: SimpleRenderer

[renderer/simple.renderer](../modules/renderer_simple_renderer.md).SimpleRenderer

This is the default renderer which is neither verbose or updating. It provides short output like update renderer, but does not disturb stdin during execution of listr tasks

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

### nonTTY

▪ `Static` **nonTTY**: `boolean` = `true`

#### Defined in

[src/renderer/simple.renderer.ts:18](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L18)

---

### rendererOptions

▪ `Static` **rendererOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :-- | :-- | :-- |
| `prefixWithTimestamp?` | `boolean` | if true this will add timestamp at the begin of the rendered line **`example`** `bash [12:33:44] ✔ Do something important ` **`default`** false |
| `output?` | `"stdout"` \| `"stderr"` | choose between process.stdout and process.stderr **`default`** stdout |

#### Defined in

[src/renderer/simple.renderer.ts:21](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L21)

---

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `never`

#### Defined in

[src/renderer/simple.renderer.ts:44](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L44)

---

### eventTypeRendererMap

• **eventTypeRendererMap**: `Partial`<{ `TITLE`: (`t`: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>, `event`: { `type`: [`TITLE`](../enums/index.ListrEventType.md#title) \| [`STATE`](../enums/index.ListrEventType.md#state) \| [`ENABLED`](../enums/index.ListrEventType.md#enabled) \| [`SUBTASK`](../enums/index.ListrEventType.md#subtask) ; `data?`: `string` \| `boolean` }) => `void` ; `STATE`: (`t`: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>, `event`: { `type`: [`TITLE`](../enums/index.ListrEventType.md#title) \| [`STATE`](../enums/index.ListrEventType.md#state) \| [`ENABLED`](../enums/index.ListrEventType.md#enabled) \| [`SUBTASK`](../enums/index.ListrEventType.md#subtask) ; `data?`: `string` \| `boolean` }) => `void` ; `ENABLED`: (`t`: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>, `event`: { `type`: [`TITLE`](../enums/index.ListrEventType.md#title) \| [`STATE`](../enums/index.ListrEventType.md#state) \| [`ENABLED`](../enums/index.ListrEventType.md#enabled) \| [`SUBTASK`](../enums/index.ListrEventType.md#subtask) ; `data?`: `string` \| `boolean` }) => `void` ; `SUBTASK`: (`t`: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>, `event`: { `type`: [`TITLE`](../enums/index.ListrEventType.md#title) \| [`STATE`](../enums/index.ListrEventType.md#state) \| [`ENABLED`](../enums/index.ListrEventType.md#enabled) \| [`SUBTASK`](../enums/index.ListrEventType.md#subtask) ; `data?`: `string` \| `boolean` }) => `void` ; `DATA`: (`t`: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>, `event`: { `type`: [`DATA`](../enums/index.ListrEventType.md#data) ; `data`: `string` }) => `void` ; `MESSAGE`: (`t`: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>, `event`: { `type`: [`MESSAGE`](../enums/index.ListrEventType.md#message) ; `data`: { `duration?`: `number` ; `error?`: `string` ; `skip?`: `string` ; `rollback?`: `string` ; `retry?`: { `count`: `number` ; `withError?`: `any` } } }) => `void` }\>

Event type renderer map contains functions to process different task events

#### Defined in

[src/renderer/simple.renderer.ts:49](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L49)

---

### tasks

• `Readonly` **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>[]

---

### options

• **options**: `Object`

#### Type declaration

| Name | Type | Description |
| :-- | :-- | :-- |
| `prefixWithTimestamp?` | `boolean` | if true this will add timestamp at the begin of the rendered line **`example`** `bash [12:33:44] ✔ Do something important ` **`default`** false |
| `output?` | `"stdout"` \| `"stderr"` | choose between process.stdout and process.stderr **`default`** stdout |

## Methods

### now

▸ `Static` **now**(): `Date`

#### Returns

`Date`

#### Defined in

[src/renderer/simple.renderer.ts:110](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L110)

---

### formatTitle

▸ `Static` **formatTitle**(`task?`): `string`

#### Parameters

| Name    | Type                                                                                                                         |
| :------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `task?` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\> |

#### Returns

`string`

#### Defined in

[src/renderer/simple.renderer.ts:115](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L115)

---

### log

▸ **log**(`output?`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `output?` | `string` |

#### Returns

`void`

#### Defined in

[src/renderer/simple.renderer.ts:120](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L120)

---

### end

▸ **end**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

[src/renderer/simple.renderer.ts:140](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L140)

---

### render

▸ **render**(`tasks?`): `void`

#### Parameters

| Name     | Type                                                                                                                           |
| :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `tasks?` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>[] |

#### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

[src/renderer/simple.renderer.ts:143](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L143)

## Constructors

### constructor

• **new SimpleRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)\>[] | - |
| `options` | `Object` | - |
| `options.prefixWithTimestamp?` | `boolean` | if true this will add timestamp at the begin of the rendered line **`example`** `bash [12:33:44] ✔ Do something important ` **`default`** false |
| `options.output?` | `"stdout"` \| `"stderr"` | choose between process.stdout and process.stderr **`default`** stdout |

#### Defined in

[src/renderer/simple.renderer.ts:105](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/simple.renderer.ts#L105)
