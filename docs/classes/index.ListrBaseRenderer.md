[listr2](../README.md) / [index](../modules/index.md) / ListrBaseRenderer

# Class: ListrBaseRenderer

[index](../modules/index.md).ListrBaseRenderer

Exported for javascript applications to extend the base renderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Constructors

### constructor

• **new ListrBaseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrBaseRenderer`](index.ListrBaseRenderer.md)\>[] |
| `options` | `Record`<`string`, `any`\> |

#### Defined in

src/interfaces/renderer.interface.ts:123

## Properties

### end

• **end**: (`err?`: `Error`) => `void`

#### Type declaration

▸ (`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` |

##### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

src/interfaces/renderer.interface.ts:122

___

### options

• **options**: `Record`<`string`, `any`\>

#### Defined in

src/interfaces/renderer.interface.ts:120

___

### render

• **render**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

src/interfaces/renderer.interface.ts:121

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrBaseRenderer`](index.ListrBaseRenderer.md)\>[]

#### Defined in

src/interfaces/renderer.interface.ts:119

___

### nonTTY

▪ `Static` **nonTTY**: `boolean`

#### Defined in

src/interfaces/renderer.interface.ts:118

___

### rendererOptions

▪ `Static` **rendererOptions**: `Record`<`string`, `any`\>

#### Defined in

src/interfaces/renderer.interface.ts:116

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `Record`<`string`, `any`\>

#### Defined in

src/interfaces/renderer.interface.ts:117
