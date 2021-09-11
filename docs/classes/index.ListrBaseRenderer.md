# Class: ListrBaseRenderer

[index](../modules/index.md).ListrBaseRenderer

Exported for javascript applications to extend the base renderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

### rendererOptions

▪ `Static` **rendererOptions**: `Record`<`PropertyKey`, `any`\>

#### Defined in

[src/interfaces/renderer.interface.ts:129](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L129)

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `Record`<`PropertyKey`, `any`\>

#### Defined in

[src/interfaces/renderer.interface.ts:130](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L130)

___

### nonTTY

▪ `Static` **nonTTY**: `boolean`

#### Defined in

[src/interfaces/renderer.interface.ts:131](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L131)

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrBaseRenderer`](index.ListrBaseRenderer.md)\>[]

#### Defined in

[src/interfaces/renderer.interface.ts:132](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L132)

___

### options

• **options**: `Record`<`PropertyKey`, `any`\>

#### Defined in

[src/interfaces/renderer.interface.ts:133](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L133)

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

[src/interfaces/renderer.interface.ts:134](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L134)

___

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

[src/interfaces/renderer.interface.ts:135](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L135)

## Constructors

### constructor

• **new ListrBaseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrBaseRenderer`](index.ListrBaseRenderer.md)\>[] |
| `options` | `Record`<`PropertyKey`, `any`\> |

#### Defined in

[src/interfaces/renderer.interface.ts:136](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/renderer.interface.ts#L136)
