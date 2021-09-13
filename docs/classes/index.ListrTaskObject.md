# Class: ListrTaskObject<Ctx, Renderer\>

[index](../modules/index.md).ListrTaskObject

Create a task from the given set of variables and make it runnable.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | `Ctx` |
| `Renderer` | extends [`ListrRendererFactory`](../types/index.ListrRendererFactory.md) |

## Hierarchy

- `Subject`<[`ListrEvent`](../types/index.ListrEvent.md)\>

  ↳ **`ListrTaskObject`**

## Properties

### \_isScalar

• **\_isScalar**: `boolean`

Internal implementation detail, do not use directly.

#### Inherited from

Subject.\_isScalar

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:15

___

### source

• **source**: `Observable`<`any`\>

**`deprecated`** This is an internal implementation detail, do not use.

#### Inherited from

Subject.source

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:17

___

### if

▪ `Static` **if**: <T, F\>(`condition`: () => `boolean`, `trueResult?`: `SubscribableOrPromise`<`T`\>, `falseResult?`: `SubscribableOrPromise`<`F`\>) => `Observable`<`T` \| `F`\>

**`nocollapse`**

**`deprecated`** In favor of iif creation function: import { iif } from 'rxjs';

#### Type declaration

▸ <`T`, `F`\>(`condition`, `trueResult?`, `falseResult?`): `Observable`<`T` \| `F`\>

Decides at subscription time which Observable will actually be subscribed.

<span class="informal">`If` statement for Observables.</span>

`iif` accepts a condition function and two Observables. When
an Observable returned by the operator is subscribed, condition function will be called.
Based on what boolean it returns at that moment, consumer will subscribe either to
the first Observable (if condition was true) or to the second (if condition was false). Condition
function may also not return anything - in that case condition will be evaluated as false and
second Observable will be subscribed.

Note that Observables for both cases (true and false) are optional. If condition points to an Observable that
was left undefined, resulting stream will simply complete immediately. That allows you to, rather
than controlling which Observable will be subscribed, decide at runtime if consumer should have access
to given Observable or not.

If you have more complex logic that requires decision between more than two Observables, {@link defer}
will probably be a better choice. Actually `iif` can be easily implemented with {@link defer}
and exists only for convenience and readability reasons.

## Examples
### Change at runtime which Observable will be subscribed
```ts
import { iif, of } from 'rxjs';

let subscribeToFirst;
const firstOrSecond = iif(
  () => subscribeToFirst,
  of('first'),
  of('second'),
);

subscribeToFirst = true;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "first"

subscribeToFirst = false;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "second"

```

### Control an access to an Observable
```ts
let accessGranted;
const observableIfYouHaveAccess = iif(
  () => accessGranted,
  of('It seems you have an access...'), // Note that only one Observable is passed to the operator.
);

accessGranted = true;
observableIfYouHaveAccess.subscribe(
  value => console.log(value),
  err => {},
  () => console.log('The end'),
);

// Logs:
// "It seems you have an access..."
// "The end"

accessGranted = false;
observableIfYouHaveAccess.subscribe(
  value => console.log(value),
  err => {},
  () => console.log('The end'),
);

// Logs:
// "The end"
```

**`see`** {@link defer}

**`static`** true

**`name`** iif

**`owner`** Observable

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `never` |
| `F` | `never` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | () => `boolean` | Condition which Observable should be chosen. |
| `trueResult?` | `SubscribableOrPromise`<`T`\> | - |
| `falseResult?` | `SubscribableOrPromise`<`F`\> | - |

##### Returns

`Observable`<`T` \| `F`\>

Either first or second Observable, depending on condition.

#### Inherited from

Subject.if

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:71

___

### throw

▪ `Static` **throw**: (`error`: `any`, `scheduler?`: `SchedulerLike`) => `Observable`<`never`\>

**`nocollapse`**

**`deprecated`** In favor of throwError creation function: import { throwError } from 'rxjs';

