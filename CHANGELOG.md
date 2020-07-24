## [2.3.3](https://github.com/cenk1cenk2/listr2/compare/v2.3.2...v2.3.3) (2020-07-24)


### Bug Fixes

* **prompts:** removed prompt bind type to use it in other scripts directly ([655334a](https://github.com/cenk1cenk2/listr2/commit/655334a256524cb8099c189868bb8f30dc784b90))

## [2.3.2](https://github.com/cenk1cenk2/listr2/compare/v2.3.1...v2.3.2) (2020-07-23)


### Bug Fixes

* **tests:** change env variable for tests, esspecially chalk because node_env test is more common ([5c7c9ca](https://github.com/cenk1cenk2/listr2/commit/5c7c9caf33eb5141d46cf79cd7176826807b9e50))

## [2.3.1](https://github.com/cenk1cenk2/listr2/compare/v2.3.0...v2.3.1) (2020-07-22)


### Bug Fixes

* **readme:** added badge for npm ([61f6bc3](https://github.com/cenk1cenk2/listr2/commit/61f6bc36a5df27b80d61233dd0880326b93b7d5a))

# [2.3.0](https://github.com/cenk1cenk2/listr2/compare/v2.2.1...v2.3.0) (2020-07-22)


### Bug Fixes

* **colors:** disable colors for test ([b81ee08](https://github.com/cenk1cenk2/listr2/commit/b81ee087fd11f9ee8b96b305d9a76fb7b245ca9c))
* **deps:** update all minor package updates ([aba8cf2](https://github.com/cenk1cenk2/listr2/commit/aba8cf20abbf6c81cd98be41099254ba6c30a19b))
* **truncate:** fix truncate to 80 on columns unknown ([3454aed](https://github.com/cenk1cenk2/listr2/commit/3454aedbc4282550f79f4e65fe34ab14fbe06e4e))


### Features

* added lazy option to default renderer. moved enquirer to inject wrapper key from root ([78f3984](https://github.com/cenk1cenk2/listr2/commit/78f3984c19cd31f45edf5fbc8e8bfa5380104331))
* **prompts:** added external enquirer injection for testing, fallback condition, fixed catching err ([a0bf6fd](https://github.com/cenk1cenk2/listr2/commit/a0bf6fd444caf69b0231f710099e367840c0ed15)), closes [#66](https://github.com/cenk1cenk2/listr2/issues/66) [#67](https://github.com/cenk1cenk2/listr2/issues/67) [#68](https://github.com/cenk1cenk2/listr2/issues/68)

# [2.3.0-beta.2](https://github.com/cenk1cenk2/listr2/compare/v2.3.0-beta.1...v2.3.0-beta.2) (2020-07-22)


### Features

* added lazy option to default renderer. moved enquirer to inject wrapper key from root ([78f3984](https://github.com/cenk1cenk2/listr2/commit/78f3984c19cd31f45edf5fbc8e8bfa5380104331))

# [2.3.0-beta.1](https://github.com/cenk1cenk2/listr2/compare/v2.2.1...v2.3.0-beta.1) (2020-07-22)


### Bug Fixes

* **deps:** update all minor package updates ([aba8cf2](https://github.com/cenk1cenk2/listr2/commit/aba8cf20abbf6c81cd98be41099254ba6c30a19b))


### Features

* **prompts:** added external enquirer injection for testing, fallback condition, fixed catching err ([a0bf6fd](https://github.com/cenk1cenk2/listr2/commit/a0bf6fd444caf69b0231f710099e367840c0ed15)), closes [#66](https://github.com/cenk1cenk2/listr2/issues/66) [#67](https://github.com/cenk1cenk2/listr2/issues/67) [#68](https://github.com/cenk1cenk2/listr2/issues/68)

## [2.2.1](https://github.com/cenk1cenk2/listr2/compare/v2.2.0...v2.2.1) (2020-07-18)


### Bug Fixes

* **prompts:** added return when prompt error ([6c89e56](https://github.com/cenk1cenk2/listr2/commit/6c89e562713686a1748a0436aef3c2ae43c6c555))
* **prompts:** fixed prompt error message when enquirer is not installed optionally ([8fc5849](https://github.com/cenk1cenk2/listr2/commit/8fc58492bcac3fb5520360c7c8d1e5c2156b74fc))

# [2.2.0](https://github.com/cenk1cenk2/listr2/compare/v2.1.9...v2.2.0) (2020-07-03)


### Features

* display elegant spinner on Windows Terminal ([a86868b](https://github.com/cenk1cenk2/listr2/commit/a86868b7638f5b63b64f70e7559ace07d598c84a))

## [2.1.9](https://github.com/cenk1cenk2/listr2/compare/v2.1.8...v2.1.9) (2020-07-01)


### Bug Fixes

* **manager:** manager type problem with indent ([9444d3d](https://github.com/cenk1cenk2/listr2/commit/9444d3dcc5c7d1d72aa424441cc0b150effedebd))

## [2.1.9-beta.1](https://github.com/cenk1cenk2/listr2/compare/v2.1.8...v2.1.9-beta.1) (2020-06-18)


### Bug Fixes

* **manager:** manager type problem with indent ([9444d3d](https://github.com/cenk1cenk2/listr2/commit/9444d3dcc5c7d1d72aa424441cc0b150effedebd))

## [2.1.8](https://github.com/cenk1cenk2/listr2/compare/v2.1.7...v2.1.8) (2020-06-17)


### Bug Fixes

* **renderer:** add skip to verbose output ([f577df0](https://github.com/cenk1cenk2/listr2/commit/f577df08720a6602a46b9eec457a9d55321d89d7))

## [2.1.7](https://github.com/cenk1cenk2/listr2/compare/v2.1.6...v2.1.7) (2020-06-14)


### Bug Fixes

* **renderer:** verbose renderer ([794f966](https://github.com/cenk1cenk2/listr2/commit/794f9667f8d2b1715f76a841dcb73f47bf8d6aca))

## [2.1.6](https://github.com/cenk1cenk2/listr2/compare/v2.1.5...v2.1.6) (2020-06-14)


### Bug Fixes

* **renderer:** add defaults ([8d3436d](https://github.com/cenk1cenk2/listr2/commit/8d3436d74dfe904f1259f85cfa251445f5c58e84))

## [2.1.5](https://github.com/cenk1cenk2/listr2/compare/v2.1.4...v2.1.5) (2020-06-14)


### Bug Fixes

* **renderer:** verbose renderer defaults ([3246fe1](https://github.com/cenk1cenk2/listr2/commit/3246fe1deb19dd2878d5c86ee2ca98d9a7b2f26a))

## [2.1.4](https://github.com/cenk1cenk2/listr2/compare/v2.1.3...v2.1.4) (2020-06-14)


### Bug Fixes

* **added verbose renderer options:** added new options of log empty title and title change ([5a5eb79](https://github.com/cenk1cenk2/listr2/commit/5a5eb79e5d9097b84fc74722de85c6f60e0f288e))
* **types:** enquirer types ([d309d91](https://github.com/cenk1cenk2/listr2/commit/d309d91241ec85f52d54b974f6391f7c640ea1ae))

## [2.1.3](https://github.com/cenk1cenk2/listr2/compare/v2.1.2...v2.1.3) (2020-06-04)


### Bug Fixes

* **enquirer:** moved prompt flattening around again for my own scripts ([a40a569](https://github.com/cenk1cenk2/listr2/commit/a40a569785dec64d14186fa997bf8bebcd219390))
* **enquirer:** optional stdout ([703658f](https://github.com/cenk1cenk2/listr2/commit/703658f3fe84f91e74173932c91b609380d40c59))

## [2.1.2](https://github.com/cenk1cenk2/listr2/compare/v2.1.1...v2.1.2) (2020-06-04)


### Bug Fixes

* **prompt:** added option to call prompt from outside for my applicatiosn ([27dbdfa](https://github.com/cenk1cenk2/listr2/commit/27dbdfa5068eed7570293468455515ed1c7860ba))

## [2.1.1](https://github.com/cenk1cenk2/listr2/compare/v2.1.0...v2.1.1) (2020-06-04)


### Bug Fixes

* **streams:** add legacy streams to accepted types ([f63dd52](https://github.com/cenk1cenk2/listr2/commit/f63dd52167c2babada80ff5d092843ead2ca86e7))

# [2.1.0](https://github.com/cenk1cenk2/listr2/compare/v2.0.4...v2.1.0) (2020-06-03)


### Bug Fixes

* **deps:** remove trivial deps ([de8dec0](https://github.com/cenk1cenk2/listr2/commit/de8dec09b45fa09ddc8afb1d7742846ba3b620dd))
* **deps:** remove unnecassary types ([b37f416](https://github.com/cenk1cenk2/listr2/commit/b37f416fbed04d531b1dca5495d7008ecedf4ab5))
* **deps:** updated deps to latest ([c4ad38f](https://github.com/cenk1cenk2/listr2/commit/c4ad38f32510d598a4c93d19ca517eef81c841a2))
* **figures:** made microsoft icons to use the fancy ones, even though it may fail in some cases ([f0e5817](https://github.com/cenk1cenk2/listr2/commit/f0e581706e59d9b96da9bd050a1ad3638b59c2aa)), closes [#31](https://github.com/cenk1cenk2/listr2/issues/31)
* **prompt:** enquirer to peer ([cae55e9](https://github.com/cenk1cenk2/listr2/commit/cae55e962faf54f3ddadc6c220567a316c8ee15b))
* **prompt:** types ([110130a](https://github.com/cenk1cenk2/listr2/commit/110130a6c0a6b3443362cd8fc018e18b6ef5fbbc))
* **prompts:** fixed type for array prompts, added name as mandatory ([a08b1e4](https://github.com/cenk1cenk2/listr2/commit/a08b1e4a9b80fd542384ef3a5dbc111dead0bd6c))
* **stream:** fixed streams added example ([614d89f](https://github.com/cenk1cenk2/listr2/commit/614d89fc1b64e7a586a7a590233d4dce1696b7b4)), closes [#37](https://github.com/cenk1cenk2/listr2/issues/37)


### Features

* **prompt:** make prompt module optional, be more compatible to underlying enqurier ([64cecc1](https://github.com/cenk1cenk2/listr2/commit/64cecc10049f5802a6e7a71071ec698e1226bdc2)), closes [#34](https://github.com/cenk1cenk2/listr2/issues/34)
* **prompt:** use enquirer directly ([b34e9d0](https://github.com/cenk1cenk2/listr2/commit/b34e9d0b2ef9b0cbf723759c5a236eca8ac86af0)), closes [#34](https://github.com/cenk1cenk2/listr2/issues/34)
* **renderer:** added hook and stdout support ([bd73c68](https://github.com/cenk1cenk2/listr2/commit/bd73c68b9eb21cd100a266ce05ba36af0c727a4f)), closes [#31](https://github.com/cenk1cenk2/listr2/issues/31)

# [2.1.0-beta.6](https://github.com/cenk1cenk2/listr2/compare/v2.1.0-beta.5...v2.1.0-beta.6) (2020-06-03)


### Bug Fixes

* **deps:** remove trivial deps ([de8dec0](https://github.com/cenk1cenk2/listr2/commit/de8dec09b45fa09ddc8afb1d7742846ba3b620dd))
* **deps:** remove unnecassary types ([b37f416](https://github.com/cenk1cenk2/listr2/commit/b37f416fbed04d531b1dca5495d7008ecedf4ab5))
* **deps:** updated deps to latest ([c4ad38f](https://github.com/cenk1cenk2/listr2/commit/c4ad38f32510d598a4c93d19ca517eef81c841a2))
* **stream:** fixed streams added example ([614d89f](https://github.com/cenk1cenk2/listr2/commit/614d89fc1b64e7a586a7a590233d4dce1696b7b4)), closes [#37](https://github.com/cenk1cenk2/listr2/issues/37)

# [2.1.0-beta.5](https://github.com/cenk1cenk2/listr2/compare/v2.1.0-beta.4...v2.1.0-beta.5) (2020-06-03)


### Bug Fixes

* **prompt:** types ([110130a](https://github.com/cenk1cenk2/listr2/commit/110130a6c0a6b3443362cd8fc018e18b6ef5fbbc))

# [2.1.0-beta.4](https://github.com/cenk1cenk2/listr2/compare/v2.1.0-beta.3...v2.1.0-beta.4) (2020-06-02)


### Bug Fixes

* **prompt:** enquirer to peer ([cae55e9](https://github.com/cenk1cenk2/listr2/commit/cae55e962faf54f3ddadc6c220567a316c8ee15b))

# [2.1.0-beta.3](https://github.com/cenk1cenk2/listr2/compare/v2.1.0-beta.2...v2.1.0-beta.3) (2020-06-02)


### Bug Fixes

* **prompts:** fixed type for array prompts, added name as mandatory ([a08b1e4](https://github.com/cenk1cenk2/listr2/commit/a08b1e4a9b80fd542384ef3a5dbc111dead0bd6c))

# [2.1.0-beta.2](https://github.com/cenk1cenk2/listr2/compare/v2.1.0-beta.1...v2.1.0-beta.2) (2020-06-02)


### Features

* **prompt:** make prompt module optional, be more compatible to underlying enqurier ([64cecc1](https://github.com/cenk1cenk2/listr2/commit/64cecc10049f5802a6e7a71071ec698e1226bdc2)), closes [#34](https://github.com/cenk1cenk2/listr2/issues/34)
* **prompt:** use enquirer directly ([b34e9d0](https://github.com/cenk1cenk2/listr2/commit/b34e9d0b2ef9b0cbf723759c5a236eca8ac86af0)), closes [#34](https://github.com/cenk1cenk2/listr2/issues/34)

# [2.1.0-beta.1](https://github.com/cenk1cenk2/listr2/compare/v2.0.4...v2.1.0-beta.1) (2020-05-25)


### Bug Fixes

* **figures:** made microsoft icons to use the fancy ones, even though it may fail in some cases ([f0e5817](https://github.com/cenk1cenk2/listr2/commit/f0e581706e59d9b96da9bd050a1ad3638b59c2aa)), closes [#31](https://github.com/cenk1cenk2/listr2/issues/31)


### Features

* **renderer:** added hook and stdout support ([bd73c68](https://github.com/cenk1cenk2/listr2/commit/bd73c68b9eb21cd100a266ce05ba36af0c727a4f)), closes [#31](https://github.com/cenk1cenk2/listr2/issues/31)

## [2.0.4](https://github.com/cenk1cenk2/listr2/compare/v2.0.3...v2.0.4) (2020-05-20)


### Bug Fixes

* **types:** match version of uuid ([33a1e80](https://github.com/cenk1cenk2/listr2/commit/33a1e8007a82015171ca55c86a71fbbc017d6e4d))
* **uuid:** added implicit tests for 13.6, rollback to uuid working version ([75ade63](https://github.com/cenk1cenk2/listr2/commit/75ade636b63606ee243e2591e60e8e72b5f1c1ca)), closes [#28](https://github.com/cenk1cenk2/listr2/issues/28)

## [2.0.3](https://github.com/cenk1cenk2/listr2/compare/v2.0.2...v2.0.3) (2020-05-19)


### Bug Fixes

* **deps:** exchange uuid with nanoid ([2048b3d](https://github.com/cenk1cenk2/listr2/commit/2048b3d953ab5cab0cf67ffe26fa24fb987e6b6e)), closes [#25](https://github.com/cenk1cenk2/listr2/issues/25)

## [2.0.2](https://github.com/cenk1cenk2/listr2/compare/v2.0.1...v2.0.2) (2020-05-18)


### Bug Fixes

* **deps:** rollback uuid to ^7 ([9ba257d](https://github.com/cenk1cenk2/listr2/commit/9ba257d9b19ce4534982baac358096fedb21f2b1)), closes [#25](https://github.com/cenk1cenk2/listr2/issues/25)

## [2.0.1](https://github.com/cenk1cenk2/listr2/compare/v2.0.0...v2.0.1) (2020-05-06)


### Bug Fixes

* **manager:** fixed manager types ([10d74e9](https://github.com/cenk1cenk2/listr2/commit/10d74e9f481fee689f103a08c42c3c60d0fb2bc1)), closes [#22](https://github.com/cenk1cenk2/listr2/issues/22)
* **manager:** fixed types for manager ([033c7d1](https://github.com/cenk1cenk2/listr2/commit/033c7d180431a7039c9c38a8537b43fc5615f50e))

# [2.0.0](https://github.com/cenk1cenk2/listr2/compare/v1.3.12...v2.0.0) (2020-05-06)


### Bug Fixes

* **default-renderer:** added back cli truncate ([22132a5](https://github.com/cenk1cenk2/listr2/commit/22132a5b022ef58a4a463e48af062f54631a3b9d))
* **error-collection:** fixed error collection on non-failing tasks ([4239094](https://github.com/cenk1cenk2/listr2/commit/4239094a7947cf60d8d030c45aaf75710637a40c))
* **manager:** added error context ([4f8f387](https://github.com/cenk1cenk2/listr2/commit/4f8f387a576bc83947fd90e83f27de827b9f9d08))
* **manager:** fixed manager ([57dcd7f](https://github.com/cenk1cenk2/listr2/commit/57dcd7f8362589f2a43b645920cf158c2cb8d591))
* **types:** fix ([b3ee9be](https://github.com/cenk1cenk2/listr2/commit/b3ee9be0f895e8927c825b3993cc847d360e709d))
* fixed types for isolated renderer options ([4521832](https://github.com/cenk1cenk2/listr2/commit/452183240c55984db57551082aa049e4799a2425))


### Features

* **release:** ready to update to new version ([50fb773](https://github.com/cenk1cenk2/listr2/commit/50fb773128073b1ec312fea3121a2f93e9270271)), closes [#19](https://github.com/cenk1cenk2/listr2/issues/19) [#18](https://github.com/cenk1cenk2/listr2/issues/18)
* **renderer-options:** started to isolate the renderer options instead of writing them directly ([95f7f87](https://github.com/cenk1cenk2/listr2/commit/95f7f8749445e45a90d3f4346eb4cd0625e9593e))


### BREAKING CHANGES

* **release:** - Renderer Options
  - Reason: *This was changed because of having all the renderer options that are mangled together and not respecting which renderer has been choosen. It also allows for custom renderers to have their own logic by exposing their options in a single class file rather than expecting that functionality from the project itself.*
  - Before <v1.3.12:
  ```typescript
    new Listr<Ctx>([
    {
      task: async (ctx, task): Promise<void> => {
      },
      persistentOutput: true
    }
  ], {
    concurrent: [secure],
    collapse: true
  ```
  - After <v1.3.12:
  ```typescript
    new Listr<Ctx>([
    {
      task: async (ctx, task): Promise<void> => {
      },
      options: { persistentOutput: true } // per task based options are moved to their own key
    }
  ], {
    concurrent: [secure],
    rendererOptions: { collapse: [secure] }
     // global renderer options moved to their own key
    })
  ```
- Some of the types has been changed.
  - Reason: *Some of the types had to be changed due to compatability reasons with new autocomplete functionality of the dynamic renderer options.*
  - Before <v1.3.12:
  ```typescript
  let task: Listr<Ctx>

  task = new Listr(..., { renderer: 'verbose' })
  ```
  - After <v1.3.12:
  ```typescript
  // this without the indication of verbose will now fail due to default renderer being 'default' for autocompleting goodness of the IDEs.
  // So you have to overwrite it manually to 'verbose'.
  // If it does not have a default you had to explicitly write { renderer: 'default' } everytime to have the auto complete feature
  let task: Listr<Ctx, 'verbose'>

  task = new Listr(..., { renderer: 'verbose' })
  ```
- Test renderer removed.
  - Reason: *On non-tty environments that the verbose renderer is intended for there is no need to show icons. Since icons are now optional with the default being disabled for the verbose renderer, there is no need for a renderer that does have the same functionality since verbose and test are now basically the same thing. Verbose seemed a better name then test, so I had to remove test from the equation.*
  - Before <v1.3.12:
  ```typescript
  const task = new Listr(..., { renderer: 'test' })
  ```
  - After <v1.3.12:
  ```typescript
  const task = new Listr(..., { renderer: 'verbose' })
  ```

## [1.3.12](https://github.com/cenk1cenk2/listr2/compare/v1.3.11...v1.3.12) (2020-04-30)


### Bug Fixes

* **ignore:** note to self dont do late night commits ([56ff7b7](https://github.com/cenk1cenk2/listr2/commit/56ff7b79b010606c593348e6b27fcd455d1c2dcd))

## [1.3.11](https://github.com/cenk1cenk2/listr2/compare/v1.3.10...v1.3.11) (2020-04-30)


### Bug Fixes

* **build:** ignored tests files ([16d8d93](https://github.com/cenk1cenk2/listr2/commit/16d8d9336fabbfb311a821744707e8ae55e80334))

## [1.3.10](https://github.com/cenk1cenk2/listr2/compare/v1.3.9...v1.3.10) (2020-04-30)


### Bug Fixes

* **tests:** add tests to npm ignore ([83cd9d3](https://github.com/cenk1cenk2/listr2/commit/83cd9d3c1270dc8f48458d329b01ed638eff6340))

## [1.3.9](https://github.com/cenk1cenk2/listr2/compare/v1.3.8...v1.3.9) (2020-04-30)


### Bug Fixes

* added e2e and unit tests, not comprehensive ([4d3076b](https://github.com/cenk1cenk2/listr2/commit/4d3076b80c2adb7a22388178f3e31690dec37534))


### Reverts

* **task:** revert back to enable boolean for not breaking compatability ([45b6c32](https://github.com/cenk1cenk2/listr2/commit/45b6c32fe451e138bad36f95d4d9ade1b49f45a2))
