# Class: ListrError<Ctx\>

[index](../modules/index.md).ListrError

The internal error handling mechanism..

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends [`ListrContext`](../types/index.ListrContext.md) = [`ListrContext`](../types/index.ListrContext.md) |

## Hierarchy

- `Error`

  ↳ **`ListrError`**

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### path

• **path**: `string`

#### Defined in

src/interfaces/listr-error.interface.ts:8

___

### ctx

• **ctx**: `Ctx`

#### Defined in

src/interfaces/listr-error.interface.ts:9

___

### error

• **error**: `Error`

#### Defined in

src/interfaces/listr-error.interface.ts:11

___

### type

• **type**: [`ListrErrorTypes`](../enums/index.ListrErrorTypes.md)

#### Defined in

src/interfaces/listr-error.interface.ts:11

___

### task

• **task**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\>

#### Defined in

src/interfaces/listr-error.interface.ts:11

## Constructors

### constructor

• **new ListrError**<`Ctx`\>(`error`, `type`, `task`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends `unknown` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `type` | [`ListrErrorTypes`](../enums/index.ListrErrorTypes.md) |
| `task` | [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\> |

#### Overrides

Error.constructor

#### Defined in

src/interfaces/listr-error.interface.ts:11
