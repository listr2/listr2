---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Support
order: 10
---

`listr2` supports only modern `node.js` environments, since it is mostly intended for CLI applications, but can be used as a task list in any application.

<!-- more -->

- `listr2` now supports both `esm` and `cjs` modules.
- You need a supported `node.js` version, end-of-life versions are deprecated and not supported.

## Supporting Multiple Node Module Structures

At some point, the support for `cjs` will be dropped in favor of keeping up with the `node.js` ecosystem. This will of course be done through a major release.

But now also taking into hand my current situation of using mostly `cjs` capable libraries, I do want to keep the `cjs` version as everything slowly migrates to `esm`.

With the latest changes on `ts-node`, `jest`, and `ts-jest` allowed us to move everything in the repository to `esm`. This enabled the repository starting from version `>= 6` to use dynamic imports for anything that is using a `esm` module. So from that version and upward, everything should be up to date with the upstream of the dependencies. So keeping the `cjs` version does not hinder us from updating the given packages.

### Disadvantages

- We have to bundle two instances, which doubles our distribution size.
- The community is moving to pure `esm` modules. [sindresorhus](https://github.com/sindresorhus) who is the maintainer of many-core `npm` packages (cheers!) has to lead the movement with the deprecated `node.js` `10` support. You can read more about [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) in his post.
