# @listr2/prompt-adapter-inquirer [4.1.0](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@4.0.0...@listr2/prompt-adapter-inquirer@4.1.0) (2026-01-26)


### Features

* **build:** update bundle mechanism ([28b5f48](https://github.com/listr2/listr2/commit/28b5f4843eafafa0e705604a42a55ed81f86e688))





### Dependencies

* **listr2:** upgraded to 10.1.0

# @listr2/prompt-adapter-inquirer [4.0.0](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.5...@listr2/prompt-adapter-inquirer@4.0.0) (2026-01-14)


### Performance Improvements

* **deps:** update major dependencies ([#754](https://github.com/listr2/listr2/issues/754)) ([0e4003f](https://github.com/listr2/listr2/commit/0e4003fb8e8765e845ea7ef8a2ee2e1260a5a57c)), closes [nodejs/node#53497](https://github.com/nodejs/node/issues/53497) [nodejs/node#57678](https://github.com/nodejs/node/issues/57678) [nodejs/node#53497](https://github.com/nodejs/node/issues/53497) [nodejs/node#57678](https://github.com/nodejs/node/issues/57678)


### BREAKING CHANGES

* **deps:** This change drops node 20 support since it is reaching end of life.

* fix: tiny bug with spinner

* chore: update auxilary dependency versions

* ci: update ci configuration for new node versions

WIP:

Signed-off-by: Cenk Kılıç <cenk@kilic.dev>

* fix: suppress readline close errors in enquirer adapter for Node.js 22+

Node.js 22 and 24 introduced breaking changes to readline behavior that
cause "readline was closed" errors when enquirer attempts to clean up
after cancellation. This is a race condition in enquirer 2.4.1 that
hasn't been fixed upstream (package hasn't been updated in 2 years).

This commit adds error handling to suppress these specific errors while
still allowing the prompt to be properly cancelled and cleaned up.

References:





### Dependencies

* **listr2:** upgraded to 10.0.0

## @listr2/prompt-adapter-inquirer [3.0.5](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.4...@listr2/prompt-adapter-inquirer@3.0.5) (2025-10-20)





### Dependencies

* **listr2:** upgraded to 9.0.5

## @listr2/prompt-adapter-inquirer [3.0.4](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.3...@listr2/prompt-adapter-inquirer@3.0.4) (2025-09-14)





### Dependencies

* **listr2:** upgraded to 9.0.4

## @listr2/prompt-adapter-inquirer [3.0.3](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.2...@listr2/prompt-adapter-inquirer@3.0.3) (2025-08-30)





### Dependencies

* **listr2:** upgraded to 9.0.3

## @listr2/prompt-adapter-inquirer [3.0.2](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.1...@listr2/prompt-adapter-inquirer@3.0.2) (2025-08-20)


### Bug Fixes

* **deps:** update dependencies ([5fa319c](https://github.com/listr2/listr2/commit/5fa319c438f3cf43694757bcbcb7ff6105652bb5))





### Dependencies

* **listr2:** upgraded to 9.0.2

## @listr2/prompt-adapter-inquirer [3.0.1](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.0...@listr2/prompt-adapter-inquirer@3.0.1) (2025-07-11)


### Bug Fixes

* migrate build system from tsup to tsdown ([2f71695](https://github.com/listr2/listr2/commit/2f716955ab64a270cab9a2db464b77d5191bb8ba))





### Dependencies

* **listr2:** upgraded to 9.0.1

# @listr2/prompt-adapter-inquirer [3.0.0](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.22...@listr2/prompt-adapter-inquirer@3.0.0) (2025-07-07)


### Bug Fixes

* list `listr2` as a peer dependency ([af4a5cc](https://github.com/listr2/listr2/commit/af4a5ccd7e2e1ab548ff3f1ae2d135ea5451ce89))


### Performance Improvements

* drop node 18 support ([12f02e7](https://github.com/listr2/listr2/commit/12f02e7b3600d36a0f4762c7e865557d4c2c8b32))
* update core dependencies and styling ([56f4d64](https://github.com/listr2/listr2/commit/56f4d647f6020c4227dce8322ec38d030f4897f2))


### BREAKING CHANGES

* This commit drops support for Node.js 18, which is no longer LTS.
* This includes breaking changes in the inqurer setup.

The styling is completely changed.





### Dependencies

* **listr2:** upgraded to 9.0.0

# @listr2/prompt-adapter-inquirer [3.0.0-beta.3](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@3.0.0-beta.2...@listr2/prompt-adapter-inquirer@3.0.0-beta.3) (2025-07-07)


### Bug Fixes

* list `listr2` as a peer dependency ([af4a5cc](https://github.com/listr2/listr2/commit/af4a5ccd7e2e1ab548ff3f1ae2d135ea5451ce89))
* release ([9f05aaa](https://github.com/listr2/listr2/commit/9f05aaa1ac1d8d069b4264f17b70f26548e7bb3d))


### Performance Improvements

* drop node 18 support ([12f02e7](https://github.com/listr2/listr2/commit/12f02e7b3600d36a0f4762c7e865557d4c2c8b32))


### BREAKING CHANGES

* This commit drops support for Node.js 18, which is no longer LTS.





### Dependencies

* **listr2:** upgraded to 9.0.0-beta.3

## @listr2/prompt-adapter-inquirer [2.0.22](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.21...@listr2/prompt-adapter-inquirer@2.0.22) (2025-05-06)

### Dependencies

* **listr2:** upgraded to 8.3.3

## @listr2/prompt-adapter-inquirer [2.0.21](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.20...@listr2/prompt-adapter-inquirer@2.0.21) (2025-04-10)

### Dependencies

* **listr2:** upgraded to 8.3.2

## @listr2/prompt-adapter-inquirer [2.0.20](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.19...@listr2/prompt-adapter-inquirer@2.0.20) (2025-04-09)

### Dependencies

* **listr2:** upgraded to 8.3.1

## @listr2/prompt-adapter-inquirer [2.0.19](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.18...@listr2/prompt-adapter-inquirer@2.0.19) (2025-04-09)

### Dependencies

* **listr2:** upgraded to 8.3.0

## @listr2/prompt-adapter-inquirer [2.0.18](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.17...@listr2/prompt-adapter-inquirer@2.0.18) (2024-11-15)

### Bug Fixes

* release ([9f05aaa](https://github.com/listr2/listr2/commit/9f05aaa1ac1d8d069b4264f17b70f26548e7bb3d))

## @listr2/prompt-adapter-inquirer [2.0.17](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.16...@listr2/prompt-adapter-inquirer@2.0.17) (2024-10-03)

republish as new version

### Dependencies

* **listr2:** upgraded to 8.2.5

## @listr2/prompt-adapter-inquirer [2.0.16](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.15...@listr2/prompt-adapter-inquirer@2.0.16) (2024-09-27)

### Bug Fixes

* bump dependencies ([c3fe16f](https://github.com/listr2/listr2/commit/c3fe16f9d5bad47acc47522e3ac43a78ef5968f7))
* **deps:** update dependency @inquirer/type to ^1.5.2 ([b7ace29](https://github.com/listr2/listr2/commit/b7ace290065e8cbb24247bac9a8ad92af960ecc8))
* **deps:** update dependency @inquirer/type to ^1.5.5 ([4c86513](https://github.com/listr2/listr2/commit/4c86513bd96a63be536bf10432162eb91065ce79))

## @listr2/prompt-adapter-inquirer [2.0.15](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.14...@listr2/prompt-adapter-inquirer@2.0.15) (2024-07-27)

### Dependencies

* **listr2:** upgraded to 8.2.4

## @listr2/prompt-adapter-inquirer [2.0.14](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.13...@listr2/prompt-adapter-inquirer@2.0.14) (2024-07-21)

### Bug Fixes

* **deps:** update dependency @inquirer/type to ^1.5.1 ([70a696b](https://github.com/listr2/listr2/commit/70a696b476130354a47755f55ee41c749cb02968))

## @listr2/prompt-adapter-inquirer [2.0.13](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.12...@listr2/prompt-adapter-inquirer@2.0.13) (2024-06-21)

### Dependencies

* **listr2:** upgraded to 8.2.3

## @listr2/prompt-adapter-inquirer [2.0.12](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.11...@listr2/prompt-adapter-inquirer@2.0.12) (2024-06-19)

### Bug Fixes

* **deps:** update dependencies ([642d3f7](https://github.com/listr2/listr2/commit/642d3f7c326a53f702968b75c1ca39f2a183dbd9))

### Dependencies

* **listr2:** upgraded to 8.2.2

## @listr2/prompt-adapter-inquirer [2.0.11](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.10...@listr2/prompt-adapter-inquirer@2.0.11) (2024-06-04)

### Bug Fixes

* **deps:** update dependency @inquirer/type to ^1.3.3 ([4fb2b91](https://github.com/listr2/listr2/commit/4fb2b91cf313475056dbd92c5148ac25f0a4dbaa))

## @listr2/prompt-adapter-inquirer [2.0.10](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.9...@listr2/prompt-adapter-inquirer@2.0.10) (2024-05-17)

### Bug Fixes

* **prompt-adapter-inquirer:** update underlying dependencies ([e9a141e](https://github.com/listr2/listr2/commit/e9a141e9a9c3eab71b34b2a1e392a9e1650b79ff))

## @listr2/prompt-adapter-inquirer [2.0.9](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.8...@listr2/prompt-adapter-inquirer@2.0.9) (2024-04-26)

### Bug Fixes

* **deps:** update dependency @inquirer/type to ^1.3.1 ([b56f6f2](https://github.com/listr2/listr2/commit/b56f6f2d2af0383241f81df77e7cf642d43831ac))

## @listr2/prompt-adapter-inquirer [2.0.8](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.7...@listr2/prompt-adapter-inquirer@2.0.8) (2024-04-03)

### Dependencies

* **listr2:** upgraded to 8.2.1

## @listr2/prompt-adapter-inquirer [2.0.8](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.7...@listr2/prompt-adapter-inquirer@2.0.8) (2024-04-02)

### Dependencies

* **listr2:** upgraded to 8.2.0

## @listr2/prompt-adapter-inquirer [2.0.8](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.7...@listr2/prompt-adapter-inquirer@2.0.8) (2024-03-31)

### Dependencies

* **listr2:** upgraded to 8.1.3

## @listr2/prompt-adapter-inquirer [2.0.7](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.6...@listr2/prompt-adapter-inquirer@2.0.7) (2024-03-29)

### Dependencies

* **listr2:** upgraded to 8.1.2

## @listr2/prompt-adapter-inquirer [2.0.7](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.6...@listr2/prompt-adapter-inquirer@2.0.7) (2024-03-27)

### Dependencies

* **listr2:** upgraded to 8.1.1

## @listr2/prompt-adapter-inquirer [2.0.6](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.5...@listr2/prompt-adapter-inquirer@2.0.6) (2024-03-27)

### Dependencies

* **listr2:** upgraded to 8.1.0

## @listr2/prompt-adapter-inquirer [2.0.5](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.4...@listr2/prompt-adapter-inquirer@2.0.5) (2024-03-13)

### Bug Fixes

* **deps:** update dependency @inquirer/type to ^1.2.1 ([96151ea](https://github.com/listr2/listr2/commit/96151ea83fc4c496e1731553f68815377f74ffad))

## @listr2/prompt-adapter-inquirer [2.0.4](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.3...@listr2/prompt-adapter-inquirer@2.0.4) (2024-02-05)

### Bug Fixes

* **deps:** update dependency @inquirer/type to ^1.2.0 ([37e20ea](https://github.com/listr2/listr2/commit/37e20ea1c08d5ca8a135bdff031681eca8a48cdd))

## @listr2/prompt-adapter-inquirer [2.0.3](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.2...@listr2/prompt-adapter-inquirer@2.0.3) (2024-02-03)

### Bug Fixes

* update dependencies and documentation ([bfa507b](https://github.com/listr2/listr2/commit/bfa507b39a0578a60ef3de65aaa315cda076bfb0)), closes [#705](https://github.com/listr2/listr2/issues/705)

## @listr2/prompt-adapter-inquirer [2.0.2](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.1...@listr2/prompt-adapter-inquirer@2.0.2) (2024-01-27)

### Bug Fixes

* **deps:** update all minor dependency updates ([6662e0b](https://github.com/listr2/listr2/commit/6662e0bda139742578505da4ceeddffc83234611))

### Dependencies

* **listr2:** upgraded to 8.0.2

## @listr2/prompt-adapter-inquirer [2.0.1](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@2.0.0...@listr2/prompt-adapter-inquirer@2.0.1) (2023-12-20)

### Dependencies

* **listr2:** upgraded to 8.0.1

# @listr2/prompt-adapter-inquirer [2.0.0](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@1.0.2...@listr2/prompt-adapter-inquirer@2.0.0) (2023-11-24)

### Performance Improvements

* drop node 16 support ([6f4f9f8](https://github.com/listr2/listr2/commit/6f4f9f84564195a8485c44d4862b22fe2323283a))

### BREAKING CHANGES

* node16 is EOL therefore the support is dropped with the minimum
supported version being >= 18.

### Dependencies

* **listr2:** upgraded to 8.0.0

## @listr2/prompt-adapter-inquirer [1.0.2](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@1.0.1...@listr2/prompt-adapter-inquirer@1.0.2) (2023-10-18)

### Bug Fixes

* **renderer:** subtask options checking problem for default renderer ([de71a4d](https://github.com/listr2/listr2/commit/de71a4d451aa2e5e8982b2efa05c019af1f7b6ed)), closes [#694](https://github.com/listr2/listr2/issues/694)

### Dependencies

* **listr2:** upgraded to 7.0.2

## @listr2/prompt-adapter-inquirer [1.0.1](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-inquirer@1.0.0...@listr2/prompt-adapter-inquirer@1.0.1) (2023-09-19)

### Bug Fixes

* update badges ([fcd0915](https://github.com/listr2/listr2/commit/fcd0915a30952959140c27b7f82a63cb4eb7fdd5))

# @listr2/prompt-adapter-inquirer 1.0.0 (2023-09-19)

### Bug Fixes

* dont list self as peer due to fixed version ([18f7841](https://github.com/listr2/listr2/commit/18f78416f6d887871a830f3a6cf21ffff29b630d))
* **npm:** add publish config public ([a186982](https://github.com/listr2/listr2/commit/a1869821c94a3b73018a07ba7b721e3523575946))
* update configuration ([a1aa737](https://github.com/listr2/listr2/commit/a1aa737c29899c8712256b810fb4a86227d09a66))

### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))
* update linting rules ([1ffb46b](https://github.com/listr2/listr2/commit/1ffb46bf7a62724ee10dc1bd8c5d5f40819945b5))

### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.

# @listr2/prompt-adapter-inquirer 1.0.0-beta.1 (2023-09-19)

### Bug Fixes

* dont list self as peer due to fixed version ([18f7841](https://github.com/listr2/listr2/commit/18f78416f6d887871a830f3a6cf21ffff29b630d))
* **npm:** add publish config public ([a186982](https://github.com/listr2/listr2/commit/a1869821c94a3b73018a07ba7b721e3523575946))

### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))
* update linting rules ([1ffb46b](https://github.com/listr2/listr2/commit/1ffb46bf7a62724ee10dc1bd8c5d5f40819945b5))

### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.
