[listr2](../README.md) / [index](../modules/index.md) / ListrTaskObject

# Class: ListrTaskObject<Ctx, Renderer\>

[index](../modules/index.md).ListrTaskObject

Create a task from the given set of variables and make it runnable.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | - |
| `Renderer` | [*ListrRendererFactory*](../types/index.listrrendererfactory.md) |

## Hierarchy

- *Subject*<[*ListrEvent*](../types/index.listrevent.md)\>

  ↳ **ListrTaskObject**

## Constructors

### constructor

\+ **new ListrTaskObject**<Ctx, Renderer\>(`listr`: [*Listr*](index.listr.md)<Ctx, any, any\>, `tasks`: [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, any\>, `options`: [*ListrOptions*](../interfaces/index.listroptions.md)<any\>, `rendererOptions`: [*ListrGetRendererOptions*](../types/index.listrgetrendereroptions.md)<Renderer\>): [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, Renderer\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | - |
| `Renderer` | *typeof* [*ListrRenderer*](index.listrrenderer.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `listr` | [*Listr*](index.listr.md)<Ctx, any, any\> |
| `tasks` | [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, any\> |
| `options` | [*ListrOptions*](../interfaces/index.listroptions.md)<any\> |
| `rendererOptions` | [*ListrGetRendererOptions*](../types/index.listrgetrendereroptions.md)<Renderer\> |

**Returns:** [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, Renderer\>

Overrides: Subject&lt;ListrEvent\&gt;.constructor

Defined in: src/lib/task.ts:63

## Properties

### closed

• **closed**: *boolean*

Inherited from: Subject.closed

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:12

___

### enabled

• `Private` **enabled**: *boolean*

Defined in: src/lib/task.ts:62

___

### enabledFn

• `Private` **enabledFn**: *boolean* \| (`ctx`: Ctx) => *boolean* \| *Promise*<boolean\>

Defined in: src/lib/task.ts:63

___

### hasError

• **hasError**: *boolean*

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

Inherited from: Subject.hasError

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:18

___

### id

• **id**: *string*

Unique id per task, randomly generated in the uuid v4 format

Defined in: src/lib/task.ts:21

___

### initialTitle

• `Optional` **initialTitle**: *string*

Untouched unchanged title of the task

Defined in: src/lib/task.ts:31

___

### isStopped

• **isStopped**: *boolean*

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

Inherited from: Subject.isStopped

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:16

___

### listr

• **listr**: [*Listr*](index.listr.md)<Ctx, any, any\>

___

### message

• **message**: *object*= {}

A channel for messages.

This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `duration?` | *number* | Run time of the task, if it has been successfully resolved. |
| `error?` | *string* | Error message of the task, if it has been failed. |
| `retry?` | *object* | Retry messages |
| `retry.count` | *number* | - |
| `retry.withError?` | *any* | - |
| `rollback?` | *string* | Rollback message of the task, if the rollback finishes |
| `skip?` | *string* | Skip message of the task, if it has been skipped. |

Defined in: src/lib/task.ts:44

___

### observers

• **observers**: *Observer*<[*ListrEvent*](../types/index.listrevent.md)\>[]

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

Inherited from: Subject.observers

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:14

___

### operator

• **operator**: *Operator*<any, [*ListrEvent*](../types/index.listrevent.md)\>

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

Inherited from: Subject.operator

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:22

___

### options

• **options**: [*ListrOptions*](../interfaces/index.listroptions.md)<any\>

___

### output

• `Optional` **output**: *string*

Output data from the task.

Defined in: src/lib/task.ts:33

___

### prompt

• **prompt**: [*PromptError*](index.prompterror.md) \| [*PromptInstance*](../interfaces/index.promptinstance.md)

Defined in: src/lib/task.ts:61

___

### renderHook$

• **renderHook$**: *Subject*<void\>

This will be triggered each time a new render should happen.

Defined in: src/lib/task.ts:59

___

### rendererOptions

• **rendererOptions**: [*ListrGetRendererOptions*](../types/index.listrgetrendereroptions.md)<Renderer\>

___

### rendererTaskOptions

• **rendererTaskOptions**: [*ListrGetRendererTaskOptions*](../types/index.listrgetrenderertaskoptions.md)<Renderer\>

Per task options for the current renderer of the task.

Defined in: src/lib/task.ts:57

___

### retry

• `Optional` **retry**: *object*

Current retry number of the task if retrying

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | *number* |
| `withError?` | *any* |

Defined in: src/lib/task.ts:37

___

### skip

• **skip**: *string* \| *boolean* \| (`ctx`: Ctx) => *string* \| *boolean* \| *Promise*<boolean\> \| *Promise*<string\>

Skip current task.

Defined in: src/lib/task.ts:35

___

### source

• **source**: *Observable*<any\>

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

Inherited from: Subject.source

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:18

___

### state

• **state**: *string*

The current state of the task.

Defined in: src/lib/task.ts:23

___

### subtasks

• **subtasks**: [*ListrTaskObject*](index.listrtaskobject.md)<Ctx, any\>[]

Extend current task with multiple subtasks.

Defined in: src/lib/task.ts:27

___

### task

• **task**: (`ctx`: Ctx, `task`: [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>) => *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

The task object itself, to further utilize it.

#### Type declaration

▸ (`ctx`: Ctx, `task`: [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>): *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | Ctx |
| `task` | [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\> |

**Returns:** *void* \| [*ListrTaskResult*](../types/index.listrtaskresult.md)<Ctx\>

Defined in: src/lib/task.ts:25

___

### tasks

• **tasks**: [*ListrTask*](../interfaces/index.listrtask.md)<Ctx, any\>

___

### thrownError

• **thrownError**: *any*

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

Inherited from: Subject.thrownError

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:20

___

### title

• `Optional` **title**: *string*

Title of the task

Defined in: src/lib/task.ts:29

___

### create

▪ `Static` **create**: (...`args`: *any*[]) => *any*

Creates a "subject" by basically gluing an observer to an observable.

**`nocollapse`**

**`deprecated`** Recommended you do not use. Will be removed at some point in the future. Plans for replacement still under discussion.

#### Type declaration

▸ (...`args`: *any*[]): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | *any*[] |

**Returns:** *any*

Inherited from: Subject.create

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:27

## Accessors

### message$

• set **message$**(`data`: { `duration?`: *number* ; `error?`: *string* ; `retry?`: { `count`: *number* ; `withError?`: *any*  } ; `rollback?`: *string* ; `skip?`: *string*  }): *void*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | *object* | - |
| `data.duration?` | *number* | Run time of the task, if it has been successfully resolved. |
| `data.error?` | *string* | Error message of the task, if it has been failed. |
| `data.retry?` | *object* | Retry messages |
| `data.retry.count` | *number* | - |
| `data.retry.withError?` | *any* | - |
| `data.rollback?` | *string* | Rollback message of the task, if the rollback finishes |
| `data.skip?` | *string* | Skip message of the task, if it has been skipped. |

**Returns:** *void*

Defined in: src/lib/task.ts:116

___

### observed

• get **observed**(): *boolean*

**Returns:** *boolean*

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:35

___

### output$

• set **output$**(`data`: *string*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | *string* |

**Returns:** *void*

Defined in: src/lib/task.ts:107

___

### state$

• set **state$**(`state`: [*ListrTaskState*](../enums/index.listrtaskstate.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [*ListrTaskState*](../enums/index.listrtaskstate.md) |

**Returns:** *void*

Defined in: src/lib/task.ts:89

___

### title$

• set **title$**(`title`: *string*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | *string* |

**Returns:** *void*

Defined in: src/lib/task.ts:125

## Methods

### asObservable

▸ **asObservable**(): *Observable*<[*ListrEvent*](../types/index.listrevent.md)\>

Creates a new Observable with this Subject as the source. You can do this
to create customize Observer-side logic of the Subject and conceal it from
code that uses the Observable.

**Returns:** *Observable*<[*ListrEvent*](../types/index.listrevent.md)\>

Observable that the Subject casts to

Inherited from: Subject.asObservable

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:42

___

### check

▸ **check**(`ctx`: Ctx): *Promise*<void\>

A function to check whether this task should run at all via enable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | Ctx |

**Returns:** *Promise*<void\>

Defined in: src/lib/task.ts:137

___

### complete

▸ **complete**(): *void*

**Returns:** *void*

Inherited from: Subject.complete

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:33

___

### error

▸ **error**(`err`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | *any* |

**Returns:** *void*

Inherited from: Subject.error

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:32

___

### forEach

▸ **forEach**(`next`: (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void*): *Promise*<void\>

Used as a NON-CANCELLABLE means of subscribing to an observable, for use with
APIs that expect promises, like `async/await`. You cannot unsubscribe from this.

**WARNING**: Only use this with observables you *know* will complete. If the source
observable does not complete, you will end up with a promise that is hung up, and
potentially all of the state of an async function hanging out in memory. To avoid
this situation, look into adding something like {@link timeout}, {@link take},
{@link takeWhile}, or {@link takeUntil} amongst others.

### Example:

```ts
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const source$ = interval(1000).pipe(take(4));

async function getTotal() {
   let total = 0;

   await source$.forEach(value => {
     total += value;
     console.log('observable -> ', value);
   });

   return total;
}

getTotal().then(
   total => console.log('Total:', total)
)

// Expected:
// "observable -> 0"
// "observable -> 1"
// "observable -> 2"
// "observable -> 3"
// "Total: 6"
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void* | a handler for each value emitted by the observable |

**Returns:** *Promise*<void\>

a promise that either resolves on observable completion or
 rejects with the handled error

Inherited from: Subject.forEach

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:105

▸ **forEach**(`next`: (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void*, `promiseCtor`: PromiseConstructorLike): *Promise*<void\>

**`deprecated`** Passing a Promise constructor will no longer be available
in upcoming versions of RxJS. This is because it adds weight to the library, for very
little benefit. If you need this functionality, it is recommended that you either
polyfill Promise, or you create an adapter to convert the returned native promise
to whatever promise implementation you wanted. Will be removed in v8.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void* | a handler for each value emitted by the observable |
| `promiseCtor` | PromiseConstructorLike | a constructor function used to instantiate the Promise |

**Returns:** *Promise*<void\>

a promise that either resolves on observable completion or
 rejects with the handled error

Inherited from: Subject.forEach

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:117

___

### hasFailed

▸ **hasFailed**(): *boolean*

Returns whether this task has been failed.

**Returns:** *boolean*

Defined in: src/lib/task.ts:170

___

### hasRolledBack

▸ **hasRolledBack**(): *boolean*

Returns whether the rollback action was successful.

**Returns:** *boolean*

Defined in: src/lib/task.ts:180

___

### hasSubtasks

▸ **hasSubtasks**(): *boolean*

Returns whether this task has subtasks.

**Returns:** *boolean*

Defined in: src/lib/task.ts:150

___

### hasTitle

▸ **hasTitle**(): *boolean*

Returns whether this task actually has a title.

**Returns:** *boolean*

Defined in: src/lib/task.ts:195

___

### isCompleted

▸ **isCompleted**(): *boolean*

Returns whether this task has been completed.

**Returns:** *boolean*

Defined in: src/lib/task.ts:165

___

### isEnabled

▸ **isEnabled**(): *boolean*

Returns whether enabled function resolves to true.

**Returns:** *boolean*

Defined in: src/lib/task.ts:190

___

### isPending

▸ **isPending**(): *boolean*

Returns whether this task is in progress.

**Returns:** *boolean*

Defined in: src/lib/task.ts:155

___

### isPrompt

▸ **isPrompt**(): *boolean*

Returns whether this task has a prompt inside.

**Returns:** *boolean*

Defined in: src/lib/task.ts:200

___

### isRetrying

▸ **isRetrying**(): *boolean*

Returns whether this task has an actively retrying task going on.

**Returns:** *boolean*

Defined in: src/lib/task.ts:185

___

### isRollingBack

▸ **isRollingBack**(): *boolean*

Returns whether this task has an active rollback task going on.

**Returns:** *boolean*

Defined in: src/lib/task.ts:175

___

### isSkipped

▸ **isSkipped**(): *boolean*

Returns whether this task is skipped.

**Returns:** *boolean*

Defined in: src/lib/task.ts:160

___

### lift

▸ **lift**<R\>(`operator`: *Operator*<[*ListrEvent*](../types/index.listrevent.md), R\>): *Observable*<R\>

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *Operator*<[*ListrEvent*](../types/index.listrevent.md), R\> |

**Returns:** *Observable*<R\>

Inherited from: Subject.lift

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:30

___

### next

▸ **next**(`value`: [*ListrEvent*](../types/index.listrevent.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [*ListrEvent*](../types/index.listrevent.md) |

**Returns:** *void*

Inherited from: Subject.next

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:31

___

### pipe

▸ **pipe**(): *Observable*<[*ListrEvent*](../types/index.listrevent.md)\>

**Returns:** *Observable*<[*ListrEvent*](../types/index.listrevent.md)\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:118

▸ **pipe**<A\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>): *Observable*<A\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |

**Returns:** *Observable*<A\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:119

▸ **pipe**<A, B\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>): *Observable*<B\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |

**Returns:** *Observable*<B\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:120

▸ **pipe**<A, B, C\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>): *Observable*<C\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |

**Returns:** *Observable*<C\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:121

▸ **pipe**<A, B, C, D\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>): *Observable*<D\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |

**Returns:** *Observable*<D\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:122

▸ **pipe**<A, B, C, D, E\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>, `op5`: *OperatorFunction*<D, E\>): *Observable*<E\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |
| `op5` | *OperatorFunction*<D, E\> |

**Returns:** *Observable*<E\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:123

▸ **pipe**<A, B, C, D, E, F\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>, `op5`: *OperatorFunction*<D, E\>, `op6`: *OperatorFunction*<E, F\>): *Observable*<F\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |
| `op5` | *OperatorFunction*<D, E\> |
| `op6` | *OperatorFunction*<E, F\> |

**Returns:** *Observable*<F\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:124

▸ **pipe**<A, B, C, D, E, F, G\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>, `op5`: *OperatorFunction*<D, E\>, `op6`: *OperatorFunction*<E, F\>, `op7`: *OperatorFunction*<F, G\>): *Observable*<G\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |
| `op5` | *OperatorFunction*<D, E\> |
| `op6` | *OperatorFunction*<E, F\> |
| `op7` | *OperatorFunction*<F, G\> |

**Returns:** *Observable*<G\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:125

▸ **pipe**<A, B, C, D, E, F, G, H\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>, `op5`: *OperatorFunction*<D, E\>, `op6`: *OperatorFunction*<E, F\>, `op7`: *OperatorFunction*<F, G\>, `op8`: *OperatorFunction*<G, H\>): *Observable*<H\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |
| `op5` | *OperatorFunction*<D, E\> |
| `op6` | *OperatorFunction*<E, F\> |
| `op7` | *OperatorFunction*<F, G\> |
| `op8` | *OperatorFunction*<G, H\> |

**Returns:** *Observable*<H\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:126

▸ **pipe**<A, B, C, D, E, F, G, H, I\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>, `op5`: *OperatorFunction*<D, E\>, `op6`: *OperatorFunction*<E, F\>, `op7`: *OperatorFunction*<F, G\>, `op8`: *OperatorFunction*<G, H\>, `op9`: *OperatorFunction*<H, I\>): *Observable*<I\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |
| `op5` | *OperatorFunction*<D, E\> |
| `op6` | *OperatorFunction*<E, F\> |
| `op7` | *OperatorFunction*<F, G\> |
| `op8` | *OperatorFunction*<G, H\> |
| `op9` | *OperatorFunction*<H, I\> |

**Returns:** *Observable*<I\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:127

▸ **pipe**<A, B, C, D, E, F, G, H, I\>(`op1`: *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\>, `op2`: *OperatorFunction*<A, B\>, `op3`: *OperatorFunction*<B, C\>, `op4`: *OperatorFunction*<C, D\>, `op5`: *OperatorFunction*<D, E\>, `op6`: *OperatorFunction*<E, F\>, `op7`: *OperatorFunction*<F, G\>, `op8`: *OperatorFunction*<G, H\>, `op9`: *OperatorFunction*<H, I\>, ...`operations`: *OperatorFunction*<any, any\>[]): *Observable*<unknown\>

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
| `op1` | *OperatorFunction*<[*ListrEvent*](../types/index.listrevent.md), A\> |
| `op2` | *OperatorFunction*<A, B\> |
| `op3` | *OperatorFunction*<B, C\> |
| `op4` | *OperatorFunction*<C, D\> |
| `op5` | *OperatorFunction*<D, E\> |
| `op6` | *OperatorFunction*<E, F\> |
| `op7` | *OperatorFunction*<F, G\> |
| `op8` | *OperatorFunction*<G, H\> |
| `op9` | *OperatorFunction*<H, I\> |
| `...operations` | *OperatorFunction*<any, any\>[] |

**Returns:** *Observable*<unknown\>

Inherited from: Subject.pipe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:128

___

### run

▸ **run**(`context`: Ctx, `wrapper`: [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\>): *Promise*<void\>

Run the current task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | Ctx |
| `wrapper` | [*ListrTaskWrapper*](index.listrtaskwrapper.md)<Ctx, Renderer\> |

**Returns:** *Promise*<void\>

Defined in: src/lib/task.ts:209

___

### subscribe

▸ **subscribe**(`observer?`: *Partial*<Observer<[*ListrEvent*](../types/index.listrevent.md)\>\>): *Subscription*

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer?` | *Partial*<Observer<[*ListrEvent*](../types/index.listrevent.md)\>\> |

**Returns:** *Subscription*

Inherited from: Subject.subscribe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:53

▸ **subscribe**(`next`: (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void*): *Subscription*

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void* |

**Returns:** *Subscription*

Inherited from: Subject.subscribe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:54

▸ **subscribe**(`next?`: (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void*, `error?`: (`error`: *any*) => *void*, `complete?`: () => *void*): *Subscription*

**`deprecated`** Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments

#### Parameters

| Name | Type |
| :------ | :------ |
| `next?` | (`value`: [*ListrEvent*](../types/index.listrevent.md)) => *void* |
| `error?` | (`error`: *any*) => *void* |
| `complete?` | () => *void* |

**Returns:** *Subscription*

Inherited from: Subject.subscribe

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:56

___

### toPromise

▸ **toPromise**(): *Promise*<[*ListrEvent*](../types/index.listrevent.md)\>

**`deprecated`** Replaced with {@link firstValueFrom} and {@link lastValueFrom}. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

**Returns:** *Promise*<[*ListrEvent*](../types/index.listrevent.md)\>

Inherited from: Subject.toPromise

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:130

▸ **toPromise**(`PromiseCtor`: PromiseConstructor): *Promise*<[*ListrEvent*](../types/index.listrevent.md)\>

**`deprecated`** Replaced with {@link firstValueFrom} and {@link lastValueFrom}. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | PromiseConstructor |

**Returns:** *Promise*<[*ListrEvent*](../types/index.listrevent.md)\>

Inherited from: Subject.toPromise

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:132

▸ **toPromise**(`PromiseCtor`: PromiseConstructorLike): *Promise*<[*ListrEvent*](../types/index.listrevent.md)\>

**`deprecated`** Replaced with {@link firstValueFrom} and {@link lastValueFrom}. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | PromiseConstructorLike |

**Returns:** *Promise*<[*ListrEvent*](../types/index.listrevent.md)\>

Inherited from: Subject.toPromise

Defined in: node_modules/rxjs/dist/types/internal/Observable.d.ts:134

___

### unsubscribe

▸ **unsubscribe**(): *void*

**Returns:** *void*

Inherited from: Subject.unsubscribe

Defined in: node_modules/rxjs/dist/types/internal/Subject.d.ts:34
