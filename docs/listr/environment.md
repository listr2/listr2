---
title: Environment
order: 10
---

# {{ $frontmatter.title }}

`listr2` supports only modern `node.js` environments, since it is mostly intended for CLI applications, but can be used as a task list in any application.

<!-- more -->

- `listr2` supports both `esm` and `cjs` modules **for now**. But is only bundled for `esm` modules going forward.
- You need a supported `node.js` version, end-of-life versions are deprecated and not supported.

## Supporting Multiple Node Module Structures <Version version="v10.1.0" /><GithubIssue :issue="755" />

`listr2` supports both `esm` and `cjs` module structures however with the recent changes on [node](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require), we only bundle `esm` modules going forward. This will still support `cjs` module structure.

Thanks to [@hyperz111](https://github.com/hyperz111) for making me aware of this change, which cut our bundle distribution size in half.

Given the latest changes on `ts-node`, `jest`, and `ts-jest` allowed us to move everything in the repository to `esm`. This enabled the repository starting from version <Version version="v6" /> to use dynamic imports for anything that is using an `esm` module. So from that version and upward, everything should be up to date with the upstream of the dependencies. So keeping the `cjs` version does not hinder us from updating the given packages.

### Disadvantages

- We have to bundle two instances, which doubles our distribution size.
- The community is moving to pure `esm` modules. [sindresorhus](https://github.com/sindresorhus) who is the maintainer of many-core `npm` packages ([cheers!](https://github.com/sponsors/sindresorhus) ) has to lead the movement with the deprecated `node.js` `10` support. You can read more about it [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) in his post.
