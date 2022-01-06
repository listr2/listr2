# Class: VerboseRenderer

[renderer/verbose.renderer](../modules/renderer_verbose_renderer.md).VerboseRenderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

### nonTTY

▪ `Static` **nonTTY**: `boolean` = `true`

designates whether this renderer can output to a non-tty console

#### Defined in

[src/renderer/verbose.renderer.ts:10](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L10)

---

### rendererOptions

▪ `Static` **rendererOptions**: { `useIcons?`: `boolean` ; `logEmptyTitle?`: `boolean` ; `logTitleChange?`: `boolean` ; `showTimer?`: `boolean` } & { `logger?`: (...`args`: `any`) => [`Logger`](index.Logger.md) ; `options?`: `any` }

renderer options for the verbose renderer

#### Defined in

[src/renderer/verbose.renderer.ts:12](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L12)

---

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `never`

per task options for the verbose renderer

#### Defined in

[src/renderer/verbose.renderer.ts:49](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L49)

---

### logger

• `Private` **logger**: [`Logger`](index.Logger.md)

#### Defined in

[src/renderer/verbose.renderer.ts:50](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L50)

---

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[]

---

### options

• **options**: { `useIcons?`: `boolean` ; `logEmptyTitle?`: `boolean` ; `logTitleChange?`: `boolean` ; `showTimer?`: `boolean` } & { `logger?`: (...`args`: `any`) => [`Logger`](index.Logger.md) ; `options?`: `any` }

## Constructors

### constructor

• **new VerboseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type |
| :-- | :-- |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[] |
| `options` | { `useIcons?`: `boolean` ; `logEmptyTitle?`: `boolean` ; `logTitleChange?`: `boolean` ; `showTimer?`: `boolean` } & { `logger?`: (...`args`: `any`) => [`Logger`](index.Logger.md) ; `options?`: `any` } |

#### Defined in

[src/renderer/verbose.renderer.ts:52](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L52)

## Methods

### render

▸ **render**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

[src/renderer/verbose.renderer.ts:64](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L64)

---

### end

▸ **end**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

[src/renderer/verbose.renderer.ts:69](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L69)

---

### verboseRenderer

▸ `Private` **verboseRenderer**(`tasks`): `void`

#### Parameters

| Name    | Type                                                                                                                              |
| :------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[] |

#### Returns

`void`

#### Defined in

[src/renderer/verbose.renderer.ts:72](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/renderer/verbose.renderer.ts#L72)
