[listr2](../README.md) / [index](../modules/index.md) / Listr

# Class: Listr<Ctx, Renderer, FallbackRenderer\>

[index](../modules/index.md).Listr

Creates a new set of Listr2 task list.

## Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | [*ListrContext*](../types/index.listrcontext.md) |
| `Renderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | [*ListrDefaultRendererValue*](../types/index.listrdefaultrenderervalue.md) |
| `FallbackRenderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | [*ListrFallbackRendererValue*](../types/index.listrfallbackrenderervalue.md) |

## Constructors

### constructor

\+ **new Listr**<Ctx, Renderer, FallbackRenderer\>(`task`: [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[], `options?`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, Renderer, FallbackRenderer\>): [*Listr*](index.listr.md)<Ctx, Renderer, FallbackRenderer\>

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | *any* |
| `Renderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | ``"default"`` |
| `FallbackRenderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | ``"verbose"`` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] |
| `options?` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, Renderer, FallbackRenderer\> |

**Returns:** [*Listr*](index.listr.md)<Ctx, Renderer, FallbackRenderer\>

Defined in: src/listr.ts:30

## Properties

### concurrency

• `Private` **concurrency**: *number*

Defined in: src/listr.ts:29

___

### err

• **err**: [*ListrError*](index.listrerror.md)[]= []

Defined in: src/listr.ts:25

___

### options

• `Optional` **options**: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, Renderer, FallbackRenderer\>

___

### renderHook$

• **renderHook$**: *Subject*<void\>

Defined in: src/listr.ts:28

___

### renderer

• `Private` **renderer**: [*ListrRenderer*](index.listrrenderer.md)

Defined in: src/listr.ts:30

___

### rendererClass

• **rendererClass**: *typeof* [*ListrRenderer*](index.listrrenderer.md)

Defined in: src/listr.ts:26

___

### rendererClassOptions

• **rendererClassOptions**: *Record*<string, any\>

Defined in: src/listr.ts:27

___

### task

• **task**: [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[]

___

### tasks

• **tasks**: [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[]= []

Defined in: src/listr.ts:24

## Methods

### add

▸ **add**(`task`: [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\> \| [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] |

**Returns:** *void*

Defined in: src/listr.ts:95

___

### checkAll

▸ `Private`**checkAll**(`context`: *any*): *Promise*<void[]\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `context` | *any* |

**Returns:** *Promise*<void[]\>

Defined in: src/listr.ts:151

___

### run

▸ **run**(`context?`: Ctx): *Promise*<Ctx\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `context?` | Ctx |

**Returns:** *Promise*<Ctx\>

Defined in: src/listr.ts:103

___

### runTask

▸ `Private`**runTask**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>, `context`: Ctx, `errors`: [*ListrError*](index.listrerror.md)[]): *Promise*<void\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\> |
| `context` | Ctx |
| `errors` | [*ListrError*](index.listrerror.md)[] |

**Returns:** *Promise*<void\>

Defined in: src/listr.ts:159
