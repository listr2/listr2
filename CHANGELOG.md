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
