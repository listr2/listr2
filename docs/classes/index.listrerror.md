[listr2](../README.md) / [index](../modules/index.md) / ListrError

# Class: ListrError

[index](../modules/index.md).ListrError

The internal error handling mechanism..

## Hierarchy

* *Error*

  ↳ **ListrError**

## Constructors

### constructor

\+ **new ListrError**(`message`: *string*, `errors?`: Error[], `context?`: *any*): [*ListrError*](index.listrerror.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |
| `errors?` | Error[] |
| `context?` | *any* |

**Returns:** [*ListrError*](index.listrerror.md)

Overrides: Error.constructor

Defined in: src/interfaces/listr-error.interface.ts:2

## Properties

### context

• `Optional` **context**: *any*

___

### errors

• `Optional` **errors**: Error[]

___

### message

• **message**: *string*

Inherited from: Error.message

___

### name

• **name**: *string*

Inherited from: Error.name

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: Error.stack

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `err` | Error |
| `stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:11

Inherited from: Error.prepareStackTrace

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: Error.stackTraceLimit

Defined in: node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

| Name | Type |
| :------ | :------ |
| `targetObject` | *object* |
| `constructorOpt?` | Function |

**Returns:** *void*

Inherited from: Error.captureStackTrace

Defined in: node_modules/@types/node/globals.d.ts:4
