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

src/utils/prompt.interface.ts:24

___

### initial

• `Optional` **initial**: `string` \| `number` \| `boolean` \| `number`[] \| () => `string` \| () => `Promise`<`string`\>

#### Inherited from

Omit.initial

#### Defined in

src/utils/prompt.interface.ts:25

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

Omit.required

#### Defined in

src/utils/prompt.interface.ts:26

___

### stdin

• `Optional` **stdin**: `ReadStream`

#### Inherited from

Omit.stdin

#### Defined in

src/utils/prompt.interface.ts:27

___

### stdout

• `Optional` **stdout**: `WriteStream`

#### Inherited from

Omit.stdout

#### Defined in

src/utils/prompt.interface.ts:28

___

### header

• `Optional` **header**: `string`

#### Inherited from

Omit.header

#### Defined in

src/utils/prompt.interface.ts:29

___

### footer

• `Optional` **footer**: `string`

#### Inherited from

Omit.footer

#### Defined in

src/utils/prompt.interface.ts:30

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

src/utils/prompt.interface.ts:31

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

src/utils/prompt.interface.ts:32

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

src/utils/prompt.interface.ts:33

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

src/utils/prompt.interface.ts:34

___

### submit

▸ **submit**(): `void`

#### Returns

`void`

#### Defined in

src/utils/prompt.interface.ts:161

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

src/utils/prompt.interface.ts:162
