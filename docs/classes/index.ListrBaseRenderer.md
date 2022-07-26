# Class: ListrBaseRenderer

[index](../modules/index.md).ListrBaseRenderer

Exported for javascript applications to extend the base renderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

### rendererOptions

▪ `Static` **rendererOptions**: `Record`<`PropertyKey`, `any`\>

designate renderer global options that is specific to the current renderer

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[rendererOptions](index.ListrRenderer.md#rendereroptions)

#### Defined in

[src/interfaces/renderer.interface.ts:129](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L129)

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `Record`<`PropertyKey`, `any`\>

designate renderer per task options that is specific to the current renderer

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[rendererTaskOptions](index.ListrRenderer.md#renderertaskoptions)

#### Defined in

[src/interfaces/renderer.interface.ts:130](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L130)

___

### nonTTY

▪ `Static` **nonTTY**: `boolean`

designate whether this renderer can work in non-tty environments

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[nonTTY](index.ListrRenderer.md#nontty)

#### Defined in

[src/interfaces/renderer.interface.ts:131](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L131)

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrBaseRenderer`](index.ListrBaseRenderer.md)\>[]

#### Defined in

[src/interfaces/renderer.interface.ts:132](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L132)

___

### options

• **options**: `Record`<`PropertyKey`, `any`\>

#### Defined in

[src/interfaces/renderer.interface.ts:133](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L133)

___

### render

• **render**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[render](index.ListrRenderer.md#render)

#### Defined in

[src/interfaces/renderer.interface.ts:134](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L134)

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

[ListrRenderer](index.ListrRenderer.md).[end](index.ListrRenderer.md#end)

#### Defined in

[src/interfaces/renderer.interface.ts:135](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L135)

## Constructors

### constructor

• **new ListrBaseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrBaseRenderer`](index.ListrBaseRenderer.md)\>[] |
| `options` | `Record`<`PropertyKey`, `any`\> |

#### Defined in

[src/interfaces/renderer.interface.ts:136](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/renderer.interface.ts#L136)
