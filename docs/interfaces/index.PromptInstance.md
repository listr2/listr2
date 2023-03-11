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

src/utils/prompt.interface.ts:9

___

### initial

• `Optional` **initial**: `string` \| `number` \| `boolean` \| `number`[] \| () => `string` \| () => `Promise`<`string`\>

#### Inherited from

Omit.initial

#### Defined in

src/utils/prompt.interface.ts:10

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

Omit.required

#### Defined in

src/utils/prompt.interface.ts:11

___

### stdin

• `Optional` **stdin**: `ReadStream`

#### Inherited from

Omit.stdin

#### Defined in

src/utils/prompt.interface.ts:12

___

### stdout

• `Optional` **stdout**: `WriteStream`

#### Inherited from

Omit.stdout

#### Defined in

src/utils/prompt.interface.ts:13

___

### header

• `Optional` **header**: `string`

#### Inherited from

Omit.header

#### Defined in

src/utils/prompt.interface.ts:14

___

### footer

• `Optional` **footer**: `string`

#### Inherited from

Omit.footer

#### Defined in

src/utils/prompt.interface.ts:15

___

### skip

• `Optional` **skip**: (`value`: `any`) => `boolean` \| `Promise`<`boolean`\>

#### Type declaration

▸ (`value`): `boolean` \| `Promise`<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`boolean` \| `Promise`<`boolean`\>

#### Inherited from

Omit.skip

#### Defined in

src/utils/prompt.interface.ts:16

___

### format

• `Optional` **format**: (`value`: `any`) => `any`

#### Type declaration

▸ (`value`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`any`

#### Inherited from

Omit.format

#### Defined in

src/utils/prompt.interface.ts:17

___

### result

• `Optional` **result**: (`value`: `any`) => `any`

#### Type declaration

▸ (`value`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`any`

#### Inherited from

Omit.result

#### Defined in

src/utils/prompt.interface.ts:18

___

### validate

• `Optional` **validate**: (`value`: `any`, `state`: `any`) => `string` \| `boolean` \| `Promise`<`string`\> \| `Promise`<`boolean`\> \| `Promise`<`string` \| `boolean`\>

#### Type declaration

▸ (`value`, `state`): `string` \| `boolean` \| `Promise`<`string`\> \| `Promise`<`boolean`\> \| `Promise`<`string` \| `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `state` | `any` |

##### Returns

`string` \| `boolean` \| `Promise`<`string`\> \| `Promise`<`boolean`\> \| `Promise`<`string` \| `boolean`\>

#### Inherited from

Omit.validate

#### Defined in

src/utils/prompt.interface.ts:19

___

### submit

• **submit**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

src/utils/prompt.interface.ts:162

___

### cancel

• **cancel**: (`err?`: `string`) => `void`

#### Type declaration

▸ (`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `string` |

##### Returns

`void`

#### Defined in

src/utils/prompt.interface.ts:163
