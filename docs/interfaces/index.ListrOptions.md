# Interface: ListrOptions<Ctx\>

[index](../modules/index.md).ListrOptions

Options to set the behavior of this base task.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | [`ListrContext`](../types/index.ListrContext.md) |

## Properties

### concurrent

• `Optional` **concurrent**: `number` \| `boolean`

Concurrency will set how many tasks will be run in parallel.

**`default`** false > Default is to run everything synchronously.

`true` will set it to `Infinity`, `false` will set it to synchronous.
If you pass in a `number` it will limit it at that number.

#### Defined in

[src/interfaces/listr.interface.ts:82](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L82)

___

### exitOnError

• `Optional` **exitOnError**: `boolean`

Determine the behavior of exiting on errors.

**`default`** true > exit on any error coming from the tasks.

#### Defined in

[src/interfaces/listr.interface.ts:88](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L88)

___

### exitAfterRollback

• `Optional` **exitAfterRollback**: `boolean`

Determine the behaviour of exiting after rollback actions.

**`default`** true > exit after rolling back tasks

#### Defined in

[src/interfaces/listr.interface.ts:94](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L94)

___

### ctx

• `Optional` **ctx**: `Ctx`

To inject a context through this options wrapper. Mostly useful when combined with manager.

**`default`** any

#### Defined in

[src/interfaces/listr.interface.ts:99](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L99)

___

### registerSignalListeners

• `Optional` **registerSignalListeners**: `boolean`

By default, Listr2 will track SIGINIT signal to update the renderer one last time before compeletely failing.

**`default`** true

#### Defined in

[src/interfaces/listr.interface.ts:104](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L104)

___

### rendererFallback

• `Optional` **rendererFallback**: `boolean` \| () => `boolean`

Determine the certain condition required to use the non-tty renderer.

**`default`** null > handled internally

#### Defined in

[src/interfaces/listr.interface.ts:109](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L109)

___

### rendererSilent

• `Optional` **rendererSilent**: `boolean` \| () => `boolean`

Determine the certain condition required to use the silent renderer.

**`default`** null > handled internally

#### Defined in

[src/interfaces/listr.interface.ts:114](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L114)

___

### disableColor

• `Optional` **disableColor**: `boolean`

Disabling the color, useful for tests and such.

**`default`** false

#### Defined in

[src/interfaces/listr.interface.ts:119](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L119)

___

### injectWrapper

• `Optional` **injectWrapper**: `Object`

Inject data directly to TaskWrapper.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enquirer?` | `Enquirer`<`object`\> |

#### Defined in

[src/interfaces/listr.interface.ts:123](https://github.com/cenk1cenk2/listr2/blob/3146341/src/interfaces/listr.interface.ts#L123)