#### Type declaration

▸ (`error`, `scheduler?`): `Observable`<`never`\>

Creates an Observable that emits no items to the Observer and immediately
emits an error notification.

<span class="informal">Just emits 'error', and nothing else.
</span>

![](throw.png)

This static operator is useful for creating a simple Observable that only
emits the error notification. It can be used for composing with other
Observables, such as in a {@link mergeMap}.

## Examples
### Emit the number 7, then emit an error
```ts
import { throwError, concat, of } from 'rxjs';

const result = concat(of(7), throwError(new Error('oops!')));
result.subscribe(x => console.log(x), e => console.error(e));

// Logs:
// 7
// Error: oops!
```

---

### Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 2
```ts
import { throwError, interval, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interval(1000).pipe(
  mergeMap(x => x === 2
    ? throwError('Twos are bad')
    : of('a', 'b', 'c')
  ),
).subscribe(x => console.log(x), e => console.error(e));

// Logs:
// a
// b
// c
// a
// b
// c
// Twos are bad
```

**`see`** {@link Observable}

**`see`** {@link empty}

**`see`** {@link never}

**`see`** {@link of}

**`static`** true

**`name`** throwError

**`owner`** Observable

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `any` | The particular Error to pass to the error notification. |
| `scheduler?` | `SchedulerLike` | - |

##### Returns

`Observable`<`never`\>

An error Observable: emits only the error notification
using the given error argument.

#### Inherited from

Subject.throw

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:76

___

### observers

• **observers**: `Observer`<[`ListrEvent`](../types/index.ListrEvent.md)\>[]

#### Inherited from

Subject.observers

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:23

___

### create

▪ `Static` **create**: `Function`

**`nocollapse`**

**`deprecated`** use new Subject() instead

#### Inherited from

Subject.create

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:32

___

### operator

• **operator**: `Operator`<`any`, [`ListrEvent`](../types/index.ListrEvent.md)\>

**`deprecated`** This is an internal implementation detail, do not use.

#### Inherited from

Subject.operator

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:19

___

### closed

• **closed**: `boolean`

#### Inherited from

Subject.closed

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:24

___

### isStopped

• **isStopped**: `boolean`

#### Inherited from

Subject.isStopped

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:25

___

### hasError

• **hasError**: `boolean`

#### Inherited from

Subject.hasError

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:26

___

### thrownError

• **thrownError**: `any`

#### Inherited from

Subject.thrownError

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:27

___

### id

• **id**: `string`

Unique id per task, randomly generated in the uuid v4 format

#### Defined in

src/lib/task.ts:21

___

### state

• **state**: `string`

The current state of the task.

#### Defined in

src/lib/task.ts:23

___

### task

