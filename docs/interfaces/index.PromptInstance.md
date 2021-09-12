# Interface: PromptInstance

[index](../modules/index.md).PromptInstance

## Hierarchy

- `Omit`<`BasePromptOptions`, ``"onCancel"`` \| ``"onSubmit"``\>

  ↳ **`PromptInstance`**

## Properties

### message

• **message**: `string` \| () => `string` \| () => `Promise`<`string`\>

#### Inherited from

Omit.message

#### Defined in

[src/utils/prompt.interface.ts:26](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L26)

___

### initial

• `Optional` **initial**: `string` \| `number` \| `boolean` \| `number`[] \| () => `string` \| () => `Promise`<`string`\>

#### Inherited from

Omit.initial

#### Defined in

[src/utils/prompt.interface.ts:27](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L27)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

Omit.required

#### Defined in

[src/utils/prompt.interface.ts:28](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L28)

___

### stdin

• `Optional` **stdin**: `ReadStream`

#### Inherited from

Omit.stdin

#### Defined in

[src/utils/prompt.interface.ts:29](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L29)

___

### stdout

• `Optional` **stdout**: `WriteStream`

#### Inherited from

Omit.stdout

#### Defined in

[src/utils/prompt.interface.ts:30](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L30)

___

### header

• `Optional` **header**: `string`

#### Inherited from

Omit.header

#### Defined in

[src/utils/prompt.interface.ts:31](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L31)

___

### footer

• `Optional` **footer**: `string`

#### Inherited from

Omit.footer

#### Defined in

[src/utils/prompt.interface.ts:32](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L32)

## Methods

### skip

▸ `Optional` **skip**(`value`): `boolean` \| `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean` \| `Promise`<`boolean`\>

#### Inherited from

Omit.skip

#### Defined in

[src/utils/prompt.interface.ts:33](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L33)

___

### format

▸ `Optional` **format**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Inherited from

Omit.format

#### Defined in

[src/utils/prompt.interface.ts:34](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L34)

___

### result

▸ `Optional` **result**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Inherited from

Omit.result

#### Defined in

[src/utils/prompt.interface.ts:35](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L35)

___

### validate

▸ `Optional` **validate**(`value`, `state`): `string` \| `boolean` \| `Promise`<`string` \| `boolean`\> \| `Promise`<`boolean`\> \| `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `state` | `any` |

#### Returns

`string` \| `boolean` \| `Promise`<`string` \| `boolean`\> \| `Promise`<`boolean`\> \| `Promise`<`string`\>

#### Inherited from

Omit.validate

#### Defined in

[src/utils/prompt.interface.ts:36](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L36)

___

### submit

▸ **submit**(): `void`

#### Returns

`void`

#### Defined in

[src/utils/prompt.interface.ts:163](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L163)

___

### cancel

▸ **cancel**(`err?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/prompt.interface.ts:164](https://github.com/cenk1cenk2/listr2/blob/70fdfc5/src/utils/prompt.interface.ts#L164)
