# Interface: ListrOptions<Ctx\>

[index](../modules/index.md).ListrOptions

Options to set the behavior of this base task.

## Type parameters

| Name  | Type                                             |
| :---- | :----------------------------------------------- |
| `Ctx` | [`ListrContext`](../types/index.ListrContext.md) |

## Properties

### ctx

• `Optional` **ctx**: `Ctx`

To inject a context through this options wrapper. Context can also be defined in run time.

**`default`** {}

#### Defined in

[src/interfaces/listr.interface.ts:90](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L90)

---

### concurrent

• `Optional` **concurrent**: `number` \| `boolean`

Concurrency sets how many tasks will be run at the same time in parallel.

**`default`** false > Default is to run everything synchronously.

`true` will set it to `Infinity`, `false` will set it to synchronous.

If you pass in a `number` it will limit it to that number.

#### Defined in

[src/interfaces/listr.interface.ts:100](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L100)

---

### exitOnError

• `Optional` **exitOnError**: `boolean`

Determine the default behavior of exiting on errors.

**`default`** true > exit on any error coming from the tasks.

#### Defined in

[src/interfaces/listr.interface.ts:106](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L106)

---

### exitAfterRollback

• `Optional` **exitAfterRollback**: `boolean`

Determine the behavior of exiting after rollback actions.

This is independent of exitOnError, since failure of a rollback can be a more critical operation comparing to failing a single task.

**`default`** true > exit after rolling back tasks

#### Defined in

[src/interfaces/listr.interface.ts:115](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L115)

---

### collectErrors

• `Optional` **collectErrors**: `false` \| `"minimal"` \| `"full"`

Collects errors to `ListrInstance.errors`

This can take up a lot of memory, so disabling it can fix out-of-memory errors

- 'full' will clone the current context and task in to the error instance
- 'minimal' will only collect the error message and the location
- false will collect no errors

**`default`** 'minimal'

#### Defined in

[src/interfaces/listr.interface.ts:127](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L127)

---

### registerSignalListeners

• `Optional` **registerSignalListeners**: `boolean`

By default, Listr2 will track SIGINIT signal to update the renderer one last time before completely failing.

**`default`** true

#### Defined in

[src/interfaces/listr.interface.ts:133](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L133)

---

### rendererFallback

• `Optional` **rendererFallback**: `boolean` \| () => `boolean`

Determine the certain condition required to use the non-TTY renderer.

**`default`** null > handled internally

#### Defined in

[src/interfaces/listr.interface.ts:139](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L139)

---

### rendererSilent

• `Optional` **rendererSilent**: `boolean` \| () => `boolean`

Determine the certain condition required to use the silent renderer.

**`default`** null > handled internally

#### Defined in

[src/interfaces/listr.interface.ts:145](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L145)

---

### disableColor

• `Optional` **disableColor**: `boolean`

Disabling the color, useful for tests and such.

**`default`** false

#### Defined in

[src/interfaces/listr.interface.ts:151](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L151)

---

### injectWrapper

• `Optional` **injectWrapper**: `Object`

Inject data directly to TaskWrapper.

#### Type declaration

| Name        | Type                  |
| :---------- | :-------------------- |
| `enquirer?` | `Enquirer`<`object`\> |

#### Defined in

[src/interfaces/listr.interface.ts:155](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L155)
