# Class: ListrError<Ctx\>

[index](../modules/index.md).ListrError

The internal error handling mechanism..

## Type parameters

| Name  | Type                                                                      |
| :---- | :------------------------------------------------------------------------ |
| `Ctx` | extends `Record`<`PropertyKey`, `any`\> = `Record`<`PropertyKey`, `any`\> |

## Hierarchy

- `Error`

  ↳ **`ListrError`**

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
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

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

---

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

---

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

---

### path

• **path**: `string`

#### Defined in

[src/interfaces/listr-error.interface.ts:7](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr-error.interface.ts#L7)

---

### ctx

• **ctx**: `Ctx`

#### Defined in

[src/interfaces/listr-error.interface.ts:8](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr-error.interface.ts#L8)

---

### error

• **error**: `Error`

---

### type

• **type**: [`ListrErrorTypes`](../enums/index.ListrErrorTypes.md)

---

### task

• **task**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\>

## Constructors

### constructor

• **new ListrError**<`Ctx`\>(`error`, `type`, `task`)

#### Type parameters

| Name  | Type                                                                      |
| :---- | :------------------------------------------------------------------------ |
| `Ctx` | extends `Record`<`PropertyKey`, `any`\> = `Record`<`PropertyKey`, `any`\> |

#### Parameters

| Name    | Type                                                                                                    |
| :------ | :------------------------------------------------------------------------------------------------------ |
| `error` | `Error`                                                                                                 |
| `type`  | [`ListrErrorTypes`](../enums/index.ListrErrorTypes.md)                                                  |
| `task`  | [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, typeof [`ListrRenderer`](index.ListrRenderer.md)\> |

#### Overrides

Error.constructor

#### Defined in

[src/interfaces/listr-error.interface.ts:10](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr-error.interface.ts#L10)
