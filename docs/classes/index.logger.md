[listr2](../README.md) / [index](../modules/index.md) / Logger

# Class: Logger

[index](../modules/index.md).Logger

A internal logger for using in the verbose renderer mostly.

## Constructors

### constructor

\+ **new Logger**(`options?`: LoggerOptions): [*Logger*](index.logger.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options?` | LoggerOptions |

**Returns:** [*Logger*](index.logger.md)

Defined in: src/utils/logger.ts:13

## Properties

### figures

• `Private` `Readonly` **figures**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `arrowDown` | *string* |
| `arrowLeft` | *string* |
| `arrowRight` | *string* |
| `arrowUp` | *string* |
| `bullet` | *string* |
| `checkboxCircleOff` | *string* |
| `checkboxCircleOn` | *string* |
| `checkboxOff` | *string* |
| `checkboxOn` | *string* |
| `circle` | *string* |
| `circleCircle` | *string* |
| `circleCross` | *string* |
| `circleDotted` | *string* |
| `circleDouble` | *string* |
| `circleFilled` | *string* |
| `circlePipe` | *string* |
| `circleQuestionMark` | *string* |
| `cross` | *string* |
| `dot` | *string* |
| `ellipsis` | *string* |
| `fiveEighths` | *string* |
| `fiveSixths` | *string* |
| `fourFifths` | *string* |
| `hamburger` | *string* |
| `heart` | *string* |
| `info` | *string* |
| `line` | *string* |
| `mustache` | *string* |
| `nodejs` | *string* |
| `oneEighth` | *string* |
| `oneFifth` | *string* |
| `oneHalf` | *string* |
| `oneNinth` | *string* |
| `oneQuarter` | *string* |
| `oneSeventh` | *string* |
| `oneSixth` | *string* |
| `oneTenth` | *string* |
| `oneThird` | *string* |
| `play` | *string* |
| `pointer` | *string* |
| `pointerSmall` | *string* |
| `questionMarkPrefix` | *string* |
| `radioOff` | *string* |
| `radioOn` | *string* |
| `sevenEighth` | *string* |
| `smiley` | *string* |
| `square` | *string* |
| `squareSmall` | *string* |
| `squareSmallFilled` | *string* |
| `star` | *string* |
| `threeEighths` | *string* |
| `threeFifths` | *string* |
| `threeQuarters` | *string* |
| `tick` | *string* |
| `twoFifths` | *string* |
| `twoThirds` | *string* |
| `warning` | *string* |

Defined in: src/utils/logger.ts:13

## Methods

### data

▸ **data**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:32

___

### fail

▸ **fail**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:17

___

### logColoring

▸ `Protected`**logColoring**(`__namedParameters`: { `level`: [*LogLevels*](../enums/index.loglevels.md) ; `message`: *string*  }): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `__namedParameters` | *object* |
| `__namedParameters.level` | [*LogLevels*](../enums/index.loglevels.md) |
| `__namedParameters.message` | *string* |

**Returns:** *string*

Defined in: src/utils/logger.ts:82

___

### parseMessage

▸ `Protected`**parseMessage**(`level`: [*LogLevels*](../enums/index.loglevels.md), `message`: *string*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `level` | [*LogLevels*](../enums/index.loglevels.md) |
| `message` | *string* |

**Returns:** *string*

Defined in: src/utils/logger.ts:59

___

### retry

▸ **retry**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:47

___

### rollback

▸ **rollback**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:53

___

### skip

▸ **skip**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:22

___

### start

▸ **start**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:37

___

### success

▸ **success**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:27

___

### title

▸ **title**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:42

___

### wrapInBrackets

▸ `Private`**wrapInBrackets**(`level`: *string*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `level` | *string* |

**Returns:** *string*

Defined in: src/utils/logger.ts:165
