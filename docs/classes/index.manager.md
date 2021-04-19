[listr2](../README.md) / [index](../modules/index.md) / Manager

# Class: Manager<Ctx, Renderer, FallbackRenderer\>

[index](../modules/index.md).Manager

Creates a new Listr2 task manager.

Useful for creating a single instace of Listr2 with pre-set settings.

## Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | [*ListrContext*](../types/index.listrcontext.md) |
| `Renderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | ``"default"`` |
| `FallbackRenderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | ``"verbose"`` |

## Constructors

### constructor

\+ **new Manager**<Ctx, Renderer, FallbackRenderer\>(`options?`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, Renderer, FallbackRenderer\>): [*Manager*](index.manager.md)<Ctx, Renderer, FallbackRenderer\>

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | *any* |
| `Renderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | ``"default"`` |
| `FallbackRenderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | ``"verbose"`` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options?` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, Renderer, FallbackRenderer\> |

**Returns:** [*Manager*](index.manager.md)<Ctx, Renderer, FallbackRenderer\>

Defined in: src/manager.ts:13

## Properties

### err

• **err**: [*ListrError*](index.listrerror.md)[]= []

Defined in: src/manager.ts:12

___

### options

• `Optional` **options**: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<Ctx, Renderer, FallbackRenderer\>

___

### tasks

• `Private` **tasks**: [*ListrTask*](../interfaces/index.listrtask.md)<any, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[]= []

Defined in: src/manager.ts:13

## Accessors

### ctx

• set **ctx**(`ctx`: Ctx): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `ctx` | Ctx |

**Returns:** *void*

Defined in: src/manager.ts:17

## Methods

### add

▸ **add**<InjectCtx\>(`tasks`: [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] \| (`ctx?`: InjectCtx) => [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[], `options?`: [*ListrSubClassOptions*](../types/index.listrsubclassoptions.md)<InjectCtx, Renderer\>): *void*

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `InjectCtx` | Ctx |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `tasks` | [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] \| (`ctx?`: InjectCtx) => [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] |
| `options?` | [*ListrSubClassOptions*](../types/index.listrsubclassoptions.md)<InjectCtx, Renderer\> |

**Returns:** *void*

Defined in: src/manager.ts:21

___

### getRuntime

▸ **getRuntime**(`pipetime`: *number*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `pipetime` | *number* |

**Returns:** *string*

Defined in: src/manager.ts:94

___

### indent

▸ **indent**<InjectCtx\>(`tasks`: [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] \| (`ctx?`: InjectCtx) => [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[], `options?`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, Renderer, FallbackRenderer\>, `taskOptions?`: *Omit*<[*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>, ``"task"``\>): [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `InjectCtx` | Ctx |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `tasks` | [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] \| (`ctx?`: InjectCtx) => [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] |
| `options?` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, Renderer, FallbackRenderer\> |
| `taskOptions?` | *Omit*<[*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>, ``"task"``\> |

**Returns:** [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>

Defined in: src/manager.ts:48

___

### newListr

▸ **newListr**<InjectCtx, InjectRenderer, InjectFallbackRenderer\>(`tasks`: [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<InjectRenderer\>\>[], `options?`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, InjectRenderer, InjectFallbackRenderer\>): [*Listr*](index.listr.md)<InjectCtx, InjectRenderer, InjectFallbackRenderer\>

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `InjectCtx` | - | - |
| `InjectRenderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | Renderer |
| `InjectFallbackRenderer` | [*ListrRendererValue*](../types/index.listrrenderervalue.md) | FallbackRenderer |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `tasks` | [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<InjectRenderer\>\>[] |
| `options?` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, InjectRenderer, InjectFallbackRenderer\> |

**Returns:** [*Listr*](index.listr.md)<InjectCtx, InjectRenderer, InjectFallbackRenderer\>

Defined in: src/manager.ts:41

___

### run

▸ **run**<InjectCtx\>(`tasks`: [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[], `options?`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, Renderer, FallbackRenderer\>): *Promise*<InjectCtx\>

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `InjectCtx` | Ctx |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `tasks` | [*ListrTask*](../interfaces/index.listrtask.md)<InjectCtx, [*ListrGetRendererClassFromValue*](../types/index.listrgetrendererclassfromvalue.md)<Renderer\>\>[] |
| `options?` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, Renderer, FallbackRenderer\> |

**Returns:** *Promise*<InjectCtx\>

Defined in: src/manager.ts:72

___

### runAll

▸ **runAll**<InjectCtx\>(`options?`: [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, Renderer, FallbackRenderer\>): *Promise*<InjectCtx\>

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `InjectCtx` | Ctx |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options?` | [*ListrBaseClassOptions*](../types/index.listrbaseclassoptions.md)<InjectCtx, Renderer, FallbackRenderer\> |

**Returns:** *Promise*<InjectCtx\>

Defined in: src/manager.ts:30