• **task**: (`ctx`: `Ctx`, `task`: [`ListrTaskWrapper`](index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\>) => `void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

The task object itself, to further utilize it.

#### Type declaration

▸ (`ctx`, `task`): `void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

The task object itself, to further utilize it.

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |
| `task` | [`ListrTaskWrapper`](index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\> |

##### Returns

`void` \| [`ListrTaskResult`](../types/index.ListrTaskResult.md)<`Ctx`\>

#### Defined in

src/lib/task.ts:25

___

### subtasks

• **subtasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`Ctx`, `any`\>[]

Extend current task with multiple subtasks.

#### Defined in

src/lib/task.ts:27

___

### title

• `Optional` **title**: `string`

Title of the task

#### Defined in

src/lib/task.ts:29

___

### initialTitle

• `Optional` **initialTitle**: `string`

Untouched unchanged title of the task

#### Defined in

src/lib/task.ts:31

___

### output

• `Optional` **output**: `string`

Output data from the task.

#### Defined in

src/lib/task.ts:33

___

### skip

• **skip**: `string` \| `boolean` \| (`ctx`: `Ctx`) => `string` \| `boolean` \| `Promise`<`string` \| `boolean`\>

Skip current task.

#### Defined in

src/lib/task.ts:35

___

### retry

• `Optional` **retry**: `Object`

Current retry number of the task if retrying

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `withError?` | `any` |

#### Defined in

src/lib/task.ts:37

___

### message

• **message**: `Object` = `{}`

A channel for messages.

This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `duration?` | `number` | Run time of the task, if it has been successfully resolved. |
| `error?` | `string` | Error message of the task, if it has been failed. |
| `skip?` | `string` | Skip message of the task, if it has been skipped. |
| `rollback?` | `string` | Rollback message of the task, if the rollback finishes |
| `retry?` | `Object` | Retry messages |
| `retry.count` | `number` | - |
| `retry.withError?` | `any` | - |

#### Defined in

src/lib/task.ts:44

___

### rendererTaskOptions

• **rendererTaskOptions**: [`ListrGetRendererTaskOptions`](../types/index.ListrGetRendererTaskOptions.md)<`Renderer`\>

Per task options for the current renderer of the task.

#### Defined in

src/lib/task.ts:57

___

### renderHook$

• **renderHook$**: `Subject`<`void`\>

This will be triggered each time a new render should happen.

#### Defined in

src/lib/task.ts:59

___

### prompt

• **prompt**: [`PromptError`](index.PromptError.md) \| [`PromptInstance`](../interfaces/index.PromptInstance.md)

#### Defined in

src/lib/task.ts:61

___

### enabled

• `Private` **enabled**: `boolean`

#### Defined in

src/lib/task.ts:62

___

### enabledFn

• `Private` **enabledFn**: `boolean` \| (`ctx`: `Ctx`) => `boolean` \| `Promise`<`boolean`\>

#### Defined in

src/lib/task.ts:63

___

### listr

• **listr**: [`Listr`](index.Listr.md)<`Ctx`, `any`, `any`\>

___

### tasks

• **tasks**: [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, `any`\>

___

### options

• **options**: [`ListrOptions`](../interfaces/index.ListrOptions.md)<`any`\>

___

### rendererOptions

• **rendererOptions**: [`ListrGetRendererOptions`](../types/index.ListrGetRendererOptions.md)<`Renderer`\>

## Constructors

### constructor

• **new ListrTaskObject**<`Ctx`, `Renderer`\>(`listr`, `tasks`, `options`, `rendererOptions`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | `Ctx` |
| `Renderer` | extends typeof [`ListrRenderer`](index.ListrRenderer.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `listr` | [`Listr`](index.Listr.md)<`Ctx`, `any`, `any`\> |
| `tasks` | [`ListrTask`](../interfaces/index.ListrTask.md)<`Ctx`, `any`\> |
| `options` | [`ListrOptions`](../interfaces/index.ListrOptions.md)<`any`\> |
| `rendererOptions` | [`ListrGetRendererOptions`](../types/index.ListrGetRendererOptions.md)<`Renderer`\> |

#### Overrides

Subject&lt;ListrEvent\&gt;.constructor

#### Defined in

src/lib/task.ts:65

## Methods

### subscribe

▸ **subscribe**(`observer?`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer?` | `PartialObserver`<[`ListrEvent`](../types/index.ListrEvent.md)\> |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:47

▸ **subscribe**(`next`, `error`, `complete`): `Subscription`

**`deprecated`** Use an observer instead of a complete callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | ``null`` |
| `error` | ``null`` |
| `complete` | () => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:49

▸ **subscribe**(`next`, `error`, `complete?`): `Subscription`

**`deprecated`** Use an observer instead of an error callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | ``null`` |
| `error` | (`error`: `any`) => `void` |
| `complete?` | () => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:51

▸ **subscribe**(`next`, `error`, `complete`): `Subscription`

**`deprecated`** Use an observer instead of a complete callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`value`: [`ListrEvent`](../types/index.ListrEvent.md)) => `void` |
| `error` | ``null`` |
| `complete` | () => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:53

▸ **subscribe**(`next?`, `error?`, `complete?`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next?` | (`value`: [`ListrEvent`](../types/index.ListrEvent.md)) => `void` |
| `error?` | (`error`: `any`) => `void` |
| `complete?` | () => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:54

___

### forEach

▸ **forEach**(`next`, `promiseCtor?`): `Promise`<`void`\>

**`method`** forEach

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: [`ListrEvent`](../types/index.ListrEvent.md)) => `void` | a handler for each value emitted by the observable |
| `promiseCtor?` | `PromiseConstructorLike` | - |

#### Returns

`Promise`<`void`\>

a promise that either resolves on observable completion or
 rejects with the handled error

#### Inherited from

Subject.forEach

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:64

___

### pipe

▸ **pipe**(): `Observable`<[`ListrEvent`](../types/index.ListrEvent.md)\>

#### Returns

`Observable`<[`ListrEvent`](../types/index.ListrEvent.md)\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:77

▸ **pipe**<`A`\>(`op1`): `Observable`<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |

#### Returns

`Observable`<`A`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:78

▸ **pipe**<`A`, `B`\>(`op1`, `op2`): `Observable`<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |

#### Returns

`Observable`<`B`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:79

▸ **pipe**<`A`, `B`, `C`\>(`op1`, `op2`, `op3`): `Observable`<`C`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |

#### Returns

`Observable`<`C`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:80

▸ **pipe**<`A`, `B`, `C`, `D`\>(`op1`, `op2`, `op3`, `op4`): `Observable`<`D`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |

#### Returns

`Observable`<`D`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:81

▸ **pipe**<`A`, `B`, `C`, `D`, `E`\>(`op1`, `op2`, `op3`, `op4`, `op5`): `Observable`<`E`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |

#### Returns

`Observable`<`E`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:82

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`): `Observable`<`F`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |

#### Returns

`Observable`<`F`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:83

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`): `Observable`<`G`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |

#### Returns

`Observable`<`G`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:84

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`): `Observable`<`H`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |

#### Returns

`Observable`<`H`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:85

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`): `Observable`<`I`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |
| `op9` | `OperatorFunction`<`H`, `I`\> |

#### Returns

`Observable`<`I`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:86

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`, ...`operations`): `Observable`<`Object`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ListrEvent`](../types/index.ListrEvent.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |
| `op9` | `OperatorFunction`<`H`, `I`\> |
| `...operations` | `OperatorFunction`<`any`, `any`\>[] |

#### Returns

`Observable`<`Object`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:87

___

### toPromise

▸ **toPromise**<`T`\>(): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`Promise`<`T`\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:88

▸ **toPromise**<`T`\>(`PromiseCtor`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | `PromiseConstructor` |

#### Returns

`Promise`<`T`\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:89

▸ **toPromise**<`T`\>(`PromiseCtor`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | `PromiseConstructorLike` |

#### Returns

`Promise`<`T`\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/rxjs/internal/Observable.d.ts:90

___

### lift

▸ **lift**<`R`\>(`operator`): `Observable`<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `Operator`<[`ListrEvent`](../types/index.ListrEvent.md), `R`\> |

#### Returns

`Observable`<`R`\>

#### Inherited from

Subject.lift

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:33

___

### next

▸ **next**(`value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`ListrEvent`](../types/index.ListrEvent.md) |

#### Returns

`void`

#### Inherited from

Subject.next

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:34

___

### error

▸ **error**(`err`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |

#### Returns

`void`

#### Inherited from

Subject.error

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:35

___

### complete

▸ **complete**(): `void`

#### Returns

`void`

#### Inherited from

Subject.complete

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:36

___

### unsubscribe

▸ **unsubscribe**(): `void`

#### Returns

`void`

#### Inherited from

Subject.unsubscribe

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:37

___

### \_trySubscribe

▸ **_trySubscribe**(`subscriber`): `TeardownLogic`

**`deprecated`** This is an internal implementation detail, do not use.

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriber` | `Subscriber`<[`ListrEvent`](../types/index.ListrEvent.md)\> |

#### Returns

`TeardownLogic`

#### Inherited from

Subject.\_trySubscribe

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:39

___

### \_subscribe

▸ **_subscribe**(`subscriber`): `Subscription`

**`deprecated`** This is an internal implementation detail, do not use.

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriber` | `Subscriber`<[`ListrEvent`](../types/index.ListrEvent.md)\> |

#### Returns

`Subscription`

#### Inherited from

Subject.\_subscribe

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:41

___

### asObservable

▸ **asObservable**(): `Observable`<[`ListrEvent`](../types/index.ListrEvent.md)\>

Creates a new Observable with this Subject as the source. You can do this
to create customize Observer-side logic of the Subject and conceal it from
code that uses the Observable.

#### Returns

`Observable`<[`ListrEvent`](../types/index.ListrEvent.md)\>

Observable that the Subject casts to

#### Inherited from

Subject.asObservable

#### Defined in

node_modules/rxjs/internal/Subject.d.ts:48

___

### check

▸ **check**(`ctx`): `Promise`<`void`\>

A function to check whether this task should run at all via enable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |

#### Returns

`Promise`<`void`\>

#### Defined in

src/lib/task.ts:137

___

### hasSubtasks

▸ **hasSubtasks**(): `boolean`

Returns whether this task has subtasks.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:150

___

### isPending

▸ **isPending**(): `boolean`

Returns whether this task is in progress.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:155

___

### isSkipped

▸ **isSkipped**(): `boolean`

Returns whether this task is skipped.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:160

___

### isCompleted

▸ **isCompleted**(): `boolean`

Returns whether this task has been completed.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:165

___

### hasFailed

▸ **hasFailed**(): `boolean`

Returns whether this task has been failed.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:170

___

### isRollingBack

▸ **isRollingBack**(): `boolean`

Returns whether this task has an active rollback task going on.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:175

___

### hasRolledBack

▸ **hasRolledBack**(): `boolean`

Returns whether the rollback action was successful.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:180

___

### isRetrying

▸ **isRetrying**(): `boolean`

Returns whether this task has an actively retrying task going on.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:185

___

### isEnabled

▸ **isEnabled**(): `boolean`

Returns whether enabled function resolves to true.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:190

___

### hasTitle

▸ **hasTitle**(): `boolean`

Returns whether this task actually has a title.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:195

___

### isPrompt

▸ **isPrompt**(): `boolean`

Returns whether this task has a prompt inside.

#### Returns

`boolean`

#### Defined in

src/lib/task.ts:200

___

### run

▸ **run**(`context`, `wrapper`): `Promise`<`void`\>

Run the current task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Ctx` |
| `wrapper` | [`ListrTaskWrapper`](index.ListrTaskWrapper.md)<`Ctx`, `Renderer`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

src/lib/task.ts:205

## Accessors

### state$

• `set` **state$**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`ListrTaskState`](../enums/index.ListrTaskState.md) |

#### Returns

`void`

#### Defined in

src/lib/task.ts:89

___

### output$

• `set` **output$**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`void`

#### Defined in

src/lib/task.ts:107

___

### message$

• `set` **message$**(`data`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Object` | - |
| `data.duration?` | `number` | Run time of the task, if it has been successfully resolved. |
| `data.error?` | `string` | Error message of the task, if it has been failed. |
| `data.skip?` | `string` | Skip message of the task, if it has been skipped. |
| `data.rollback?` | `string` | Rollback message of the task, if the rollback finishes |
| `data.retry?` | `Object` | Retry messages |
| `data.retry.count` | `number` | - |
| `data.retry.withError?` | `any` | - |

#### Returns

`void`

#### Defined in

src/lib/task.ts:116

___

### title$

• `set` **title$**(`title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |

#### Returns

`void`

#### Defined in

src/lib/task.ts:125
