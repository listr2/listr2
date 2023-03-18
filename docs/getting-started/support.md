---
title: Support
order: 10
---

`listr2` supports only modern environments.

<!-- more -->

- `listr2` currently supports both `esm` and `cjs` modules.
- You need a supported `node.js` version, end-of-life versions are deprecated and not supported.

## Supporting Multiple Node Module Structures

At some point, the support for `cjs` will be dropped in favor of keeping the dependencies up-to-date. This will of course be done through a major release.

But currently also taking into hand my current situation of using mostly `cjs` capable libraries, I do want to keep the `cjs` version as everything slowly migrates to `esm`.

### Disadvantages

- We have to bundle two instances, which doubles our distribution size.
- The community is moving to pure `esm` modules. [sindresorhus](https://github.com/sindresorhus) who is the maintainer of many-core `npm` packages (cheers!) has to lead the movement with the deprecated `node.js` `10` support. You can read more about [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) in his post.
- Due to this compatibility issue, we can not update the dependencies that are pure `esm`. Even though we can `import` everything dynamically, this does not play nice with the development part of the application which has limited support for `esm` like `ts-node` and `jest`.
